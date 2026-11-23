import RegistrationBackground from "@/components/RegistrationBackground/RegistrationBackground";
import { registrationBackgrounds } from "@/modules/RegistrationBackgrounds";
import Link from "next/link";
import styles from "./not-found.module.scss";

const NotFound: React.FC = () => {
    return (
        <main className={styles.page}>
            <RegistrationBackground
                background={registrationBackgrounds.personal_info}
                blurPx={10}
            />
            <div className={styles.card}>
                <p className={styles.code}>404</p>
                <h1 className={styles.heading}>Page not found</h1>
                <p className={styles.message}>
                    We couldn&apos;t find the page you&apos;re looking for.
                </p>
                <Link prefetch={false} href="/" className={styles.homeLink}>
                    Return to the home page
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
