import React from "react";
import styles from "./QuestionHeader.module.scss";

type PropTypes = {
    text: string;
    required?: boolean;
};

const QuestionHeader = ({ text, required }: PropTypes): JSX.Element => {
    return (
        <h3>
            {text}
            {required && <span className={styles.required}>*</span>}
        </h3>
    );
};

export default QuestionHeader;
