"use client"
import styles from "./styles.module.scss";

import Image from "next/image";

import Village from "@/public/home/hero/village.svg";
import { button_text } from "@/modules/HeroData";

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
                    <button className={styles.heroButton} onClick={() => window.open("https://solana.com/", "_blank", "noreferrer noopener")}>
                        {button_text}
                    </button>
                </div>
            </div>
            <div className={styles.villageWrapper}>
                <Image alt="Village Background" src={Village} />
            </div>
        </section>
    );
};

export default Hero;
