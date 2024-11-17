import styles from "./ShineButton.module.scss";

interface ShineButtonProps {
    text: string;
    link?: string;
    target?: string;
    onClick?: () => void;
}

// make the props such that link = true -> we have a link prop else onClick

const ShineButton: React.FC<ShineButtonProps> = ({
    text,
    link,
    target = "_self",
    onClick
}) => {
    if (link) {
        return (
            <a className={styles.styledButton} href={link} target={target}>
                {text}
            </a>
        );
    } else {
        return (
            <button className={styles.styledButton} onClick={onClick}>
                {text}
            </button>
        );
    }
};

export default ShineButton;
