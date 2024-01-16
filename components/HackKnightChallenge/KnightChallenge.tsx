"use client";
import React from "react";
import styles from "./KnightChallenge.module.scss";

const jwtUrl = `https://adonix.hackillinois.org/auth/login/github/?device=challenge`;

const KnightChallenge = (props: any) => {
    const { setShow } = props;

    // const [data, setData] = React.useState<string>("");
    // async function fetchJwt() {
    //     await fetch(jwtUrl)
    //         .then(res => res.json())
    //         .then(data => setData(data));

    //     console.log(data);
    // }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.block}>
                        <p className={styles.header}>Knight Challenge</p>
                        <div className={styles.compact}>
                            <p className={styles.text}>
                                Thank you for your interest in applying to
                                HackIllinois 2024 as a Knight! Since Knights is
                                a cohort for advanced hackers, here is a simple
                                challenge to put your skills to the test.
                            </p>
                            <p className={styles.text}>
                                {`Note: This challenge is not as long and tedious as the write
                    up may look! It’ll be fun, we promise :)`}
                            </p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Coding Challenge</p>
                        <ol className={`${styles.compact}`}>
                            <li className={styles.text}>
                                Click this button to retrieve your JWT token.
                                You must use the same GitHub account you used to
                                register to HackIllinois
                                <div className={styles.fetchJwtButtonDiv}>
                                    <button
                                        className={styles.fetchButton}
                                    >
                                        <a href={jwtUrl} target="_blank">
                                            <span>Fetch JWT</span>
                                        </a>
                                    </button>
                                </div>
                            </li>
                            <li className={styles.text}>
                                For all further API calls, include the JWT token
                                from step 1 in your request header.
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop}`}
                                >{`{“Authorization”: token_here}`}</p>
                            </li>
                            <li className={styles.text}>
                                <div className={styles.compact}>
                                    <b className={styles.text}>
                                        Problem Statement
                                    </b>
                                    <p className={styles.text}>
                                        You are given a list,{" "}
                                        <span className={styles.colouredText}>
                                            edges
                                        </span>
                                        , representing connections between a
                                        pair of nodes that make an undirected
                                        graph. You are also given a dictionary,{" "}
                                        <span className={styles.colouredText}>
                                            nodes
                                        </span>
                                        , containing information about the
                                        values assigned to each node in the
                                        graph.
                                    </p>
                                    <p className={styles.text}>
                                        Your task is to find the{" "}
                                        <span className={styles.colouredText}>
                                            total_value
                                        </span>
                                        , i.e. sum up all the{" "}
                                        <span className={styles.colouredText}>
                                            values
                                        </span>{" "}
                                        in each connected component in the
                                        provided graph.
                                    </p>
                                    <p className={styles.text}>
                                        The solution to the problems is the
                                        greatest{" "}
                                        <span className={styles.colouredText}>
                                            total_value
                                        </span>{" "}
                                        of all the sums of each connected
                                        component.
                                    </p>
                                </div>
                            </li>
                            <li className={styles.text}>
                                Receive inputs for the challenge by making a GET
                                request to this endpoint.
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
                                >{`GET https://artemis.hackillinois.org/challenge`}</p>
                            </li>
                            <li className={styles.text}>
                                Submit your solution by making a POST request to
                                this endpoint. Make sure you include your
                                calculated{" "}
                                <span className={styles.colouredText}>
                                    greatest_total_value
                                </span>{" "}
                                in the request body as shown below:
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
                                >{`POST https://artemis.hackillinois.org/challenge`}</p>
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop} ${styles.text}`}
                                >{`{“greatest_total_value”: token_here}`}</p>
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
                                        className={`${styles.colouredText} ${styles.text}`}
                                    >
                                        edges
                                    </th>
                                    <th
                                        className={`${styles.colouredText} ${styles.text}`}
                                    >
                                        nodes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
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
                                we have two connected components:{" "}
                                <span className={styles.colouredText}>ace</span>{" "}
                                and
                                <span className={styles.colouredText}>bd</span>.
                            </p>
                            <p className={styles.text}>
                                The{" "}
                                <span className={styles.colouredText}>
                                    total_value
                                </span>{" "}
                                of ACE is -78 and the{" "}
                                <span className={styles.colouredText}>
                                    total_value
                                </span>{" "}
                                of BD is 33.
                            </p>
                            <p className={styles.text}>
                                Therefore, the{" "}
                                <span className={styles.colouredText}>
                                    greatest_total_value
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
                                Node values can be positive or negative
                                integers.
                            </li>
                            <li className={styles.text}>
                                The input graph will have <b>no cycles</b>.
                            </li>
                            <li className={styles.text}>
                                The input graph will have multiple connected
                                components.
                            </li>
                            <li className={styles.text}>
                                Your JWT token will never expire so there is no
                                time limit to complete the challenge.
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
                                <a href="mailto:lasya.neti@hackillinois.org">
                                    <u>lasya.neti@hackillinois.org</u>
                                </a>{" "}
                                and{" "}
                                <a href="mailto:aydan.pirani@hackillinois.org">
                                    <u>aydan.pirani@hackillinois.org</u>
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
                    onClick={() => setShow("failed")}
                    className={styles.button}
                >
                    <img src="/knights/challenge/next-button.svg" />
                </button>
            </div>
        </div>
    );
};

export default KnightChallenge;
