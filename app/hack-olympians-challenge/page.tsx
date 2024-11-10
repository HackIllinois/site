"use client";
import { useEffect, useState } from "react";
import ProChallengeContent from "./screens/ProChallengeContent";
import ProChallengeIntro from "./screens/ProChallengeIntro";
import ProChallengeStatus from "./screens/ProChallengeStatus";
import styles from "./styles.module.scss";
import { getChallenge } from "@/util/api";

enum Pages {
    Intro,
    Challenge,
    Pass,
    Fail
}

const ProChallenge: React.FC = () => {
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

    const handleCheckIfUserCompletedChallenge = async () => {
        try {
            const passedChallenge = await getChallenge();
            if (passedChallenge) {
                setPage(Pages.Pass);
            }
            // Leave it if the user failed, so they can try again
        } catch {
            // Just leave the user on the same page
        }
    };

    useEffect(() => {
        handleCheckIfUserCompletedChallenge();
    }, []);

    return (
        <div className={styles.screen}>
            {page === Pages.Intro && (
                <ProChallengeIntro handleBegin={handleBegin} />
            )}
            {page === Pages.Challenge && (
                <ProChallengeContent
                    handleSuccess={handleSuccess}
                    handleFailure={handleFailure}
                />
            )}
            {page === Pages.Pass && <ProChallengeStatus success={true} />}
            {page === Pages.Fail && <ProChallengeStatus success={false} />}
        </div>
    );
};

export default ProChallenge;
