"use client";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { Montserrat, Tsukimi_Rounded } from "next/font/google";
import { useEffect, useState } from "react";
import { getChallenge } from "@/util/api";

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
    onSetErrorMessage: (message: string) => void;
    onShowErrorAlert: (showERrorAlert: boolean) => void;
}

const Confirmation = ({
    formik,
    onSetErrorMessage,
    onShowErrorAlert
}: ConfirmationProps) => {
    const { values } = formik;
    const [challengePassed, setChallengePassed] = useState(false);
    // 1. Initialize loading to true so it shows immediately on mount
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            const res = await getChallenge(false);
            if (res && res.complete) {
                setChallengePassed(true);
            }
        } catch (error) {
            onSetErrorMessage("Failed to load challenge status.");
            onShowErrorAlert(true);
        } finally {
            // 2. Ensure loading is turned off regardless of success or failure
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                mt: { xs: "60px", md: "40px" },
                minHeight: "400px" // Added minHeight to prevent layout shift while loading
            }}
        >
            {/* 3. Conditional Rendering based on loading state */}
            {loading ? (
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{ color: "white" }}
                />
            ) : (
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        paddingTop: "100px"
                    }}
                >
                    {values.pro ? (
                        <>
                            <Typography
                                sx={{
                                    fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                                    fontWeight: 700,
                                    fontSize: {
                                        xs: "40px",
                                        sm: "60px",
                                        md: "80px"
                                    },
                                    color: "white",
                                    lineHeight: 1,
                                    mb: 0.5,
                                    zIndex: 1,
                                    textShadow: "5px 5px 13px black"
                                }}
                            >
                                APPLICATION
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: "60px",
                                        sm: "100px",
                                        md: "120px"
                                    },
                                    color: "white",
                                    lineHeight: 1,
                                    mb: 3,
                                    width: "100%",
                                    zIndex: 1,
                                    textShadow: "5px 5px 13px black"
                                }}
                            >
                                {challengePassed ? "COMPLETE" : "NEXT STEPS"}
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                                    fontWeight: 600,
                                    fontSize: { xs: "11px", sm: "22px" },
                                    color: "white",
                                    zIndex: 1,
                                    textShadow: "2px 2px 13px black"
                                }}
                            >
                                Thank you for signing up for HackIllinois 2026!
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                sx={{
                                    fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                                    fontWeight: 700,
                                    fontSize: {
                                        xs: "40px",
                                        sm: "60px",
                                        md: "80px"
                                    },
                                    color: "white",
                                    lineHeight: 1,
                                    mb: 0.5,
                                    zIndex: 1,
                                    textShadow: "2px 2px 13px black"
                                }}
                            >
                                APPLICATION
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: "60px",
                                        sm: "100px",
                                        md: "120px"
                                    },
                                    color: "white",
                                    lineHeight: 1,
                                    mb: 3,
                                    width: "100%",
                                    zIndex: 1,
                                    textShadow: "2px 2px 13px black"
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
                                    textShadow: "2px 2px 13px black"
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
                                    textShadow: "2px 2px 13px black"
                                }}
                            >
                                Please check the status of your account in your
                                email.
                            </Typography>
                        </>
                    )}

                    {values.pro && (
                        <>
                            <Typography
                                sx={{
                                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                                    fontWeight: 600,
                                    fontSize: { xs: "11px", sm: "22px" },
                                    color: "white",
                                    my: "17px",
                                    zIndex: 1,
                                    textShadow: "2px 2px 13px black"
                                }}
                            >
                                {challengePassed ? (
                                    <>
                                        You’ve successfully finished the
                                        HackVoyagers Challenge <br />
                                        and will be considered for the
                                        HackVoyagers track.
                                    </>
                                ) : (
                                    "To join the Pro Track, you’ll need to complete the Pro Track Challenge."
                                )}
                            </Typography>
                            {!challengePassed && (
                                <Button
                                    component="a"
                                    href="/challenge/"
                                    target="_blank"
                                    variant="contained"
                                    sx={{
                                        padding: "4px 10px",
                                        borderRadius: "8px",
                                        fontWeight: 500,
                                        textTransform: "none",
                                        backgroundColor: "rgba(56, 56, 56)",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "rgba(20, 20, 20)"
                                        },
                                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                                        fontSize: { xs: "16px", sm: "20px" },
                                        mt: "10px"
                                    }}
                                >
                                    Go to Pro Track Challenge
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Confirmation;
