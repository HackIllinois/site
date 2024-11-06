import styles from "./styles.module.scss";
import Image from "next/image";
import RIGHT_ARROW from "@/public/registration/right_arrow.svg";
import LEFT_ARROW from "@/public/registration/left_arrow.svg";
import { MouseEventHandler } from "react";

interface NavButtonProps {
    text: string;
    pointRight?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    pointRight,
    onClick,
    ...props
}): JSX.Element => (
    <button className={styles.button} onClick={onClick} {...props}>
        {!pointRight ? (
            <Image alt="left arrow" src={LEFT_ARROW} className={styles.arrow} />
        ) : null}
        <p
            className={`${pointRight ? styles.right : styles.left} ${styles.desktop}`}
        >
            {text}
        </p>
        <p
            className={`${pointRight ? styles.right : styles.left} ${styles.mobile}`}
        >
            {pointRight ? "Next" : "Back"}
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

export default NavigationButton;
