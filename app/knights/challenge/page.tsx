"use client";
<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect } from "react";
import { authenticate, isAuthenticated } from "@/utils/api";
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightChallenge/Banner";
import KnightChallenge from "@/components/HackKnightChallenge/KnightChallenge";
import Passed from "@/components/HackKnightChallenge/Passed";
import Failed from "@/components/HackKnightChallenge/Failed";

const Challenge: React.FC = () => {
    const [show, setShow] = React.useState<string>("banner");
<<<<<<< HEAD
=======

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(
                window.location.href
            );
        }
    });

>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
    return (
        <div className={styles.background}>
            <div className={styles.image}>
                <img
<<<<<<< HEAD
                    src={
                        show === "passed"
                            ? "/knights/challenge/background-passed.svg"
                            : show === "failed"
                            ? "/knights/challenge/background-failed.svg"
                            : "/knights/challenge/background.svg"
                    }
=======
                    src={ "/knights/challenge/background.svg" }
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
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
