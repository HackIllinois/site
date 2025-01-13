import { FC } from "react";

import styles from "./FAQJoinUs.module.scss";
import BACKGROUND from "@/public/home/faq-joinus/faq-joinus-background.svg";

import Image from "next/image";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Link from "next/link";
import clsx from "clsx";

const FAQJoinUs: FC = () => {
    return (
        <section className={styles.FAQJoinUsMain}>
            <div className={styles.joinUs}>
                <h1>Join Us</h1>
                <p>
                    Follow us on{" "}
                    <strong>
                        Twitter (
                        <Link prefetch={false} href={"#"}>
                            @HackIllinois
                        </Link>
                        )
                    </strong>{" "}
                    and{" "}
                    <strong>
                        Instagram (
                        <Link prefetch={false} href={"#"}>
                            @HackIllinois
                        </Link>
                        )
                    </strong>{" "}
                    to be notified of our event updates! There will be regular
                    content and posts.
                </p>
            </div>
            <Link
                prefetch={false}
                href="https://x.com/hackillinois"
                className={clsx(styles.social, styles.x)}
            >
                <Image
                    src="/home/faq-joinus/x.svg"
                    alt="x"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </Link>
            <Link
                prefetch={false}
                href="https://www.instagram.com/HackIllinois"
                className={clsx(styles.social, styles.instagram)}
            >
                <Image
                    src="/home/faq-joinus/instagram.svg"
                    alt="instagram"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </Link>
            <div className={styles.olympians}>
                <div>
                    <h1>Introducing</h1>
                    <h1>
                        Hack<strong>Olympians</strong>
                    </h1>
                </div>
                <OlympianButton text="Learn More" link="/olympians" />
            </div>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <h1 className={styles.faq}>FAQ</h1>
        </section>
    );
};

export default FAQJoinUs;
