"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./Registration.module.scss";
import Navigation from "./Navigation/Navigation";
import Transportation from "./Pages/Transportation/Transportation";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";

const pages: Array<React.FC> = [
    PersonalInfo,
    // Education,
    // Experience,
    HackSpecific,
    Transportation
    // Review,
    // Confirmation
];

const Form: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);

    const methods = useForm();

    const handlePageChange = (newIndex: number) => {
        if (newIndex < 0 || newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        setFormIndex(() => newIndex);
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
