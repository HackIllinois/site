import styles from "./Olympian.module.scss";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";

const Olympian: React.FC = () => {
    return (
        <section className={styles.olympianMain}>
            <div className={styles.main}>
                <Image
                    alt="HackOlympus Logo"
                    src={LOGO}
                    className={styles.logo}
                />
                <OlympianButton
                    text="Register Now"
                    link="/register"
                    bottomPadding
                />
            </div>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
        </section>
    );
};

export default Olympian;
