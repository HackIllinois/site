import React from "react";
import styles from "./ReviewButton.module.scss";
import Link from "next/link";

type PropTypes = {
    text: string;
    href: string;
};

/**
 * This component is deprecated and will be removed in a future release.
 * Please use MUI instead.
 */
const ReviewButton: React.FC<PropTypes> = ({ text, href }) => {
    return (
        <Link prefetch={false} href={href} className={styles.reviewButton}>
            <h3>&#x1F517; {text}</h3>
        </Link>
    );
};

export default ReviewButton;
