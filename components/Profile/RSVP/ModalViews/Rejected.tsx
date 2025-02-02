import styles from "./styles.module.scss";

export function Rejected() {
    return (
        <div className={styles.container}>
            <b>
                Unfortunately, we were unable to offer you a spot at
                HackIllinois
            </b>
            <b>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    contact@hackillinois.org
                </a>{" "}
                if you have any questions!
            </b>
        </div>
    );
}

// TODO: update this wording
export function Waitlisted() {
    return (
        <div className={styles.container}>
            <b>
                Unfortunately, we have deferred your application decision at
                this time.
            </b>
            <b>
                Email us at{" "}
                <a href="mailto:contact@hackillinois.org">
                    contact@hackillinois.org
                </a>{" "}
                if you have any questions!
            </b>
        </div>
    );
}
