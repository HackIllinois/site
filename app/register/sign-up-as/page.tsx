"use client";

import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import {
    authenticate,
    getChallenge,
    getRegistration,
    isAuthenticated
} from "@/util/api";

const RegistrationType: React.FC = () => {
    const handleCheckIfUserCompletedFormOrChallenge = async () => {
        try {
            if (!isAuthenticated()) {
                authenticate(window.location.href);
            }
            const registration = await getRegistration();
            if (!registration || !registration.hasSubmitted) {
                const passedChallenge = await getChallenge();
                if (passedChallenge === true) {
                    window.location.href = "/register";
                }
            } else {
                window.location.href = "/register/application-status";
            }
        } catch {
            // Just leave the user on the page; user did not attempt
        }
    };

    useEffect(() => {
        handleCheckIfUserCompletedFormOrChallenge();
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
