"use client";
import React from "react";
import styles from "./page.module.scss";
import Banner from "@/components/HackKnightsChallenge/Banner";

const Challenge = () => {
    const [show, setShow] = React.useState<string>("banner");
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {show === "banner" && <Banner setShow={setShow} />}
            </div>
        </div>
    );
};

export default Challenge;
