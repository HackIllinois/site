"use client";
import { useRouter } from "next/navigation";
import styles from "./Button.module.scss";

interface ButtonProps {
    backgroundColor: string;
    textColor: string;
    text: string;
    navigateTo: string;
    compact?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    backgroundColor,
    textColor,
    text,
    navigateTo,
    compact = false
}) => {
    const router = useRouter();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(navigateTo);
    };
    return (
        <button
            onClick={handleOnClick}
            className={compact ? styles.compactButton : styles.button}
            style={{ backgroundColor: backgroundColor, color: textColor }}
        >
            <span className={styles.text}>{text}</span>
        </button>
    );
};

export default Button;
