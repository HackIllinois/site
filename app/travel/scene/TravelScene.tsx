"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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

export default function TravelScene({ children }: { children: ReactNode }) {
    const target = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ["start start", "end start"]
    });
    const trainTransform = useTransform(
        scrollYProgress,
        value =>
            `translateX(calc(${Math.max(0, Math.min(1, value))} * (100% - var(--train-left) + 2px)))`
    );

    const branchY = useTransform(scrollYProgress, [0, 1], ["0svh", "-26svh"]);

    return (
        <div className={styles.sequence}>
            <div
                ref={target}
                className={styles.scrollTarget}
                data-testid="scene-scroll-target"
                aria-hidden="true"
            />
            <main className={`${pageStyles.page} ${styles.pinned}`}>
                <Navbar fixed={false} />
                <div
                    className={styles.scene}
                    aria-hidden="true"
                    data-testid="travel-scene"
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
                        <SceneLayerArt name="foreground" />
                    </div>
                    <motion.div
                        className={styles.movingLayer}
                        style={{ y: branchY }}
                        data-scene-layer="branch"
                    >
                        <SceneLayerArt name="branch" />
                    </motion.div>
                </div>
                {children}
            </main>
        </div>
    );
}
