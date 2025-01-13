import Image from "next/image";
import Link from "next/link";

import SNOWGLOBE from "@/public/registration/track_selection/snowglobe.svg";
import LOGO_TEXTONLY from "@/public/registration/track_selection/logo_textonly.svg";
import BACKGROUND from "@/public/registration/track_selection/background.svg";

import OlympianButton from "@/components/OlympianButton/OlympianButton";

import styles from "./styles.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HackIllinois | Register"
};

const Registration: React.FC = () => {
    return (
        <main
            style={{
                backgroundImage: `url(${BACKGROUND?.src})`
            }}
            className={styles.screen}
        >
            <div className={styles.topSpacer}></div>
            <Image
                alt="HackOlympus Logo"
                src={LOGO_TEXTONLY}
                className={styles.logo}
            />
            <div
                style={{
                    backgroundImage: `url(${SNOWGLOBE?.src})`
                }}
                className={styles.container}
            >
                <div className={styles.topSpacer}></div>
                <div className={styles.content}>
                    <h2>Sign Up As:</h2>
                    <OlympianButton
                        text="HackOlympian"
                        link="/register/challenge"
                        blue
                    />
                    <p className={styles.link}>
                        <Link
                            prefetch={false}
                            href="/olympians"
                            target="_blank"
                        >
                            What is this?
                        </Link>
                    </p>
                    <OlympianButton
                        text="General Attendee"
                        link="/register/personal-info"
                        gold
                    />
                </div>
                <div className={styles.spacer}></div>
            </div>
        </main>
    );
};

export default Registration;
