import React from "react";
import { useFormContext } from "react-hook-form";

import styles from "./ErrorMessage.module.scss";

type PropTypes = {
    name: string;
    type?: string;
    hideErrors?: boolean;
};

const ErrorMessage = ({
    name,
    type,
    hideErrors = false
}: PropTypes): JSX.Element | null => {
    const {
        formState: { errors }
    } = useFormContext();

    if (!hideErrors && errors[name]) {
        let errorMessage = errors[name]?.message;
        if (typeof errorMessage === "string") {
            return (
                <div>
                    <div className={styles.errorMessage}>{errorMessage}</div>
                </div>
            );
        }
    }
    //https://react-hook-form.com/api/useformstate/errormessage
    return null;
};

export default ErrorMessage;
