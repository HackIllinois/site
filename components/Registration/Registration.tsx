"use client";
import React, { ElementType, useRef, useState, useEffect } from "react";
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
import { registerUpdate, registrationToAPI } from "@/util/api";
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

const characters = [ARTEMIS, APOLLO, null, NONE, NONE];

const buttonNames: Array<[string, string]> = [
    ["Back", "Education"],
    ["Personal Info", "Experience"],
    ["Education", "Transportation"],
    ["Experience", "Review Info"],
    ["Transportation", "Submit"],
    ["", "Exit"]
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

    const contentRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (newIndex: number) => {
        console.log("page", newIndex);
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
        contentRef?.current?.scroll({
            // Necessary for mobile: the content div is fixed to the screen height, and is scrollable
            top: 0,
            left: 0
        });
    };

    const previousPage = () => {
        console.log("prev");
        window.scrollTo(0, 0);
        contentRef?.current?.scroll({
            top: 0,
            left: 0
        });
        handlePageChange(formIndex - 1);
    };

    const onSubmit = async (
        values: RegistrationData,
        formikHelpers: FormikHelpers<RegistrationData>
    ) => {
        console.log(registration);
        console.log(values);
        registration = {
            ...registration,
            ...values
        };
        console.log(registration);

        handlePageChange(formIndex + 1);
        console.log(registration);

        registerUpdate(registrationToAPI(registration))
            .then(response => console.log("Response:", response))
            .catch(error => {
                console.error(
                    "Error Response:",
                    error.response?.data || error.message
                );
            });
    };

    const size = useWindowSize();

    return (
        <>
            <div
                ref={contentRef}
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
                                    <div className={styles.navigation}>
                                        {buttonNames[formIndex][0] !== "" && (
                                            <NavigationButton
                                                text={buttonNames[formIndex][0]}
                                                onClick={previousPage}
                                                type="button"
                                            />
                                        )}
                                        <NavigationButton
                                            text={buttonNames[formIndex][1]}
                                            pointRight
                                            type="submit"
                                        />
                                    </div>
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
