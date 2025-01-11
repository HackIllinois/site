import { getRegistrationOrDefault, getRSVP } from "@/util/api";
import styles from "./styles.module.scss";
import APPLICATION_STATUS_BACKGROUND from "@/public/registration/backgrounds/application_status_background.svg";
import APPLICATION_STATUS_BOARD from "@/public/registration/backgrounds/application_status_board.svg";
import React, { Suspense } from "react";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HackIllinois | Profile"
};

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

const Profile: React.FC = async () => {
    const [currentRegistration, currentRSVP] = await Promise.all([
        getRegistrationOrDefault(),
        getRSVP()
    ]);

    return (
        <>
            <h2>
                {currentRegistration?.preferredName
                    ? `${currentRegistration?.preferredName.trim()}'s `
                    : " "}
                Application Status
            </h2>
            <div className={styles.info}>
                <div className={styles.col}>
                    <h3>Type</h3>
                    <ValueItem
                        label="Pro"
                        isHighlighted={
                            currentRegistration?.isProApplicant === true
                        }
                    />
                    <ValueItem
                        label="Regular"
                        isHighlighted={
                            currentRegistration?.isProApplicant !== true
                        }
                    />
                </div>
                <div className={styles.col}>
                    <h3>Status</h3>
                    <ValueItem
                        label="Decision Pending"
                        isHighlighted={
                            !currentRSVP?.status ||
                            currentRSVP?.status === "TBD"
                        }
                    />
                    <ValueItem
                        label="Waitlisted"
                        isHighlighted={currentRSVP?.status === "WAITLISTED"}
                    />
                    <ValueItem
                        label="Accepted"
                        isHighlighted={currentRSVP?.status === "ACCEPTED"}
                    />
                    <ValueItem
                        label="Rejected"
                        isHighlighted={currentRSVP?.status === "REJECTED"}
                    />
                </div>
                {/* <div className={styles.col}>
                        <h3>Actions</h3>
                        <p>View Form</p>
                        <p>RSVP</p>
                    </div> */}
            </div>
        </>
    );
};

const ProfileWrapper: React.FC = () => {
    return (
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
                <Suspense>
                    <Profile />
                </Suspense>
            </div>
        </div>
    );
};

export default ProfileWrapper;
