"use client";
import styles from "./styles.module.scss";

import Image from "next/image";

const Hero: React.FC = () => {
    return (
        <section className={styles.heroMain}>
            <div className={styles.heroContainer}>
                <div className={styles.logoAnimation}>
                    <Image
                        alt="HackIllinois Hype Animation"
                        src="/home/hero/hype_animation.gif"
                        fill={true}
                    />
                </div>

                <div className={styles.topHeader}>

                    <h1>HackIllinois 2025</h1>

                </div>
            </div>
            <div className={styles.heroFooter}>
                <span className={styles.subtitle}>coming soon</span>
            </div>
        </section>
    );
};

export default Hero;
