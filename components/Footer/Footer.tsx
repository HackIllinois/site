import { MLH_CODE_OF_CONDUCT_URL } from "@/app/register/general/constants/registration";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer id="site-footer" className={styles.footer}>
            <div className={styles.inner}>
                <nav className={styles.linksRow} aria-label="Footer">
                    <a
                        href={MLH_CODE_OF_CONDUCT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        MLH Code of Conduct
                    </a>

                    <span className={styles.separator} aria-hidden="true">
                        |
                    </span>

                    <a
                        href="https://info.hackillinois.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        HackIllinois Info Site
                    </a>

                    <span className={styles.separator} aria-hidden="true">
                        |
                    </span>

                    <a
                        href="mailto:contact@hackillinois.org"
                        className={styles.link}
                    >
                        Contact Us
                    </a>

                    <span className={styles.separator} aria-hidden="true">
                        |
                    </span>

                    <Link
                        href="/legal"
                        prefetch={false}
                        className={styles.link}
                    >
                        Legal
                    </Link>
                </nav>

                <div className={styles.bottomRow}>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://www.instagram.com/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="HackIllinois on Instagram"
                            className={styles.iconLink}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/hackillinois/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="HackIllinois on LinkedIn"
                            className={styles.iconLink}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                        </a>
                    </div>

                    <p className={styles.copyright}>© HackIllinois 2027</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
