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
import { registerUpdate, registrationToAPI } from "@/util/api";
import { RegistrationData } from "@/util/types";

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
    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);

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
    };

    const previousPage = () => {
        handlePageChange(formIndex - 1);
    };

    const onSubmit = async (values: RegistrationData) => {
        registration = {
            ...registration,
            ...values
        };

        handlePageChange(formIndex + 1);

        registerUpdate(registrationToAPI(registration));
    };

    return (
        <>
            <div className={styles.container}>
                <ProgressBar
                    onChangePage={handlePageChange}
                    furthestPage={furthestPage}
                />
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
        </>
    );
};

export default RegistrationForm;
