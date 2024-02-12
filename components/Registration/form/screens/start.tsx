import Image from "next/image";
import styles from "./styles.module.scss";

import BACKGROUND from "@/public/registration/start/background.svg";
import LOGO from "@/public/home/hero/logo.svg";
import SHIELD from "@/public/registration/start/shield.svg";
import { FormProps } from "@/utils/types";

const Start = ({ formIndex, setFormIndex, isLoading }: any) => {
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
                    <div className={styles.heroButtonsWrapper}>
                        <div 
                            onClick={() => (isLoading ? "" : window.location.pathname = "/knights/challenge")}
                            className={`${styles.knightButton} ${isLoading ? styles.knightButtonDisabled : styles.knightButtonSelected}`}>
                            <p>{"HackKnight"}</p>
                        </div>
                    </div>
                    <p className={styles.link}>
                        <a href="/knights" target="_blank">What is this?</a>
                    </p>
                    <div className={styles.heroButtonsWrapper}>
                        <button disabled={isLoading} className={`${styles.genButton} ${isLoading ? styles.genButtonDisabled : styles.genButtonSelected}`} onClick={() => setFormIndex(1)}>
                        {"General Attendee"}
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
