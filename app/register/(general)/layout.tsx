import Head from "next/head";
import styles from "./styles.module.scss";
import { getRegistrationOrDefault } from "@/util/api";
import Registration from "@/components/Registration/Registration";
import React from "react";
import Background from "@/components/Registration/Background";
import { registrationFromAPI } from "@/util/helpers";

const FormWrapper = async ({ children }: { children: React.ReactNode }) => {
    const registration = registrationFromAPI(await getRegistrationOrDefault());

    return <Registration registration={registration}>{children}</Registration>;
};

const GeneralRegistration = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                <Background />
                <div className={styles.contentWrapper}>
                    <FormWrapper>{children}</FormWrapper>
                </div>
            </main>
        </>
    );
};

export default GeneralRegistration;
