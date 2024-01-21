"use client";
import { useEffect, useState } from "react";
import Head from "next/head";

import Background from "@/components/Registration/background";
import Navigation from "@/components/Registration/navigation";
import Form from "@/components/Registration/form";

import { authenticate, isAuthenticated } from "@/utils/api";

import styles from "./styles.module.scss";

const Registration: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(
                window.location.href
            );
        }
    });

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <div className={styles.registration}>
                {/* <Navigation setFormIndex={setFormIndex} formIndex={formIndex} /> */}
                <Form setFormIndex={setFormIndex} formIndex={formIndex} />
            </div>
        </>
    );
};

export default Registration;
