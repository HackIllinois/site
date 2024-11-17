import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./ReviewInfo.module.scss";

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const ReviewInfo = ({ onChangePage }: PropTypes): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <div className={styles.reviewButtons}>
                <ReviewButton
                    text="Personal Information"
                    onClick={() => onChangePage(0)}
                />
                <ReviewButton
                    text="Education"
                    onClick={() => onChangePage(1)}
                />
                <ReviewButton
                    text="Hack-Specific"
                    onClick={() => onChangePage(2)}
                />
                <ReviewButton
                    text="Transportation"
                    onClick={() => onChangePage(3)}
                />
            </div>
        </div>
    );
};

export default ReviewInfo;
