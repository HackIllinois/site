"use client";
import ReviewButton from "@/components/Form/ReviewButton/ReviewButton";
import styles from "./styles.module.scss";
import React from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import Link from "next/link";
import { useLayoutContext } from "@/components/Registration/Registration";

type PropTypes = {
    previous: (index?: number) => void;
};

const ReviewInfo: React.FC<PropTypes> = () => {
    const { previous } = useLayoutContext();

    return (
        <div className={styles.container}>
            <h1>Review Info</h1>
            <div className={styles.reviewButtons}>
                <ReviewButton
                    text="Personal Information"
                    onClick={() => previous(0)}
                />
                <ReviewButton text="Education" onClick={() => previous(1)} />
                <ReviewButton
                    text="Hack-Specific"
                    onClick={() => previous(2)}
                />
                <ReviewButton
                    text="Transportation"
                    onClick={() => previous(3)}
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
