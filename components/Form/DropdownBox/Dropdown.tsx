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
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null); 
    const dropdownRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null); 

    const handleFocus = () => {
        setFocus(true);
        setDidFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const showFeedback = meta.error && ((didFocus && !focus) || meta.touched);

    const modOptions = required ? options : [placeholder, ...options];

    const handleToggle = (e: React.MouseEvent) => {
        if (focus) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isOpen) {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                let scroll = true

               if (focusedIndex == modOptions.length - 1 && ulRef.current) {
                 ulRef.current.scrollTop = 0;
                 scroll = false
               }

                setFocusedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex === modOptions.length - 1) {
                        return 0; 
                    }
                    return prevIndex + 1;
                });

               
                if (ulRef.current && (focusedIndex != null && focusedIndex >= 0) && scroll) {
                    const optionHeight = ulRef.current.clientHeight / modOptions.length;
                    ulRef.current.scrollTop += optionHeight;
                }

            } else if (event.key === "ArrowUp") {
                event.preventDefault();

                let scroll = true

                if (ulRef.current && focusedIndex == 0) {
                    ulRef.current.scrollTop = ulRef.current.clientHeight * modOptions.length;;
                    scroll = false
                }

                setFocusedIndex((prevIndex) => {
                    if (prevIndex === null || prevIndex === 0) {
                        return modOptions.length - 1; 
                    }
                    return prevIndex - 1;
                });


                if (ulRef.current && (focusedIndex != null && focusedIndex <= modOptions.length) && scroll) {
                    const optionHeight = ulRef.current.clientHeight / modOptions.length;
                    ulRef.current.scrollTop -= optionHeight;
                }

            } else if (event.key === "Enter") {
                event.preventDefault();
                if (focusedIndex !== null) {
                    setValue(modOptions[focusedIndex]);
                    setIsOpen(false);
                    setFilterTerm("");
                }
            } else if (event.key === "Tab") {
                setIsOpen(false);
                setFocus(false);
                setDidFocus(true);
                setFilterTerm("");
            }
        }
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
                    setFilterTerm((prev) => prev + event.key);
                } else if (event.key === "Backspace") {
                    setFilterTerm((prev) => prev.slice(0, -1));
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

            <div ref={dropdownRef} onKeyDown={handleKeyDown}>
                <button
                    className={clsx(
                        styles.dropdownButton,
                        showFeedback && styles.invalid
                    )}
                    onClick={handleToggle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
                        ref={ulRef} // Reference for the dropdown options list
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
                                isFocused={index === focusedIndex} // Highlight focused option
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
