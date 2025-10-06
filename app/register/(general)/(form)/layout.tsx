"use client";
import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import Registration from "@/components/Registration/Registration";
import React, { useEffect, useState } from "react";
import { registrationFromAPI } from "@/util/helpers";
import Loading from "@/components/Loading/Loading";
import { RegistrationData } from "@/util/types";

const GeneralRegistration = ({ children }: { children: React.ReactNode }) => {
    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setRegistration({
            legalName: "",
            preferredName: "",
            gender: "",
            race: [],
            emailAddress: "",
            location: "",
            degree: "",
            university: "",
            gradYear: "",
            major: "",
            minor: "",
            hackEssay1: "",
            hackEssay2: "",
            optionalEssay: "",
            proEssay: "",
            considerForGeneral: [],
            hackOutreach: [],
            hackInterest: [],
            dietaryRestrictions: [],
            requestedTravelReimbursement: [],
            travelAcknowledge: [],
            codeOfConductAcknowledge: [],
            reviewedInformationAcknowledge: []
        });

        // Promise.all([getRegistrationOrDefault(), getChallenge()]).then(
        //     ([registration, challenge]) => {
        //         setRegistration(registrationFromAPI(registration));
        //         setIsProApplicant(challenge.complete);
        //         setIsLoading(false);
        //     }
        // );
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Registration
            registration={registration!}
            isProApplicant={isProApplicant}
        >
            {children}
        </Registration>
    );
};

export default GeneralRegistration;
