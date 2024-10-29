import React from "react";
import styles from "./StyledInput.module.scss";
import clsx from "clsx";

type StyledInputProps = {
    name?: string;
    className?: string;
    multiline?: boolean;
    required?: boolean;
    [key: string]: unknown;
};

const StyledInput: React.FC<StyledInputProps> = ({
    name,
    className,
    multiline,
    required,
    ...props
}) => {
    return multiline ? (
        <textarea
            className={clsx(styles.input, styles.multiline, className)}
            {...props}
        />
    ) : (
        <input className={clsx(styles.input, className)} {...props} />
    );
};

export default StyledInput;
