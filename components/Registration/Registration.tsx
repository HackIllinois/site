"use client";
import React, { ElementType, useEffect, useRef, useState } from "react";
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
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import { registerSubmit, registerUpdate, registrationToAPI } from "@/util/api";
import { RegistrationData } from "@/util/types";
import Image from "next/image";

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
import Loading from "../Loading/Loading";

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
    ["Personal Info", "Hack-Specific"],
    ["Education", "Transportation"],
    ["Hack-Specific", "Review Info"],
    ["Transportation", "Submit"]
];

type RegistrationFormProps = {
    registration: RegistrationData;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    registration
}) => {
    const windowSizeHook = useWindowSize();
    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const formikRef = useRef<FormikProps<RegistrationData>>(null);

    const loadPage = async (newIndex: number) => {
        setFormIndex(() => newIndex);
        if (newIndex > furthestPage) {
            setFurthestPage(newIndex);
        }
        window.scroll(0, 0); // Scroll to top of page
        scrollWrapperRef.current?.scroll(0, 0); // Scroll to top of page in inner scroll wrapper
    };

    const handlePageChange = async (newIndex: number) => {
        if (newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        // Wait for the form to load
        if (!formikRef.current) {
            return;
        }

        // If the current form is invalid, we can't change pages yet
        // Only check if the form has been modified
        const touched = Object.values(formikRef.current.touched).includes(true);
        if (touched) {
            const errors = await formikRef.current.validateForm();
            if (Object.keys(errors).length > 0) {
                setIsLoading(false);
                return;
            }
        }

        // Check if back to selection page
        if (newIndex < 0) {
            window.location.href = "/register";
            return;
        }

        // Update data
        registration = {
            ...registration,
            ...formikRef.current.values
        };
        setIsLoading(true);
        await registerUpdate(registrationToAPI(registration));
        setIsLoading(false);

        // Update page
        loadPage(newIndex);
        formikRef.current.setTouched({}, false); // Reset fields to not be touched
    };

    const previousPage = () => {
        handlePageChange(formIndex - 1);
    };

    const nextPage = async (_values: RegistrationData) => {
        if (formIndex === reviewPageIndex) {
            setIsLoading(true);
            await registerSubmit(registrationToAPI(registration));
            setIsLoading(false);
            loadPage(submittedPageIndex); // Load page instead of handle to skip validation & updating
            return;
        }

        handlePageChange(formIndex + 1);
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.container}>
                <Image
                    src={
                        !windowSizeHook?.width || windowSizeHook?.width > 768
                            ? backgrounds[formIndex]
                            : backgroundsMobile[formIndex]
                    }
                    alt="Background"
                    className={styles.background}
                />
                <div className={styles.contentWrapper}>
                    <ProgressBar
                        onChangePage={handlePageChange}
                        furthestPage={furthestPage}
                        disabled={formIndex === submittedPageIndex}
                    />
                    <div
                        className={styles.scrollWrapper}
                        ref={scrollWrapperRef}
                    >
                        <div className={styles.formWrapper}>
                            <div className={styles.formContent}>
                                <Formik
                                    innerRef={formikRef}
                                    initialValues={registration}
                                    onSubmit={nextPage}
                                    validationSchema={getRegistrationSchema(
                                        formIndex,
                                        registration.isProApplicant
                                    )}
                                    enableReinitialize
                                >
                                    <Form className={styles.form}>
                                        {React.createElement(pages[formIndex], {
                                            onChangePage: handlePageChange,
                                            proTrack:
                                                registration.isProApplicant
                                        })}
                                        {formIndex !== submittedPageIndex && (
                                            <div className={styles.navigation}>
                                                <NavigationButton
                                                    text={
                                                        buttonNames[
                                                            formIndex
                                                        ][0]
                                                    }
                                                    onClick={previousPage}
                                                    type="button"
                                                />
                                                <NavigationButton
                                                    text={
                                                        buttonNames[
                                                            formIndex
                                                        ][1]
                                                    }
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
            </div>
        </>
    );
};

export default RegistrationForm;
