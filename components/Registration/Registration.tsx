"use client";
import React, { ElementType, useState, useEffect } from "react";
import styles from "./Registration.module.scss";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import ProgressBar from "../ProgressBar/ProgressBar";
import ReviewInfo from "./Pages/ReviewInfo/ReviewInfo";
import { registrationSchemas } from "./validation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import { Formik, Form, FormikHelpers } from "formik";
import { getRegistration, registerUpdate } from "@/util/api";
import { RegistrationType } from "@/util/types";

const pages: Array<
    ElementType<{
        onChangePage: (newIndex: number) => void;
    }>
> = [
    PersonalInfo,
    Education,
    HackSpecific,
    Transportation,
    ReviewInfo
    // Confirmation
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
        university: "",
        gradYear: "",
        major: "",
        minor: "",
        resumeFileName: ""
    },
    {
        hackEssay1: "",
        hackOutreach: [],
        hackInterest: [],
        dietaryRestrictions: [],
        requestedTravelReimbursement: false
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
    const [isLoading, setIsLoading] = useState(true);
    const [savedData, setSavedData] = useState<FieldValues | null>(null);

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

    const createRegistrationObject = async (
        fieldValues: FieldValues
    ): Promise<RegistrationType> => {
        const registrationWithId = await getRegistration();
        let finalRegistrationObject: RegistrationType = {
            preferredName: "",
            legalName: "",
            emailAddress: "",
            university: "",
            hackEssay1: "",
            hackEssay2: "",
            optionalEssay: "",
            resumeFileName: "",
            location: "",
            gender: "",
            degree: "",
            major: "",
            minor: "",
            gradYear: 0,
            isProApplicant: false,
            proEssay: "",
            considerForGeneral: false,
            requestedTravelReimbursement: false,
            dietaryRestrictions: [],
            race: [],
            hackInterest: [],
            hackOutreach: []
        };

        if (registrationWithId) {
            const { id, ...registration } = registrationWithId;
            finalRegistrationObject = {
                ...finalRegistrationObject,
                ...registration
            };
        }

        for (const key in finalRegistrationObject) {
            if (key in fieldValues) {
                if (key === "race") {
                    const raceValue = fieldValues[key as keyof FieldValues];
                    finalRegistrationObject.race = raceValue
                        ? Array.isArray(raceValue)
                            ? (raceValue as string[])
                            : [raceValue as string]
                        : [];
                } else if (key === "gradYear") {
                    const gradYearValue = fieldValues[key as keyof FieldValues];
                    finalRegistrationObject.gradYear = Number(gradYearValue);
                } else if (key === "requestedTravelReimbursement") {
                    if (fieldValues[key as keyof FieldValues][0] === "YES") {
                        finalRegistrationObject.requestedTravelReimbursement =
                            true;
                    }
                } else {
                    // console.log("key", key);
                    finalRegistrationObject[key as keyof RegistrationType] =
                        fieldValues[key as keyof FieldValues];
                }
            }
        }

        return finalRegistrationObject;
    };

    const onSubmit = async (
        values: FieldValues,
        formikHelpers: FormikHelpers<FieldValues>
    ) => {
        // console.log("submit", values);

        const registrationObject = await createRegistrationObject(values);

        // console.log("full thing", registrationObject);

        handlePageChange(formIndex + 1);

        registerUpdate(registrationObject)
            // repsonse is not returning resumefileName even though registration object has the field, can't figure out why
            .then(response => console.log("Response:", response))
            .catch(error => {
                console.error(
                    "Error Response:",
                    error.response?.data || error.message
                );
            });
    };

    useEffect(() => {
        getRegistration()
            .then(registrationWithId => {
                if (registrationWithId) {
                    const { id, ...registration } = registrationWithId;

                    const fieldsWithDefaults = {
                        legalName: "",
                        preferredName: "",
                        gender: "",
                        age: 0,
                        race: "",
                        emailAddress: "",
                        phoneNumber: "",
                        university: "",
                        gradYear: "",
                        major: "",
                        minor: "",
                        resumeFileName: "",
                        interestExplanation: "",
                        hackOutreach: [],
                        hackInterest: [],
                        dietaryRestrictions: [],
                        requestedTravelReimbursement: false,
                        travelAcknowledge: [],
                        travelMethod: []
                    };

                    // console.log("registration", registration);

                    const completeRegistration = {
                        ...fieldsWithDefaults,
                        ...registration,
                        race:
                            registration.race.length === 1
                                ? registration.race[0]
                                : "",
                        gradYear:
                            registration.gradYear === 0
                                ? ""
                                : registration.gradYear,
                        requestedTravelReimbursement:
                            // when boolean is false, it will set it to no, but how can we tell the difference between the default false and if a user set it to be false?
                            registration.requestedTravelReimbursement
                                ? ["YES"]
                                : ["NO"]
                    };

                    // console.log("completeRegistrion", completeRegistration);

                    if (completeRegistration.legalName != "") {
                        const savedFields = registrationSchemas[
                            formIndex
                        ]?.cast(completeRegistration, {
                            stripUnknown: true
                        }) as FieldValues | null;

                        // console.log("saved fields", savedFields);

                        setSavedData(savedFields || null);
                    }
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [formIndex]);

    if (isLoading) {
        return (
            <div className={styles.container} style={{ color: "white" }}>
                Loading...
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <ProgressBar
                    onChangePage={handlePageChange}
                    furthestPage={furthestPage}
                />
                <Formik
                    initialValues={savedData || initialValues[formIndex]}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchemas[formIndex]}
                    enableReinitialize
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
