"use client";

import Link from "next/link";
import { type RefObject, useRef } from "react";
import {
    motion,
    type MotionValue,
    useMotionTemplate,
    useMotionValueEvent,
    useTransform
} from "motion/react";
import styles from "../page.module.scss";
import BackgroundSlices, {
    desertSlices,
    saloonSlices
} from "./BackgroundSlices";
import SequenceImage from "./SequenceImage";
import usePausedOffscreen from "./usePausedOffscreen";

// The building (.building): top 123cqw, left -12cqw, width 124cqw, so the
// facade (1969 x 1561) is 98.3cqw tall and 1px of art = 0.062976cqw. Keep in
// sync with .building and .backdropFollow.
const BUILDING_TOP = 123;
const BUILDING_PX = 124 / 1969;
// Doorway: the transparent hole in the facade (1969 x 1561), x 877-1093 and
// y 963-1248, in canvas cqw.
const DOOR_CENTER_X = -12 + 985 * BUILDING_PX;
const DOOR_CENTER_Y = BUILDING_TOP + 1105.5 * BUILDING_PX;
const DOOR_HALF_W = 108.5 * BUILDING_PX;
const DOOR_HALF_H = 142.5 * BUILDING_PX;
// The backdrop behind the building, with a hole where the doorway is so the
// room shows through. In the building's own box (cqw from its top left),
// since .backdropFollow moves with the building.
const HOLE_LEFT = DOOR_CENTER_X - DOOR_HALF_W - 0.3 + 12;
const HOLE_RIGHT = DOOR_CENTER_X + DOOR_HALF_W + 0.3 + 12;
const HOLE_TOP = DOOR_CENTER_Y - DOOR_HALF_H - 0.3 - BUILDING_TOP;
const HOLE_BOTTOM = DOOR_CENTER_Y + DOOR_HALF_H + 0.3 - BUILDING_TOP;
const BACKDROP_CLIP =
    "polygon(evenodd, -200cqw -400cqw, 300cqw -400cqw, 300cqw 600cqw, " +
    "-200cqw 600cqw, -200cqw -400cqw, " +
    `${HOLE_LEFT}cqw ${HOLE_TOP}cqw, ${HOLE_LEFT}cqw ${HOLE_BOTTOM}cqw, ` +
    `${HOLE_RIGHT}cqw ${HOLE_BOTTOM}cqw, ${HOLE_RIGHT}cqw ${HOLE_TOP}cqw, ` +
    `${HOLE_LEFT}cqw ${HOLE_TOP}cqw)`;

// The facade has an empty doorway; one of these door overlays sits in it.
const doorStates = ["closed", "opening", "open"] as const;
// Rows of the original background: where the desert window starts (60cqw)
// and where the saloon starts.
const DESERT_ROW = 864;
const SALOON_ROW = 3335;

export type SaloonMetrics = {
    /** px per cqw */
    cq: number;
    /** sticky scene height in px */
    vh: number;
    /** viewport height in px */
    viewport: number;
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

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
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
    // Rolls only while it is near the screen.
    const tumbleweed = usePausedOffscreen<HTMLDivElement>();
    const scene = usePausedOffscreen<HTMLDivElement>();

    // One camera per frame, read by each layer's transform.
    const shot = useTransform(cam);
    const exX = useTransform(shot, c => c.exX);
    const exY = useTransform(shot, c => c.exY);
    const exS = useTransform(shot, c => c.exS);
    const inX = useTransform(shot, c => c.inX);
    const inY = useTransform(shot, c => c.inY);
    const inS = useTransform(shot, c => c.inS);

    const exteriorOpacity = useTransform(
        pin,
        reduceMotion ? [0.3, 0.6] : [FADE_START, FADE_END],
        [1, 0]
    );
    const doorFrame = useTransform(
        pin,
        [DOORS_START, DOORS_END],
        [0, doorStates.length - 1]
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

    // The backdrop moves with the building (so the doorway hole in its
    // clip stays put on the building) and is moved back by the inverse
    // inside, so the rocks and ground stay where they were. The clip never
    // changes, so nothing is redrawn while the building rises.
    const counterScale = useTransform(buildingScale, s => 1 / s);
    const counterShift = useTransform(
        () => -buildingShift.get() / buildingScale.get()
    );
    const counterY = useMotionTemplate`${counterShift}cqw`;

    // The exterior's layers are hinted `will-change: transform`, so the
    // browser scales their drawn pixels instead of redrawing them. It raises
    // their drawing resolution as the camera zooms in but never lowers it,
    // so on the way back out they would need far more tile memory than the
    // browser allows, and parts are left undrawn. Each time the zoom drops
    // by another step of sqrt(2) (and when the entrance unpins at the top),
    // drop the hints for one frame so the layers are redrawn at the current
    // scale. See .rasterReset in page.module.scss.
    const rasterStep = useRef(0);
    const resetRaster = () => {
        const element = scene.current;
        if (!element) return;
        element.classList.add(styles.rasterReset);
        // Two frames: one drawn without the hints, then put them back.
        requestAnimationFrame(() =>
            requestAnimationFrame(() =>
                element.classList.remove(styles.rasterReset)
            )
        );
    };
    useMotionValueEvent(exS, "change", scale => {
        const step = Math.floor(2 * Math.log2(Math.max(scale, 1)));
        if (step < rasterStep.current) resetRaster();
        rasterStep.current = step;
    });

    return (
        <div ref={trackRef} className={styles.doorTrack}>
            <motion.div
                ref={sceneRef}
                className={styles.doorScene}
                style={{ zIndex, visibility }}
            >
                {/* Pauses the swaying lamps once the scene is long gone. */}
                <div ref={scene} className={styles.doorSceneContent}>
                    <motion.div
                        className={styles.doorInterior}
                        style={{
                            x: inX,
                            y: inY,
                            scale: inS
                        }}
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
                            <BackgroundSlices
                                slices={saloonSlices.slice(0, 2)}
                                origin={SALOON_ROW}
                                decodeEarly
                            />
                        </div>
                        <div
                            className={`${styles.hangingLight} ${styles.interiorLightOne}`}
                        >
                            <SequenceImage name="hanging-light" />
                        </div>
                        <div
                            className={`${styles.hangingLight} ${styles.interiorLightTwo}`}
                        >
                            <SequenceImage name="hanging-light" />
                        </div>
                        <motion.div
                            className={`${styles.bartender} ${styles.interiorBartender}`}
                            style={{ y: bartenderY }}
                        >
                            <SequenceImage
                                name="bartender"
                                sizes="63vw"
                                decodeEarly
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
                                className={styles.backdropFollow}
                                style={{
                                    y: buildingY,
                                    scale: buildingScale,
                                    clipPath: BACKDROP_CLIP,
                                    visibility: backdropVisibility
                                }}
                            >
                                <motion.div
                                    className={styles.backdropCounter}
                                    style={{ y: counterY, scale: counterScale }}
                                >
                                    <div className={styles.exteriorBackdrop}>
                                        <div
                                            className={styles.exteriorDesert}
                                            aria-hidden="true"
                                        >
                                            <BackgroundSlices
                                                slices={desertSlices}
                                                origin={DESERT_ROW}
                                                decodeEarly
                                            />
                                        </div>
                                        {!reduceMotion && (
                                            <div
                                                ref={tumbleweed}
                                                className={
                                                    styles.tumbleweedLane
                                                }
                                                aria-hidden="true"
                                            >
                                                <div
                                                    className={
                                                        styles.tumbleweed
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.tumbleweedHop
                                                        }
                                                    >
                                                        <SequenceImage name="tumbleweed" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <motion.div
                                            className={styles.mountains}
                                            style={{
                                                y: mountainY,
                                                scale: mountainScale
                                            }}
                                            aria-hidden="true"
                                        >
                                            <SequenceImage
                                                name="rocks-behind-building"
                                                sizes="108vw"
                                                decodeEarly
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className={styles.building}
                                style={{ y: buildingY, scale: buildingScale }}
                            >
                                <SequenceImage
                                    name="saloon-facade"
                                    alt="The HackOutlaws saloon"
                                    sizes="124vw"
                                    decodeEarly
                                />
                                {doorStates.map((state, i) => (
                                    <motion.div
                                        key={state}
                                        className={styles.saloonDoors}
                                        style={{
                                            visibility: frameVisibilities[i]
                                        }}
                                    >
                                        <SequenceImage
                                            name={`saloon-doors-${state}`}
                                            decodeEarly
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
                </div>
            </motion.div>
        </div>
    );
}
