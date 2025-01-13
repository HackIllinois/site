import React from "react";
import styles from "./ReviewButton.module.scss";
import Link from "next/link";

type PropTypes = {
    text: string;
    href: string;
};

const ReviewButton: React.FC<PropTypes> = ({ text, href }) => {
    return (
        <Link href={href} className={styles.reviewButton}>
            <h3>&#x1F517; {text}</h3>
        </Link>
    );
};

export default ReviewButton;
