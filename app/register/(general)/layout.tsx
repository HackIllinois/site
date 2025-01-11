import styles from "./styles.module.scss";
import { getRegistrationOrDefault } from "@/util/api";
import Registration from "@/components/Registration/Registration";
import React, { Suspense } from "react";
import Background from "@/components/Registration/Background";
import { registrationFromAPI } from "@/util/helpers";

const FormWrapper = async ({ children }: { children: React.ReactNode }) => {
    const apiRegistration = await getRegistrationOrDefault();
    const registration = registrationFromAPI(apiRegistration);

    return <Registration registration={registration}>{children}</Registration>;
};

const GeneralRegistration = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={styles.container}>
            <Background />
            <div className={styles.contentWrapper}>
                <Suspense>
                    <FormWrapper>{children}</FormWrapper>
                </Suspense>
            </div>
        </main>
    );
};

export default GeneralRegistration;
