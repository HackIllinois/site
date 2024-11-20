import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./ProChallengeContent.module.scss";
import { getChallenge } from "@/util/api";
import { useState } from "react";
import { redirect } from "next/navigation";

const jwtUrl = `https://adonix.hackillinois.org/auth/login/github/?device=challenge`;

interface ProChallengeContentProps {
    handleSuccess: () => void;
    handleFailure: () => void;
}

const ProChallengeContent: React.FC<ProChallengeContentProps> = ({
    handleSuccess,
    handleFailure
}) => {
    const [userHasNotAttempted, setUserHasNotAttempted] = useState<
        boolean | undefined
    >();

    const handleUserFinishedChallenge = async () => {
        // Case 1: User successfully completed the challenge
        // Case 2: User failed the challenge
        // Case 3: User did not attempt

        // This only triggers when the user clicks the Finished Challenge button

        try {
            const passedChallenge = await getChallenge();
            setUserHasNotAttempted(true);
            if (passedChallenge === true) {
                handleSuccess();
            } else if (passedChallenge === false) {
                handleFailure();
            }
        } catch {
            setUserHasNotAttempted(false);
            // Just leave the user on the page; user did not attempt
        }
    };

    return (
        <div className={styles.container}>
            <h1>HackOlympians Challenge</h1>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>

            <ShineButton text="Fetch JWT" link={jwtUrl} target={"_blank"} />

            <div className={styles.finishedChallenge}>
                <ShineButton
                    text="Finished Challenge"
                    onClick={handleUserFinishedChallenge}
                />
                {userHasNotAttempted === false && (
                    <p className={styles.error}>
                        You have not attempted the challenge yet.
                    </p>
                )}
            </div>

            <div className={styles.links}>
                {/* <p onClick={handleSuccess} className={styles.link}>
                    <a>Test success case</a>
                </p>
                <p onClick={handleFailure} className={styles.link}>
                    <a>Test failure case</a>
                </p> */}

                <p className={styles.link}>
                    <a href="/register/sign-up-as">Back to signup</a>
                </p>
            </div>
        </div>
    );
};

export default ProChallengeContent;
