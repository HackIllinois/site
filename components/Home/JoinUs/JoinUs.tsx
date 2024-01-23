import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import Twitter from "@/public/home/joinus/x logo.svg";
import Instagram from "@/public/home/joinus/instagram.svg";
import Bricks from "@/public/home/joinus/joinus brick.svg";

import Shelf from "@/public/home/joinus/joinus shelf.svg";

const JoinUs = () => {
    return (
        <section className={styles.joinus}>
            <div className={styles.joinusContainer}>
                <Image src={Bricks} alt="bricks" className={styles.bricks} />
                <div className={styles.shelfContainer}>
                    <Image src={Shelf} alt="shelf" className={styles.shelf} />

                    <div className={styles.socialmediaContainer}>
                        <Link
                            target="_blank"
                            href="https://www.instagram.com/hackillinois"
                        >
                            <Image
                                src={Instagram}
                                alt="instagram"
                                className={styles.instagram}
                            />
                        </Link>
                        <Link
                            target="_blank"
                            href="https://twitter.com/HackIllinois"
                        >
                            <Image
                                src={Twitter}
                                alt="twitter"
                                className={styles.twitter}
                            />
                        </Link>
                    </div>
                </div>

                <div className={styles.joinusText}>
                    Follow us on Twitter (@
                    <a
                        target="_blank"
                        href="https://www.twitter.com/hackillinois"
                    >
                        HackIllinois
                    </a>
                    ) and Instagram (@
                    <a
                        target="_blank"
                        href="https://www.instagram.com/hackillinois"
                    >
                        HackIllinois
                    </a>
                    ) to be notified of our event updates! There will be regular
                    content and posts.
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
