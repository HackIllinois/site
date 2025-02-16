import clsx from "clsx";
import styles from "./RoundedButton.module.scss";

type RoundedButtonProps = {
    text: string;
    isSelected?: boolean;
    onClick: () => void;
};

const RoundedButton: React.FC<RoundedButtonProps> = ({
    text,
    isSelected = false,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                styles.roundedButton,
                isSelected && styles.isSelected
            )}
        >
            <p>{text}</p>
        </button>
    );
};

export default RoundedButton;
