"use client";
import { useEffect, useState } from "react";
import ProChallengeContent from "../../../components/Challenge/ProChallengeContent";
import ProChallengeIntro from "../../../components/Challenge/ProChallengeIntro";
import ProChallengeStatus from "../../../components/Challenge/ProChallengeStatus";
import styles from "./styles.module.scss";
import {
    authenticate,
    getChallenge,
    getRegistrationOrDefault,
    isAuthenticated,
    registerUpdate
} from "@/util/api";
import { RegistrationType } from "@/util/types";

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

    const handleSuccess = async () => {
        const registration = await getRegistrationOrDefault();
        registration.isProApplicant = true;
        await registerUpdate(registration);
        setPage(Pages.Pass);
    };

    const handleFailure = () => {
        setPage(Pages.Fail);
    };

    const handleCheckIfUserCompletedChallenge = async () => {
        try {
            const passedChallenge = await getChallenge();
            if (passedChallenge) {
                await handleSuccess();
            }
            // Leave it if the user failed, so they can try again
        } catch {
            // Just leave the user on the same page
        }
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }

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
