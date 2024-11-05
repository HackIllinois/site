"use client";
import React, { useState } from "react";
import {
    FieldErrors,
    FieldValues,
    FormProvider,
    useForm
} from "react-hook-form";

import styles from "./Registration.module.scss";
import Transportation from "./Pages/Transportation/Transportation";
import Education from "./Pages/Education/Education";
import HackSpecific from "./Pages/HackSpecific/HackSpecific";
import PersonalInfo from "./Pages/PersonalInfo/PersonalInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, registrationSchemas } from "./validation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";

const pages: Array<React.FC> = [
    PersonalInfo,
    Education,
    // Experience,
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

const Form: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);

    const methods = useForm({
        resolver: zodResolver(registrationSchemas[formIndex])
    });

    const { getValues, handleSubmit } = methods;

    const handlePageChange = (newIndex: number) => {
        if (newIndex < 0 || newIndex >= pages.length) {
            return; // This shouldn't happen
        }

        setFormIndex(() => newIndex);
        window.scroll(0, 0); // Scroll to top of page
        console.log(getValues());
    };

    const previousPage = () => {
        handlePageChange(formIndex - 1);
    };

    const onSubmit = (values: FieldValues) => {
        console.log(values);
        handlePageChange(formIndex + 1);
    };

    const onError = (errors: FieldErrors<FieldValues>) => {
        console.log(errors);
    };

    return (
        <>
            <div className={styles.container}>
                <FormProvider {...methods}>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit, onError)}
                    >
                        {React.createElement(pages[formIndex])}
                        <div className={styles.navigation}>
                            <NavigationButton
                                text={buttonNames[formIndex][0]}
                                onClick={previousPage}
                            />
                            <NavigationButton
                                text={buttonNames[formIndex][1]}
                                pointRight
                                type="submit"
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default Form;
