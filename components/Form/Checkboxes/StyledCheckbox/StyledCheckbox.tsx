import React, { ReactNode } from "react";
import clsx from "clsx";

import styles from "./StyledCheckbox.module.scss";

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

const StyledCheckbox: React.FC<PropTypes> = ({
    value,
    label,
    checked,
    className,
    style,
    blue,
    ...props
}) => (
    <div className={styles.checkboxWrapper}>
        <label
            className={clsx(
                styles.checkboxLabel,
                checked && styles.checked,
                blue && styles.blue,
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
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.checkboxSvg}
            >
                <path
                    d="M 10 10 L 90 90"
                    stroke="#000"
                    strokeDasharray="113"
                    strokeDashoffset={checked ? "0" : "113"}
                />
                <path
                    d="M 90 10 L 10 90"
                    stroke="#000"
                    strokeDasharray="113"
                    strokeDashoffset={checked ? "0" : "113"}
                />
            </svg>
            {label}
        </label>
    </div>
);

export default StyledCheckbox;
