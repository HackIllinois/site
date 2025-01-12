"use client";
import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import Link from "next/link";
import { useLayoutContext } from "@/components/Registration/Registration";
import { RegistrationData, RegistrationType } from "@/util/types";
import { getRegistrationOrDefault } from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";
import { registrationFieldGroups } from "@/util/types";
import RegistrationResponseGroup from "@/components/Registration/RegistrationResponseGroup";

const ReviewInfo: React.FC = () => {
    const { previous } = useLayoutContext();

    const [registration, setRegistration] = useState<
        RegistrationData | undefined
    >();

    const handleLoadRegistrationData = async () => {
        const apiRegistration = await getRegistrationOrDefault();
        const registration = registrationFromAPI(apiRegistration);

        setRegistration(registration);
    };

    useEffect(() => {
        handleLoadRegistrationData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <div className={styles.reviewButtons}>
                <ReviewButton
                    text="Personal Information"
                    onClick={() => previous(0)}
                />

                <RegistrationResponseGroup
                    fieldInfo={registrationFieldGroups[0]}
                    registration={registration}
                />

                <ReviewButton text="Education" onClick={() => previous(1)} />

                <RegistrationResponseGroup
                    fieldInfo={registrationFieldGroups[1]}
                    registration={registration}
                />

                <ReviewButton
                    text="Hack-Specific"
                    onClick={() => previous(2)}
                />

                <RegistrationResponseGroup
                    fieldInfo={registrationFieldGroups[2]}
                    registration={registration}
                />

                <ReviewButton
                    text="Transportation"
                    onClick={() => previous(3)}
                />

                <RegistrationResponseGroup
                    fieldInfo={registrationFieldGroups[3]}
                    registration={registration}
                />
            </div>
            <Checkboxes
                name="reviewedInformationAcknowledge"
                label={
                    <p>
                        Please review the above information.
                        <br />
                        <small>
                            Once you submit you will not be able to change any
                            information without contacting us.
                        </small>
                    </p>
                }
                options={[
                    {
                        label: "I reviewed my information to ensure it is correct",
                        value: "YES",
                        isRadio: true
                    }
                ]}
            />
            <Checkboxes
                name="codeOfConductAcknowledge"
                label={
                    <p>
                        To participate in HackIllinois, you must accept our{" "}
                        <Link href="/legal/code-of-conduct" target="_blank">
                            Code of Conduct
                        </Link>
                        :
                    </p>
                }
                options={[
                    {
                        label: "I accept the Code of Conduct",
                        value: "YES",
                        isRadio: true
                    }
                ]}
            />
        </div>
    );
};

export default ReviewInfo;
