import React from "react";
import clsx from "clsx";

import Button from "@/components/form/Button";
import LOGO_LARGE from "@/public/logo.svg";
import styles from "./styles.module.scss";

const Finish = (): JSX.Element => (
    <div className={clsx(styles.screen, styles.finish)}>
        <br></br>
        <a
            className={styles.logo}
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
            <img src={LOGO_LARGE} alt="HackIllinois" />
        </a>

        <h1 className={styles.headline}>HACK ILLINOIS</h1>

        <p className={styles.textOp2}>
            Thank you for registering for HackIllinois 2023! Be sure to follow
            our{" "}
            <a
                href="https://www.instagram.com/hackillinois/"
                target="_blank"
                rel="noreferrer"
            >
                instagram (@hackillinois)
            </a>{" "}
            and {" "}
            <a
                href="https://twitter.com/hackillinois/"
                target="_blank"
                rel="noreferrer"
            >
                X (@hackillinois)
            </a>
            for additional information!
        </p>

        <div className={styles.homeButton}>
            <Button
                onClick={() => {
                    window.location.href = "/";
                }}
            >
                Back Home
            </Button>
        </div>
    </div>
);

export default Finish;
