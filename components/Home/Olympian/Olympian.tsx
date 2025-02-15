"use client";
import styles from "./Olympian.module.scss";
import { useContext } from "react";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";
import GlobalContext from "@/app/context";

// import APHRODITE from "@/public/home/olympian/aprodite.svg";
// import ARTEMIS from "@/public/home/olympian/artemis.svg";
// import ATHENA from "@/public/home/olympian/athena.svg";
// import APOLLO from "@/public/home/olympian/apollo.svg";
// import HADES from "@/public/home/olympian/hades.svg";
// import PERSEPHONE from "@/public/home/olympian/persephone.svg";
// import POSEIDON from "@/public/home/olympian/poseidon.svg";
// import ZEUS from "@/public/home/olympian/zeus.svg";

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
