"use client";
import { useContext, useEffect, useState } from "react";
import ProChallengeContent from "../../../components/Challenge/ProChallengeContent";
import ProChallengeIntro from "../../../components/Challenge/ProChallengeIntro";
import ProChallengeStatus from "../../../components/Challenge/ProChallengeStatus";
import styles from "./styles.module.scss";
import {
    authenticate,
    getChallenge,
    getRegistration,
    getRegistrationOrDefault,
    isAuthenticated,
    registerUpdate
} from "@/util/api";
import { RegistrationType } from "@/util/types";
import { NavbarContext } from "@/components/Navbar/NavbarContext";
import Loading from "@/components/Loading/Loading";

enum Pages {
    Intro,
    Challenge,
    Pass,
    Fail
}

const ProChallenge: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navbarContext = useContext(NavbarContext);
    const [page, setPage] = useState(Pages.Intro);
    const handleBegin = () => {
        navbarContext?.handleSetDark();
        setPage(Pages.Challenge);
    };

    const handleSuccess = async () => {
        navbarContext?.handleSetNotDark();
        setPage(Pages.Pass);
        const registration = await getRegistrationOrDefault();
        registration.isProApplicant = true;
        await registerUpdate(registration);
    };

    const handleFailure = () => {
        navbarContext?.handleSetNotDark();
        setPage(Pages.Fail);
    };

    const handleCheckIfUserCompletedChallenge = async () => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }
        const registration = await getRegistrationOrDefault();
        if (registration.hasSubmitted) {
            window.location.href = "/profile";
            return;
        }

        let passedChallenge;
        try {
            passedChallenge = await getChallenge();
        } catch {
            return; // Just leave the user on the same page
        }

        if (passedChallenge) {
            await handleSuccess();
        }
        // Leave it if the user failed, so they can try again
    };

    useEffect(() => {
        handleCheckIfUserCompletedChallenge().then(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.screen}>
            {isLoading && <Loading />}
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
