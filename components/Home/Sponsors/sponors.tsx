"use client"

import React from "react";
import styles from "./styles.module.scss";
import Lottie from "lottie-react";
import crystalBall from "@/public/home/sponsors/crystalball.json"

const Sponsors: React.FC  =() => {

    return (
        <div className={styles.sponsorsMain}>
            <Lottie className={styles.ball} animationData={crystalBall} loop={true} />
        </div>
    );
};

export default Sponsors;