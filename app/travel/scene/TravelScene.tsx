"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis, { type VirtualScrollData } from "lenis";
import "lenis/dist/lenis.css";
import {
    animate,
    cancelFrame,
    frame,
    motion,
    useMotionValue,
    useTransform,
    type FrameData
} from "motion/react";
import styles from "./TravelScene.module.scss";
import pageStyles from "../styles.module.scss";

function SceneLayerArt({ name }: { name: "foreground" | "branch" }) {
    return (
        <picture className={styles.foreground}>
            <source
                media="(max-width: 700px)"
                srcSet={`/travel/frontier/motion/mobile/${name}.webp`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`/travel/frontier/motion/desktop/${name}.webp`}
                alt=""
                width={1440}
                height={3132}
            />
        </picture>
    );
}

// Speeds measured from the reference video, relative to the board (page scroll).
const BACKDROP_SPEED = 0.5;
const BRANCH_SPEED = 2;
// The reference train moves at a constant 43% of the desktop width each second.
const TRAIN_SECONDS = 3.4;

export default function TravelScene({
    hero,
    children
}: {
    hero: ReactNode;
    children: ReactNode;
}) {
    // Smooth wheel scrolling for mouse and trackpad users, stepped in Motion's
    // frame loop so every layer moves in the same frame as the page. Touch,
    // keyboard and reduced motion keep native scrolling, and the layers follow
    // it through the scroll event. The loop runs only during a wheel glide: a
    // frame loop that never stops keeps WebKit from scrolling with arrow keys.
    const scrollY = useMotionValue(0);
    useEffect(() => {
        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
        const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
        const scrollKeys = new Set([
            " ",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            "ArrowUp",
            "ArrowDown"
        ]);
        let lenis: Lenis | undefined;
        let gliding = false;
        let carry = 0;

        const sync = () => scrollY.set(window.scrollY);
        // Hand an unfinished glide over to native scrolling.
        const yieldToNative = () => {
            if (lenis?.isScrolling !== "smooth") return;
            lenis.stop();
            lenis.start();
        };
        const onScroll = () => {
            // A jump Lenis did not make (find in page, scrollbar, focus,
            // scrollIntoView) wins over the glide.
            if (
                lenis?.isScrolling === "smooth" &&
                Math.abs(window.scrollY - lenis.animatedScroll) > 2
            ) {
                yieldToNative();
            }
            sync();
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (!event.defaultPrevented && scrollKeys.has(event.key)) {
                yieldToNative();
            }
        };
        const step = ({ timestamp }: FrameData) => {
            lenis?.raf(timestamp);
            if (lenis?.isScrolling === "smooth") return;
            cancelFrame(step);
            gliding = false;
        };
        const glide = () => {
            if (gliding || !lenis) return;
            gliding = true;
            // Start the clock at this frame, not at the end of the last glide.
            lenis.time = 0;
            frame.update(step, true);
        };
        const virtualScroll = (data: VirtualScrollData) => {
            const { event } = data;
            // Touch, pinch zoom and sideways gestures go to Lenis untouched.
            if (
                !(event instanceof WheelEvent) ||
                event.ctrlKey ||
                data.deltaY === 0
            ) {
                return true;
            }
            // Alt+wheel is history navigation in Firefox.
            if (event.altKey) return false;
            // Lenis rounds every target, so carry sub-pixel trackpad deltas.
            const total = data.deltaY + carry;
            data.deltaY = Math.round(total);
            carry = total - data.deltaY;
            if (data.deltaY !== 0) return true;
            event.preventDefault();
            return false;
        };
        const stop = () => {
            cancelFrame(step);
            gliding = false;
            // stop() settles Lenis first, so its pending velocity timer
            // cannot re-add the "lenis" class after destroy().
            lenis?.stop();
            lenis?.destroy();
            lenis = undefined;
        };
        const update = () => {
            if (reduceMotion.matches || !finePointer.matches) return stop();
            if (lenis) return;
            carry = 0;
            lenis = new Lenis({ autoRaf: false, lerp: 0.1, virtualScroll });
            lenis.on("scroll", sync);
            lenis.on("virtual-scroll", glide);
        };

        sync();
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("keydown", onKeyDown);
        reduceMotion.addEventListener("change", update);
        finePointer.addEventListener("change", update);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("keydown", onKeyDown);
            reduceMotion.removeEventListener("change", update);
            finePointer.removeEventListener("change", update);
            stop();
        };
    }, [scrollY]);
    const backdropY = useTransform(
        scrollY,
        y => Math.max(0, y) * (1 - BACKDROP_SPEED)
    );
    const branchY = useTransform(
        scrollY,
        y => -Math.max(0, y) * (BRANCH_SPEED - 1)
    );

    // The train crosses once on page load: from just off the left edge to just off the right edge.
    const trainImage = useRef<HTMLImageElement>(null);
    const trainProgress = useMotionValue(0);
    const trainTransform = useTransform(
        trainProgress,
        // NaN keeps the train at rest in its artwork position (reduced motion).
        p =>
            Number.isNaN(p)
                ? "none"
                : `translateX(calc(-1 * (var(--train-left) + var(--train-width)) + ${p} * (100% + var(--train-width) + 2px)))`
    );
    useEffect(() => {
        const image = trainImage.current;
        if (!image) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            trainProgress.jump(Number.NaN);
            return;
        }
        let animation: ReturnType<typeof animate> | undefined;
        let cancelled = false;
        // Wait for the artwork so the visitor sees the whole crossing.
        image
            .decode()
            .catch(() => undefined)
            .then(() => {
                if (cancelled) return;
                animation = animate(trainProgress, 1, {
                    duration: TRAIN_SECONDS,
                    ease: "linear"
                });
            });
        return () => {
            cancelled = true;
            animation?.stop();
        };
    }, [trainProgress]);

    return (
        <main className={pageStyles.page}>
            <div
                className={styles.scene}
                aria-hidden="true"
                data-testid="travel-scene"
            >
                <motion.div
                    className={styles.movingLayer}
                    style={{ y: backdropY }}
                    data-scene-layer="backdrop"
                >
                    <picture className={styles.background}>
                        <source
                            media="(max-width: 700px)"
                            srcSet="/travel/frontier/motion/mobile/background.webp"
                        />
                        {/* Native pictures select the original desktop/mobile artwork without layout shifts. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/travel/frontier/motion/desktop/background.webp"
                            alt=""
                            width={1440}
                            height={3132}
                        />
                    </picture>
                    <motion.div
                        className={styles.movingLayer}
                        style={{ transform: trainTransform }}
                        data-scene-layer="train"
                    >
                        <picture className={styles.train}>
                            <source
                                media="(max-width: 700px)"
                                srcSet="/travel/frontier/motion/mobile/train.webp"
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                ref={trainImage}
                                src="/travel/frontier/motion/desktop/train.webp"
                                alt=""
                            />
                        </picture>
                    </motion.div>
                    <div
                        className={styles.fixedTree}
                        data-scene-layer="foreground"
                    >
                        <SceneLayerArt name="foreground" />
                    </div>
                </motion.div>
                <motion.div
                    className={styles.movingLayer}
                    style={{ y: branchY }}
                    data-scene-layer="branch"
                >
                    <SceneLayerArt name="branch" />
                </motion.div>
            </div>
            {/* The title drifts with the scene. */}
            <motion.div className={styles.drift} style={{ y: backdropY }}>
                {hero}
            </motion.div>
            {children}
        </main>
    );
}
