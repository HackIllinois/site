"use client";
import React, { useEffect, useState } from "react";
import ReviewForm from "@/components/Registration/ReviewForm";
import { getChallenge, getRegistrationOrDefault } from "@/util/api";
import { registrationFromAPI } from "@/util/helpers";
import { RegistrationData } from "@/util/types";
import Loading from "@/components/Loading/Loading";
import { Box, Typography, ThemeProvider } from "@mui/material";
import RegistrationTheme from "../../theme";

const ReviewInfo: React.FC = () => {
    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [isProApplicant, setIsProApplicant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
        <Box>
            <ThemeProvider theme={RegistrationTheme}>
                <Typography variant="h1">REVIEW INFORMATION</Typography>
                <ReviewForm
                    registration={registration!}
                    isProApplicant={isProApplicant}
                />
            </ThemeProvider>
        </Box>
    );
};

export default ReviewInfo;
