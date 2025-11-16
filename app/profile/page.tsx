"use client";
import Loading from "@/components/Loading/Loading";
import APPLICATION_STATUS_BACKGROUND from "@/public/registration/backgrounds/application_status_background.svg";
import APPLICATION_STATUS_BOARD from "@/public/registration/backgrounds/application_status_board.svg";
import { RegistrationData, RSVPType } from "@/util/types";
import clsx from "clsx";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type ValueItemProps = {
    label: string;
    isHighlighted: boolean;
};

const ValueItem: React.FC<ValueItemProps> = ({ label, isHighlighted }) => {
    return (
        <div
            className={clsx(
                styles.valueItem,
                isHighlighted && styles.highlighted
            )}
        >
            <p>{label}</p>
        </div>
    );
};

const Profile: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [RSVP, setRSVP] = useState<RSVPType | null>(null);
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Head>
                <title>HackIllinois | Profile</title>
            </Head>
            {isLoading && <Loading />}
            <div
                style={{
                    backgroundImage: `url(${APPLICATION_STATUS_BACKGROUND?.src})`
                }}
                className={styles.screen}
            >
                <div
                    style={{
                        backgroundImage: `url(${APPLICATION_STATUS_BOARD?.src})`
                    }}
                    className={styles.container}
                >
                    <h2>
                        {registration?.preferredName
                            ? `${registration?.preferredName.trim()}'s `
                            : " "}
                        Application Status
                    </h2>
                    <div className={styles.info}>
                        <div className={styles.col}>
                            <h3>Type</h3>
                            <ValueItem
                                label="Pro"
                                isHighlighted={isProApplicant}
                            />
                            <ValueItem
                                label="General"
                                isHighlighted={!isProApplicant}
                            />
                        </div>
                        <div className={styles.col}>
                            <h3>Status</h3>
                            <ValueItem
                                label="Decision Pending"
                                isHighlighted={
                                    !RSVP?.status || RSVP?.status === "TBD"
                                }
                            />
                            <ValueItem
                                label="Waitlisted"
                                isHighlighted={RSVP?.status === "WAITLISTED"}
                            />
                            <ValueItem
                                label="Accepted"
                                isHighlighted={RSVP?.status === "ACCEPTED"}
                            />
                            <ValueItem
                                label="Rejected"
                                isHighlighted={RSVP?.status === "REJECTED"}
                            />
                        </div>
                        {/* <div className={styles.col}>
                        <h3>Actions</h3>
                        <p>View Form</p>
                        <p>RSVP</p>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
