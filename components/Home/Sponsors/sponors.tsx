"use client";
import React from "react";
import styles from "./styles.module.scss";
import Lottie from "lottie-react";
import crystalBall from "@/public/home/sponsors/crystalball.json";
import Image from "next/image";
import background from "@/public/home/sponsors/background.svg";

const Sponsors: React.FC = () => {
    return (
        <div className={styles.sponsorsMain}>
            <div className={styles.sponsorsBackground}>
                <h1 className={styles.sponsorsTitle}>Our Sponsors</h1>
                <Image
                    className={styles.backgroundSVG}
                    alt="background"
                    src={background}
                />
            </div>
            <Lottie
                className={styles.ball}
                animationData={crystalBall}
                loop={true}
            />
        </div>
    );
};

export default Sponsors;
