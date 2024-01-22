"use client";
import styles from "./Banner.module.scss";
import { useRouter } from "next/navigation";

const Banner = (props: any) => {
    const { setShow } = props;
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/register");
    };

    return (
        <div className={styles.banner}>
            <img src="/knights/challenge/banner.svg" className={styles.image} />
            <div className={styles.content}>
                <p className={styles.text}>Do you have what it takes to be a</p>
                <p className={styles.hackText}>
                    Hack<span className={styles.knightText}>Knight</span>?
                </p>
                <p className={styles.text}>
                    Complete the following coding challenge to find out!
                </p>
                <div className={styles.buttons}>
                    <button
                        onClick={() => setShow("challenge")}
                        className={styles.beginButton}
                    >
                        <img
                            src="/knights/challenge/button-bg-gold.svg"
                            className={styles.buttonBg}
                        />
                        <span className={styles.buttonText}>Begin</span>
                    </button>
                    <button
                        onClick={() => handleRedirect()}
                        className={styles.backButton}
                    >
                        <div>
                            <img src="/knights/challenge/left-arrow.svg" />
                            <p>Back to Sign Up</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
