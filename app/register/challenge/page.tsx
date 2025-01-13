import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

import FOREGROUND from "@/public/registration/pro/foreground.svg";
import EXAMPLE_CHALLENGE_GRAPHIC from "@/public/registration/example_challenge_graphic.svg";

import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";

const jwtUrl = `https://adonix.hackillinois.org/auth/login/github/?device=challenge`;
const challengeEndpoint =
    "https://adonix.hackillinois.org/registration/challenge/";

interface ShineButtonProps {
    text: string;
    link?: string;
    target?: string;
    onClick?: () => void;
}

const ShineButton: React.FC<ShineButtonProps> = ({
    text,
    link,
    target = "_self",
    onClick
}) => {
    if (link) {
        return (
            <a className={styles.styledButton} href={link} target={target}>
                {text}
            </a>
        );
    } else {
        return (
            <button className={styles.styledButton} onClick={onClick}>
                {text}
            </button>
        );
    }
};

const ProChallenge: React.FC = () => {
    return (
        <div className={styles.background}>
            <div className={styles.foreground}>
                <Image src={FOREGROUND} alt="foreground" fill />
            </div>
            <div className={styles.container}>
                <div className={styles.block}>
                    <h1>HackOlympians Challenge</h1>
                    <p>
                        As the <b>Olympians</b> are a cohort for advanced
                        hackers, here{"'"}s a challenge to test your skills.
                        Prepare for a task fit for the gods themselves!{" "}
                        <b>
                            To become a Olympian, you must complete this
                            challenge!
                        </b>
                    </p>
                    <p>
                        Note: This challenge might seem lengthy in the
                        description, but it{"'"}s not as tedious as it sounds!
                        Have fun, and may the gods be with you!
                    </p>
                    <p>
                        For more information, see the{" "}
                        <Link prefetch={false} href="/olympians">
                            olympians page
                        </Link>
                        .
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
                        {`{"solution": <calculated_max_divine_power>}`}
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

                    <div className={styles.block}>
                        <table>
                            <caption className={styles.text}>Inputs</caption>
                            <thead>
                                <tr>
                                    <th
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.text}`}
                                    >
                                        alliances
                                    </th>
                                    <th
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.text}`}
                                    >
                                        people
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`[`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“Zeus”, “Apollo”],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`["Apollo", "Athena"],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“Hades”, “Hermes”]`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“Hermes”, "Artemis"]`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“Hades”, "Artemis"]`}</p>
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`]`}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`{`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`  "Zeus": 36,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"Apollo": 32,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"Athena": 34,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"Hades": 28,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"Hermes": 29,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"Artemis": 30`}</p>
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`}`}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Image
                        src={EXAMPLE_CHALLENGE_GRAPHIC}
                        alt="Example"
                        width={400}
                        height={400}
                    />

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
                        <li>
                            The graph will contain cycles, so be careful not to
                            be trapped in a loop of eternity.
                        </li>
                        <li>
                            Your celestial JWT token may expire, in which case
                            you can generate a new one.
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
                            your own. This includes AI tools. Collaboration is
                            not allowed.
                        </li>
                        <li>
                            Completing the challenge qualifies you to apply as
                            an Olympian, but it does not guarantee admission.
                        </li>
                    </ul>
                </div>
                <div style={{ paddingBottom: "100px", width: "100%" }}></div>
            </div>
            <div className={styles.footerButtons}>
                <NavigationButton
                    text="Back"
                    pointRight={false}
                    href="/register"
                />

                <NavigationButton
                    text="Next"
                    pointRight={true}
                    href="/register/challenge/status"
                />
            </div>
        </div>
    );
};

export default ProChallenge;
