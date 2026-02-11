"use client";

import { GradientButton } from "@/components/GradientButton/GradientButton";
import { Box, Typography } from "@mui/material";

const RSVPUnavailable = () => {
    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                width: "100%",
                overflowY: "auto"
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url("/registration/backgrounds/personal_info.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transform: "scale(1.25)",
                    zIndex: -1
                }}
            />
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    pt: "120px",
                    pb: { xs: 4, md: "120px" },
                    px: 3
                }}
            >
                <img
                    src="/registration/hackastra-logo.png"
                    alt="Hackastra Logo"
                    style={{
                        width: "auto",
                        maxHeight: "110px",
                        maxWidth: "100%",
                        marginBottom: "40px",
                        objectFit: "contain"
                    }}
                />

                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "90%",
                            md: "800px"
                        },
                        maxWidth: "800px",
                        borderRadius: "40px",
                        px: { xs: 3, md: 5 },
                        py: { xs: 4, md: 5 }
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            mb: 3,
                            color: "white",
                            fontFamily: "Tsukimi Rounded",
                            lineHeight: 1.3
                        }}
                    >
                        Page Unavailable
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "white",
                            opacity: 0.95,
                            fontFamily: "Montserrat",
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px"
                            },
                            lineHeight: 1.6,
                            maxWidth: "700px",
                            textWrap: "balance",
                            mx: "auto",
                            mb: 4
                        }}
                    >
                        You cannot access this page since your admissions
                        decision is not ready. We will email you once it is
                        ready.
                    </Typography>

                    <GradientButton text="BACK TO HOMEPAGE" link="/" />
                </Box>
            </Box>
        </Box>
    );
};

export default RSVPUnavailable;
