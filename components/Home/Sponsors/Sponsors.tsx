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
                <img src="/home/sponsors/background2.svg" />
            </div>
            <div className={styles.art}>
                <div className={styles.banner}>
                    <div>
                        <div>
                            <img src="/home/sponsors/potions/bottle-sponsors.svg" />
                            <div>
                                <span className={styles.text}>Sponsors</span>
                            </div>
                        </div>
                        <img
                            src="/home/sponsors/potions/mushroom-plant.svg"
                            onClick={handleClick}
                        />
                        <img src="/home/sponsors/potions/lamp.svg" />
                    </div>
                    <img src="/home/sponsors/shelf.svg" />
                </div>
                <div className={styles.potions}>
                    <div className={styles.rowOne}>
                        <img src="/home/sponsors/potions/solana.svg" />
                    </div>
                    <div className={styles.rowTwo}>
                        <img src="/home/sponsors/potions/john-deere.svg" />
                    </div>
                    <div className={styles.rowThree}>
                        <img src="/home/sponsors/potions/caterpillar.svg" />
                    </div>
                    <div className={styles.rowFour}>
                        <img src="/home/sponsors/potions/discover.svg" />
                        <img src="/home/sponsors/potions/github.svg" />
                    </div>
                    <div className={styles.rowFive}>
                        <img src="/home/sponsors/potions/spectrum.svg" />
                        <img src="/home/sponsors/potions/warp.svg" />
                        <img src="/home/sponsors/potions/wolfram.svg" />
                    </div>
                    <div className={styles.gizmo}>
                        <img src="/home/sponsors/gizmo.svg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
