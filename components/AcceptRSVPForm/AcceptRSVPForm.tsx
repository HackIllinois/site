"use client";

import React, { useState } from "react";
import styles from "./AcceptRSVPForm.module.scss";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import TextInput from "@/components/Form/TextInput/TextInput";
import AvatarSelector from "../AvatarSelector/AvatarSelector";
import { refreshToken, setProfile } from "@/util/api";
import Link from "next/link";
import { RSVPDecideAccept } from "@/util/api";
import Loading from "@/components/Loading/Loading";
import Image from "next/image";

const schema = yup.object({
    displayName: yup.string().required("Please enter a display name"),
    discordTag: yup.string().required("Please enter your discord tag"),
    avatarId: yup.string().required("Please choose an avatar"),
    codeOfConductAcknowledge: yup
        .array()
        .of(yup.string())
        .min(1, "You must accept the Code of Conduct")
        .required("You must accept the Code of Conduct")
});

type AcceptRSVPFormProps = {
    closeModal: () => void;
};

const AcceptRSVPForm: React.FC<AcceptRSVPFormProps> = ({ closeModal }) => {
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);

        await RSVPDecideAccept();
        await refreshToken();
        await setProfile({ displayName, discordTag, avatarId });

        window.location.reload();
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <h1>We are so excited to have you at HackIllinois this year!</h1>
            <div className={styles.content}>
                <Formik
                    initialValues={{
                        displayName: "",
                        discordTag: "",
                        avatarId: "",
                        codeOfConductAcknowledge: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={schema}
                >
                    <Form className={styles.form}>
                        <h2>
                            Please complete the following information to confirm
                            your attendance:
                        </h2>
                        <TextInput
                            name="displayName"
                            label="Display Name"
                            required
                        />

                        <TextInput
                            name="discordTag"
                            label="Discord Tag"
                            required
                        />

                        <AvatarSelector
                            name="avatarId"
                            label="Select an avatar"
                            required
                        />

                        <Checkboxes
                            name="codeOfConductAcknowledge"
                            label={
                                <label>
                                    To participate in HackIllinois, you must
                                    accept our{" "}
                                    <Link
                                        prefetch={false}
                                        href="/legal/code-of-conduct"
                                        target="_blank"
                                    >
                                        Code of Conduct
                                    </Link>
                                    :
                                </label>
                            }
                            options={[
                                {
                                    label: "I accept the Code of Conduct",
                                    value: "YES"
                                }
                            ]}
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
                <Image
                    src="/profile/characters/zeus.svg"
                    alt="zeus"
                    className={styles.character}
                    width={500}
                    height={600}
                />
            </div>
        </div>
    );
};

export default AcceptRSVPForm;
