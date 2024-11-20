import { FC } from "react";

import styles from "./Sponsors.module.scss";
import BACKGROUND from "@/public/home/sponsors/sponsor-background.svg";

import Image from "next/image";

const Sponsors: FC = () => {
    return (
        <section className={styles.sponsorsMain}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
        </section>
    );
};

export default Sponsors;
