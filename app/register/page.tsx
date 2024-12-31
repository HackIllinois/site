"use client";
import Head from "next/head";

import TrackSelection from "@/components/Registration/TrackSelection/TrackSelection";
import {
    authenticate,
    getRegistrationOrDefault,
    isAuthenticated
} from "@/util/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Loading from "@/components/Loading/Loading";

const Registration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
            return;
        }

        getRegistrationOrDefault()
            .then(registration => {
                if (registration.hasSubmitted) {
                    window.location.replace("/profile");
                }
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
                {isLoading && <Loading />}
                <TrackSelection />
            </main>
        </>
    );
};

export default Registration;
