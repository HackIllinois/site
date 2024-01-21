import React from "react";
import clsx from "clsx";

import RIGHT_ARROW from "@/public/registration/right_arrow.svg";
import styles from "./styles.module.scss";
import Image from "next/image";

type PropTypes = {
    type?: "button" | "submit";
    children?: React.ReactNode;
    arrow?: "left" | "right";
    hidden?: boolean;
    disabled?: boolean;
    loading?: boolean;
    [key: string]: unknown;
};

const Button = ({
    type = "button",
    children,
    arrow,
    hidden,
    disabled,
    loading,
    ...props
}: PropTypes): JSX.Element => (
    <button
        type={type}
        className={clsx(
            styles.button,
            hidden && styles.hidden,
            disabled && styles.disabled,
            loading && styles.loading
        )}
        {...props}
    >
        {children}

    </button>
);

export default Button;
