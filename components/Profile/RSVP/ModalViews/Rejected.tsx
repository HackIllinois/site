import styles from "./styles.module.scss";

export function Rejected() {
    return (
        <div className={styles.container}>
            <p className={styles.unfortunatelyText}>
                <b>
                    Unfortunately, we were unable to offer you a spot at
                    HackIllinois
                </b>
            </p>
            <p className={styles.unfortunatelyText}>
                <b>
                    Email us at{" "}
                    <a href="mailto:contact@hackillinois.org">
                        contact@hackillinois.org
                    </a>{" "}
                    if you have any questions!
                </b>
            </p>
        </div>
    );
}

// TODO: update this wording
export function Waitlisted() {
    return (
        <div className={styles.container}>
            <p className={styles.unfortunatelyText}>
                <b>
                    Unfortunately, we have deferred your application at this
                    time
                </b>
            </p>
            <p className={styles.unfortunatelyText}>
                <b>
                    Email us at{" "}
                    <a href="mailto:contact@hackillinois.org">
                        contact@hackillinois.org
                    </a>{" "}
                    if you have any questions!
                </b>
            </p>
        </div>
    );
}
