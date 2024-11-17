"use client";
import React, { ElementType, useRef, useState } from "react";
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

import PERSONAL_INFO from "@/public/registration/backgrounds/personal_info.svg";
import EDUCATION from "@/public/registration/backgrounds/education.svg";
import HACK_SPECIFIC from "@/public/registration/backgrounds/hack_specific.svg";
import TRANSPORTATION from "@/public/registration/backgrounds/transportation.svg";
import REVIEW_INFO from "@/public/registration/backgrounds/review_info.svg";

import PERSONAL_INFO_MOBILE from "@/public/registration/mobile_backgrounds/personal_info.svg";
import EDUCATION_MOBILE from "@/public/registration/mobile_backgrounds/education.svg";
import HACK_SPECIFIC_MOBILE from "@/public/registration/mobile_backgrounds/hack_specific.svg";
import TRANSPORTATION_MOBILE from "@/public/registration/mobile_backgrounds/transportation.svg";
import REVIEW_INFO_MOBILE from "@/public/registration/mobile_backgrounds/review_info.svg";

import ARTEMIS from "@/public/registration/characters/artemis.svg";
import APOLLO from "@/public/registration/characters/apollo.svg";
import NONE from "@/public/registration/characters/none.png";
import useWindowSize from "@/hooks/use-window-size";

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

const backgrounds = [
    PERSONAL_INFO,
    EDUCATION,
    HACK_SPECIFIC,
    TRANSPORTATION,
    REVIEW_INFO
    // TODO: Add confirmation background
];

const backgroundsMobile = [
    PERSONAL_INFO_MOBILE,
    EDUCATION_MOBILE,
    HACK_SPECIFIC_MOBILE,
    TRANSPORTATION_MOBILE,
    REVIEW_INFO_MOBILE
    // TODO: Add confirmation background
];

const characters = [ARTEMIS, APOLLO, null, NONE, NONE];

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
    const windowSizeHook = useWindowSize();

    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);

    const contentRef = useRef<HTMLDivElement>(null);

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

    const onSubmit = (
        values: FieldValues,
        formikHelpers: FormikHelpers<FieldValues>
    ) => {
        console.log("submit", values);
        handlePageChange(formIndex + 1);
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
                <ProgressBar
                    onChangePage={handlePageChange}
                    furthestPage={furthestPage}
                />
                <div className={styles.formWrapper}>
                    <div className={styles.formContent}>
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
        </>
    );
};

export default RegistrationForm;
