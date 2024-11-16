import React, { useState, useEffect, useRef } from "react";
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
    const [filterTerm, setFilterTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        setFilterTerm("");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setFilterTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOpen) {
                if (event.key.length === 1) {
                    setFilterTerm(prev => prev + event.key);
                } else if (event.key === "Backspace") {
                    setFilterTerm(prev => prev.slice(0, -1));
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const filteredOptions = modOptions.filter(option =>
        option.toLowerCase().includes(filterTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>

            <div ref={dropdownRef}>
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
                        className={clsx(
                            styles.dropdownIcon,
                            isOpen && styles.open
                        )}
                    >
                        {isOpen ? (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="currentColor"
                            >
                                <polygon points="12,8 4,16 20,16" />
                            </svg>
                        ) : (
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
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
                        {filteredOptions.map((option, index) => (
                            <DropdownItem
                                key={index}
                                option={option}
                                onClick={handleOptionClick}
                            />
                        ))}
                    </ul>
                )}
                {!isOpen ? (
                    <h4 className={styles.errorMessage}>
                        {showFeedback && meta.error}
                    </h4>
                ) : null}
            </div>
        </div>
    );
};

export default Dropdown;
