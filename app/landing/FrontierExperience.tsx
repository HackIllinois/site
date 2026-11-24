"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform
} from "motion/react";
import shared from "@/components/Frontier/Frontier.module.scss";
import { socials } from "@/modules/FooterData";
import FrontierNewsletter from "./FrontierNewsletter";
import MarqueeClock from "./MarqueeClock";
import MarqueeSign from "./MarqueeSign";
import MineFaq from "./MineFaq";
import SaloonEntrance, { type SaloonMetrics } from "./SaloonEntrance";
import styles from "../page.module.scss";

const sequence = "/landing/frontier/sequence/";
// background.png is 11799px tall at 1440px wide; 14.4px = 1cqw.
const LEGACY_HEIGHT = 11799 / 14.4;
const SALOON_TOP = 3335 / 14.4;
const socialOrder = [
    "Instagram",
    "Facebook",
    "LinkedIn",
    "Github",
    "Email",
    "TikTok"
];
const orderedSocials = socialOrder.flatMap(name =>
    socials.filter(social => social.name === name)
);

export default function FrontierExperience() {
    const canvasRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const metrics = useRef<SaloonMetrics | null>(null);
    const metricsVersion = useMotionValue(0);
    const reduceMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const canvas = canvasRef.current;
        const track = trackRef.current;
        const scene = sceneRef.current;
        if (!canvas || !track || !scene) return;
        const measure = () => {
            const vh = scene.offsetHeight;
            metrics.current = {
                cq: canvas.clientWidth / 100,
                vh,
                top: track.offsetTop,
                pin: track.offsetHeight - vh,
                canvasTop: canvas.getBoundingClientRect().top + window.scrollY
            };
            metricsVersion.set(metricsVersion.get() + 1);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(canvas);
        observer.observe(scene);
        return () => observer.disconnect();
    }, [metricsVersion]);

    const { scrollY } = useScroll();
    const { scrollYProgress: pin } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"]
    });
    const { scrollYProgress: approach } = useScroll({
        target: trackRef,
        offset: ["start end", "start start"]
    });

    // Every animation below was tuned against the canvas before the saloon
    // entrance was pinned. Map the real scroll back onto that layout: the
    // pinned stretch walks from the track top to the saloon top, and
    // everything after it is shifted up by the extra scroll the pin adds.
    const legacyProgress = useTransform(() => {
        // Read every input before any early return so all are tracked.
        metricsVersion.get();
        const scroll = scrollY.get();
        const m = metrics.current;
        if (!m) return 0;
        const y = scroll - m.canvasTop;
        const saloonTop = SALOON_TOP * m.cq;
        let legacyY = y;
        if (y > m.top + m.pin) {
            legacyY = y - (m.top + m.pin - saloonTop);
        } else if (y > m.top) {
            legacyY = m.top + ((saloonTop - m.top) * (y - m.top)) / m.pin;
        }
        const scrollable = LEGACY_HEIGHT * m.cq - window.innerHeight;
        return Math.min(1, Math.max(0, legacyY / scrollable));
    });
    const progress = useSpring(legacyProgress, {
        stiffness: 90,
        damping: 24,
        mass: 0.42
    });

    const mountainY = useTransform(
        progress,
        [0.06, 0.23],
        reduceMotion ? ["0cqw", "0cqw"] : ["5cqw", "-8cqw"]
    );
    const mountainScale = useTransform(
        progress,
        [0.06, 0.23],
        reduceMotion ? [1, 1] : [1.03, 1]
    );
    const cloudY = useTransform(
        progress,
        [0, 0.2],
        reduceMotion ? ["0cqw", "0cqw"] : ["0cqw", "-4cqw"]
    );
    // Saloon lighting: in once the bartender has scrolled past and the
    // testimonial tables come up; out quickly as the saloon floor leaves.
    const shaderOpacity = useTransform(
        progress,
        [0.385, 0.41, 0.585, 0.6],
        [0, 1, 1, 0]
    );
    const shaderVisibility = useTransform(shaderOpacity, o =>
        o > 0 ? "visible" : "hidden"
    );
    const noteY = useTransform(
        progress,
        [0.8, 0.95],
        reduceMotion ? ["0cqw", "0cqw"] : ["6cqw", "0cqw"]
    );
    const bartenderY = useTransform(
        progress,
        [0.27, 0.43],
        reduceMotion ? ["0cqw", "0cqw"] : ["14cqw", "3cqw"]
    );

    const storyOneY = useTransform(
        progress,
        [0.39, 0.53],
        reduceMotion ? ["0cqw", "0cqw"] : ["9cqw", "-7cqw"]
    );
    const storyOneOpacity = useTransform(
        progress,
        [0.36, 0.38, 0.45, 0.47],
        reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
    );
    const storyTwoY = useTransform(
        progress,
        [0.45, 0.59],
        reduceMotion ? ["0cqw", "0cqw"] : ["10cqw", "-7cqw"]
    );
    const storyTwoOpacity = useTransform(
        progress,
        [0.44, 0.46, 0.53, 0.55],
        reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
    );
    const storyThreeY = useTransform(
        progress,
        [0.51, 0.66],
        reduceMotion ? ["0cqw", "0cqw"] : ["10cqw", "-8cqw"]
    );
    const storyThreeOpacity = useTransform(
        progress,
        [0.49, 0.51, 0.565, 0.595],
        reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
    );

    const firstCartX = useTransform(
        progress,
        [0.765, 0.85],
        reduceMotion ? ["0cqw", "0cqw"] : ["34cqw", "-128cqw"]
    );
    const firstCartY = useTransform(
        progress,
        [0.765, 0.85],
        reduceMotion ? ["0cqw", "0cqw"] : ["-15cqw", "56cqw"]
    );
    const firstCartOpacity = useTransform(
        progress,
        [0.75, 0.77, 0.83, 0.855],
        reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
    );
    const noteOpacity = useTransform(
        progress,
        [0.83, 0.85, 0.915],
        reduceMotion ? [1, 1, 1] : [0, 1, 1]
    );
    const characterCartX = useTransform(
        progress,
        [0.84, 0.915],
        reduceMotion ? ["0cqw", "0cqw"] : ["-108cqw", "-10cqw"]
    );
    const characterCartY = useTransform(
        progress,
        [0.84, 0.915],
        reduceMotion ? ["0cqw", "0cqw"] : ["-39cqw", "10cqw"]
    );
    const characterCartOpacity = useTransform(
        progress,
        [0.83, 0.85, 0.915],
        reduceMotion ? [1, 1, 1] : [0, 1, 1]
    );

    const float = (delay: number, distance: number) =>
        reduceMotion
            ? { y: 0 }
            : {
                  y: [0, -distance, 0, distance * 0.2, 0],
                  transition: {
                      duration: 4.8,
                      delay,
                      ease: "easeInOut" as const,
                      repeat: Infinity
                  }
              };

    return (
        <div className={shared.page}>
            <main className={styles.landing}>
                <section
                    ref={canvasRef}
                    className={styles.motionCanvas}
                    aria-labelledby="event-name"
                >
                    {/* The desert above the saloon, and the saloon onward
                        (shifted down by the pinned entrance). */}
                    <div className={styles.backgroundTop} aria-hidden="true">
                        <Image
                            src={sequence + "background.png"}
                            alt=""
                            width={1440}
                            height={11799}
                            priority
                            unoptimized
                        />
                    </div>
                    <div className={styles.backgroundBottom} aria-hidden="true">
                        <Image
                            src={sequence + "background.png"}
                            alt=""
                            width={1440}
                            height={11799}
                            unoptimized
                        />
                    </div>

                    <MarqueeSign>
                        <MarqueeClock />
                        <Link
                            href="/register/general"
                            className={styles.registerHotspot}
                            aria-label="Register for HackIllinois 2027"
                        />
                    </MarqueeSign>

                    <div className={styles.navCover} aria-hidden="true" />

                    <h1 id="event-name" className={shared.hidden}>
                        HackIllinois 2027: Forge Your Frontier
                    </h1>

                    <motion.div
                        className={styles.cloudWindow}
                        style={{ y: cloudY }}
                        aria-hidden="true"
                    >
                        <div className={styles.cloudTrack}>
                            {[0, 1].map(copy => (
                                <Image
                                    key={copy}
                                    src={sequence + "clouds.png"}
                                    alt=""
                                    width={1440}
                                    height={486}
                                    unoptimized
                                />
                            ))}
                        </div>
                    </motion.div>

                    <SaloonEntrance
                        trackRef={trackRef}
                        sceneRef={sceneRef}
                        pin={pin}
                        approach={approach}
                        metrics={metrics}
                        metricsVersion={metricsVersion}
                        reduceMotion={reduceMotion}
                        mountainY={mountainY}
                        mountainScale={mountainScale}
                        bartenderY={bartenderY}
                    />

                    <motion.div
                        className={`${styles.hangingLight} ${styles.lightOne}`}
                        aria-hidden="true"
                    >
                        <Image
                            src={sequence + "hanging-light-1.png"}
                            alt=""
                            width={240}
                            height={504}
                            unoptimized
                        />
                    </motion.div>
                    <motion.div
                        className={`${styles.hangingLight} ${styles.lightTwo}`}
                        aria-hidden="true"
                    >
                        <Image
                            src={sequence + "hanging-light-2.png"}
                            alt=""
                            width={240}
                            height={504}
                            unoptimized
                        />
                    </motion.div>

                    <motion.div
                        className={styles.bartender}
                        style={{ y: bartenderY }}
                    >
                        <Image
                            src={sequence + "bartender.png"}
                            alt="Last year at HackIllinois"
                            width={899}
                            height={985}
                            unoptimized
                        />
                    </motion.div>

                    <h2 className={styles.hackersHeading}>
                        Hear from the Hackers
                    </h2>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialOne}`}
                        style={{ y: storyOneY, opacity: storyOneOpacity }}
                    >
                        <Image
                            src={sequence + "testimonial-1.png"}
                            alt="A HackVoyagers participant testimonial"
                            width={1390}
                            height={1095}
                            unoptimized
                        />
                    </motion.div>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialTwo}`}
                        style={{ y: storyTwoY, opacity: storyTwoOpacity }}
                    >
                        <Image
                            src={sequence + "testimonial-2.png"}
                            alt="A first-year participant testimonial"
                            width={1406}
                            height={993}
                            unoptimized
                        />
                    </motion.div>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialThree}`}
                        style={{ y: storyThreeY, opacity: storyThreeOpacity }}
                    >
                        <Image
                            src={sequence + "testimonial-3.png"}
                            alt="A hardware track participant testimonial"
                            width={1317}
                            height={1004}
                            unoptimized
                        />
                    </motion.div>

                    <motion.div
                        className={styles.saloonShader}
                        style={{
                            opacity: shaderOpacity,
                            visibility: shaderVisibility
                        }}
                        aria-hidden="true"
                    />

                    <MineFaq />

                    <motion.div
                        className={styles.firstMinecart}
                        style={{
                            x: firstCartX,
                            y: firstCartY,
                            opacity: firstCartOpacity
                        }}
                        aria-hidden="true"
                    >
                        <Image
                            src={sequence + "minecart-1.png"}
                            alt=""
                            width={586}
                            height={553}
                            unoptimized
                        />
                    </motion.div>

                    <motion.div
                        className={styles.howdyNote}
                        style={{
                            y: noteY,
                            opacity: noteOpacity
                        }}
                    >
                        <Image
                            src={sequence + "howdy-note.png"}
                            alt="A welcome note from the HackIllinois team"
                            width={987}
                            height={1176}
                            unoptimized
                        />
                    </motion.div>

                    <motion.div
                        className={styles.characterCart}
                        style={{
                            x: characterCartX,
                            y: characterCartY,
                            opacity: characterCartOpacity
                        }}
                        aria-label="Three HackIllinois characters riding in a minecart"
                    >
                        <Image
                            src={sequence + "minecart-back.png"}
                            alt=""
                            width={746}
                            height={657}
                            className={styles.cartBack}
                            unoptimized
                        />
                        <motion.div
                            className={`${styles.cartCharacter} ${styles.orangeCharacter}`}
                            animate={float(0, 5)}
                        >
                            <Image
                                src={sequence + "character-orange.png"}
                                alt=""
                                width={421}
                                height={354}
                                unoptimized
                            />
                        </motion.div>
                        <motion.div
                            className={`${styles.cartCharacter} ${styles.yellowCharacter}`}
                            animate={float(0.8, 7)}
                        >
                            <Image
                                src={sequence + "character-yellow.png"}
                                alt=""
                                width={385}
                                height={385}
                                unoptimized
                            />
                        </motion.div>
                        <motion.div
                            className={`${styles.cartCharacter} ${styles.blueCharacter}`}
                            animate={float(1.5, 6)}
                        >
                            <Image
                                src={sequence + "character-blue.png"}
                                alt=""
                                width={314}
                                height={314}
                                unoptimized
                            />
                        </motion.div>
                        <Image
                            src={sequence + "minecart-front.png"}
                            alt=""
                            width={746}
                            height={657}
                            className={styles.cartFront}
                            unoptimized
                        />
                    </motion.div>

                    <nav
                        className={styles.socialHotspots}
                        aria-label="HackIllinois social links"
                    >
                        {orderedSocials.map(({ name, url }) => (
                            <a key={name} href={url} aria-label={name} />
                        ))}
                    </nav>
                    <div className={styles.newsletterOverlay} id="newsletter">
                        <FrontierNewsletter />
                    </div>
                </section>
            </main>
        </div>
    );
}
