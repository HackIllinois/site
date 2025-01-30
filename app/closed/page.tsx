import Image from "next/image";

import SNOWGLOBE from "@/public/registration/track_selection/snowglobe.svg";
import LOGO_TEXTONLY from "@/public/registration/track_selection/logo_textonly.svg";
import BACKGROUND from "@/public/registration/track_selection/background.svg";

import OlympianButton from "@/components/OlympianButton/OlympianButton";

import styles from "@/app/closed/closed.module.scss";

const closed: React.FC = () => {
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
                    <h2>Sorry, registration is closed.</h2>
                    <h2>Check back next year!</h2>
                    <OlympianButton text="Back" link="/" blue />
                </div>
                <div className={styles.spacer}></div>
            </div>
        </main>
    );
};

export default closed;
