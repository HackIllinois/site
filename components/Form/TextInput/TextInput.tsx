"use client";
import React, { useState } from "react";
import styles from "./TextInput.module.scss";
import clsx from "clsx";
import { Field, useField } from "formik";

type TextInputProps = {
    name: string;
    label: string;
    className?: string;
    multiline?: boolean;
    required?: boolean;
    [key: string]: unknown;
};

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    className,
    multiline,
    required,
    ...props
}) => {
    const [field, meta] = useField(name);
    const [didFocus, setDidFocus] = useState(false);

    const handleFocus = () => setDidFocus(true);
    const showFeedback =
        meta.error &&
        ((didFocus &&
            (typeof field.value != "string" ||
                field.value.trim().length > 2)) ||
            meta.touched);

    return (
        <div className={styles.container}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            {multiline ? (
                <Field
                    as="textarea"
                    name={name}
                    className={clsx(
                        styles.input,
                        styles.multiline,
                        className,
                        showFeedback && styles.invalid
                    )}
                    onFocus={handleFocus}
                    {...props}
                />
            ) : (
                <Field
                    as="input"
                    name={name}
                    className={clsx(
                        styles.input,
                        className,
                        showFeedback && styles.invalid
                    )}
                    onFocus={handleFocus}
                    {...props}
                />
            )}
            <h4>{showFeedback && meta.error}</h4>
        </div>
    );
};

export default TextInput;
