import styles from "./styles.module.scss";

export function Rejected() {
    return (
        <div className={styles.container}>
            <p className={styles.unfortunatelyText}>
                <b>
                    Unfortunately, we were unable to offer you a spot at
                    HackIllinois.
                </b>
            </p>
            <p className={styles.unfortunatelyText}>
                <b>
                    Email us at{" "}
                    <a href="mailto:contact@hackillinois.org">
                        <u>contact@hackillinois.org</u>
                    </a>{" "}
                    if you have any questions!
                </b>
            </p>
        </div>
    );
}

export function Waitlisted() {
    return (
        <div className={styles.container}>
            <p className={styles.unfortunatelyText}>
                <b>
                    Your application has been waitlisted at this time. If you
                    are still interested in participating in HackIllinois 2025,
                    please visit our Help Desk at 4:30pm on Friday, Feb 28rd for
                    reconsideration opportunities depending on current
                    capacities.
                </b>
            </p>
            <p className={styles.unfortunatelyText}>
                <b>
                    Email us at{" "}
                    <a href="mailto:contact@hackillinois.org">
                        <u>contact@hackillinois.org</u>
                    </a>{" "}
                    if you have any questions!
                </b>
            </p>
        </div>
    );
}
