"use client";
import styles from "./Olympian.module.scss";
import { useContext } from "react";
import clsx from "clsx";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import SECOND_LAYER_BACKGROUND from "@/public/home/olympian/second-layer-background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";
import GlobalContext from "@/app/context";

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
                    className={clsx(styles.apollo, styles.character)}
                />
                <Image
                    alt="Athena"
                    src={ATHENA}
                    className={clsx(styles.athena, styles.character)}
                />
                <Image
                    alt="Hades"
                    src={HADES}
                    className={clsx(styles.hades, styles.character)}
                />
                <Image
                    alt="Persephone"
                    src={PERSEPHONE}
                    className={clsx(styles.persephone, styles.character)}
                />
                <Image
                    alt="Zeus"
                    src={ZEUS}
                    className={clsx(styles.zeus, styles.character)}
                />
                <Image
                    alt="Poseidon"
                    src={POSEIDON}
                    className={clsx(styles.poseidon, styles.character)}
                />
                <Image
                    alt="Artemis"
                    src={ARTEMIS}
                    className={clsx(styles.artemis, styles.character)}
                />
                <Image
                    alt="Aphrodite"
                    src={APHRODITE}
                    className={clsx(styles.aphrodite, styles.character)}
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
            <Description />
        </section>
    );
};

export default Olympian;
