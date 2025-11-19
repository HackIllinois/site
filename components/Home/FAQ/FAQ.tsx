import { FC } from "react";
import styles from "./FAQ.module.scss";
import FAQ from "@/components/FAQ/FAQ";
import Image from "next/image";

const FAQSection: FC = () => {
    return (
        <section className={styles.faqMain}>
            <Image
                src="/backgrounds/fourth.svg"
                alt="FAQ background"
                fill
                className={styles.backgroundImage}
            />
            <div className={styles.content}>
                <h1 className={styles.title}>FAQ</h1>
                <div className={styles.faqContent}>
                    <FAQ />
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
