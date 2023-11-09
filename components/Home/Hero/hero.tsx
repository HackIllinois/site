import React from "react";

import styles from "./styles.module.scss";

import Image from "next/image";

import Village from "@/public/home/hero/village.svg";

const Hero: React.FC = () => {
    return (
        <section className={styles.heroMain}>
            <div className={styles.heroContainer}>
                <div className={styles.heroImageWrapper}>
                    <Image
                        alt="Hack n Slash Logo"
                        src="/home/hero/logo.svg"
                        fill={true}
                    />
                </div>
                <div className={styles.heroButtonWrapper}>
                    <button className={styles.heroButton}>Coming Soon</button>
                </div>
            </div>
            <div className={styles.villageWrapper}>
                <Image alt="Village Background" src={Village} />
            </div>
        </section>
    );
};

export default Hero;
