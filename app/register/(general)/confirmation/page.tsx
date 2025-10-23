"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault
} from "@/util/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

const Confirmation: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // if (!isAuthenticated()) {
        //     authenticate(pathname);
        //     return;
        // }
        // router.push("/register");
        // getRegistrationOrDefault()
        //     .then(registration => {
        //         if (!registration.hasSubmitted) {
        //             router.push("/register");
        //         }
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <Box // APPLICATION FINISHED
                sx={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: "white",
                        lineHeight: 1,
                        mb: 0.5,
                        textAlign: "center"
                    }}
                >
                    APPLICATION
                </Typography>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        color: "grey.200",
                        lineHeight: 1,
                        mb: 3,
                        width: "100%"
                    }}
                >
                    FINISHED
                </Typography>
            </Box>

            <Typography
                variant="h6"
                sx={{
                    color: "white",
                    fontWeight: 400,
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.25rem" }
                }}
            >
                Thank you for signing up for HackIllinois 2026!
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    color: "white",
                    fontWeight: 400,
                    mb: 5,
                    fontSize: { xs: "1rem", md: "1.25rem" }
                }}
            >
                Please check the status of your account in your email.
            </Typography>
        </Box>
    );
};

export default Confirmation;
