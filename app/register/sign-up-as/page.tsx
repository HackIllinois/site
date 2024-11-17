"use client";

import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { getChallenge } from "@/util/api";

const RegistrationType: React.FC = () => {
    const handleCheckIfUserCompletedChallenge = async () => {
        try {
            const passedChallenge = await getChallenge();
            if (passedChallenge === true) {
                window.location.href = "/register";
            }
        } catch {
            // Just leave the user on the page; user did not attempt
        }
    };

    useEffect(() => {
        handleCheckIfUserCompletedChallenge();
    }, []);

    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <h2>Sign Up As:</h2>
                <ShineButton text="HackOlympian" link="/register/challenge" />
                <p className={styles.link}>
                    <a href="/about-hack-olympians" target="_blank">
                        What is this?
                    </a>
                </p>
                <ShineButton text="General Attendee" link="/register" />
            </div>
        </div>
    );
};

export default RegistrationType;