"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import styles from "./Form.module.scss";

const pages: Array<React.FC> = [];

const Form: React.FC = () => {
    const [formIndex, setFormIndex] = useState(0);

    const methods = useForm();

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form>{React.createElement(pages[formIndex])}</form>
            </FormProvider>
        </div>
    );
};
