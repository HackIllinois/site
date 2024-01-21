'use client';
import styles from "./Failed.module.scss";
const Failed = (props: any) => {
    const { setShow } = props;
    return (
        <div className={styles.container}>
            <p className={styles.header}>
                Unfortunately, your solution did not pass the challenge
            </p>
            <button
                onClick={() => setShow("challenge")}
<<<<<<< HEAD
                className={`${styles.button} ${styles.tryAgainButton}`}
=======
                className={styles.button}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
            >
                <img src="/knights/challenge/try-again-button.svg" />
            </button>
            <div className={styles.content}>
                <p className={styles.text}>You have unlimited attempts!</p>
                <p className={styles.subText}>
                    Note: Number of attempts will be taken into account when
                    deciding acceptances
                </p>
            </div>

<<<<<<< HEAD
            <p className={`${styles.text} ${styles.margin}`}>
=======
            <p className={`${styles.text} ${styles.marginTop}`}>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                If HackKnight isn’t for you, then click continue to go to
                Regular attendee registration
            </p>
            <button onClick={() => window.location.pathname = "/register"} className={styles.button}>
                <img src="/knights/challenge/continue-button.svg" />
            </button>
        </div>
    );
};

export default Failed;
