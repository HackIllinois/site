"use client";
import { useEffect, useState } from "react";
import ProChallengeContent from "../../../components/Challenge/ProChallengeContent";
import ProChallengeIntro from "../../../components/Challenge/ProChallengeIntro";
import ProChallengeStatus from "../../../components/Challenge/ProChallengeStatus";
import styles from "./styles.module.scss";
import {
    authenticate,
    getChallenge,
    getRegistration,
    isAuthenticated
} from "@/util/api";

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
            if (!isAuthenticated()) {
                authenticate(window.location.href);
            }
            const registration = await getRegistration();
            if (registration && registration.hasSubmitted) {
                window.location.href = "/register/application-status";
                return;
            }
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
