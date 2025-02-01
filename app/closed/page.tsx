"use client";

import Image from "next/image";

import SNOWGLOBE from "@/public/registration/track_selection/snowglobe.svg";
import LOGO_TEXTONLY from "@/public/registration/track_selection/logo_textonly.svg";
import BACKGROUND from "@/public/registration/track_selection/background.svg";

import OlympianButton from "@/components/OlympianButton/OlympianButton";

import styles from "@/app/closed/closed.module.scss";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault
} from "@/util/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const Closed: React.FC = () => {
    const { eventStatus } = useContext(GlobalContext);
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (eventStatus === "loading") {
            return;
        }

        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getRegistrationOrDefault().then(registration => {
            if (registration.hasSubmitted) {
                router.push("/profile");
                return;
            }

            if (eventStatus === "registration") {
                router.push("/register");
                return;
            }

            setIsLoading(false);
        });
    }, [eventStatus, pathname, router]);

    return (
        <>
            {isLoading && <Loading />}
            <main
                style={{
                    backgroundImage: `url(${BACKGROUND?.src})`
                }}
                className={styles.screen}
            >
                <div className={styles.topSpacer}></div>
                <Image
                    alt="HackOlympus Logo"
                    src={LOGO_TEXTONLY}
                    className={styles.logo}
                />
                <div
                    style={{
                        backgroundImage: `url(${SNOWGLOBE?.src})`
                    }}
                    className={styles.container}
                >
                    <div className={styles.topSpacer}></div>
                    <div className={styles.content}>
                        <h2>
                            Sorry, registration for HackIllinois 2025 is closed.
                        </h2>
                        <h2>Check back next year!</h2>
                        <OlympianButton text="Back" link="/" blue medium />
                    </div>
                    <div className={styles.spacer}></div>
                </div>
            </main>
        </>
    );
};

export default Closed;
