"use client";

import { GradientButton } from "@/components/GradientButton/GradientButton";
import Image from "next/image";
import styles from "./HackVoyagers.module.scss";

const HackVoyagers = () => {
    return (
        <section className={styles.hackVoyagersSection}>
            {/* Background Elements */}
            <div className={styles.hackVoyagersBackgrounds}>
                <Image
                    src="/design-reference/clouds.svg"
                    alt="Clouds Background"
                    fill
                    className={styles.cloudsBackground}
                    priority
                />
                <Image
                    src="/design-reference/tiny stars.svg"
                    alt="Tiny Stars"
                    fill
                    className={styles.tinyStarsBackground}
                    priority
                />
            </div>

            <div className={styles.robotContainer}>
                <Image
                    src="/design-reference/hackvoyagersrobotg.svg"
                    alt="HackVoyagers Robot"
                    width={500}
                    height={400}
                    className={styles.robotImage}
                />
            </div>
            <div className={styles.textContainer}>
                <h3 className={styles.introducingText}>Introducing</h3>
                <Image
                    src="/design-reference/HACKVOYAGERS.svg"
                    alt="HackVoyagers"
                    width={600}
                    height={150}
                    className={styles.hackVoyagersText}
                />
                <div className={styles.hackVoyagersButtonContainer}>
                    <GradientButton
                        text="LEARN MORE"
                        link="/challenge/landing-page"
                    />
                </div>
            </div>
        </section>
    );
};

export default HackVoyagers;
