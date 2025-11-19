import { FC } from "react";
import styles from "./FooterSection.module.scss";
import Image from "next/image";

const FooterSection: FC = () => {
    return (
        <section className={styles.footerMain}>
            <Image
                src="/backgrounds/fifth.svg"
                alt="Footer background"
                fill
                className={styles.backgroundImage}
            />
        </section>
    );
};

export default FooterSection;
