"use client";

import TextInput from "@/components/Form/TextInput/TextInput";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { unsubscribe } from "@/util/api";

const schema = yup.object({
    email: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address")
});

const Unsubscribe: React.FC = () => {
    const searchParams = useSearchParams();
    const list = searchParams.get("list");
    const email = searchParams.get("email") ?? "";
    const [complete, setComplete] = useState(false);

    if (!list) {
        return (
            <main className={styles.main}>
                <h1>Unspecified List</h1>
                <p>
                    To unsubscribe you must specify the list to unsubscribe from
                </p>
            </main>
        );
    }

    if (complete) {
        return (
            <main className={styles.main}>
                <h1>Unsubscribed</h1>
                <p>
                    Successfully unsubscribed from <code>{list}</code>.
                </p>
            </main>
        );
    }

    const onSubmit = async ({ email }: { email: string }) => {
        if (!list) return;
        await unsubscribe(list, email);
        setComplete(true);
    };

    return (
        <main className={styles.main}>
            <h1>Unsubscribe</h1>
            <p>
                If you wish to no longer receive emails from this list (
                <code>{list}</code>), you can unsubscribe.
            </p>

            <div className={styles.form}>
                <Formik
                    initialValues={{ email }}
                    onSubmit={onSubmit}
                    validationSchema={schema}
                >
                    <Form>
                        <TextInput
                            name="email"
                            label="Email"
                            placeholder="Enter your email..."
                        ></TextInput>

                        <button type="submit">Unsubscribe</button>
                    </Form>
                </Formik>
            </div>
        </main>
    );
};

export default Unsubscribe;
