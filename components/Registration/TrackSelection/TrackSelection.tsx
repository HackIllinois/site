import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";

import SNOWGLOBE from "@/public/registration/track_selection/snowglobe.svg";
import LOGO_TEXTONLY from "@/public/registration/track_selection/logo_textonly.svg";
import BACKGROUND from "@/public/registration/track_selection/background.svg";

import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Image from "next/image";

const TrackSelection: React.FC = () => {
    return (
        <div
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
                        <a href="/olympians" target="_blank">
                            What is this?
                        </a>
                    </p>
                    <OlympianButton
                        text="General Attendee"
                        link="/register/general"
                        gold
                    />
                </div>
                <div className={styles.spacer}></div>
            </div>
        </div>
    );
};

export default TrackSelection;
