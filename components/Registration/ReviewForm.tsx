"use client";
import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./ReviewForm.module.scss";
import React, { useState } from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import Link from "next/link";
import { RegistrationData, registrationFieldGroups } from "@/util/types";
import RegistrationResponseGroup from "@/components/Registration/RegistrationResponseGroup";
import { Form, Formik } from "formik";
import { reviewSchema } from "./validation";
import { registerSubmit } from "@/util/api";
import { handleError, registrationToAPI } from "@/util/helpers";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import NavigationButton from "../Form/NavigationButton/NavigationButton";

type ReviewFormProps = {
    registration: RegistrationData;
    isProApplicant: boolean;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
    registration,
    isProApplicant
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        await registerSubmit(registrationToAPI(registration)).catch(err =>
            handleError(err)
        );
        router.push("/register/confirmation");
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.scrollWrapper}>
                <div className={styles.reviewButtons}>
                    <ReviewButton
                        text="Personal Information"
                        href="/register/personal-info"
                    />

                    <RegistrationResponseGroup
                        fieldInfo={registrationFieldGroups[0]}
                        registration={registration}
                        isProApplicant={isProApplicant}
                    />

                    <ReviewButton text="Education" href="/register/education" />

                    <RegistrationResponseGroup
                        fieldInfo={registrationFieldGroups[1]}
                        registration={registration}
                        isProApplicant={isProApplicant}
                    />

                    <ReviewButton
                        text="Hack-Specific"
                        href="/register/hack-specific"
                    />

                    <RegistrationResponseGroup
                        fieldInfo={registrationFieldGroups[2]}
                        registration={registration}
                        isProApplicant={isProApplicant}
                    />

                    <ReviewButton
                        text="Transportation"
                        href="/register/transportation"
                    />

                    <RegistrationResponseGroup
                        fieldInfo={registrationFieldGroups[3]}
                        registration={registration}
                        isProApplicant={isProApplicant}
                    />
                </div>
                <Formik
                    initialValues={{
                        reviewedInformationAcknowledge: [],
                        codeOfConductAcknowledge: []
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={reviewSchema}
                >
                    <Form>
                        <Checkboxes
                            name="reviewedInformationAcknowledge"
                            label={
                                <p>
                                    Please review the above information.
                                    <br />
                                    <small>
                                        Once you submit you will not be able to
                                        change any information without
                                        contacting us.
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
                                    To participate in HackIllinois, you must
                                    accept our{" "}
                                    <Link
                                        prefetch={false}
                                        href="/legal/code-of-conduct"
                                        target="_blank"
                                    >
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
                        <div className={styles.navigation}>
                            <NavigationButton
                                text={"Transportation"}
                                href="/register/transportation"
                                type="button"
                            />
                            <NavigationButton
                                text={"Submit"}
                                pointRight
                                type="submit"
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default ReviewForm;
