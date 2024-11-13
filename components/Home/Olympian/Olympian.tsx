"use client";
import styles from "./Olympian.module.scss";

import Image from "next/image";

// import Village from "@/public/home/hero/village.svg";

const Olympian: React.FC = () => {
    return (
        <section className={styles.olympianMain}>
            <div className={styles.olympianContainer}>
                <div className={styles.olympianImageWrapper}>
                    <Image
                        alt="HackOlympus Logo"
                        src="/home/olympian/logo.svg"
                        fill={true}
                    />
                </div>
                <div className={styles.olympianButtonWrapper}>
                    <button
                        className={styles.olympianButton}
                        onClick={() =>
                            window.open(
                                "https://solana.com/",
                                "_blank",
                                "noreferrer noopener"
                            )
                        }
                    >
                        {/* {button_text} */}
                        Register Now
                    </button>
                </div>
                <div className={styles.backCloudsContainer}>
                    <Image
                        alt="clouds"
                        src="/home/olympian/back-clouds.svg"
                        fill={true}
                    />
                </div>
                <div className={styles.frontCloudsContainer}>
                    <Image
                        alt="clouds"
                        src="/home/olympian/front-clouds.svg"
                        fill={true}
                    />
                </div>
                <div className={styles.chestContainer}>
                    <Image
                        alt="chest"
                        src="/home/olympian/chest.svg"
                        fill={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default Olympian;
