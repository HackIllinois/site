"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dropdown from "./Dropdown";

interface DropdownWrapperProps {
    options: string[];
    name: string;
    width: string;
    required?: boolean;
}

const MainDropdown: React.FC<DropdownWrapperProps> = ({
    options,
    name,
    width,
    required
}) => {
    const methods = useForm();

    const dropdownLabel = name
        ? name.charAt(0).toUpperCase() + name.slice(1)
        : "Dropdown";

    return (
        <FormProvider {...methods}>
            <form>
                <Dropdown
                    name={name}
                    options={options}
                    width={width}
                    required={required}
                />
            </form>
        </FormProvider>
    );
};

export default MainDropdown;
