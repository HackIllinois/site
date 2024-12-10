"use client";

import {
    authenticate,
    getRegistration,
    getRSVP,
    isAuthenticated
} from "@/util/api";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { RegistrationType, RSVPType } from "@/util/types";
import ValueItem from "@/components/ApplicationStatus/ValueItem";
import Loading from "@/components/Loading/Loading";

const Profile: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentRegistration, setCurrentRegistration] =
        useState<RegistrationType | null>();
    const [currentRSVP, setCurrentRSVP] = useState<RSVPType | null>(null);

    const handleCheckUserAppliedStatus = async () => {
        try {
            if (!isAuthenticated()) {
                authenticate(window.location.href);
            }
            const registration = await getRegistration();
            if (!registration || !registration.hasSubmitted) {
                window.location.href = "/register/";
                return;
            }
            setCurrentRegistration(registration);
            const rsvp = await getRSVP();
            setCurrentRSVP(rsvp);

            setIsLoading(false);
        } catch {
            window.location.href = "/register/";
        }
    };

    useEffect(() => {
        handleCheckUserAppliedStatus();
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.screen}>
                <div className={styles.container}>
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
                                isHighlighted={
                                    currentRSVP?.status === "WAITLISTED"
                                }
                            />
                            <ValueItem
                                label="Accepted"
                                isHighlighted={
                                    currentRSVP?.status === "ACCEPTED"
                                }
                            />
                            <ValueItem
                                label="Rejected"
                                isHighlighted={
                                    currentRSVP?.status === "REJECTED"
                                }
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
