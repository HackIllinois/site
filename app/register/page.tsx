"use client";
import Head from "next/head";

import TrackSelection from "@/components/Registration/TrackSelection/TrackSelection";
import { authenticate, isAuthenticated } from "@/util/api";
import { useEffect } from "react";
import styles from "./styles.module.scss";

const Registration: React.FC = () => {
    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
            return;
        }
    }, []);

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                <TrackSelection />
            </main>
        </>
    );
};

export default Registration;
