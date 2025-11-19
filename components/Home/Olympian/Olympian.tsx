import styles from "./Olympian.module.scss";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Image from "next/image";

const Olympian: React.FC = () => {
    return (
        <section className={styles.olympianMain}>
            <div className={styles.content}>
                <h1 className={styles.title}>HACKSTRONAUT</h1>
                <OlympianButton
                    text="Register Now"
                    link="/register/general"
                    bottomPadding
                />
            </div>
        </section>
    );
};

export default Olympian;
