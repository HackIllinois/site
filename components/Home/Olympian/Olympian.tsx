"use client";
import styles from "./Olympian.module.scss";
import { useContext, useState, useEffect } from "react";
import clsx from "clsx";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import SECOND_LAYER_BACKGROUND from "@/public/home/olympian/second-layer-background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";
import GlobalContext from "@/app/context";
import LEAF from "@/public/home/olympian/leaf.svg";

import APHRODITE from "@/public/home/olympian/aphrodite.svg";
import ARTEMIS from "@/public/home/olympian/artemis.svg";
import ATHENA from "@/public/home/olympian/athena.svg";
import APOLLO from "@/public/home/olympian/apollo.svg";
import HADES from "@/public/home/olympian/hades.svg";
import PERSEPHONE from "@/public/home/olympian/persephone.svg";
import POSEIDON from "@/public/home/olympian/poseidon.svg";
import ZEUS from "@/public/home/olympian/zeus.svg";

const Olympian: React.FC = () => {
    const { eventStatus } = useContext(GlobalContext);

    const [clickCount, setClickCount] = useState(0);
    const handleClick = () => {
        setClickCount(clickCount + 1);
        if (clickCount + 1 === 3) {
            window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your external link
        }
    };

    const getButtonData = () => {
        switch (eventStatus) {
            case "registration":
                return { text: "Register Now", link: "/register" };
            case "admission":
                return { text: "Profile", link: "/profile" };
            case "loading":
                return { text: "Loading", link: "#" };
        }
    };

    useEffect(() => {
        const apollo = document.querySelector(`.${styles.apollo}`);
        const aphrodite = document.querySelector(`.${styles.aphrodite}`);
        const athena = document.querySelector(`.${styles.athena}`);
        const hades = document.querySelector(`.${styles.hades}`);
        const persephone = document.querySelector(`.${styles.persephone}`);
        const poseidon = document.querySelector(`.${styles.poseidon}`);
        const zeus = document.querySelector(`.${styles.zeus}`);
        const artemis = document.querySelector(`.${styles.artemis}`);

        setTimeout(() => {
            apollo?.classList.remove(styles.shiftDown);
            aphrodite?.classList.remove(styles.shiftDown);
        }, 0);

        setTimeout(() => {
            athena?.classList.remove(styles.shiftDown);
            artemis?.classList.remove(styles.shiftDown);
        }, 1000);

        setTimeout(() => {
            hades?.classList.remove(styles.shiftDown);
            poseidon?.classList.remove(styles.shiftDown);
        }, 2000);

        setTimeout(() => {
            persephone?.classList.remove(styles.shiftDown);
        }, 2500);

        setTimeout(() => {
            zeus?.classList.remove(styles.shiftDown);
        }, 3000);
    }, []);

    return (
        <section className={styles.olympianMain}>
            <div className={styles.main}>
                <Image
                    alt="HackOlympus Logo"
                    src={LOGO}
                    className={styles.logo}
                />
                <OlympianButton {...getButtonData()} bottomPadding />
            </div>
            <div className={styles.characters}>
                <Image
                    alt="Apollo"
                    src={APOLLO}
                    className={clsx(
                        styles.apollo,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Athena"
                    src={ATHENA}
                    className={clsx(
                        styles.athena,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Hades"
                    src={HADES}
                    className={clsx(
                        styles.hades,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Persephone"
                    src={PERSEPHONE}
                    className={clsx(
                        styles.persephone,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Zeus"
                    src={ZEUS}
                    className={clsx(
                        styles.zeus,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Poseidon"
                    src={POSEIDON}
                    className={clsx(
                        styles.poseidon,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Artemis"
                    src={ARTEMIS}
                    className={clsx(
                        styles.artemis,
                        styles.character,
                        styles.shiftDown
                    )}
                />
                <Image
                    alt="Aphrodite"
                    src={APHRODITE}
                    className={clsx(
                        styles.aphrodite,
                        styles.character,
                        styles.shiftDown
                    )}
                />
            </div>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <Image
                alt="second layer background"
                src={SECOND_LAYER_BACKGROUND}
                className={styles.secondLayerBackground}
            />
            <Image
                alt="leaf"
                src={LEAF}
                className={styles.leaf}
                onClick={handleClick}
            />
            <Description />
        </section>
    );
};

export default Olympian;
