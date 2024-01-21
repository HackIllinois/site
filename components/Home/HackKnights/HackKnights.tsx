"use client";

import React from "react";
import { useState } from "react";

import styles from "./styles.module.scss";
import Background from "@/public/home/hackknights/knights_background.svg";
import Mascots from "@/public/home/hackknights/hackknights_mascots.svg";
import LearnMoreButton from "@/public/home/hackknights/learnmore.svg";
import HackKnightsButton from "@/public/home/hackknights/hackknights_button.svg";
import Divider from "@/public/home/hackknights/stone divider.svg";
import Image from "next/image";

const HackKnights: React.FC = () => {
    return (
        <section className={styles.hackknights}>
            <div className={styles.hackknightsContainer}>
                <Image
                    className={styles.hkBackground}
                    alt="background"
                    src={Background}
                />

                <div className={styles.overlappingContainer}>
                    <div className={styles.hkMascotsContainer}>
                        <Image
                            className={styles.hkMascots}
                            alt="mascots"
                            src={Mascots}
                        />
                    </div>
                    <div className={styles.hkLearnMoreContainer}>
                        <h3>
                            <span className={styles.introducing}>
                                Introducing
                            </span>
                            <br></br>
                            Hack
                            <span style={{ color: "#FFB23E" }}>Knights</span>
                        </h3>
                        <button
                            className={styles.hkButton}
                            onClick={() =>
                                (window.location.pathname = "/knights")
                            }
                        >
                            <Image
                                className={styles.hkLearnMoreButton}
                                alt="learn more button"
                                src={LearnMoreButton}
                            />
                        </button>
                    </div>
                </div>

                <div className={styles.hkDividerContainer}>
                    <Image
                        className={styles.hkDivider}
                        alt="divider"
                        src={Divider}
                    />
                </div>
            </div>
        </section>
    );
};

export default HackKnights;
