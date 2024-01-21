import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";

import ReactSelect from "react-select";
import ReactSelectCreatable from "react-select/creatable";

import styles from "./styles.module.scss";
import customStyles from "./styles";
import ErrorMessage from "../ErrorMessage";

// Modified from https://github.com/JedWatson/react-select/issues/3067

export type OptionType = {
    label: string;
    value: unknown;
    isDisabled?: boolean;
};

const customFilterOption = (option: OptionType, rawInput: string) => {
    if (String(option.label).toLowerCase() === "other") {
        return true;
    }

    const words = rawInput.split(" ");
    return words.reduce(
        (acc, cur) =>
            acc &&
            String(option.label)
                .toLowerCase()
                .includes(String(cur).toLowerCase()),
        true
    );
};

type PropTypes = {
    name: string;
    options: OptionType[];
    creatable?: boolean;
    isMulti?: boolean;
    className?: string;
    [key: string]: unknown;
};

const Select = ({
    name,
    options = [],
    creatable,
    isMulti = false,
    className,
    ...props
}: PropTypes): JSX.Element => {
    const { control } = useFormContext();
    const {
        field: { onChange, onBlur, value, ref }
    } = useController({ name, control });
    const [isFocused, setIsFocused] = useState(false);

    const isFieldBlank = ["", null, undefined].includes(value);

    if (creatable) {
        options = [
            {
                label: "Note: You can type a custom option if none of these options match",
                value: null,
                isDisabled: true
            } as OptionType
        ].concat(options);

        // if the selected value is not among the options, add it (since this is a creatable select)
        if (!isFieldBlank && options.every(option => value !== option.value)) {
            options = options.concat({ value, label: value });
        }
    }

    const getValue = () => {
        if (isMulti) {
            if (value === undefined || value === null) {
                return [];
            }
            return options.filter(option => value.includes(option.value));
        }
        return options.find(option => value === option.value);
    };

    const handleChange = (selected: OptionType | OptionType[] | null) => {
        if (Array.isArray(selected)) {
            const newValues = selected
                ? selected.map(option => option.value)
                : [];
            onChange(newValues);
        } else {
            const newValue = selected ? selected.value : undefined;
            onChange(newValue);
        }
    };

    const SelectComponent: React.ElementType = creatable
        ? ReactSelectCreatable
        : ReactSelect;

    return (
        <>
            <SelectComponent
                name={name}
                ref={ref}
                // hide value when menu is open so placeholder can be seen (unless it's a multiselect)
                value={isFocused && !isMulti ? "" : getValue()}
                onChange={handleChange as any}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                }}
                onFocus={() => setIsFocused(true)}
                className={clsx(styles.select, className)}
                options={options}
                isMulti={isMulti}
                blurInputOnSelect={!isMulti}
                closeMenuOnSelect={!isMulti}
                menuPosition="absolute"
                menuPlacement="auto"
                // menuPortalTarget={document.body}
                menuShouldBlockScroll
                filterOption={customFilterOption}
                styles={customStyles}
                isClearable
                {...props}
            />

            <ErrorMessage name={name} />
        </>
    );
};

export default Select;
