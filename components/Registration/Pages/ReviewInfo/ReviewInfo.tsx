import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./ReviewInfo.module.scss";

type PropTypes = {
    onChangePage?: (newIndex: number) => void;
};

const ReviewInfo = ({ onChangePage }: PropTypes): JSX.Element => {
    const handleChangePage = (newIndex: number) => {
        if (onChangePage) {
            onChangePage(newIndex);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <div className={styles.reviewButtons}>
                <ReviewButton
                    text="Personal Information"
                    onClick={() => handleChangePage(0)}
                />
                <ReviewButton
                    text="Education"
                    onClick={() => handleChangePage(1)}
                />
                <ReviewButton
                    text="Hack-Specific"
                    onClick={() => handleChangePage(2)}
                />
                <ReviewButton
                    text="Transportation"
                    onClick={() => handleChangePage(3)}
                />
            </div>
        </div>
    );
};

export default ReviewInfo;
