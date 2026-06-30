import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <div>
                    <span>Contact Information</span>
                    <span>Reach out to us with any inquiries!</span>
                    <div>
                        <a
                            href="mailto:contact@hackillinois.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="generic/icons/email-border.svg"
                                className={styles.icon}
                            />
                        </a>
                        <a
                            className={styles.linkText}
                            href="mailto:contact@hackillinois.org"
                        >
                            contact@hackillinois.org
                        </a>
                    </div>
                </div>
                <div>
                    <span>Want to stay up to date?</span>
                    <span>Follow us on social media!</span>
                    <div>
                        <a
                            href="https://instagram.com/HackIllinois"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="generic/icons/instagram-border.svg"
                                className={styles.icon}
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="generic/icons/linkedin-border.svg"
                                className={styles.icon}
                            />
                        </a>
                        <a
                            href="https://github.com/HackIllinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="generic/icons/github-border.png"
                                className={styles.icon}
                            />
                        </a>
                        {/* <a
                            href="https://www.facebook.com/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="generic/icons/facebook-border.svg"
                                className={styles.icon}
                            />
                        </a> */}
                    </div>
                </div>
            </div>
            <div>
                <span>Copyright@2023</span>
                <Link
                    href="info.hackillinois.org/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>Privacy Policy</span>
                </Link>
                <Link
                    href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>MLH Code of Conduct</span>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
