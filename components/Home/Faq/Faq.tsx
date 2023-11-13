"use client";

import React from "react";
import { useState } from "react";

import styles from "./styles.module.scss";

import Image from "next/image";

import faqs from "../../../modules/FaqData";

import FaqHeader from "@/public/home/faq/faqHeader.svg";
import FaqCloud from "@/public/home/faq/cloud.svg";
import ClickedSword from "@/public/home/faq/clickedSword.svg";
import Sword from "@/public/home/faq/sword.svg";
import Flames from "@/public/home/faq/faqFlames.svg";

const Faq: React.FC = () => {
    const [faqSectionIndex, setFaqSectionIndex] = useState(0);
    const [generalClicked, setGeneralClicked] = useState(true);
    const [beforeClicked, setBeforeClicked] = useState(false);
    const [duringClicked, setDuringClicked] = useState(false);

    const swordStates = [generalClicked, beforeClicked, duringClicked];
    const handleClick = (id: string) => {
        if (id === "general") {
            setFaqSectionIndex(0);
            setGeneralClicked(true);
            setBeforeClicked(false);
            setDuringClicked(false);
        } else if (id === "before") {
            setFaqSectionIndex(1);
            setGeneralClicked(false);
            setBeforeClicked(true);
            setDuringClicked(false);
        } else {
            setFaqSectionIndex(2);
            setGeneralClicked(false);
            setBeforeClicked(false);
            setDuringClicked(true);
        }
    };
    return (
        <section className={styles.faq}>
            <div className={styles.faqContainer}>
                <div className={styles.faqContainerItem1}>
                    <Image
                        className={styles.faqHeader}
                        alt="faq header"
                        src={FaqHeader}
                    />
                    <Image
                        className={styles.faqCloud}
                        alt="cloud"
                        src={FaqCloud}
                    />
                </div>
                <div className={styles.faqContainerItem2}>
                    <div className={styles.faqSwordContainer}>
                        <div className={styles.faqSwordandHeader}>
                            <h2>General</h2>
                            <Image
                                className={styles.swords}
                                alt="general sword"
                                onClick={() => handleClick("general")}
                                src={generalClicked ? ClickedSword : Sword}
                            />
                        </div>

                        <div className={styles.faqSwordandHeader}>
                            <h2>Before</h2>
                            <Image
                                className={styles.swords}
                                alt="before sword"
                                onClick={() => handleClick("before")}
                                src={beforeClicked ? ClickedSword : Sword}
                            />
                        </div>

                        <div className={styles.faqSwordandHeader}>
                            <h2>During</h2>
                            <Image
                                className={styles.swords}
                                alt="during sword"
                                onClick={() => handleClick("during")}
                                src={duringClicked ? ClickedSword : Sword}
                            />
                        </div>
                    </div>

                    <div className={styles.faqContent}>
                        {faqs[faqSectionIndex].sectionFaqs.map(
                            ({ question, answer }, i) => (
                                <div
                                    key={i}
                                    className={styles.faqContentColumn}
                                >
                                    <h3>{question}</h3>
                                    {answer}
                                </div>
                            )
                        )}
                    </div>

                    <div className={styles.flamesContainer}>
                        <Image
                            className={styles.faqFlames}
                            alt="flames"
                            src={Flames}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
