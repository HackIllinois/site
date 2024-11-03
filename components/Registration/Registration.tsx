"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./Registration.module.scss";
import Navigation from "./Navigation/Navigation";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import ReviewInfo from "./Pages/ReviewInfo/ReviewInfo";

const Confirmation: React.FC = () => {
    return <div></div>;
};

const pages: Array<React.FC> = [
    PersonalInfo,
    Education,
    // Experience,
    HackSpecific,
    Transportation,
    ReviewInfo,
    Confirmation
];

const Form: React.FC = () => {
    const [formIndex, setFormIndex] = useState(3);

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
                        {React.createElement(
                            pages[formIndex] as React.ElementType<{
                                onChangePage?: (newIndex: number) => void;
                            }>,
                            formIndex === 3
                                ? { onChangePage: handlePageChange }
                                : undefined
                        )}
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
