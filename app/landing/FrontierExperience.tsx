"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform
} from "motion/react";
import shared from "@/components/Frontier/Frontier.module.scss";
import { socials } from "@/modules/FooterData";
import FrontierNewsletter from "./FrontierNewsletter";
import MarqueeClock from "./MarqueeClock";
import MineFaq from "./MineFaq";
import styles from "../page.module.scss";

const sequence = "/landing/frontier/sequence/";
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
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: canvasRef,
        offset: ["start start", "end end"]
    });
    const progress = useSpring(scrollYProgress, {
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
    const buildingY = useTransform(
        progress,
        [0.09, 0.25],
        reduceMotion ? ["0cqw", "0cqw"] : ["18cqw", "5cqw"]
    );
    const buildingScale = useTransform(
        progress,
        [0.09, 0.22],
        reduceMotion ? [1, 1] : [0.86, 1.45]
    );
    const buildingOpacity = useTransform(
        progress,
        [0.07, 0.1, 0.26],
        reduceMotion ? [1, 1, 1] : [0, 1, 1]
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
                    <Image
                        src={sequence + "background.png"}
                        alt=""
                        aria-hidden="true"
                        width={1440}
                        height={11799}
                        className={styles.background}
                        priority
                        unoptimized
                    />
                    <div className={styles.navCover} aria-hidden="true" />

                    <h1 id="event-name" className={shared.hidden}>
                        HackIllinois 2027: Forge Your Frontier
                    </h1>
                    <MarqueeClock />
                    <Link
                        href="/register/general"
                        className={styles.registerHotspot}
                        aria-label="Register for HackIllinois 2027"
                    />

                    <div className={styles.cloudWindow} aria-hidden="true">
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
                    </div>

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
                    <div className={styles.saloonBridge} aria-hidden="true" />
                    <motion.div
                        className={styles.building}
                        style={{
                            y: buildingY,
                            scale: buildingScale,
                            opacity: buildingOpacity
                        }}
                    >
                        <Image
                            src={sequence + "hackoutlaws-building.png"}
                            alt="The HackOutlaws saloon"
                            width={1969}
                            height={1561}
                            unoptimized
                        />
                        <Link
                            href="/challenge"
                            className={styles.challengeHotspot}
                            aria-label="Learn more about HackOutlaws"
                        />
                    </motion.div>

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

                    <div className={styles.hackersHeading} aria-hidden="true">
                        Hear from the Hackers
                    </div>

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
