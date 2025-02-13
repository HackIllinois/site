"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Image from "next/image";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault
} from "@/util/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const Confirmation: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getRegistrationOrDefault()
            .then(registration => {
                if (!registration.hasSubmitted) {
                    router.push("/register");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Application Submitted!</h1>
                        <p className={styles.message}>
                            Thank you for signing up for HackIllinois 2025!
                            Please check your email for your registration
                            confirmation.
                        </p>
                        <p className={styles.follow}>
                            Be sure to follow our Instagram (
                            <a
                                href="https://www.instagram.com/hackillinois"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                @hackillinois
                            </a>
                            ) and X (
                            <a
                                href="https://twitter.com/hackillinois"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                @hackillinois
                            </a>
                            ) for additional information!
                        </p>
                    </div>

                    <OlympianButton
                        text="Profile"
                        link="/profile"
                    ></OlympianButton>
                </div>
            </div>
            <div className={styles.zeus}>
                <Image
                    src="/registration/characters/zeus.svg"
                    alt="zeus"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
        </>
    );
};

export default Confirmation;
