import React from "react";
import styles from "./styles.module.scss";
import ReviewForm from "@/components/Registration/ReviewForm";
import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";

const ReviewInfo: React.FC = async () => {
    const [apiRegistration, { complete: isProApplicant }] = await Promise.all([
        getRegistrationOrDefault(),
        getChallenge()
    ]);
    const registration = registrationFromAPI(apiRegistration);

    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <ReviewForm
                registration={registration}
                isProApplicant={isProApplicant}
            />
        </div>
    );
};

export default ReviewInfo;
