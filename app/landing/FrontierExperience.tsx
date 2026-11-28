"use client";

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
import SaloonEntrance, { clamp01, type SaloonMetrics } from "./SaloonEntrance";
import SequenceImage from "./SequenceImage";
import BackgroundSlices, {
    desertSlices,
    saloonSlices
} from "./BackgroundSlices";
import usePausedOffscreen from "./usePausedOffscreen";
import styles from "../page.module.scss";

// The page art was laid out on one 1440 x 11799 background; 14.4px = 1cqw.
const LEGACY_HEIGHT = 11799 / 14.4;
// The saloon starts at this row of that background.
const SALOON_ROW = 3335;
const SALOON_TOP = SALOON_ROW / 14.4;
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
                viewport: document.documentElement.clientHeight,
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
    // Progress through the pinned entrance (0 when it pins, 1 when it lets
    // go) and through its approach (0 when the track's top enters the bottom
    // of the screen, 1 when it reaches the top). Derived from the measured
    // metrics rather than useScroll({ target }), which re-measures the track
    // on every scroll event.
    const pin = useTransform(() => {
        metricsVersion.get();
        const scroll = scrollY.get();
        const m = metrics.current;
        if (!m || m.pin <= 0) return 0;
        return clamp01((scroll - m.canvasTop - m.top) / m.pin);
    });
    const approach = useTransform(() => {
        metricsVersion.get();
        const scroll = scrollY.get();
        const m = metrics.current;
        if (!m || m.viewport <= 0) return 0;
        const start = m.canvasTop + m.top - m.viewport;
        return clamp01((scroll - start) / m.viewport);
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
        return clamp01(legacyY / scrollable);
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

    const clouds = usePausedOffscreen<HTMLDivElement>();
    const lightOne = usePausedOffscreen<HTMLDivElement>();
    const lightTwo = usePausedOffscreen<HTMLDivElement>();
    const cart = usePausedOffscreen<HTMLDivElement>();

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
                        <BackgroundSlices
                            slices={desertSlices}
                            origin={0}
                            priority
                        />
                    </div>
                    <div className={styles.backgroundBottom} aria-hidden="true">
                        <BackgroundSlices
                            slices={saloonSlices}
                            origin={SALOON_ROW}
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
                        ref={clouds}
                        className={styles.cloudWindow}
                        style={{ y: cloudY }}
                        aria-hidden="true"
                    >
                        <div className={styles.cloudTrack}>
                            <SequenceImage name="clouds" sizes="100vw" />
                            <SequenceImage name="clouds" sizes="100vw" />
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

                    <div
                        ref={lightOne}
                        className={`${styles.hangingLight} ${styles.lightOne}`}
                        aria-hidden="true"
                    >
                        <SequenceImage name="hanging-light" />
                    </div>
                    <div
                        ref={lightTwo}
                        className={`${styles.hangingLight} ${styles.lightTwo}`}
                        aria-hidden="true"
                    >
                        <SequenceImage name="hanging-light" />
                    </div>

                    <motion.div
                        className={styles.bartender}
                        style={{ y: bartenderY }}
                    >
                        <SequenceImage
                            name="bartender"
                            alt="Last year at HackIllinois"
                            sizes="63vw"
                        />
                    </motion.div>

                    <h2 className={styles.hackersHeading}>
                        Hear from the Hackers
                    </h2>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialOne}`}
                        style={{ y: storyOneY, opacity: storyOneOpacity }}
                    >
                        <SequenceImage
                            name="testimonial-1"
                            alt="A HackVoyagers participant testimonial"
                            sizes="94vw"
                        />
                    </motion.div>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialTwo}`}
                        style={{ y: storyTwoY, opacity: storyTwoOpacity }}
                    >
                        <SequenceImage
                            name="testimonial-2"
                            alt="A first-year participant testimonial"
                            sizes="94vw"
                        />
                    </motion.div>
                    <motion.div
                        className={`${styles.testimonial} ${styles.testimonialThree}`}
                        style={{ y: storyThreeY, opacity: storyThreeOpacity }}
                    >
                        <SequenceImage
                            name="testimonial-3"
                            alt="A hardware track participant testimonial"
                            sizes="94vw"
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

                    <section
                        className={styles.sponsorsComingSoon}
                        aria-label="Sponsors"
                    >
                        <div className={styles.sponsorsCard}>
                            <p className={styles.sponsorsCardTitle}>
                                Coming Soon!
                            </p>
                            <p className={styles.sponsorsCardCopy}>
                                Our 2027 sponsors will be announced soon.
                                Interested in sponsoring? Reach out at{" "}
                                <a href="mailto:contact@hackillinois.org">
                                    contact@hackillinois.org
                                </a>
                                .
                            </p>
                        </div>
                    </section>

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
                        <SequenceImage name="minecart-1" />
                    </motion.div>

                    <motion.div
                        className={styles.howdyNote}
                        style={{
                            y: noteY,
                            opacity: noteOpacity
                        }}
                    >
                        <SequenceImage
                            name="howdy-note"
                            alt="A welcome note from the HackIllinois team"
                        />
                    </motion.div>

                    <motion.div
                        ref={cart}
                        className={styles.characterCart}
                        style={{
                            x: characterCartX,
                            y: characterCartY,
                            opacity: characterCartOpacity
                        }}
                        role="img"
                        aria-label="Three HackIllinois characters riding in a minecart"
                    >
                        <SequenceImage
                            name="minecart-back"
                            className={styles.cartBack}
                        />
                        <div
                            className={`${styles.cartCharacter} ${styles.orangeCharacter}`}
                        >
                            <SequenceImage name="character-orange" />
                        </div>
                        <div
                            className={`${styles.cartCharacter} ${styles.yellowCharacter}`}
                        >
                            <SequenceImage name="character-yellow" />
                        </div>
                        <div
                            className={`${styles.cartCharacter} ${styles.blueCharacter}`}
                        >
                            <SequenceImage name="character-blue" />
                        </div>
                        <SequenceImage
                            name="minecart-front"
                            className={styles.cartFront}
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
