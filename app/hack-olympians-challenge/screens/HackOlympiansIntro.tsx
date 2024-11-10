import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./HackOlympiansIntro.module.scss";

interface HackOlympiansIntroProps {
    handleBegin: () => void;
}

const HackOlympiansIntro: React.FC<HackOlympiansIntroProps> = ({
    handleBegin
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.contentGroup}>
                <p>Are you worthy of the title</p>
                <h1>HackOlympian?</h1>
                <p>Complete the challenge to find out!</p>
            </div>
            <div className={styles.contentGroup}>
                <ShineButton text="Begin" onClick={handleBegin} />
                <p className={styles.link}>
                    <a href="/registration-type">Back to signup</a>
                </p>
            </div>
        </div>
    );
};

export default HackOlympiansIntro;
