"use client";
import { useRouter } from "next/navigation";
import styles from "./Failed.module.scss";

const Failed = (props: any) => {
    const { setShow } = props;
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/register");
    };

    return (
        <div className={styles.container}>
            <p className={styles.header}>
                Unfortunately, your solution did not pass the challenge
            </p>
            <button
                onClick={() => setShow("challenge")}
                className={`${styles.button} ${styles.tryAgainButton}`}
            >
                <img
                    src="/knights/challenge/button-bg-blue.svg"
                    className={styles.buttonBg}
                />
                <span className={styles.buttonText}>Try Again</span>
            </button>
            <div className={styles.content}>
                <p className={styles.text}>You have unlimited attempts!</p>
                <p className={styles.subText}>
                    Note: Number of attempts will be taken into account when
                    deciding acceptances
                </p>
            </div>

            <p className={`${styles.text} ${styles.margin}`}>
                If HackKnight isn’t for you, then click continue to go to
                Regular attendee registration
            </p>
            <button
                onClick={() => handleRedirect()}
                className={styles.button}
            >
                <img
                    src="/knights/challenge/button-bg-gold.svg"
                    className={styles.buttonBg}
                />
                <span className={styles.buttonText}>Continue</span>
            </button>
        </div>
    );
};

export default Failed;
