import React from "react";
import Checkmark from "./Checkmark";
import styles from "./ReviewButton.module.scss";
import Link from "next/link";

type PropTypes = {
    text: string;
    href: string;
};

const ReviewButton: React.FC<PropTypes> = ({ text, href }) => {
    return (
        <Link href={href} className={styles.reviewButton}>
            <div className={styles.checkButton}>
                <Checkmark />
            </div>
            <h3>{text}</h3>
        </Link>
    );
};

export default ReviewButton;
