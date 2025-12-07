"use client";

import React, { useState } from "react";
import styles from "./AvatarSelectorForm.module.scss";
import { Form, Formik, useFormikContext } from "formik";
import * as yup from "yup";
import AvatarSelector from "../AvatarSelector/AvatarSelector";
import { updateProfile } from "@/util/api";
import Loading from "@/components/Loading/Loading";
import Image from "next/image";

const schema = yup.object({
    avatarId: yup.string().required("Please choose an avatar")
});

type AvatarSelectorFormProps = {
    avatarId: string;
    closeModal: () => void;
};

const InnerForm = ({ closeModal }: { closeModal: () => void }) => {
    const { values } = useFormikContext<{ avatarId: string }>();

    return (
        <div className={styles.innerContainer}>
            <Form className={styles.form}>
                <h2>Choose a new avatar:</h2>

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
            <div className={styles.character}>
                <Image
                    src={`/profile/characters/${values.avatarId}.svg`}
                    alt={values.avatarId}
                    width={500}
                    height={600}
                />
            </div>
        </div>
    );
};

const AvatarSelectorForm: React.FC<AvatarSelectorFormProps> = ({
    avatarId,
    closeModal
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async ({ avatarId }: { avatarId: string }) => {
        setIsLoading(true);

        await updateProfile({ avatarId });

        window.location.reload();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <h1>Update Avatar</h1>
            <div className={styles.content}>
                <Formik
                    initialValues={{ avatarId }}
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                >
                    <InnerForm closeModal={closeModal} />
                </Formik>
            </div>
        </div>
    );
};

export default AvatarSelectorForm;
