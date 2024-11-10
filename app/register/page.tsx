"use client";
import Form from "@/components/Registration/Registration";
import Head from "next/head";

import styles from "./styles.module.scss";
import { useEffect } from "react";
import { authenticate, isAuthenticated } from "@/util/api";

const Registration: React.FC = () => {
    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(window.location.href);
        }
    });

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                <Form />
            </main>
        </>
    );
};

export default Registration;
