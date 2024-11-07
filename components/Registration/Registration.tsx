"use client";
import React, { useState } from "react";
import styles from "./Registration.module.scss";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import { registrationSchemas } from "./validation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import { Formik, Form, FormikHelpers } from "formik";

const pages: Array<React.FC> = [
    PersonalInfo,
    Education,
    HackSpecific,
    Transportation
    // Review,
    // Confirmation
];

const buttonNames: Array<[string, string]> = [
    ["Back", "Education"],
    ["Personal Info", "Experience"],
    ["Education", "Transportation"],
    ["Experience", "Review Info"]
    // ["Transportation", "Submit"]
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
    const [formIndex, setFormIndex] = useState(2);

    const handlePageChange = (newIndex: number) => {
        console.log("page", newIndex);
        if (newIndex < 0 || newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        setFormIndex(() => newIndex);
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
                <Formik
                    initialValues={initialValues[formIndex]}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchemas[formIndex]}
                >
                    <Form className={styles.form}>
                        {React.createElement(pages[formIndex])}
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
