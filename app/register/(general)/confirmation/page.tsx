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
import { Montserrat, Tsukimi_Rounded } from "next/font/google";

// TODO: move into theme file
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"]
});

const tsukimi = Tsukimi_Rounded({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

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
                textAlign: "center",
                mt: "40px",
                mb: "150px"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    justifyContent: "center",
                    top: "80px",
                    transform: { md: "rotate(5.93deg)" },
                    width: { xs: "374px", md: "748px" },
                    height: { xs: "305px", md: "610px" },
                    zIndex: 0, // behind the text
                    opacity: 0.34,
                    pointerEvents: "none"
                }}
            >
                <Image
                    src="/registration/26.svg"
                    alt="The number 26 in background."
                    fill
                    style={{ objectFit: "contain" }}
                />
            </Box>

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
                        fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                        fontWeight: 700,
                        fontSize: { xs: "40px", md: "80px" },
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
                        fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                        fontWeight: 800,
                        fontSize: { xs: "60px", md: "120px" },
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
                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                    fontWeight: 600,
                    fontSize: { xs: "11px", md: "22px" },
                    color: "white"
                }}
            >
                Thank you for signing up for HackIllinois 2026!
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                    fontWeight: 600,
                    fontSize: { xs: "11px", md: "22px" },
                    color: "white",
                    mb: "17px"
                }}
            >
                Please check the status of your account in your email.
            </Typography>

            <Box
                sx={{
                    position: "relative",
                    width: { xs: "136px", md: "189px" },
                    height: { xs: "42px", md: "59px" }
                }}
            >
                <Image
                    src="/registration/logo.svg"
                    alt="White HackIllinois logo"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </Box>
        </Box>
    );
};

export default Confirmation;
