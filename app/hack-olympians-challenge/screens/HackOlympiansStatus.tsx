import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./HackOlympiansStatus.module.scss";

interface HackOlympiansStatusProps {
    success: boolean;
}

const HackOlympiansStatus: React.FC<HackOlympiansStatusProps> = ({
    success
}) => {
    if (success) {
        return (
            <div className={styles.container}>
                <div className={styles.contentGroup}>
                    <p>You are invited to apply as as a</p>
                    <h1>HackOlympian</h1>
                    <p>
                        To finish registering, click continue to complete the
                        rest of the application.
                    </p>
                </div>
                <div className={styles.contentGroup}>
                    <ShineButton
                        text={"Continue"}
                        onClick={() => {
                            window.location.href = "/register";
                        }}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.contentGroup}>
                    <h2>
                        Unfortunately, your solution did not pass the challenge.
                    </h2>
                    <br />

                    <ShineButton
                        text={"Try Again"}
                        onClick={() => {
                            window.location.href = "/hack-olympians-challenge";
                        }}
                    />
                    <h3 className={styles.unlimitedAttempts}>
                        You have unlimited attempts!
                    </h3>
                    <p className={styles.footnote}>
                        Note: Number of attempts will be taken into account when
                        deciding acceptances
                    </p>
                </div>
                <div className={styles.contentGroup}>
                    <p>
                        {
                            "If HackOlympians isn't for you, then click continue to go to Regular attendee registration"
                        }
                    </p>
                    <ShineButton
                        text={"Continue"}
                        onClick={() => {
                            window.location.href = "/register";
                        }}
                    />
                </div>
            </div>
        );
    }
};

export default HackOlympiansStatus;
