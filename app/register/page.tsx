"use client";
import RegistrationForm from "@/components/Registration/Registration";
import Head from "next/head";

import styles from "./styles.module.scss";
import { useEffect } from "react";
import { authenticate, getRegistration, isAuthenticated } from "@/util/api";

const Registration: React.FC = () => {
    const handleCheckIfUserCompletedForm = async () => {
        try {
            if (!isAuthenticated()) {
                authenticate(window.location.href);
            }
            const registration = await getRegistration();
            if (registration && registration.hasSubmitted) {
                window.location.href = "/register/application-status";
            }
        } catch {}
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }
        handleCheckIfUserCompletedForm();
    });

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                <RegistrationForm />
            </main>
        </>
    );
};

export default Registration;
