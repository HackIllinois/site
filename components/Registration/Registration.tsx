"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./Registration.module.scss";
import Navigation from "./Navigation/Navigation";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import ProgressBar from "../ProgressBar/ProgressBar";

const pages: Array<React.FC> = [
    PersonalInfo,
    Education,
    // Experience,
    HackSpecific,
    Transportation
    // Review,
    // Confirmation
];

const Form: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);
    const [furthestPage, setFurthestPage] = useState(0);

    const methods = useForm();

    const handlePageChange = (newIndex: number) => {
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
        handlePageChange(formIndex - 1);
    };

    const nextPage = () => {
        handlePageChange(formIndex + 1);
    };

    return (
        <>
            <div className={styles.container}>
                <ProgressBar
                    onChangePage={handlePageChange}
                    furthestPage={furthestPage}
                />
                <FormProvider {...methods}>
                    <form className={styles.form}>
                        {React.createElement(pages[formIndex])}
                    </form>
                </FormProvider>
                {formIndex != pages.length - 1 && (
                    <Navigation
                        index={formIndex}
                        handlePrevious={previousPage}
                        handleNext={nextPage}
                    />
                )}
            </div>
        </>
    );
};

export default Form;
