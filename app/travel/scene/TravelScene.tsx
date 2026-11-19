"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
    animate,
    motion,
    useMotionValue,
    useScroll,
    useTransform
} from "motion/react";
import styles from "./TravelScene.module.scss";
import pageStyles from "../styles.module.scss";
import Navbar from "@/components/Navbar/Navbar";

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
    const { scrollY } = useScroll();
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
            {/* The navbar and title belong to the scene, so they drift with it. */}
            <motion.div className={styles.drift} style={{ y: backdropY }}>
                <Navbar fixed={false} />
                {hero}
            </motion.div>
            {children}
        </main>
    );
}
