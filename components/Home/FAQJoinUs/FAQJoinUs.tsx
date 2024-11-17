import { FC } from "react";

import styles from "./FAQJoinUs.module.scss";
import BACKGROUND from "@/public/home/faq-joinus/faq-joinus-background.svg";

import Image from "next/image";

const FAQJoinUs: FC = () => {
    return (
        <section className={styles.FAQJoinUsMain}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
        </section>
    );
};

export default FAQJoinUs;
