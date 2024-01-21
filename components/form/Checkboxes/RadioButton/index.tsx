import React from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

type PropTypes = {
    value: string | number;
    label: string | number;
    checked: boolean;
    className?: string;
    radio?: boolean;
    style?: React.CSSProperties;
    [key: string]: unknown;
};

const StyledCheckbox = ({
    value,
    label,
    checked,
    className,
    radio,
    style,
    ...props
}: PropTypes): JSX.Element => (
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

export default StyledCheckbox;
