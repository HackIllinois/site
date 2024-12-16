import clsx from "clsx";
import styles from "./ValueItem.module.scss";
import React from "react";

type PropTypes = {
    label: string;
    isHighlighted: boolean;
};

const ValueItem: React.FC<PropTypes> = ({ label, isHighlighted }) => {
    return (
        <div
            className={clsx(
                styles.valueItem,
                isHighlighted && styles.highlighted
            )}
        >
            <p>{label}</p>
        </div>
    );
};

export default ValueItem;
