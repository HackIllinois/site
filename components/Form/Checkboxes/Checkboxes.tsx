import React, { ChangeEvent, useCallback, useMemo } from "react";
import clsx from "clsx";
// import { useController, useFormContext } from "react-hook-form";

import styles from "./Checkboxes.module.scss";
import StyledCheckbox from "./StyledCheckbox/StyledCheckbox";
import RadioButton from "./RadioButton/RadioButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useController, useFormContext } from "react-hook-form";
import StyledInput from "./StyledInput/StyledInput";

export type CheckboxOption = {
    label: string | number;
    value: string | number;

    // `isRadio: true` indicates that this specific checkbox will act like a radio button
    // (i.e. if this is checked, then no other checkbox may be also checked)
    isRadio?: boolean;
} & (
    | { isOther: true; otherPlaceholder?: string }
    | { isOther?: false; otherPlaceholder?: never }
);

type PropTypes = {
    name: string;
    options: CheckboxOption[];
    hideErrors?: boolean;
    className?: string;
    style?: React.CSSProperties;
    required?: boolean;
    threeColEnabled?: boolean;

    [key: string]: unknown;
};

const Checkboxes = ({
    name,
    options = [],
    hideErrors,
    className,
    style,
    threeColEnabled,
    required,
    ...props
}: PropTypes): JSX.Element => {
    // The checkboxes component is a modified version of the one used in the HackIllinois 2024 website.

    const { control } = useFormContext();

    // if the given value doesn't match any option's value, then it must have come from the "Other" option
    const isValueOther = (value: string) =>
        options.every(option => option.value !== value);

    const { field } = useController({
        name,
        control,
        rules: {
            validate: value => {
                if (required) {
                    if (!value || value.length === 0) {
                        return "At least one option must be selected";
                    }
                    // check that, if an "Other" option is selected, the user has entered a value
                }
                if (value) {
                    const otherOptionValue = value.find(isValueOther);
                    if (otherOptionValue !== undefined && !otherOptionValue) {
                        return "Please specify your answer";
                    }
                }

                return true;
            }
        }
    });

    const selectedValues: any[] = useMemo(() => {
        return field.value || [];
    }, [field]);

    // if we can't find an option the desired value, then we assume the user chose the "Other" option
    const findOptionWithValue = (value: string): CheckboxOption | undefined =>
        options.find(option => option.value === value) ||
        options.find(option => option.isOther); // we assume there's only one "Other" option

    // get the value corresponding to the "Other" checkbox
    const getOtherValue = () => selectedValues.find(isValueOther);
    const [otherValueTemp, setOtherValueTemp] = React.useState<
        string | undefined
    >(getOtherValue());

    // remove user-inputted values that were entered through the "Other" option
    // (i.e. not present as the value of any option)
    const removeOther = (values: string[]) =>
        values.filter(value => !isValueOther(value));

    const isChecked = ({ value, isOther = false }: CheckboxOption) =>
        selectedValues.includes(value) ||
        (isOther && getOtherValue() !== undefined);

    // `checked: true` indicates that option should be selected, `checked: false` indicates should be unselected
    const handleSelect = (
        checked: boolean,
        { value, isRadio, isOther }: CheckboxOption
    ) => {
        let newSelectedValues: any[] = [];

        // if checked === true and the option isn't already selected, select it
        if (checked && !selectedValues.includes(value)) {
            if (isRadio) {
                // if isRadio, then we want to unselect all currently selected checkboxes
                newSelectedValues = [];
            } else {
                // otherwise, unselect all other checkboxes with isRadio == true
                newSelectedValues = selectedValues.filter(
                    val => !findOptionWithValue(val)?.isRadio
                );
            }

            let newValue = value;
            if (isOther) {
                // if the "Other" checkbox is clicked, we ignore the checkbox value, and instead set the value to
                // an empty string, which the user can later modify through a text field
                newValue = "";
            }
            field.onChange(newSelectedValues.concat(newValue));
        }

        if (!checked) {
            // we want to unselect the option
            if (isOther) {
                field.onChange(removeOther(selectedValues));
            } else {
                field.onChange(selectedValues.filter(val => val !== value));
            }
        }
    };

    const checkedOtherOption = useMemo(() => {
        return options.find(option => option.isOther && isChecked(option));
    }, [options, selectedValues]);

    const handleChangeOther = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setOtherValueTemp(e.target.value);
            field.onChange(removeOther(selectedValues).concat(e.target.value));
        },
        [selectedValues, field]
    );

    const otherOptionInputComponent = useMemo(() => {
        if (!checkedOtherOption) {
            return <></>;
        }
        return (
            <StyledInput
                placeholder={
                    checkedOtherOption.otherPlaceholder ||
                    "If selected 'Other', then please specify here"
                }
                value={otherValueTemp || ""}
                onChange={handleChangeOther}
            />
        );
    }, [checkedOtherOption, otherValueTemp, handleChangeOther]);

    return (
        <>
            <div
                className={clsx(
                    styles.checkboxes,
                    threeColEnabled && styles.threeCol,
                    className
                )}
                style={style}
                {...props}
            >
                {options.map(option => (
                    <React.Fragment key={option.value}>
                        {option.isRadio ? (
                            <RadioButton
                                value={option.value}
                                label={option.label}
                                checked={isChecked(option)}
                                radio={option.isRadio}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleSelect(e.target.checked, option)
                                }
                                style={
                                    option.isOther && isChecked(option)
                                        ? { marginBottom: 10 }
                                        : {}
                                }
                            />
                        ) : (
                            <StyledCheckbox
                                value={option.value}
                                label={option.label}
                                checked={isChecked(option)}
                                radio={option.isRadio}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleSelect(e.target.checked, option)
                                }
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {checkedOtherOption && otherOptionInputComponent}

            <ErrorMessage
                name={name}
                type={props.isRadio ? "checkbox" : "radio"}
            />
        </>
    );
};

export default Checkboxes;
