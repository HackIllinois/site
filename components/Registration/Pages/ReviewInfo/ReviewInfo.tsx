import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./ReviewInfo.module.scss";
import React from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import Link from "next/link";

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
                name="reviewedInformationAcknowledge"
                label={
                    <p>
                        Please review the above information.
                        <br />
                        <small>
                            Once you submit you will not be able to change any
                            information without contacting us.
                        </small>
                    </p>
                }
                options={[
                    {
                        label: "I reviewed my information to ensure it is correct",
                        value: "YES",
                        isRadio: true
                    }
                ]}
            />
            <Checkboxes
                name="codeOfConductAcknowledge"
                label={
                    <p>
                        To participate in HackIllinois, you must accept our{" "}
                        <Link href="/legal/code-of-conduct" target="_blank">
                            Code of Conduct
                        </Link>
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
