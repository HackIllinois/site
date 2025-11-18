"use client";
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import Image from "next/image";
import { Montserrat, Tsukimi_Rounded } from "next/font/google";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { FormikProps } from "formik";
import LaunchIcon from "@mui/icons-material/Launch";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700"]
});

const tsukimi = Tsukimi_Rounded({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

interface ConfirmationProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
}

const Confirmation = ({ formik }: ConfirmationProps) => {
    const { values } = formik;
    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "auto",
                overflow: "visible",
                mt: { xs: "60px", md: "40px" }
            }}
        >
            {/* content */}
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
                <Image
                    src="/registration/26.svg"
                    alt="The number 26 in background."
                    fill
                    style={{
                        objectFit: "contain",
                        objectPosition: "top center",
                        zIndex: 0
                    }}
                />

                <Typography
                    sx={{
                        fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                        fontWeight: 700,
                        fontSize: { xs: "40px", sm: "60px", md: "80px" },
                        color: "white",
                        lineHeight: 1,
                        mb: 0.5,
                        zIndex: 1,
                        textShadow: "1px 1px .5px black"
                    }}
                >
                    APPLICATION
                </Typography>

                <Typography
                    sx={{
                        fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                        fontWeight: 800,
                        fontSize: { xs: "60px", sm: "100px", md: "120px" },
                        color: "white",
                        lineHeight: 1,
                        mb: 3,
                        width: "100%",
                        zIndex: 1,
                        textShadow: "1px 1px .5px black"
                    }}
                >
                    FINISHED
                </Typography>

                <Typography
                    sx={{
                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                        fontWeight: 600,
                        fontSize: { xs: "11px", sm: "22px" },
                        color: "white",
                        zIndex: 1,
                        textShadow: ".5px .5px 1px black"
                    }}
                >
                    Thank you for signing up for HackIllinois 2026!
                </Typography>

                <Typography
                    sx={{
                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                        fontWeight: 600,
                        fontSize: { xs: "11px", sm: "22px" },
                        color: "white",
                        mb: "17px",
                        zIndex: 1,
                        textShadow: ".5px .5px 1px black"
                    }}
                >
                    Please check the status of your account in your email.
                </Typography>

                {values.considerForPro && (
                    <Typography
                        sx={{
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontWeight: 600,
                            fontSize: { xs: "11px", sm: "22px" },
                            color: "white",
                            mb: "17px",
                            zIndex: 1,
                            textShadow: ".5px .5px 1px black"
                        }}
                    >
                        Since you opted into the Pro Track, you still need to
                        complete the
                        <br />
                        <MuiLink
                            href="/challenge/"
                            target="_blank"
                            color="#2DFFDF"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "2px 5px",
                                borderRadius: "5px",
                                color: "#2DFFDF",
                                fontWeight: "500",
                                textDecoration: "underline",
                                textDecorationColor: "#2DFFDF",
                                textDecorationThickness: "2px",
                                "&:hover": {
                                    color: "#fff",
                                    textDecorationColor: "#fff"
                                }
                            }}
                        >
                            Pro Challenge
                            <LaunchIcon
                                sx={{
                                    fontSize: {
                                        xs: "small",
                                        sm: "medium"
                                    }
                                }}
                            />
                        </MuiLink>
                        .
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Confirmation;
