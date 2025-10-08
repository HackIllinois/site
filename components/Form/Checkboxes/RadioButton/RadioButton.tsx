import React, { ReactNode } from "react";
import clsx from "clsx";

import styles from "./RadioButton.module.scss";

type PropTypes = {
    value: string | number;
    label: string | ReactNode;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    radio?: boolean;
    style?: React.CSSProperties;
    blue?: boolean;
    [key: string]: unknown;
};

/**
 * This component is deprecated and will be removed in a future release.
 * Please use MUI instead.
 */
const RadioButton: React.FC<PropTypes> = ({
    value,
    label,
    checked,
    className,
    radio,
    style,
    blue,
    ...props
}) => (
    <label
        className={clsx(
            styles.checkboxLabel,
            checked && styles.checked,
            radio && styles.radio,
            blue && styles.buttonBlue,
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
