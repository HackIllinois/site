"use client";
import styles from "./Olympian.module.scss";
import { useContext } from "react";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";
import GlobalContext from "@/app/context";

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
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <Description />
        </section>
    );
};

export default Olympian;
