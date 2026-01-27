"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { registrationAlive } from "@/util/api";

const RegistrationClosed = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                const isAlive = await registrationAlive();
                if (isAlive) {
                    // Registration is still open, redirect to homepage
                    router.push("/");
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                alert(`Error checking registration status: ${error}`);
                setIsLoading(false);
            }
        };

        checkRegistrationStatus();
    }, [router]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#0a0a1a"
                }}
            >
                <CircularProgress sx={{ color: "#A315D6" }} />
            </Box>
        );
    }

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
                        py: { xs: 4, md: 5 },
                        background:
                            "linear-gradient(135deg, rgba(163,21,214,0.3) 0%, rgba(253,171,96,0.3) 50%, rgba(163,21,214,0.3) 100%)",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(163,21,214,0.5)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            color: "white",
                            fontFamily: "Montserrat",
                            fontWeight: 700,
                            fontSize: {
                                xs: "24px",
                                sm: "28px",
                                md: "32px"
                            },
                            lineHeight: 1.3
                        }}
                    >
                        Registration Closed
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "white",
                            opacity: 0.95,
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px"
                            },
                            lineHeight: 1.6,
                            maxWidth: "700px",
                            mx: "auto"
                        }}
                    >
                        Registration for HackIllinois 2026 is now closed. If you
                        applied, look out for an email from us on the status of
                        your application.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default RegistrationClosed;
