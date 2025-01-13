"use client";

import styles from "./NavigationButton.module.scss";
import Image from "next/image";
import RIGHT_ARROW from "@/public/registration/right_arrow.svg";
import LEFT_ARROW from "@/public/registration/left_arrow.svg";
import { MouseEventHandler, KeyboardEvent } from "react";
import Link from "next/link";

interface NavButtonProps {
    text: string;
    pointRight?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    pointRight,
    onClick,
    href,
    ...props
}) => {
    // Function to handle the Enter key press
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter" || event.key === "Return") {
            onClick?.(event as any); // Trigger the onClick function
        }
    };

    const Content = (
        <button
            className={styles.button}
            onClick={onClick}
            onKeyDown={handleKeyDown} // Add onKeyDown event listener
            {...props}
        >
            {!pointRight ? (
                <Image
                    alt="left arrow"
                    src={LEFT_ARROW}
                    className={styles.arrow}
                />
            ) : null}
            <p
                className={`${pointRight ? styles.right : styles.left} ${styles.desktop}`}
            >
                {text}
            </p>
            <p
                className={`${pointRight ? styles.right : styles.left} ${styles.mobile}`}
            >
                {text}
            </p>
            {pointRight ? (
                <Image
                    alt="right arrow"
                    src={RIGHT_ARROW}
                    className={styles.arrow}
                />
            ) : null}
        </button>
    );

    if (href) {
        return (
            <Link prefetch={false} href={href}>
                {Content}
            </Link>
        );
    }

    return Content;
};

export default NavigationButton;
