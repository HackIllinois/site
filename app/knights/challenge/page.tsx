"use client";
import React from "react";
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightChallenge/Banner";
import KnightChallenge from "@/components/HackKnightChallenge/KnightChallenge";
import Failed from "@/components/HackKnightChallenge/Failed";

const Challenge = () => {
    const [show, setShow] = React.useState<string>("banner");
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {show === "challenge" ? (
                    <KnightChallenge setShow={setShow} />
                ) : show === "result" ? (
                    <Failed setShow={setShow} />
                ) : (
                    <Banner setShow={setShow} />
                )}
            </div>
        </div>
    );
};

export default Challenge;
