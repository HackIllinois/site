"use client";
import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./styles.module.scss";
import { useState } from "react";
import HackOlympiansIntro from "./screens/HackOlympiansIntro";
import HackOlympiansChallenge from "./screens/HackOlympiansChallenge";
import HackOlympiansStatus from "./screens/HackOlympiansStatus";

enum Pages {
    Intro,
    Challenge,
    Pass,
    Fail
}

const HackOlympians: React.FC = () => {
    const [page, setPage] = useState(Pages.Intro);
    const handleBegin = () => {
        setPage(Pages.Challenge);
    };

    const handleSuccess = () => {
        setPage(Pages.Pass);
    };

    const handleFailure = () => {
        setPage(Pages.Fail);
    };

    return (
        <div className={styles.screen}>
            {page === Pages.Intro && (
                <HackOlympiansIntro handleBegin={handleBegin} />
            )}
            {page === Pages.Challenge && (
                <HackOlympiansChallenge
                    handleSuccess={handleSuccess}
                    handleFailure={handleFailure}
                />
            )}
            {page === Pages.Pass && <HackOlympiansStatus success={true} />}
            {page === Pages.Fail && <HackOlympiansStatus success={false} />}
        </div>
    );
};

export default HackOlympians;
