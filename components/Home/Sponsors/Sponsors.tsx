/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import styles from "./Sponsors.module.scss";

const Sponsors: React.FC = () => {
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        setClickCount(clickCount + 1);
        if (clickCount + 1 === 3) {
            window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Replace with your external link
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.background}>
                <img src="/home/sponsors/background2.svg" alt="background" />
            </div>
            <div className={styles.art}>
                <div className={styles.banner}>
                    <div>
                        <div>
                            <img src="/home/sponsors/potions/bottle-sponsors.svg" alt="bottle" />
                            <div>
                                <span className={styles.text}>Sponsors</span>
                            </div>
                        </div>
                        <img
                            src="/home/sponsors/potions/mushroom-plant.svg"
                            onClick={handleClick}
                            alt="mushroom"
                        />
                        <img src="/home/sponsors/potions/lamp.svg" alt="lamp" />
                    </div>
                    <img src="/home/sponsors/shelf.svg" alt="shelf" />
                </div>
                <div className={styles.potions}>
                    <div className={styles.rowOne}>
                        <a href="https://solana.com/" target="_blank" rel="noreferrer">
                            <img src="/home/sponsors/potions/solana.svg" alt="solana" />
                        </a>
                    </div>
                    <div className={styles.rowTwo}>
                        <img src="/home/sponsors/potions/john-deere.svg" alt="deere" />
                    </div>
                    <div className={styles.rowThree}>
                        <img src="/home/sponsors/potions/caterpillar.svg" alt="cat" />
                    </div>
                    <div className={styles.rowFour}>
                        <img src="/home/sponsors/potions/discover.svg" alt="discover" />
                        <img src="/home/sponsors/potions/github.svg" alt="github" />
                    </div>
                    <div className={styles.rowFive}>
                        <img src="/home/sponsors/potions/spectrum.svg" alt="spectrum" />
                        <img src="/home/sponsors/potions/warp.svg" alt="warp" />
                        <img src="/home/sponsors/potions/wolfram.svg" alt="wolfram" />
                    </div>
                    <div className={styles.gizmo}>
                        <img src="/home/sponsors/gizmo.svg" alt="gizmo" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
