"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import styles from "./TravelScene.module.scss";
import pageStyles from "../styles.module.scss";
import Navbar from "@/components/Navbar/Navbar";

function ForegroundArt() {
    return (
        <picture className={styles.foreground}>
            <source
                media="(max-width: 700px)"
                srcSet="/travel/frontier/motion/mobile/foreground.webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/travel/frontier/motion/desktop/foreground.webp"
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

export default function TravelScene({
    hero,
    children
}: {
    hero: ReactNode;
    children: ReactNode;
}) {
    const target = useRef<HTMLDivElement>(null);
    const holdRef = useRef<HTMLDivElement>(null);
    const { scrollY, scrollYProgress } = useScroll({
        target,
        offset: ["start start", "end start"]
    });
    const trainTransform = useTransform(
        scrollYProgress,
        value =>
            `translateX(calc(${Math.max(0, Math.min(1, value))} * (100% - var(--train-left) + 2px)))`
    );

    // Document scroll position where the pinned hold ends and the page starts to move.
    const holdEnd = useMotionValue(Infinity);
    useEffect(() => {
        const hold = holdRef.current;
        const sequence = hold?.parentElement;
        if (!hold || !sequence) return;
        const measure = () =>
            holdEnd.set(
                sequence.getBoundingClientRect().top +
                    window.scrollY +
                    hold.offsetHeight
            );
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(sequence);
        return () => observer.disconnect();
    }, [holdEnd]);
    const drift = useTransform(() =>
        Math.max(0, scrollY.get() - holdEnd.get())
    );
    const backdropY = useTransform(drift, d => d * (1 - BACKDROP_SPEED));
    const branchY = useTransform(drift, d => -d * (BRANCH_SPEED - 1));

    return (
        <div className={styles.sequence}>
            <div
                ref={target}
                className={styles.scrollTarget}
                data-testid="scene-scroll-target"
                aria-hidden="true"
            />
            <main className={`${pageStyles.page} ${styles.pinned}`}>
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
                                    src="/travel/frontier/motion/desktop/train.webp"
                                    alt=""
                                />
                            </picture>
                        </motion.div>
                        <div
                            className={styles.fixedTree}
                            data-scene-layer="foreground"
                        >
                            <ForegroundArt />
                        </div>
                    </motion.div>
                    <motion.div
                        className={`${styles.movingLayer} ${styles.branch}`}
                        style={{ y: branchY }}
                        data-scene-layer="branch"
                    >
                        <ForegroundArt />
                    </motion.div>
                </div>
                {/* The navbar and title belong to the scene, so they drift with it. */}
                <motion.div className={styles.drift} style={{ y: backdropY }}>
                    <Navbar fixed={false} />
                    {hero}
                </motion.div>
                {children}
            </main>
            <div
                ref={holdRef}
                className={styles.hold}
                data-testid="scene-hold"
                aria-hidden="true"
            />
        </div>
    );
}
