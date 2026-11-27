"use client";

import Image from "next/image";
import Link from "next/link";
import { type RefObject, useRef } from "react";
import {
    motion,
    type MotionValue,
    useInView,
    useMotionTemplate,
    useTransform
} from "motion/react";
import styles from "../page.module.scss";

const sequence = "/landing/frontier/sequence/";

// The building (.building): top 123cqw, left -12cqw, width 124cqw, so the
// closed frame (1969 x 1561) is 98.3cqw tall and 1px of art = 0.062976cqw.
const BUILDING_TOP = 123;
const BUILDING_PX = 124 / 1969;
const BUILDING_HEIGHT = 1561 * BUILDING_PX;
// Doorway: the transparent hole in hackoutlaws-building.png, x 877-1093 and
// y 963-1248, in canvas cqw.
const DOOR_CENTER_X = -12 + 985 * BUILDING_PX;
const DOOR_CENTER_Y = BUILDING_TOP + 1105.5 * BUILDING_PX;
const DOOR_HALF_W = 108.5 * BUILDING_PX;
const DOOR_HALF_H = 142.5 * BUILDING_PX;
// .building's transform-origin (50% 72%) in canvas coordinates.
const BUILDING_ORIGIN_X = 50;
const BUILDING_ORIGIN_Y = BUILDING_TOP + 0.72 * BUILDING_HEIGHT;

// Each frame is drawn at its natural width relative to the closed frame so
// that all three line up pixel-for-pixel.
const doorFrames = [
    { src: "hackoutlaws-building.png", width: 1969, height: 1561 },
    { src: "hackoutlaws-building-opening.png", width: 1960, height: 1519 },
    { src: "hackoutlaws-building-open.png", width: 1966, height: 1695 }
];

export type SaloonMetrics = {
    /** px per cqw */
    cq: number;
    /** sticky scene height in px */
    vh: number;
    /** track top relative to the canvas, px */
    top: number;
    /** pinned scroll distance, px */
    pin: number;
    canvasTop: number;
};

// Pin timeline (fraction of the pinned scroll).
const DOORS_START = 0.08;
const DOORS_END = 0.3;
const DOLLY_END = 0.32;
const ZOOM_END = 0.86;
const FADE_START = 0.72;
const FADE_END = 0.84;
const DOLLY_ZOOM = 1.7;
// By here the building fills the screen, so the scenery behind it is hidden.
const BACKDROP_HIDDEN = 0.6;
// Top of .exteriorBackdrop in canvas coordinates (cqw); the rocks start at 64.
const BACKDROP_TOP = 60;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Camera = {
    exX: number;
    exY: number;
    exS: number;
    inX: number;
    inY: number;
    inS: number;
};

const identity: Camera = { exX: 0, exY: 0, exS: 1, inX: 0, inY: 0, inS: 1 };

// How much of the room the doorway shows before the camera moves, in cqw of
// room width. Narrower than the room (100cqw), so the side walls stay hidden
// until the camera gets close.
const ROOM_VIEW_AT_DOOR = 50;
// Room row (cqw below the saloon top) the doorway is centred on at first:
// the picture wall.
const ROOM_FOCUS_Y = 42;
// The building rises this far (cqw) while it scrolls in before the pin.
export const APPROACH_RISE = 14;

/**
 * One camera drives both layers. The exterior is scaled by `zoom` around the
 * doorway. The interior is the in-page saloon with one of its points (the
 * anchor) pinned to the doorway centre. It grows more slowly than the door,
 * like a room some distance behind it, so the doorway first frames just the
 * picture wall and the side walls slide in as the camera closes. Both reach
 * their end state together: the interior at scale 1, exactly where it sits in
 * the page below.
 */
function camera(q: number, rise: number, m: SaloonMetrics | null): Camera {
    if (!m) return { ...identity, inS: 0.2 };
    const { cq, vh, top } = m;
    const doorX = DOOR_CENTER_X * cq;
    const doorY = DOOR_CENTER_Y * cq - top;
    // Big enough that the doorway clears the viewport on both axes.
    const zoomEnd = Math.max(13, (vh / cq + 16) / (DOOR_HALF_H * 2));
    const roomStart = (DOOR_HALF_W * 2) / ROOM_VIEW_AT_DOOR;
    const depth = Math.log(1 / roomStart) / Math.log(zoomEnd);
    // The anchor ends up at the doorway centre, so keep it where the final,
    // huge doorway still covers the whole screen.
    const half = DOOR_HALF_H * zoomEnd;
    const anchorX = 50 * cq;
    const anchorY =
        Math.min(half - 4, Math.max(vh / cq - half + 4, ROOM_FOCUS_Y)) * cq;
    const midX = 50 * cq;
    const midY = vh * 0.55;

    let zoom: number;
    let cx: number;
    let cy: number;
    if (q <= DOLLY_END) {
        const t = ease(clamp01(q / DOLLY_END));
        zoom = lerp(1, DOLLY_ZOOM, t);
        cx = lerp(doorX, midX, t);
        cy = lerp(doorY + rise * cq, midY, t);
    } else {
        const t = ease(clamp01((q - DOLLY_END) / (ZOOM_END - DOLLY_END)));
        zoom = DOLLY_ZOOM * Math.pow(zoomEnd / DOLLY_ZOOM, t);
        // Follow the zoom rather than time, so the doorway stays centred
        // until it is large enough to fill the screen.
        const u = (zoom - DOLLY_ZOOM) / (zoomEnd - DOLLY_ZOOM);
        cx = lerp(midX, anchorX, u);
        cy = lerp(midY, anchorY, u);
    }
    const inS = Math.pow(zoom / zoomEnd, depth);
    return {
        // The exterior's own approach rise is applied by the building itself.
        exX: cx - zoom * doorX,
        exY: cy - rise * cq - zoom * doorY,
        exS: zoom,
        inX: cx - inS * anchorX,
        inY: cy - inS * anchorY,
        inS
    };
}

type Props = {
    trackRef: RefObject<HTMLDivElement | null>;
    sceneRef: RefObject<HTMLDivElement | null>;
    /** 0-1 across the pinned scroll */
    pin: MotionValue<number>;
    /** 0-1 from the track entering the viewport until it pins */
    approach: MotionValue<number>;
    metrics: RefObject<SaloonMetrics | null>;
    metricsVersion: MotionValue<number>;
    reduceMotion: boolean;
    mountainY: MotionValue<string>;
    mountainScale: MotionValue<number>;
    bartenderY: MotionValue<string>;
};

export default function SaloonEntrance({
    trackRef,
    sceneRef,
    pin,
    approach,
    metrics,
    metricsVersion,
    reduceMotion,
    mountainY,
    mountainScale,
    bartenderY
}: Props) {
    const cam = () => {
        metricsVersion.get();
        const q = pin.get();
        const rise = (1 - approach.get()) * APPROACH_RISE;
        return reduceMotion ? identity : camera(q, rise, metrics.current);
    };
    // Starts rolling the first time it comes into view, then loops on its own.
    const tumbleweedRef = useRef<HTMLDivElement>(null);
    const tumbleweedSeen = useInView(tumbleweedRef, { once: true });

    const exX = useTransform(() => cam().exX);
    const exY = useTransform(() => cam().exY);
    const exS = useTransform(() => cam().exS);
    const inX = useTransform(() => cam().inX);
    const inY = useTransform(() => cam().inY);
    const inS = useTransform(() => cam().inS);

    const exteriorOpacity = useTransform(
        pin,
        reduceMotion ? [0.3, 0.6] : [FADE_START, FADE_END],
        [1, 0]
    );
    const doorFrame = useTransform(
        pin,
        [DOORS_START, DOORS_END],
        [0, doorFrames.length - 1]
    );
    const frameVisibility = (i: number) => (f: number) =>
        Math.round(f) === i ? "visible" : "hidden";
    const frameVisibilities = [
        useTransform(doorFrame, frameVisibility(0)),
        useTransform(doorFrame, frameVisibility(1)),
        useTransform(doorFrame, frameVisibility(2))
    ];

    // Above everything while pinned; hand over to the in-page saloon after.
    const zIndex = useTransform(pin, q => (q > 0 && q < 1 ? 30 : 3));
    const visibility = useTransform(pin, q => (q >= 1 ? "hidden" : "visible"));
    // Drop layers once they are fully covered or faded, so the browser is
    // never asked to keep a huge, heavily scaled layer around.
    const exteriorVisibility = useTransform(pin, q =>
        q >= FADE_END ? "hidden" : "visible"
    );
    const backdropVisibility = useTransform(pin, q =>
        q >= BACKDROP_HIDDEN ? "hidden" : "visible"
    );

    const buildingShift = useTransform(
        approach,
        [0, 1],
        reduceMotion ? [0, 0] : [APPROACH_RISE, 0]
    );
    const buildingY = useMotionTemplate`${buildingShift}cqw`;
    const buildingScale = useTransform(
        approach,
        [0, 1],
        reduceMotion ? [1, 1] : [0.9, 1]
    );

    // The rocks and ground behind the building would otherwise fill the
    // doorway. Cut a hole that follows the doorway through the building's
    // approach parallax, so the room behind shows through.
    const backdropClip = useTransform(() => {
        const s = buildingScale.get();
        const dy = buildingShift.get();
        const px = (x: number) =>
            BUILDING_ORIGIN_X + s * (x - BUILDING_ORIGIN_X);
        const py = (y: number) =>
            BUILDING_ORIGIN_Y + s * (y - BUILDING_ORIGIN_Y) + dy;
        const l = px(DOOR_CENTER_X - DOOR_HALF_W - 0.3);
        const r = px(DOOR_CENTER_X + DOOR_HALF_W + 0.3);
        // Relative to the backdrop box, which starts at BACKDROP_TOP.
        const t = py(DOOR_CENTER_Y - DOOR_HALF_H - 0.3) - BACKDROP_TOP;
        const b = py(DOOR_CENTER_Y + DOOR_HALF_H + 0.3) - BACKDROP_TOP;
        return (
            "polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, " +
            `${l}cqw ${t}cqw, ${l}cqw ${b}cqw, ${r}cqw ${b}cqw, ` +
            `${r}cqw ${t}cqw, ${l}cqw ${t}cqw)`
        );
    });

    return (
        <div ref={trackRef} className={styles.doorTrack}>
            <motion.div
                ref={sceneRef}
                className={styles.doorScene}
                style={{ zIndex, visibility }}
            >
                <motion.div
                    className={styles.doorInterior}
                    style={{ x: inX, y: inY, scale: inS }}
                    aria-hidden="true"
                >
                    <div className={styles.interiorFill} />
                    <div
                        className={`${styles.interiorEdge} ${styles.interiorEdgeLeft}`}
                    />
                    <div
                        className={`${styles.interiorEdge} ${styles.interiorEdgeRight}`}
                    />
                    <div className={styles.interiorRoom}>
                        <Image
                            src={sequence + "background.png"}
                            alt=""
                            width={1440}
                            height={11799}
                            unoptimized
                        />
                    </div>
                    <div
                        className={`${styles.hangingLight} ${styles.interiorLightOne}`}
                    >
                        <Image
                            src={sequence + "hanging-light-1.png"}
                            alt=""
                            width={240}
                            height={504}
                            unoptimized
                        />
                    </div>
                    <div
                        className={`${styles.hangingLight} ${styles.interiorLightTwo}`}
                    >
                        <Image
                            src={sequence + "hanging-light-2.png"}
                            alt=""
                            width={240}
                            height={504}
                            unoptimized
                        />
                    </div>
                    <motion.div
                        className={`${styles.bartender} ${styles.interiorBartender}`}
                        style={{ y: bartenderY }}
                    >
                        <Image
                            src={sequence + "bartender.png"}
                            alt=""
                            width={899}
                            height={985}
                            unoptimized
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.doorExterior}
                    style={{
                        x: exX,
                        y: exY,
                        scale: exS,
                        opacity: exteriorOpacity,
                        visibility: exteriorVisibility
                    }}
                >
                    <div className={styles.doorWorld}>
                        <motion.div
                            className={styles.exteriorBackdrop}
                            style={{
                                clipPath: backdropClip,
                                visibility: backdropVisibility
                            }}
                        >
                            <div
                                className={styles.exteriorDesert}
                                aria-hidden="true"
                            >
                                <Image
                                    src={sequence + "background.png"}
                                    alt=""
                                    width={1440}
                                    height={11799}
                                    priority
                                    unoptimized
                                />
                            </div>
                            {!reduceMotion && (
                                <div
                                    ref={tumbleweedRef}
                                    className={`${styles.tumbleweedLane} ${tumbleweedSeen ? styles.tumbleweedRolling : ""}`}
                                    aria-hidden="true"
                                >
                                    <div className={styles.tumbleweed}>
                                        <div className={styles.tumbleweedHop}>
                                            <Image
                                                src={
                                                    sequence + "Tumbleweed.png"
                                                }
                                                alt=""
                                                width={155}
                                                height={131}
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <motion.div
                                className={styles.mountains}
                                style={{ y: mountainY, scale: mountainScale }}
                                aria-hidden="true"
                            >
                                <Image
                                    src={sequence + "rocks-behind-building.png"}
                                    alt=""
                                    width={1440}
                                    height={1601}
                                    unoptimized
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={styles.building}
                            style={{ y: buildingY, scale: buildingScale }}
                        >
                            {doorFrames.map((frame, i) => (
                                <motion.div
                                    key={frame.src}
                                    className={
                                        i === 0
                                            ? styles.buildingFrameBase
                                            : styles.buildingFrame
                                    }
                                    style={{
                                        width: `${(frame.width / doorFrames[0].width) * 100}%`,
                                        visibility: frameVisibilities[i]
                                    }}
                                >
                                    <Image
                                        src={sequence + frame.src}
                                        alt={
                                            i === 0
                                                ? "The HackOutlaws saloon"
                                                : ""
                                        }
                                        width={frame.width}
                                        height={frame.height}
                                        unoptimized
                                    />
                                </motion.div>
                            ))}
                            <Link
                                href="/challenge"
                                className={styles.challengeHotspot}
                                aria-label="Learn more about HackOutlaws"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
