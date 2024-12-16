"use client";
import styles from "./Olympian.module.scss";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import CHEST from "@/public/home/olympian/chest.svg";
import FRONT_CLOUDS from "@/public/home/olympian/front-clouds.svg";
import BACK_CLOUDS from "@/public/home/olympian/back-clouds.svg";
import BACKGROUND from "@/public/home/olympian/staircase-background.svg";

const Olympian: React.FC = () => {
    return (
        <section className={styles.olympianMain}>
            <Image alt="HackOlympus Logo" src={LOGO} className={styles.logo} />
            <div className={styles.olympianButtonWrapper}>
                <button className={styles.olympianButton}>
                    <a href="/register">Register Now</a>
                </button>
            </div>
            <Image alt="chest" src={CHEST} className={styles.chest} />
            <Image
                alt="cloud"
                src={BACK_CLOUDS}
                className={styles.backClouds}
            />
            <Image
                alt="cloud"
                src={FRONT_CLOUDS}
                className={styles.frontClouds}
            />

            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
        </section>
    );
};

export default Olympian;