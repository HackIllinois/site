import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./ProChallengeStatus.module.scss";
import ACCEPTED_BACKGROUND from "@/public/registration/backgrounds/prochallenge_accepted_background.svg";
import ACCEPTED_CIRCLE from "@/public/registration/backgrounds/prochallenge_accepted_circle.svg";
import REJECTED_BACKGROUND from "@/public/registration/backgrounds/rejected_background.svg";
import BLUE_CIRCLE_BACKGROUND from "@/public/registration/backgrounds/blue_circle_background.svg";
import YELLOW_CIRCLE_BACKGROUND from "@/public/registration/backgrounds/yellow_circle_background.svg";
import SolidButton from "../SolidButton/SolidButton";
import clsx from "clsx";

interface ProChallengeStatusProps {
    success: boolean;
}

const ProChallengeStatus: React.FC<ProChallengeStatusProps> = ({ success }) => {
    if (success) {
        return (
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(${ACCEPTED_BACKGROUND.src})`
                }}
            >
                <div className={styles.spacer}></div>
                <div
                    className={styles.successContainer}
                    style={{
                        backgroundImage: `url(${ACCEPTED_CIRCLE.src})`
                    }}
                >
                    <div className={styles.contentGroup}>
                        <h3>Congratulations, you passed!</h3>
                        <p>You are invited to apply as a</p>
                        <h1 className={styles.highlightText}>HackOlympian</h1>
                        <p>
                            To finish registering, click
                            <br />
                            continue to complete the
                            <br />
                            rest of the application.
                        </p>
                    </div>
                    <div className={styles.contentGroup}>
                        <SolidButton
                            text={"CONTINUE"}
                            backgroundColor={"#A3B6CE"}
                            onClick={() => {
                                window.location.href = "/register/general";
                            }}
                        />

                        <p className={styles.smallNote}>
                            Note: Applying as a HackOlympian does <br />
                            not guarantee acceptance due to limited <br />
                            spots
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={styles.background}
                style={{
                    backgroundImage: `url(${REJECTED_BACKGROUND.src})`
                }}
            >
                <div className={clsx(styles.spacer, styles.failure)}></div>
                <div className={styles.container}>
                    <h2>
                        Unfortunately, your solution
                        <br />
                        did not pass the challenge
                    </h2>
                    <p>
                        Please select one of the
                        <br />
                        following options:
                    </p>
                    <div className={styles.options}>
                        <div
                            className={styles.optionContainer}
                            style={{
                                backgroundImage: `url(${BLUE_CIRCLE_BACKGROUND.src})`
                            }}
                        >
                            <p className={styles.optionHeader}>
                                Retry the challenge
                            </p>
                            <div className={styles.description}>
                                <p className={styles.optionText}>
                                    You have unlimited attempts!
                                </p>
                                <p className={styles.smallNote}>
                                    Note: Number of attempts will be taken
                                    <br /> into account when deciding
                                    acceptances
                                </p>
                            </div>
                            <SolidButton
                                text={"TRY AGAIN"}
                                backgroundColor={"#55A2A7"}
                                onClick={() => {
                                    window.location.href =
                                        "/register/challenge";
                                }}
                                horizontalPaddingDisabled
                            />
                        </div>
                        <div
                            className={styles.optionContainer}
                            style={{
                                backgroundImage: `url(${YELLOW_CIRCLE_BACKGROUND.src})`
                            }}
                        >
                            <p className={styles.optionHeader}>
                                Register as a<br /> Regular Attendee
                            </p>
                            <p className={styles.optionText}>
                                If HackOlympians isn{"'"}t for you,
                                <br />
                                then click continue to go to
                                <br />
                                Regular attendee registration
                            </p>
                            <SolidButton
                                text={"CONTINUE"}
                                backgroundColor={"#B79138"}
                                onClick={() => {
                                    window.location.href = "/register/general";
                                }}
                                horizontalPaddingDisabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProChallengeStatus;
