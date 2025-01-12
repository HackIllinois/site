"use client";
import { useState } from "react";
import styles from "./Error.module.scss";
import Link from "next/link";
import clsx from "clsx";

const Error = ({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={styles.container}>
            <div className={styles.errorBox}>
                <h2 className={styles.heading}>Something went wrong</h2>
                <p className={styles.text}>
                    If the issue persists, please contact us at{" "}
                    <Link
                        href="mailto:contact@hackillinois.org"
                        className={styles.link}
                    >
                        contact@hackillinois.org
                    </Link>
                </p>
                <button onClick={handleToggleDetails} className={styles.button}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
                {showDetails && (
                    <p className={clsx(styles.text, styles.error)}>
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Error;
