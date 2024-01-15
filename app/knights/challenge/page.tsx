"use client";
import React from "react";
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightChallenge/Banner";
import KnightChallenge from "@/components/HackKnightChallenge/KnightChallenge";

const Challenge = () => {
    const [show, setShow] = React.useState<string>("banner");
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {show === "banner" && <KnightChallenge setShow={setShow} />}
            </div>
        </div>
    );
};

export default Challenge;
