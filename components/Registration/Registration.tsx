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
import { registrationSchemas } from "./validation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import { Formik, Form, FormikHelpers } from "formik";

const pages: Array<
    ElementType<{
        onChangePage: (newIndex: number) => void;
    }>
> = [
    PersonalInfo,
    Education,
    HackSpecific,
    Transportation,
    ReviewInfo,
    ApplicationSubmitted
];

const buttonNames: Array<[string, string]> = [
    ["Back", "Education"],
    ["Personal Info", "Experience"],
    ["Education", "Transportation"],
    ["Experience", "Review Info"],
    ["Transportation", "Submit"]
];

const initialValues = [
    {
        legalName: "",
        preferredName: "",
        gender: "",
        age: "",
        race: "",
        emailAddress: "",
        phoneNumber: ""
    },
    {
        school: "",
        gradYear: "",
        major: "",
        minor: "",
        resume: ""
    },
    {
        interestExplaination: "",
        heardAbout: [],
        lookingForwardTo: [],
        allergiesRestrictions: [],
        travelReimbursement: []
    },
    {
        travelAcknowledge: [],
        travelMethod: []
    }
] as const;

type FieldValues = (typeof initialValues)[number];

const RegistrationForm: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);

    const handlePageChange = (newIndex: number) => {
        console.log("page", newIndex);
        if (newIndex < 0 || newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        setFormIndex(() => newIndex);
        if (newIndex > furthestPage) {
            setFurthestPage(newIndex);
        }
        window.scroll(0, 0); // Scroll to top of page
    };

    const previousPage = () => {
        console.log("prev");
        handlePageChange(formIndex - 1);
    };

    const onSubmit = (
        values: FieldValues,
        formikHelpers: FormikHelpers<FieldValues>
    ) => {
        console.log("submit", values);
        handlePageChange(formIndex + 1);
    };

    return (
        <>
            <div className={styles.container}>
                <ProgressBar
                    onChangePage={handlePageChange}
                    furthestPage={furthestPage}
                />
                <Formik
                    initialValues={initialValues[formIndex]}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchemas[formIndex]}
                >
                    <Form className={styles.form}>
                        {React.createElement(pages[formIndex], {
                            onChangePage: handlePageChange
                        })}
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
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default RegistrationForm;
