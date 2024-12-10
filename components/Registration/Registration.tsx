"use client";
import React, { ElementType, useState } from "react";
import styles from "./Registration.module.scss";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import ProgressBar from "../ProgressBar/ProgressBar";
import ReviewInfo from "./Pages/ReviewInfo/ReviewInfo";
import ApplicationSubmitted from "./Pages/ApplicationSubmitted/ApplicationSubmitted";
import { getRegistrationSchema } from "./validation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import { Formik, Form, FormikHelpers } from "formik";
import { registerSubmit, registerUpdate, registrationToAPI } from "@/util/api";
import { RegistrationData } from "@/util/types";

import PERSONAL_INFO from "@/public/registration/backgrounds/personal_info.svg";
import EDUCATION from "@/public/registration/backgrounds/education.svg";
import HACK_SPECIFIC from "@/public/registration/backgrounds/hack_specific.svg";
import TRANSPORTATION from "@/public/registration/backgrounds/transportation.svg";
import REVIEW_INFO from "@/public/registration/backgrounds/review_info.svg";
import APPLICATION_SUBMITTED from "@/public/registration/backgrounds/application_submitted.svg";

import PERSONAL_INFO_MOBILE from "@/public/registration/mobile_backgrounds/personal_info.svg";
import EDUCATION_MOBILE from "@/public/registration/mobile_backgrounds/education.svg";
import HACK_SPECIFIC_MOBILE from "@/public/registration/mobile_backgrounds/hack_specific.svg";
import TRANSPORTATION_MOBILE from "@/public/registration/mobile_backgrounds/transportation.svg";
import REVIEW_INFO_MOBILE from "@/public/registration/mobile_backgrounds/review_info.svg";
import APPLICATION_SUBMITTED_MOBILE from "@/public/registration/mobile_backgrounds/application_submitted.svg";

import ARTEMIS from "@/public/registration/characters/artemis.svg";
import APOLLO from "@/public/registration/characters/apollo.svg";
import NONE from "@/public/registration/characters/none.png";
import useWindowSize from "@/hooks/use-window-size";

const pages: Array<
    ElementType<{
        onChangePage: (newIndex: number) => void;
        proTrack: boolean;
    }>
> = [
    PersonalInfo,
    Education,
    HackSpecific,
    Transportation,
    ReviewInfo,
    ApplicationSubmitted
];
const reviewPageIndex = 4;
const submittedPageIndex = 5;

const backgrounds = [
    PERSONAL_INFO,
    EDUCATION,
    HACK_SPECIFIC,
    TRANSPORTATION,
    REVIEW_INFO,
    APPLICATION_SUBMITTED
];

const backgroundsMobile = [
    PERSONAL_INFO_MOBILE,
    EDUCATION_MOBILE,
    HACK_SPECIFIC_MOBILE,
    TRANSPORTATION_MOBILE,
    REVIEW_INFO_MOBILE,
    APPLICATION_SUBMITTED_MOBILE
];

const characters = [ARTEMIS, APOLLO, null, NONE, null];

const buttonNames: Array<[string, string]> = [
    ["Back", "Education"],
    ["Personal Info", "Experience"],
    ["Education", "Transportation"],
    ["Experience", "Review Info"],
    ["Transportation", "Submit"]
];

type RegistrationFormProps = {
    registration: RegistrationData;
    setHasChosen: (hasChosen: boolean) => void;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    registration,
    setHasChosen
}) => {
    const windowSizeHook = useWindowSize();
    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (newIndex: number) => {
        if (newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        if (newIndex < 0) {
            setHasChosen(false);
            return;
        }

        setFormIndex(() => newIndex);
        if (newIndex > furthestPage) {
            setFurthestPage(newIndex);
        }
        window.scroll(0, 0); // Scroll to top of page
        setIsLoading(false);
    };

    const previousPage = () => {
        handlePageChange(formIndex - 1);
    };

    const onSubmit = async (values: RegistrationData) => {
        setIsLoading(true);

        if (formIndex === reviewPageIndex) {
            await registerSubmit(registrationToAPI(registration));
            handlePageChange(submittedPageIndex);
            return;
        }

        registration = {
            ...registration,
            ...values
        };

        await registerUpdate(registrationToAPI(registration));
        handlePageChange(formIndex + 1);
    };

    return (
        <>
            {isLoading && (
                <div className={styles.loading}>
                    <h2>Loading...</h2>
                </div>
            )}
            <div
                style={{
                    backgroundImage:
                        !windowSizeHook?.width || windowSizeHook?.width > 768
                            ? `url(${backgrounds[formIndex].src})`
                            : `url(${backgroundsMobile[formIndex].src})`
                }}
                className={styles.container}
            >
                <div className={styles.contentWrapper}>
                    <ProgressBar
                        onChangePage={handlePageChange}
                        furthestPage={furthestPage}
                        disabled={formIndex === submittedPageIndex}
                    />
                    <div className={styles.formWrapper}>
                        <div className={styles.formContent}>
                            <Formik
                                initialValues={registration}
                                onSubmit={onSubmit}
                                validationSchema={getRegistrationSchema(
                                    formIndex,
                                    registration.isProApplicant
                                )}
                                enableReinitialize
                            >
                                <Form className={styles.form}>
                                    {React.createElement(pages[formIndex], {
                                        onChangePage: handlePageChange,
                                        proTrack: registration.isProApplicant
                                    })}
                                    {formIndex !== submittedPageIndex && (
                                        <div className={styles.navigation}>
                                            <NavigationButton
                                                text={buttonNames[formIndex][0]}
                                                onClick={previousPage}
                                                type="button"
                                            />
                                            <NavigationButton
                                                text={buttonNames[formIndex][1]}
                                                pointRight
                                                type="submit"
                                            />
                                        </div>
                                    )}
                                </Form>
                            </Formik>
                        </div>
                        {characters[formIndex] && (
                            <div className={styles.character}>
                                <img
                                    src={characters[formIndex].src}
                                    alt="Character"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationForm;
