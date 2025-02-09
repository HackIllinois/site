import styles from "./styles.module.scss";

export function Rejected() {
    return (
        <div className={styles.container}>
            <h1>Rejected</h1>
            <p>
                Unfortunately, we were unable to offer you a spot at
                HackIllinois.
            </p>
            <p>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    <u>contact@hackillinois.org</u>
                </a>{" "}
                if you have any questions!
            </p>
        </div>
    );
}

export function Waitlisted() {
    return (
        <div className={styles.container}>
            <h1>Waitlisted</h1>
            <p>
                Your application has been waitlisted at this time. If you are
                still interested in participating in HackIllinois 2025, please
                visit our Help Desk at 4:30pm on Friday, Feb 28rd for
                reconsideration opportunities depending on current capacities.
            </p>
            <p>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    <u>contact@hackillinois.org</u>
                </a>{" "}
                if you have any questions!
            </p>
        </div>
    );
}
