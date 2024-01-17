import Image from "next/image";
import styles from "./styles.module.scss";

import BACKGROUND from "@/public/registration/start/background.svg";
import LOGO from "@/public/home/hero/logo.svg";
import SHIELD from "@/public/registration/start/shield.svg";

const Start = () => {
    return (
        <div className={styles.start}>
            <div className={styles.heroImageWrapper}>
                <Image alt="Hack n Slash Logo" src={LOGO} fill={true} />
            </div>
            <div className={styles.shieldContainer}>
                <Image
                    src={SHIELD}
                    alt="Shield"
                    fill={true}
                    className={styles.shield}
                />
                <div className={styles.contents}>
                    <h2>Sign Up As:</h2>
                    <div className={styles.heroButtonWrapper}>
                        <button onClick={() => window.location.pathname = "/challenge"}
                            className={styles.knightButton}>
                            HackKnight
                        </button>
                    </div>
                    <p className={styles.link}>
                        <a href="/knights">What is this?</a>
                    </p>
                    <div className={styles.heroButtonWrapper}>
                        <button className={styles.heroButton}>
                            General Attendee
                        </button>
                    </div>
                </div>
            </div>
            <Image
                src={BACKGROUND}
                alt="background"
                className={styles.startBackground}
            />
        </div>
    );
};

export default Start;
