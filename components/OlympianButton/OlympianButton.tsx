import clsx from "clsx";
import styles from "./OlympianButton.module.scss";
import Link from "next/link";

interface OlympianButtonProps {
    text: string;
    link?: string;
    onClick?: () => void;
    bottomPadding?: boolean;
    blue?: boolean;
    gold?: boolean;
    medium?: boolean;
}

const OlympianButton: React.FC<OlympianButtonProps> = ({
    text,
    link,
    onClick,
    bottomPadding,
    blue,
    gold,
    medium
}) => {
    return (
        <div
            className={clsx(
                styles.olympianButtonWrapper,
                bottomPadding && styles.bottomPadding,
                blue && styles.blue,
                gold && styles.gold,
                medium && styles.medium
            )}
        >
            {link ? (
                <Link prefetch={false} href={link}>
                    <button className={styles.olympianButton}>{text}</button>
                </Link>
            ) : (
                <button className={styles.olympianButton} onClick={onClick}>
                    {text}
                </button>
            )}
        </div>
    );
};

export default OlympianButton;
