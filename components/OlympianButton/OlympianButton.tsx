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
                <Link href={link} prefetch={false}>
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
