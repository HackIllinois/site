"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import DropdownItem from "./DropdownItem";
import "./Dropdown.scss";

interface DropdownProps {
    name: string;
    options: string[];
    width?: string; // Accepting width as an optional prop
    placeholder?: string;
    required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    options,
    width,
    placeholder = "Select...",
    required = false
}) => {
    const modOptions = [placeholder, ...options];
    const { setValue, register } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setValue(name, option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown" style={{ width }}>
            <div className="dropdown-container">
                <button onClick={handleToggle} className="dropdown-button">
                    {selectedOption || placeholder}
                    <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>
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
                    <ul className={`dropdown-options ${isOpen ? "open" : ""}`}>
                        {modOptions.map((option, index) => (
                            <DropdownItem
                                key={index}
                                option={option}
                                onClick={handleOptionClick}
                            />
                        ))}
                    </ul>
                )}
            </div>
            <input
                type="hidden"
                {...register(name, { required })}
                value={selectedOption || ""}
                onChange={() => {}}
            />
        </div>
    );
};

export default Dropdown;
