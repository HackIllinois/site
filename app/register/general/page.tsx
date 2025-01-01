"use client";

import RegistrationForm from "@/components/Registration/Registration";
import {
    authenticate,
    getRegistrationOrDefault,
    isAuthenticated,
    registrationFromAPI
} from "@/util/api";
import { RegistrationType } from "@/util/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Loading from "@/components/Loading/Loading";

const GeneralRegistration: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<RegistrationType | null>(null);

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
                {isLoading && <Loading />}
                {data && (
                    <RegistrationForm
                        registration={registrationFromAPI(data!)}
                    />
                )}
            </main>
        </>
    );
};

export default GeneralRegistration;
