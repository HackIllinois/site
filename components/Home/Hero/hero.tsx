"use client";
import React, { useState } from "react";

import styles from "./styles.module.scss";

import Image from "next/image";

import Village from "@/public/home/hero/village.svg";
import { button_text } from "@/modules/HeroData";

const Hero: React.FC = () => {
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        setClickCount(clickCount + 1);
        if (clickCount + 1 === 10) {
            window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your external link
        }
    };
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
                    <button className={styles.heroButton} onClick={handleClick}>
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
