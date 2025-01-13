import styles from "./Error.module.scss";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.errorBox}>
                <h2 className={styles.heading}>Page not found</h2>
                <p className={styles.text}>
                    Return to the{" "}
                    <Link prefetch={false} href="/" className={styles.link}>
                        home page
                    </Link>
                    ?
                </p>
            </div>
        </div>
    );
};

export default NotFound;
