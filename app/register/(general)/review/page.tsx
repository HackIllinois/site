"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ReviewForm from "@/components/Registration/ReviewForm";
import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";
import { RegistrationData } from "@/util/types";
import Loading from "@/components/Loading/Loading";

const ReviewInfo: React.FC = () => {
    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getRegistrationOrDefault(), getChallenge()]).then(
            ([registration, challenge]) => {
                setRegistration(registrationFromAPI(registration));
                setIsProApplicant(challenge.complete);
                setIsLoading(false);
            }
        );
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <ReviewForm
                registration={registration!}
                isProApplicant={isProApplicant}
            />
        </div>
    );
};

export default ReviewInfo;
