import React from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "../ErrorMessage";
import StyledInput from "./StyledInput";
import HelpIcon from "./HelpIcon";
import styles from "./styles.module.scss";

type PropTypes = {
    name: string;
    multiline?: boolean;
    helpLink?: string;
    disabled?: boolean;
    linkColor?: string;
    [key: string]: unknown;
};

const Input = ({
    name,
    multiline,
    helpLink,
    disabled,
    linkColor = "white",
    ...props
}: PropTypes): JSX.Element => {
    const { register } = useFormContext();

    return (
        <>
            <div className={styles.inputContainer}>
                <StyledInput
                    type="text"
                    multiline={multiline}
                    disabled={disabled}
                    {...props}
                    {...register(name, { required: true })}
                />
                {helpLink && !disabled && (
                    <a
                        className={styles.helpLink}
                        href={
                            "https://2022.hackillinois.org/static/media/discord_username_how_to.bfc75d98.png"
                        }
                        target="_blank"
                        rel="noreferrer"
                        title="Please add your Discord Username (Ex. yourusername#0123)"
                    >
                        <HelpIcon color={linkColor} />
                    </a>
                )}
            </div>
            <ErrorMessage name={name} />
        </>
    );
};

export default Input;
