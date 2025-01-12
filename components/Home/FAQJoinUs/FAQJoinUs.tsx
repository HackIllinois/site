import { FC } from "react";

import styles from "./FAQJoinUs.module.scss";
import BACKGROUND from "@/public/home/faq-joinus/faq-joinus-background.svg";

import Image from "next/image";
import OlympianButton from "@/components/OlympianButton/OlympianButton";

const FAQJoinUs: FC = () => {
    return (
        <section className={styles.FAQJoinUsMain}>
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
