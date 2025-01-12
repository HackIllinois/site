import styles from "./styles.module.scss";
import React from "react";
import ReviewForm from "@/components/Registration/ReviewForm";
import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";
import Background from "@/components/Registration/Background";
import ProgressBar from "@/components/Registration/ProgressBar";

const ReviewInfo: React.FC = async () => {
    const [apiRegistration, { complete: isProApplicant }] = await Promise.all([
        getRegistrationOrDefault(),
        getChallenge()
    ]);
    const registration = registrationFromAPI(apiRegistration);

    return (
        <div className={styles.container}>
            <Background />
            <div className={styles.contentWrapper}>
                <ProgressBar furthestPage={4} />
                <h1>Review Info</h1>
                <ReviewForm
                    registration={registration}
                    isProApplicant={isProApplicant}
                />
            </div>
        </div>
    );
};

export default ReviewInfo;
