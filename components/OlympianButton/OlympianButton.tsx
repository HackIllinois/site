import clsx from "clsx";
import styles from "./OlympianButton.module.scss";

interface OlympianButtonProps {
    text: string;
    link?: string;
    onClick?: () => void;
    bottomPadding?: boolean;
    blue?: boolean;
    gold?: boolean;
}

const OlympianButton: React.FC<OlympianButtonProps> = ({
    text,
    link,
    onClick,
    bottomPadding,
    blue,
    gold
}) => {
    return (
        <div
            className={clsx(
                styles.olympianButtonWrapper,
                bottomPadding && styles.bottomPadding,
                blue && styles.blue,
                gold && styles.gold
            )}
        >
            {link ? (
                <button className={styles.olympianButton}>
                    <a href={link}>{text}</a>
                </button>
            ) : (
                <button className={styles.olympianButton} onClick={onClick}>
                    {text}
                </button>
            )}
        </div>
    );
};

export default OlympianButton;
