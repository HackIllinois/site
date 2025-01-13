import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import Registration from "@/components/Registration/Registration";
import React, { Suspense } from "react";
import { registrationFromAPI } from "@/util/helpers";

const FormWrapper = async ({ children }: { children: React.ReactNode }) => {
    const [apiRegistration, { complete: isProApplicant }] = await Promise.all([
        getRegistrationOrDefault(),
        getChallenge()
    ]);
    const registration = registrationFromAPI(apiRegistration);

    return (
        <Registration
            registration={registration}
            isProApplicant={isProApplicant}
        >
            {children}
        </Registration>
    );
};

const GeneralRegistration = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense>
            <FormWrapper>{children}</FormWrapper>
        </Suspense>
    );
};

export default GeneralRegistration;
