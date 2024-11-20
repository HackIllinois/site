import React from "react";
import Image from "next/image";
import styles from "./ApplicationSubmitted.module.scss";

const PersonalInfo: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Application Submitted!</h1>
                <p className={styles.message}>
                    Thank you for signing up for HackIllinois 2024! Please check
                    the status of your account in your email.
                </p>
                <p className={styles.follow}>
                    Be sure to follow our Instagram (
                    <a
                        href="https://www.instagram.com/hackillinois"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        @hackillinois
                    </a>
                    ) and X (
                    <a
                        href="https://twitter.com/hackillinois"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        @hackillinois
                    </a>
                    ) for additional information!
                </p>
                <Image
                    src="/logo.svg"
                    alt="HackIllinois Logo"
                    width={150}
                    height={150}
                    className={styles.logo}
                />
            </div>
        </>
    );
};

export default PersonalInfo;
