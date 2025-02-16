"use client";
import { FC } from "react";

import styles from "./FAQ.module.scss";
import BACKGROUND_MOBILE from "@/public/home/faq/background-mobile.svg";
import BACKGROUND_DESKTOP from "@/public/home/faq/background-desktop.svg";

import Image from "next/image";
import FAQ from "@/components/FAQ/FAQ";
import useWindowSize from "@/hooks/use-window-size";

const FAQSection: FC = () => {
    const windowSizeHook = useWindowSize();
    return (
        <section className={styles.sponsorsMain}>
            <Image
                alt="background"
                src={
                    windowSizeHook?.width && windowSizeHook.width >= 768
                        ? BACKGROUND_DESKTOP
                        : BACKGROUND_MOBILE
                }
                className={styles.background}
            />
            <FAQ />
        </section>
    );
};

export default FAQSection;
