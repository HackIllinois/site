import React from "react";
import styles from "./TextInput.module.scss";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

type TextInputProps = {
    name: string;
    className?: string;
    multiline?: boolean;
    required?: boolean;
    [key: string]: unknown;
};

const TextInput: React.FC<TextInputProps> = ({
    name,
    className,
    multiline,
    required,
    ...props
}) => {
    const { register } = useFormContext();

    return multiline ? (
        <textarea
            className={clsx(styles.input, styles.multiline, className)}
            {...register(name, { required })}
            {...props}
        />
    ) : (
        <input
            className={clsx(styles.input, className)}
            {...register(name, { required })}
            {...props}
        />
    );
};

export default TextInput;
