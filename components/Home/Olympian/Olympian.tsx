"use client";
import styles from "./Olympian.module.scss";
import { useEffect, useState } from "react";
import { getRegistrationStatus } from "@/util/api";

import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";

const Olympian: React.FC = () => {
    const [registrationOpen, setRegistrationOpen] = useState(true);
    useEffect(() => {
        getRegistrationStatus().then(status => {
            setRegistrationOpen(status.alive);
        });
    }, []);
    return (
        <section className={styles.olympianMain}>
            <div className={styles.main}>
                <Image
                    alt="HackOlympus Logo"
                    src={LOGO}
                    className={styles.logo}
                />
                <OlympianButton
                    text={registrationOpen ? "Register Now" : "Profile"}
                    link={registrationOpen ? "/register" : "/profile"}
                    bottomPadding
                />
            </div>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <Description />
        </section>
    );
};

export default Olympian;