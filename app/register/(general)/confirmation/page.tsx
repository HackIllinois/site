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
                mb: { xs: "60px", md: "150px" }
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "800px"
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        justifyContent: "center",
                        top: 0,
                        width: { xs: "90vw", md: "748px" },
                        height: { xs: "70vw", md: "610px" },
                        zIndex: 0, // behind the text
                        pointerEvents: "none"
                    }}
                >
                    <Image
                        src="/registration/26.svg"
                        alt="The number 26 in background."
                        fill
                        style={{
                            objectFit: "contain",
                            objectPosition: "top center"
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        zIndex: 1,
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
                            fontSize: { xs: "40px", sm: "60px", md: "80px" },
                            color: "white",
                            lineHeight: 1,
                            mb: 0.5
                        }}
                    >
                        APPLICATION
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                            fontWeight: 800,
                            fontSize: { xs: "60px", sm: "100px", md: "120px" },
                            lineHeight: 1,
                            mb: 3,
                            width: "100%"
                        }}
                    >
                        FINISHED
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontWeight: 600,
                            fontSize: { xs: "11px", sm: "22px" },
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
                            fontSize: { xs: "11px", sm: "22px" },
                            color: "white",
                            mb: "17px"
                        }}
                    >
                        Please check the status of your account in your email.
                    </Typography>

                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: "136px", sm: "189px" },
                            height: { xs: "42px", sm: "59px" }
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
            </Box>
        </Box>
    );
};

export default Confirmation;
