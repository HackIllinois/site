import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";

const RegistrationType: React.FC = () => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <h2>Sign Up As:</h2>
                <ShineButton
                    text="HackOlympian"
                    link="/hack-olympians-challenge"
                />
                <p className={styles.link}>
                    <a href="/about-hack-olympians" target="_blank">
                        What is this?
                    </a>
                </p>
                <ShineButton text="General Attendee" link="/register" />
            </div>
        </div>
    );
};

export default RegistrationType;
