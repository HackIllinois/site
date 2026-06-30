import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
    children: React.ReactNode;
    style?: any;
    compact?: boolean;
}

const Container: React.FC<ContainerProps> = ({
    children,
    style,
    compact = false
}) => {
    return (
        <div
            className={compact ? styles.compactContainer : styles.container}
            style={style}
        >
            {children}
        </div>
    );
};

export default Container;
