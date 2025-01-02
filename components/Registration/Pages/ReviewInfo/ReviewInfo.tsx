import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./ReviewInfo.module.scss";
import React from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const ReviewInfo: React.FC<PropTypes> = ({ onChangePage }) => {
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
            <Checkboxes
                name="codeOfConductAcknowledge"
                label={
                    <p>
                        To participate in HackIllinois, you must accept our{" "}
                        <a href="/legal/code-of-conduct" target="_blank">
                            Code of Conduct
                        </a>
                        :
                    </p>
                }
                options={[
                    {
                        label: "I accept the Code of Conduct",
                        value: "YES",
                        isRadio: true
                    }
                ]}
            />
        </div>
    );
};

export default ReviewInfo;
