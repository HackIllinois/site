import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";

import styles from "./styles.module.scss";
import StyledCheckbox from "./StyledCheckbox";
import RadioButton from "./RadioButton";
import StyledInput from "../Input/StyledInput";
import ErrorMessage from "../ErrorMessage";

export type CheckboxOption = {
    label: string | number;
    value: string | number;

    // `isRadio: true` indicates that this specific checkbox will act like a radio button
    // (i.e. if this is checked, then no other checkbox may be also checked)
    isRadio?: boolean;

    // `isRadioButton: true` indicates that this specific checkbox is a radio button
    // and the css will change accordingly
    isRadioButton?: boolean;

    // there can be exactly one checkbox that serves as an "Other" option, and will allow the user
    // to enter their own choice for the `value` through a text input
    isOther?: boolean;
    otherPlaceholder?: string;
};

type PropTypes = {
    name: string;
    options: CheckboxOption[];
    hideErrors?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
};

const Checkboxes = ({
    name,
    options = [],
    hideErrors,
    className,
    style,
    ...props
}: PropTypes): JSX.Element => {
    const { control } = useFormContext();
    const { field } = useController({ name, control });

    const selectedValues: any[] = field.value;

    // if we can't find an option the desired value, then we assume the user chose the "Other" option
    const findOptionWithValue = (value: string): CheckboxOption | undefined =>
        options.find(option => option.value === value) ||
        options.find(option => option.isOther); // we assume there's only one "Other" option

    // if the given value doesn't match any option's value, then it must have come from the "Other" option
    const isValueOther = (value: string) =>
        options.every(option => option.value !== value);

    // get the value corresponding to the "Other" checkbox
    const getOtherValue = () => selectedValues.find(isValueOther);

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

    // handle change for the "Other" text field
    const handleChangeOther = (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange(removeOther(selectedValues).concat(e.target.value));
    };

    return (
        <div
            className={clsx(styles.checkboxes, className)}
            style={style}
            {...props}
        >
            {options.map(option => (
                <React.Fragment key={option.value}>
                    {option.isRadioButton ? (
                        <RadioButton
                            value={option.value}
                            label={option.label}
                            checked={isChecked(option)}
                            radio={option.isRadioButton}
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
                            radio={option.isRadioButton}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleSelect(e.target.checked, option)
                            }
                            style={
                                option.isOther && isChecked(option)
                                    ? { marginBottom: 10 }
                                    : {}
                            }
                        />
                    )}
                    {option.isOther && isChecked(option) && (
                        <StyledInput
                            placeholder={
                                option.otherPlaceholder ||
                                "If selected 'Other', then please specify here"
                            }
                            value={getOtherValue()}
                            onChange={handleChangeOther}
                        />
                    )}
                </React.Fragment>
            ))}
            <ErrorMessage name={name} type="checkbox" />
        </div>
    );
};

export default Checkboxes;
