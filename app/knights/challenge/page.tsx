"use client";
import React, { useEffect } from "react";
import { authenticate, isAuthenticated } from "@/utils/api";
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightChallenge/Banner";
import KnightChallenge from "@/components/HackKnightChallenge/KnightChallenge";
import Passed from "@/components/HackKnightChallenge/Passed";
import Failed from "@/components/HackKnightChallenge/Failed";

const Challenge: React.FC = () => {
    const [show, setShow] = React.useState<string>("banner");

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(
                window.location.href
            );
        }
    });

    return (
        <div className={styles.background}>
            <div className={styles.image}>
                <img
                    src={
                        show === "passed"
                            ? "/knights/challenge/background-passed.svg"
                            : show === "failed"
                            ? "/knights/challenge/background-failed.svg"
                            : "/knights/challenge/background.svg"
                    }
                />
            </div>
            <div className={styles.container}>
                {show === "challenge" ? (
                    <KnightChallenge setShow={setShow} />
                ) : show === "failed" ? (
                    <Failed setShow={setShow} />
                ) : show === "passed" ? (
                    <Passed setShow={setShow} />
                ) : (
                    <Banner setShow={setShow} />
                )}
            </div>
        </div>
    );
};

export default Challenge;
