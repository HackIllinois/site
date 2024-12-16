import React from "react";
import Checkmark from "./Checkmark";
import styles from "./ReviewButton.module.scss";

type PropTypes = {
    text: string;
    onClick: () => void;
};

const ReviewButton: React.FC<PropTypes> = ({ text, onClick }) => {
    return (
        <div onClick={onClick} className={styles.reviewButton}>
            <div className={styles.checkButton}>
                <Checkmark />
            </div>
            <h3>{text}</h3>
        </div>
    );
};

export default ReviewButton;
