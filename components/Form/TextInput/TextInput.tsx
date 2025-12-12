"use client";
import clsx from "clsx";
import { Field, useField } from "formik";
import React from "react";
import styles from "./TextInput.module.scss";

type TextInputProps = {
    name: string;
    label: string;
    className?: string;
    multiline?: boolean;
    required?: boolean;
    [key: string]: unknown;
};

/**
 * This component is deprecated and will be removed in a future release.
 * Please use MUI instead.
 */
const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    className,
    multiline,
    required,
    ...props
}) => {
    const [, meta] = useField(name);
    const showFeedback = meta.error && meta.touched;

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
                    {...props}
                />
            )}
            {showFeedback && <h4>{meta.error}</h4>}
        </div>
    );
};

export default TextInput;
