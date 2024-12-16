import React from "react";
import clsx from "clsx";

import styles from "./RadioButton.module.scss";

type PropTypes = {
    value: string | number;
    label: string | number;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    radio?: boolean;
    style?: React.CSSProperties;
    [key: string]: unknown;
};

const RadioButton: React.FC<PropTypes> = ({
    value,
    label,
    checked,
    className,
    radio,
    style,
    ...props
}) => (
    <label
        className={clsx(
            styles.checkboxLabel,
            checked && styles.checked,
            radio && styles.radio,
            className
        )}
        style={style}
    >
        <input
            type="checkbox"
            className={styles.checkbox}
            value={value}
            checked={checked}
            {...props}
        />
        {label}
    </label>
);

export default RadioButton;
