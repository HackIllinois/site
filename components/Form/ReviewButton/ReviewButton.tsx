import Checkmark from "./Checkmark";
import styles from "./ReviewButton.module.scss";

type PropTypes = {
    text: string;
    onClick: () => void;
};

const ReviewButton = ({ text, onClick }: PropTypes): JSX.Element => {
    return (
        <div onClick={onClick} className={styles.reviewButton}>
            <div className={styles.checkButton}>
                <Checkmark />
            </div>
            <h3>{text}</h3>
        </div>
    );
};

export default ReviewButton;
