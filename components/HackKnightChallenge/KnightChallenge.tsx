"use client";
import React from "react";
import styles from "./KnightChallenge.module.scss";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const jwtUrl = `https://adonix.hackillinois.org/auth/login/github/?device=challenge`;
const checkStatusUrl = `http://artemis.hackillinois.org/status`;
import { getChallenge } from "@/utils/api";

const KnightChallenge = (props: any) => {
    const { setShow } = props;

<<<<<<< HEAD
    // const [data, setData] = React.useState<string>("");
    // async function fetchJwt() {
    //     await fetch(jwtUrl)
    //         .then(res => res.json())
    //         .then(data => setData(data));

    //     console.log(data);
    // }

    // async function handleRedirect() {
    //     await fetch(checkStatusUrl)
    //         .then(res => res.json())
    //         .then(data => console.log(data));

    //     // the above line should be,
    //     // if data.status === True {
    //     // setShow('passed');
    //     // }
    //     // else {
    //     // setShow('failed);
    //     // }
    // }
=======
    const checkChallenge = () => {
        getChallenge().then((passed) => {
            if (passed) {
                setShow("passed");
            } else {
                setShow("failed");
            }
        })
    };
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.block}>
<<<<<<< HEAD
                        <p
                            className={`${styles.header} ${styles.challengeText}`}
                        >
                            Knight Challenge
                        </p>
=======
                        <p className={`${styles.header} ${styles.challengeText}`}>Knight Challenge</p>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                        <div className={styles.compact}>
                            <p className={styles.text}>
                                Thank you for your interest in applying to
                                HackIllinois 2024 as a Knight! Since Knights is
                                a cohort for advanced hackers, here is a simple
                                challenge to put your skills to the test.
                            </p>
                            <p className={styles.text}>
                                {`Note: This challenge is not as long and tedious as the write
                    up may look! It'll be fun, we promise :)`}
                            </p>
                        </div>
                    </div>
                    <div className={styles.block}>
<<<<<<< HEAD
                        <p
                            className={`${styles.header} ${styles.challengeText}`}
                        >
                            Coding Challenge
                        </p>
=======
                        <p className={`${styles.header} ${styles.challengeText}`}>Coding Challenge</p>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                        <ol className={`${styles.listItem}`}>
                            <li className={styles.text}>
                                Your hometown in the mystical realm is being
                                attacked by Alan the Dragon. You have been
                                chosen to find a wizarding tribe to help your
                                town.
                            </li>
                            <li className={styles.text}>
                                Click this button to retrieve your magical JWT
                                token. You must use the same GitHub account you
                                used to register to HackIllinois!
                                <div className={styles.fetchJwtButtonDiv}>
                                    <button className={styles.fetchButton}>
                                        <a href={jwtUrl} target="_blank">
                                            <span>Fetch JWT</span>
                                        </a>
                                    </button>
                                </div>
                            </li>
                            <li className={styles.text}>
                                Include the magical JWT token in all future API
                                calls or the portal master will not understand
                                your requests!
                                <p
<<<<<<< HEAD
                                    className={`${styles.colouredText} ${sourceCodePro.className} ${styles.marginTop}`}
=======
                                    className={`${styles.colouredText} ${styles.marginTop}`}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                >{`{“Authorization”: token_here}`}</p>
                            </li>
                            <li className={styles.text}>
                                <div className={styles.problemListItems}>
                                    <p className={styles.text}>
                                        <b>Problem Setup</b>
                                    </p>
                                    <ol type="a">
                                        <li className={styles.text}>
                                            Wizarding tribes are made of both
                                            good and bad wizards. You are given
                                            a dictionary,{" "}
                                            <span
<<<<<<< HEAD
                                                className={`${styles.colouredText} ${sourceCodePro.className}`}
=======
                                                className={styles.colouredText}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            >
                                                wizards
                                            </span>
                                            , indicating the goodness value of
                                            each wizard.
                                        </li>
                                        <li className={styles.text}>
                                            Additionally, you are given a list,{" "}
                                            <span
<<<<<<< HEAD
                                                className={`${styles.colouredText} ${sourceCodePro.className}`}
=======
                                                className={styles.colouredText}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            >
                                                alliances
                                            </span>
                                            , representing connections between
                                            pairs of wizards, making them part
                                            of the same wizarding tribe.{" "}
                                        </li>
                                        <li className={styles.text}>
                                            The nodes (
                                            <span
<<<<<<< HEAD
                                                className={`${styles.colouredText} ${sourceCodePro.className}`}
=======
                                                className={styles.colouredText}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            >
                                                wizards
                                            </span>
                                            ) and edges (
                                            <span
<<<<<<< HEAD
                                                className={`${styles.colouredText} ${sourceCodePro.className}`}
=======
                                                className={styles.colouredText}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            >
                                                alliances
                                            </span>
                                            ) together make an undirected graph
                                            with multiple connected components,
                                            each representing a wizarding tribe.
                                        </li>
                                        <li>
                                            Receive these inputs by making a GET
                                            request to this endpoint:
                                            <p
<<<<<<< HEAD
                                                className={`${styles.colouredText} ${sourceCodePro.className} ${styles.marginTop} ${styles.text}`}
=======
                                                className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            >{`GET https://artemis.hackillinois.org/challenge`}</p>
                                        </li>
                                    </ol>
                                </div>
                            </li>
                            <li className={styles.text}>
                                <div className={styles.problemListItems}>
                                    <p className={styles.text}>
                                        <b> Problem Statement </b>
                                    </p>
                                    <p className={styles.text}>
                                        The town King has tasked you with
                                        finding the greatest goodness value
                                        among all wizarding tribes. In other
                                        words, find the goodness values of each
                                        tribe and return the greatest of those
                                        goodness values. If suceeded, the King
                                        will handle the rest!
                                    </p>
                                </div>
                            </li>
                            <li className={styles.text}>
                                <div className={styles.problemListItems}>
                                    <p className={styles.text}>
                                        <b>Submitting Your Solution </b>
                                    </p>
                                    <p className={styles.text}>
                                        Make a POST request to this endpoint and
                                        include your{" "}
<<<<<<< HEAD
                                        <span
                                            className={`${styles.colouredText} ${sourceCodePro.className}`}
                                        >
=======
                                        <span className={styles.colouredText}>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                            max_goodness
                                        </span>{" "}
                                        in the request body as shown below.
                                    </p>
                                    <p
<<<<<<< HEAD
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.marginTop} ${styles.text}`}
                                    >{`POST https://artemis.hackillinois.org/challenge`}</p>
                                    <p
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.marginTop} ${styles.text}`}
=======
                                        className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
                                    >{`POST https://artemis.hackillinois.org/challenge`}</p>
                                    <p
                                        className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    >{`{"max_goodness": integer_value_here}`}</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Example</p>
                        <table>
                            <caption className={styles.text}>Inputs</caption>
                            <thead>
                                <tr>
                                    <th
<<<<<<< HEAD
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.text}`}
=======
                                        className={`${styles.colouredText} ${styles.text}`}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    >
                                        alliances
                                    </th>
                                    <th
<<<<<<< HEAD
                                        className={`${styles.colouredText} ${sourceCodePro.className} ${styles.text}`}
=======
                                        className={`${styles.colouredText} ${styles.text}`}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    >
                                        wizards
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
<<<<<<< HEAD
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`[`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“a”, “c”],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`[“b”, “d”],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`["e”, “c”],`}</p>
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
                                        >{`  "a": 20,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"b": 3,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"c": 2,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"d": 30,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${sourceCodePro.className} ${styles.text}`}
                                        >{`"e": -100,`}</p>
                                        <p
                                            className={`${styles.text} ${sourceCodePro.className}`}
                                        >{`}`}</p>
=======
                                        <p className={styles.text}>{`[`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`[“a”, “c”],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`[“b”, “d”],`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`["e”, “c”],`}</p>
                                        <p className={styles.text}>{`]`}</p>
                                    </td>
                                    <td>
                                        <p className={styles.text}>{`{`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`  "a": 20,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`"b": 3,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`"c": 2,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`"d": 30,`}</p>
                                        <p
                                            className={`${styles.marginLeft} ${styles.text}`}
                                        >{`"e": -100,`}</p>
                                        <p className={styles.text}>{`}`}</p>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.exampleGraph}>
                        <img src="/knights/challenge/example-graph.png" />
                        <div className={styles.compact}>
                            <p className={styles.text}>
                                Given that the provided graph looks like this,
                                we have two wizarding tribes:{" "}
<<<<<<< HEAD
                                <span
                                    className={`${styles.colouredText} ${sourceCodePro.className}`}
                                >
                                    ace
                                </span>{" "}
                                and
                                <span
                                    className={`${styles.colouredText} ${sourceCodePro.className}`}
                                >
                                    {" "}
                                    bd
                                </span>
=======
                                <span className={styles.colouredText}>ace</span>{" "}
                                and
                                <span className={styles.colouredText}> bd</span>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                .
                            </p>
                            <p className={styles.text}>
                                The{" "}
<<<<<<< HEAD
                                <span
                                    className={`${styles.colouredText} ${sourceCodePro.className}`}
                                >
                                    goodness
                                </span>{" "}
                                of ace is -78 and the{" "}
                                <span
                                    className={`${styles.colouredText} ${sourceCodePro.className}`}
                                >
=======
                                <span className={styles.colouredText}>
                                    goodness
                                </span>{" "}
                                of ace is -78 and the{" "}
                                <span className={styles.colouredText}>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    goodness
                                </span>{" "}
                                of bd is 33.
                            </p>
                            <p className={styles.text}>
                                Therefore, the{" "}
<<<<<<< HEAD
                                <span
                                    className={`${styles.colouredText} ${sourceCodePro.className}`}
                                >
=======
                                <span className={styles.colouredText}>
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                                    max_goodness
                                </span>{" "}
                                is 33.
                            </p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Constraints</p>
                        <ul>
                            <li className={styles.text}>
                                The input edges and nodes will be valid.
                            </li>
                            <li className={styles.text}>
                                Wizard goodness, i.e. node values, can be
                                positive or negative integers since wizards can
                                be both good and bad.
                            </li>
                            <li className={styles.text}>
                                The input graph will have <b>no cycles</b>.
                            </li>
                            <li className={styles.text}>
                                Your magical JWT token will never expire so
                                there is no time limit to complete the
                                challenge.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Notes</p>
                        <ul>
                            <li className={styles.text}>
                                We will take into consideration the number of
                                times you submit your solution to ensure no
                                brute force methods are used to solve this
                                challenge.{" "}
                                <b>
                                    There are virtually unlimited attempts, but
                                    use your submissions wisely
                                </b>
                                .
                            </li>
                            <li className={styles.text}>
                                Feel free to use any resources, but your work
                                must be your own.{" "}
                                <b>No collaboration with other applicants</b> is
                                permitted.
                            </li>
                            <li className={styles.text}>
                                Note that completing the challenge does not
                                guarantee admission as a Knight, it only
                                qualifies you to apply as a Knight.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Tips</p>
                        <ul>
                            <li className={styles.text}>
                                Use response error codes to help debug.
                            </li>
                            <li className={styles.text}>
                                Feel free to email us if you have issues with
                                the coding challenge! Please direct your email
                                to{" "}
                                <a href="mailto:challenge@hackillinois.org">
                                    <u>challenge@hackillinois.org</u>
                                </a>
                                .
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsDiv}>
                <button
                    onClick={() => setShow("banner")}
                    className={styles.button}
                >
                    <img src="/knights/challenge/back-button.svg" />
                </button>
                <button
<<<<<<< HEAD
                    onClick={() => setShow('passed')}
=======
                    onClick={() => checkChallenge()}
>>>>>>> 7c67f28198eca53b5cdbd51ddf1814b0c95a28df
                    className={styles.button}
                >
                    <img src="/knights/challenge/next-button.svg" />
                </button>
            </div>
        </div>
    );
};

export default KnightChallenge;
