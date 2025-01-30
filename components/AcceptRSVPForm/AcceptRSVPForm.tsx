"use client";

import React from "react";
import styles from "./AcceptRSVPForm.module.scss";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextInput from "@/components/Form/TextInput/TextInput";
import AvatarSelector from "../AvatarSelector/AvatarSelector";
import { setProfile } from "@/util/api";

const schema = yup.object({
    displayName: yup.string().required("Please enter a display name"),

    discordTag: yup.string().required("Please enter your discord tag"),

    avatarId: yup.string().required("Please choose an avatar")
});

type AcceptRSVPFormProps = {
    closeModal: () => void;
};

const AcceptRSVPForm: React.FC<AcceptRSVPFormProps> = ({ closeModal }) => {
    const handleSubmit = async ({
        displayName,
        discordTag,
        avatarId
    }: {
        displayName: string;
        discordTag: string;
        avatarId: string;
    }) => {
        console.log(displayName, discordTag, avatarId);
        const response = await setProfile({
            displayName: displayName,
            discordTag: discordTag,
            avatarId: avatarId
        });
        console.log(response);
        closeModal();
    };

    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    displayName: "",
                    discordTag: "",
                    avatarId: ""
                }}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                <Form className={styles.form}>
                    <h2>
                        We are so excited to have you at HackIllinois this year!
                        Please complete the following information to confirm
                        your attendance:
                    </h2>
                    <TextInput
                        name="displayName"
                        label="Display Name"
                        required
                    />

                    <TextInput name="discordTag" label="Discord Tag" required />

                    <AvatarSelector
                        name="avatarId"
                        label="Select an avatar"
                        required
                    />

                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={styles.formButton}
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.formButton}>
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
export default AcceptRSVPForm;
