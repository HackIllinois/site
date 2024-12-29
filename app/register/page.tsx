"use client";
import Head from "next/head";

import Loading from "@/components/Loading/Loading";
import TrackSelection from "@/components/Registration/TrackSelection/TrackSelection";
import {
    authenticate,
    getRegistrationOrDefault,
    isAuthenticated,
    registerUpdate
} from "@/util/api";
import { RegistrationType } from "@/util/types";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const Registration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<RegistrationType | null>(null);

    useEffect(() => {
        // if (!isAuthenticated()) {
        //     authenticate(window.location.href);
        //     return;
        // }
        // getRegistrationOrDefault()
        //     .then(registration => {
        //         if (registration.hasSubmitted) {
        //             window.location.replace("/profile");
        //         }
        //         if ("_id" in registration) {
        //             window.location.replace("/register/general");
        //         }
        //         setData(registration);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }, []);

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                {isLoading && <Loading />}
                <TrackSelection
                    handleGeneral={() => {
                        data!.isProApplicant = false; // alows backing out of the pro track after completing the challenge
                        registerUpdate(data!);
                        window.location.replace("/register/general");
                    }}
                />
            </main>
        </>
    );
};

export default Registration;
