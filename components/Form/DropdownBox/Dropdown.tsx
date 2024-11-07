"use client";
import React, { useState } from "react";
import DropdownItem from "./DropdownItem";
import styles from "./Dropdown.module.scss";
import { useField } from "formik";
import clsx from "clsx";

interface DropdownProps {
    name: string;
    label: string;
    options: string[];
    placeholder?: string;
    required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    label,
    options,
    placeholder = "Select...",
    required = false
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { value } = field;

    const [isOpen, setIsOpen] = useState(false);
    const [didFocus, setDidFocus] = useState(false);
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(!focus);
        setDidFocus(true);
    };
    const showFeedback = meta.error && ((didFocus && !focus) || meta.touched);

    const modOptions = required ? options : [placeholder, ...options];

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setValue(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.container}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            <button
                className={clsx(
                    styles.dropdownButton,
                    showFeedback && styles.invalid
                )}
                onClick={handleToggle}
                onFocus={handleFocus}
                onBlur={handleFocus}
            >
                {value || placeholder}
                <span
                    className={clsx(styles.dropdownIcon, isOpen && styles.open)}
                >
                    {isOpen ? (
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="12,8 4,16 20,16" />
                        </svg>
                    ) : (
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <polygon points="4,8 20,8 12,16" />
                        </svg>
                    )}
                </span>
            </button>
            {isOpen && (
                <ul
                    className={clsx(
                        styles.dropdownOptions,
                        isOpen && styles.open
                    )}
                    onBlur={() => setIsOpen(false)}
                >
                    {modOptions.map((option, index) => (
                        <DropdownItem
                            key={index}
                            option={option}
                            onClick={handleOptionClick}
                        />
                    ))}
                </ul>
            )}
            <h4>{showFeedback && meta.error}</h4>
        </div>
    );
};

export default Dropdown;
