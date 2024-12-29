"use client";
import RegistrationForm from "@/components/Registration/Registration";
import Head from "next/head";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import {
    authenticate,
    getRegistration,
    getRegistrationOrDefault,
    isAuthenticated,
    registerUpdate,
    registrationFromAPI,
    registrationToAPI
} from "@/util/api";
import TrackSelection from "@/components/Registration/TrackSelection/TrackSelection";
import { RegistrationType, WithId } from "@/util/types";
import Loading from "@/components/Loading/Loading";

const Registration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<RegistrationType | null>(null);
    const [hasChosen, setHasChosen] = useState<boolean>(false);

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
        //             setHasChosen(true);
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
                {hasChosen ? (
                    <RegistrationForm
                        registration={registrationFromAPI(data!)}
                        setHasChosen={setHasChosen}
                    />
                ) : (
                    <TrackSelection
                        handleGeneral={() => {
                            data!.isProApplicant = false; // alows backing out of the pro track after completing the challenge
                            registerUpdate(data!);
                            setHasChosen(true);
                        }}
                    />
                )}
            </main>
        </>
    );
};

export default Registration;
