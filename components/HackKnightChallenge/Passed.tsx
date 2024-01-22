"use client";
import { useRouter } from "next/navigation";
import styles from "./Passed.module.scss";
const Passed = (props: any) => {
    const { setShow } = props;
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/register");
    };
    return (
        <div className={styles.container}>
            <img
                src="/knights/challenge/congratulations-banner.svg"
                className={styles.image}
            />
            <div className={styles.content}>
                <p className={styles.text}>You are invited to apply as a</p>
                <p className={styles.hackText}>
                    Hack<span className={styles.knightText}>Knight</span>
                </p>
                <p className={styles.text}>
                    To finish registering, click continue to complete the rest
                    of the application
                </p>
                <div className={styles.buttonDiv}>
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
                    <p className={styles.subText}>
                        Note: Applying as a HackKnight does not guarantee
                        acceptance due to limited spots
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Passed;
