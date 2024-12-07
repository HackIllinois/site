import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./ProChallengeContent.module.scss";
import { getChallenge } from "@/util/api";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

import PRO_TRACK_CHALLENGE_BACKGROUND from "@/public/registration/backgrounds/pro_track_challenge.svg";
import NavigationButton from "../Form/NavigationButton/NavigationButton";

const jwtUrl = `https://adonix.hackillinois.org/auth/login/github/?device=challenge`;
const challengeEndpoint = "https://adonix.hackillinois.org/challenge";

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
        <div
            style={{
                backgroundImage: `url(${PRO_TRACK_CHALLENGE_BACKGROUND.src})`
            }}
            className={styles.background}
        >
            <div className={styles.container}>
                <div className={styles.block}>
                    <h1>HackOlympians Challenge</h1>
                    <p>
                        Thank you for your interest in applying to HackIllinois
                        2025 as an Olympian! As the <b>Olympians</b> are a
                        cohort for advanced hackers, here{"'"}s a challenge to
                        test your skills. Prepare for a task fit for the gods
                        themselves!
                    </p>
                    <p>
                        Note: This challenge might seem lengthy in the
                        description, but it{"'"}s not as tedious as it sounds!
                        Have fun, and may the gods be with you!
                    </p>
                </div>
                <div className={styles.block}>
                    <h1>Coding Challenge</h1>
                    <p>
                        Your city, nestled at the base of Mount Olympus, is
                        under siege by Typhon, the monstrous titan of storms and
                        chaos. As the chosen hero, you have been tasked with
                        seeking out the gods and heroes who might help defend
                        your city.
                    </p>
                    <p>
                        To begin, you must retrieve your{" "}
                        <b>celestial JWT token</b> to prove your worth. Use the
                        same GitHub account you used to register for
                        HackIllinois to claim your token!
                    </p>
                    <ShineButton
                        text="Fetch JWT"
                        link={jwtUrl}
                        target={"_blank"}
                    />
                    <p>
                        For all future API calls, you will need to include the
                        magical JWT token (exactly as you received it) in the
                        request header. Don{"'"}t forget to specify the required
                        content-type header, or your plea for help will not be
                        understood by the gods.
                    </p>
                    <p
                        className={`${styles.codeText} ${sourceCodePro.className} ${styles.marginTop}`}
                    >
                        {`{"Authorization": <enter_token>}`}
                        <br />
                        <br />
                        {`{"Content-Type": "application/json"}`}
                    </p>
                </div>
                <div className={styles.block}>
                    <h3>Problem Setup</h3>
                    <p>
                        In the ancient world, there are different pantheons of
                        gods and heroes, each with their own distinct power.
                        Some are benevolent, while others are malicious. You are
                        provided with a dictionary of gods and heroes, with
                        their divine power value.
                    </p>
                    <p>
                        You are also given a list of alliances, representing
                        pairs of gods and heroes who are allies. These alliances
                        connect the gods and heroes, making them part of the
                        same pantheon. The nodes (gods and heroes) and edges
                        (alliances) form an undirected graph, where each
                        connected component represents a different pantheon.
                    </p>
                    <p>
                        You will receive these inputs by making a GET request to
                        this endpoint (make sure to include the required
                        headers).
                    </p>
                    <p
                        className={`${styles.codeText} ${sourceCodePro.className} ${styles.marginTop}`}
                    >
                        GET {challengeEndpoint}
                    </p>
                </div>
                <div className={styles.block}>
                    <h3>Problem Statement</h3>
                    <p>
                        The King of your city has tasked you with finding the
                        greatest divine power among all pantheons. In other
                        words, determine the sum of divine power for each
                        pantheon and return the greatest sum. If you succeed,
                        the King will use this information to coordinate the
                        defense of the city!
                    </p>
                    <h3>Submitting Your Solution</h3>
                    <p>
                        Make a POST request to this endpoint and include your
                        max_divine_power in the request body as shown below:
                    </p>

                    <p
                        className={`${styles.codeText} ${sourceCodePro.className} ${styles.marginTop}`}
                    >
                        POST {challengeEndpoint}
                        <br />
                        <br />
                        {`{"max_divine_power": <calculated_max_divine_power>}`}
                    </p>
                </div>
                <div className={styles.block}>
                    <h3>Example</h3>
                    <p>Given this scenario, we have two pantheons:</p>
                    <ul>
                        <li>
                            Pantheon 1: Zeus, Apollo, Athena, with a total
                            divine power of 102.
                        </li>
                        <li>
                            Pantheon 2: Hades, Hermes, and Artemis, with a total
                            divine power of 87.
                        </li>
                    </ul>
                    <p>Therefore, the max_divine_power is 102.</p>
                </div>
                <div className={styles.block}>
                    <h3>Constraints</h3>
                    <ul>
                        <li>
                            The input edges (alliances) and nodes (gods/heroes)
                            will be valid.
                        </li>
                        <li>
                            Divine power values can be positive or negative
                            integers, as gods and heroes can be either
                            benevolent or malevolent.
                        </li>
                        <li>The graph will not contain any cycles.</li>
                        <li>
                            Your celestial JWT token will never expire, so you
                            can take as long as needed to complete the
                            challenge.
                        </li>
                    </ul>
                </div>
                <div className={styles.block}>
                    <h3>Notes</h3>
                    <ul>
                        <li>
                            We will monitor the number of submissions to
                            discourage brute force methods. You have unlimited
                            attempts, but be strategic in your submissions.
                        </li>
                        <li>
                            Use any resources you need, but your work must be
                            your own. Collaboration is not allowed.
                        </li>
                        <li>
                            Completing the challenge qualifies you to apply as
                            an Olympian, but it does not guarantee admission.
                        </li>
                    </ul>
                </div>

                <div className={styles.links}>
                    <p onClick={handleSuccess} className={styles.link}>
                        <a>Test success case</a>
                    </p>
                    <p onClick={handleFailure} className={styles.link}>
                        <a>Test failure case</a>
                    </p>
                </div>
            </div>
            <div className={styles.footerButtons}>
                <NavigationButton
                    text="Back"
                    pointRight={false}
                    onClick={() => redirect("/register")}
                />

                {userHasNotAttempted === false && (
                    <p className={styles.error}>
                        You have not attempted the challenge yet.
                    </p>
                )}

                <NavigationButton
                    text="NEXT"
                    pointRight={true}
                    onClick={handleUserFinishedChallenge}
                />
            </div>
        </div>
    );
};

export default ProChallengeContent;
