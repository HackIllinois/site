import styles from "./KnightChallenge.module.scss";

const KnightChallenge = (props: any) => {
    const { setShow } = props;
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
                            <p>
                                {`Note: This challenge is not as long and tedious as the write
                    up may look! It’ll be fun, we promise :)`}
                            </p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Coding Challenge</p>
                        <ol className={`${styles.compact}`}>
                            <li className={styles.listItem}>
                                Click this button to retrieve your JWT token.
                                You must use the same GitHub account you used to
                                register to HackIllinois
                            </li>
                            <li className={styles.listItem}>
                                For all further API calls, include the JWT token
                                from step 1 in your request header.
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop}`}
                                >{`{“Authorization”: token_here}`}</p>
                            </li>
                            <li className={styles.listItem}>
                                <div className={styles.compact}>
                                    <b>Problem Statement</b>
                                    <p>
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
                                    <p>
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
                                    <p>
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
                            <li className={styles.listItem}>
                                Receive inputs for the challenge by making a GET
                                request to this endpoint.
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop}`}
                                >{`GET https://artemis.hackillinois.org/challenge`}</p>
                            </li>
                            <li className={styles.listItem}>
                                Submit your solution by making a POST request to
                                this endpoint. Make sure you include your
                                calculated{" "}
                                <span className={styles.colouredText}>
                                    greatest_total_value
                                </span>{" "}
                                in the request body as shown below:
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop}`}
                                >{`POST https://artemis.hackillinois.org/challenge`}</p>
                                <p
                                    className={`${styles.colouredText} ${styles.marginTop}`}
                                >{`{“greatest_total_value”: token_here}`}</p>
                            </li>
                        </ol>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Example</p>
                        <table>
                            <caption>Inputs</caption>
                            <thead>
                                <tr>
                                    <th className={styles.colouredText}>edges</th>
                                    <th className={styles.colouredText}>nodes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>{`[`}</p>
                                        <p className={styles.marginLeft}>{`[“a”, “c”],`}</p>
                                        <p className={styles.marginLeft}>{`[“b”, “d”],`}</p>
                                        <p className={styles.marginLeft}>{`["e”, “c”],`}</p>
                                        <p>{`]`}</p>
                                    </td>
                                    <td>
                                        <p>{`{`}</p>
                                        <p className={styles.marginLeft}>{`  "a": 20,`}</p>
                                        <p className={styles.marginLeft}>{`"b": 3,`}</p>
                                        <p className={styles.marginLeft}>{`"c": 2,`}</p>
                                        <p className={styles.marginLeft}>{`"d": 30,`}</p>
                                        <p className={styles.marginLeft}>{`"e": -100,`}</p>
                                        <p>{`}`}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.exampleGraph}>
                        <img src="/knights/challenge/example-graph.png" />
                        <div className={styles.compact}>
                            <p>
                                Given that the provided graph looks like this,
                                we have two connected components:{" "}
                                <span className={styles.colouredText}>ace</span>{" "}
                                and
                                <span className={styles.colouredText}>bd</span>.
                            </p>
                            <p>
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
                            <p>
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
                            <li>The input edges and nodes will be valid.</li>
                            <li>
                                Node values can be positive or negative
                                integers.
                            </li>
                            <li>
                                The input graph will have <b>no cycles</b>.
                            </li>
                            <li>
                                The input graph will have multiple connected
                                components.
                            </li>
                            <li>
                                Your JWT token will never expire so there is no
                                time limit to complete the challenge.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Notes</p>
                        <ul>
                            <li>
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
                            <li>
                                Feel free to use any resources, but your work
                                must be your own.{" "}
                                <b>No collaboration with other applicants</b> is
                                permitted.
                            </li>
                            <li>
                                Note that completing the challenge does not
                                guarantee admission as a Knight, it only
                                qualifies you to apply as a Knight.
                            </li>
                        </ul>
                    </div>
                    <div className={styles.block}>
                        <p className={styles.header}>Tips</p>
                        <ul>
                            <li>Use response error codes to help debug.</li>
                            <li>
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
                    onClick={() => setShow("result")}
                    className={styles.button}
                >
                    <img src="/knights/challenge/next-button.svg" />
                </button>
            </div>
        </div>
    );
};

export default KnightChallenge;
