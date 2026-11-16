"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./TravelScene.module.scss";

export default function TravelScene() {
    const target = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ["start start", "end start"]
    });
    const trainX = useTransform(scrollYProgress, [0, 0.65], ["0%", "110%"]);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

    return (
        <div
            className={styles.scene}
            aria-hidden="true"
            data-testid="travel-scene"
        >
            {/* Measure an unmoving area, not one of the animated layers. */}
            <div
                ref={target}
                className={styles.scrollTarget}
                data-testid="scene-scroll-target"
            />
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
                style={{ x: trainX }}
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
            <motion.div
                className={styles.movingLayer}
                style={{ y: foregroundY }}
                data-scene-layer="foreground"
            >
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
            </motion.div>
        </div>
    );
}
