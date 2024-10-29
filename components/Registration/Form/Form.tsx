"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./Form.module.scss";
import Navigation from "../Navigation/Navigation";
import Transportation from "./pages/Transportation/Transportation";

export type FormPageProps = {
    containerClass: string;
    headerClass: string;
    questionClass: string;
    questionTextClass: string;
    requiredClass: string;
};

const formProps = {
    containerClass: styles.formContainer,
    headerClass: styles.formHeader,
    questionClass: styles.formQuestion,
    questionTextClass: styles.formQuestionText,
    requiredClass: styles.formRequiredClass
} satisfies FormPageProps;

const pages: Array<React.FC<FormPageProps>> = [
    // PersonalInfo,
    // Education,
    // Experience,
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
                    <form>
                        {React.createElement(pages[formIndex], formProps)}
                    </form>
                </FormProvider>
                {formIndex != pages.length - 1 ||
                    (true && (
                        <Navigation
                            index={formIndex}
                            handlePrevious={previousPage}
                            handleNext={nextPage}
                        />
                    ))}
            </div>
        </>
    );
};

export default Form;
