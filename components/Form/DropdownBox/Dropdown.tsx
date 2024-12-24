import React from "react";
import { useField } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import styles from "./Dropdown.module.scss";

interface DropdownProps {
    name: string;
    label: string;
    options: string[];
    creatable?: boolean;
    placeholder?: string;
    required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    name,
    label,
    options,
    creatable = false,
    placeholder = "Select...",
    required = false
}) => {
    const [field, meta, helpers] = useField(name);
    const showFeedback = meta.error && meta.touched;

    let formattedOptions = options.map(option => ({
        label: option,
        value: option
    }));

    const SelectComponent = creatable ? CreatableSelect : Select;

    // See: https://github.com/JedWatson/react-select/issues/3067
    // Supports multi-word search
    const customFilterOption = (
        option: { label: string },
        rawInput: string
    ) => {
        const words = rawInput.split(" ");
        return words.reduce(
            (acc, cur) =>
                acc && option.label.toLowerCase().includes(cur.toLowerCase()),
            true
        );
    };

    return (
        <div className={styles.dropdown}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="text-danger">*</span>}
            </label>

            <SelectComponent
                classNames={{
                    control: () => styles.dropdownControl,
                    singleValue: () => styles.dropdownSingleValue,
                    option: () => styles.dropdownOption,
                    placeholder: () => styles.dropdownPlaceholder
                }}
                className={(showFeedback && styles.invalid) || ""}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "#ad8e28",
                        primary25: "#ad8e2830",
                        primary50: "#ad8e2860"
                    }
                })}
                id={name}
                name={name}
                options={formattedOptions}
                value={
                    field.value
                        ? { value: field.value, label: field.value }
                        : null
                }
                onChange={selectedOption =>
                    helpers.setValue(selectedOption?.value)
                }
                onBlur={() => helpers.setTouched(true)}
                placeholder={placeholder}
                filterOption={customFilterOption}
            />

            {showFeedback && <h4>{meta.error}</h4>}
        </div>
    );
};

export default Dropdown;
