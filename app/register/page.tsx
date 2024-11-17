"use client";
import RegistrationForm from "@/components/Registration/Registration";
import Head from "next/head";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import {
    authenticate,
    getRegistrationOrDefault,
    isAuthenticated,
    registerUpdate,
    registrationFromAPI,
    registrationToAPI
} from "@/util/api";
import TrackSelection from "@/components/Registration/TrackSelection/TrackSelection";
import { RegistrationType, WithId } from "@/util/types";

const Registration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<RegistrationType | null>(null);
    const [hasChosen, setHasChosen] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }

        getRegistrationOrDefault()
            .then(registration => {
                if ("_id" in registration) {
                    setHasChosen(true);
                }

                setData(registration);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : hasChosen ? (
                    <RegistrationForm
                        registration={registrationFromAPI(data!)}
                        setHasChosen={setHasChosen}
                    />
                ) : (
                    <TrackSelection
                        handleGeneral={() => {
                            data!.isProApplicant = false; // alows backing out of the pro track after completing the challenge
                            registerUpdate(data!)
                                .then(response =>
                                    console.log("Response:", response)
                                )
                                .catch(error => {
                                    console.error(
                                        "Error Response:",
                                        error.response?.data || error.message
                                    );
                                });
                            setHasChosen(true);
                        }}
                    />
                )}
            </main>
        </>
    );
};

export default Registration;
