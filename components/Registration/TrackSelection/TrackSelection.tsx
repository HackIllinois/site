import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";

type TrackSelectionProps = {
    handleGeneral: () => void;
};

const TrackSelection: React.FC<TrackSelectionProps> = ({ handleGeneral }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.container}>
                <h2>Sign Up As:</h2>
                <ShineButton text="HackOlympian" link="/register/challenge" />
                <p className={styles.link}>
                    <a href="/about-hack-olympians" target="_blank">
                        What is this?
                    </a>
                </p>
                <ShineButton text="General Attendee" onClick={handleGeneral} />
            </div>
        </div>
    );
};

export default TrackSelection;
