"use client";
import { RegistrationData } from "@/util/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ReviewFormProps = {
    registration: RegistrationData;
    isProApplicant: boolean;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
    registration,
    isProApplicant
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [expanded, setExpanded] = useState<string | false>("personal");

    const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleSubmit = async () => {
        setIsLoading(true);
        // await registerSubmit(registrationToAPI(registration)).catch(err =>
        //     handleError(err)
        // );
        router.push("/register/confirmation");
    };

    return <></>;
};

export default ReviewForm;
