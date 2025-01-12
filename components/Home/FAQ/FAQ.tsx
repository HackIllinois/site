import { FC } from "react";

import styles from "./FAQ.module.scss";
import BACKGROUND from "@/public/home/faq/background.svg";

import Image from "next/image";
import FAQ from "@/components/FAQ/FAQ";

const FAQSection: FC = () => {
    return (
        <section className={styles.sponsorsMain}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <FAQ />
        </section>
    );
};

export default FAQSection;
