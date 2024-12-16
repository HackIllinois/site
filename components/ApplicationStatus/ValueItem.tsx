import clsx from "clsx";
import styles from "./ValueItem.module.scss";
import { useEffect } from "react";

type PropTypes = {
    label: string;
    isHighlighted: boolean;
};

const ValueItem = ({ label, isHighlighted }: PropTypes): JSX.Element => {
    useEffect(() => {
        console.log("ValueItem", label, isHighlighted);
    }, []);

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
