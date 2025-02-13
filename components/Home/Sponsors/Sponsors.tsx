import { FC } from "react";

import styles from "./Sponsors.module.scss";
import BACKGROUND from "@/public/home/sponsors/sponsor-background.svg";

import Image from "next/image";

const Sponsors: FC = () => {
    return (
        <section className={styles.container}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <div className={styles.content}>
                <h1 className={styles.title}>Sponsors</h1>
            </div>
        </section>
    );
};

export default Sponsors;
