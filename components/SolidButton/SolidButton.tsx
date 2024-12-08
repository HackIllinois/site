import clsx from "clsx";
import styles from "./SolidButton.module.scss";

interface SolidButtonsProps {
    text: string;
    backgroundColor: string;
    horizontalPaddingDisabled?: boolean;
    onClick: () => void;
}

const SolidButton: React.FC<SolidButtonsProps> = ({
    text,
    backgroundColor,
    horizontalPaddingDisabled,
    onClick
}) => {
    return (
        <button
            className={clsx(
                styles.solidButton,
                horizontalPaddingDisabled && styles.horizontalPaddingDisabled
            )}
            style={{
                backgroundColor
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default SolidButton;
