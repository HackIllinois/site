"use client";
import React from "react";
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightChallenge/Banner";
import KnightChallenge from "@/components/HackKnightChallenge/KnightChallenge";
import Passed from "@/components/HackKnightChallenge/Passed";
import Failed from "@/components/HackKnightChallenge/Failed";

const Challenge: React.FC = () => {
    const [show, setShow] = React.useState<string>("banner");
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {/* {show === "challenge" ? (
                    <KnightChallenge setShow={setShow} />
                ) : show === "failed" ? (
                    <Failed setShow={setShow} />
                ) : show === "passed" ? (
                    <Passed setShow={setShow} />
                ) : (
                    <Banner setShow={setShow} />
                )} */}
            </div>
        </div>
    );
};

export default Challenge;
