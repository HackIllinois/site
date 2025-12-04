"use client";

import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import useWindowSize from "@/hooks/use-window-size";
import { montserrat } from "@/theme/fonts";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import Confetti from "react-confetti";

export default function ChallengeResult() {
    const registrationAuth = useRegistrationAuth(true);
    const { width, height } = useWindowSize();

    if (registrationAuth.isLoading) {
        return (
            <Loading
                backgroundImage={"/challenge/backgrounds/success.svg"}
                zoom={false}
            />
        );
    }

    if (!registrationAuth.authenticated) {
        return <GithubAuthPage />;
    }

    if (!registrationAuth.submission?.pro) {
        return (
            <NotProTrackPage
                backgroundImage={"/challenge/backgrounds/success.svg"}
            />
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh", // full viewport height
                    minWidth: "100vw",
                    height: "100%",
                    width: "100%",
                    pb: "10px",
                    backgroundImage: {
                        xs: `url("/challenge/backgrounds/mobile/success.svg"), url("/challenge/backgrounds/success.svg")`,
                        md: `url("/challenge/backgrounds/success.svg")`
                    },
                    backgroundSize: "cover", // fill the screen
                    backgroundRepeat: "no-repeat", // prevent tiling
                    backgroundPosition: { xs: "left", sm: "center" }, // center the image
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    fontFamily={"Tsukimi Rounded"}
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        textAlign: "center",
                        px: 2,
                        fontWeight: 700
                    }}
                >
                    Congratulations, you passed!
                </Typography>
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 3,
                        mt: { xs: 3, md: 4 },
                        px: { xs: 2, sm: 3 }
                    }}
                >
                    <Typography
                        variant="h3"
                        component="p"
                        sx={{
                            fontWeight: 500,
                            fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }
                        }}
                    >
                        You are invited to apply as a
                    </Typography>

                    <Typography
                        fontFamily={"Tsukimi Rounded"}
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "34px", sm: "54px" },
                            textShadow: "0 0 35px #f6a5edff"
                        }}
                    >
                        <Box component="span" fontFamily={"Tsukimi Rounded"}>
                            <Box
                                fontFamily={"Tsukimi Rounded"}
                                component="span"
                                sx={{
                                    fontSize: { xs: "42px", sm: "64px" }
                                }}
                            >
                                H
                            </Box>
                            ACK
                        </Box>

                        <Box
                            fontFamily={"Tsukimi Rounded"}
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #FEB963 32.69%, #FF61E2 67.79%, #FEB963 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            <Box
                                component="span"
                                fontFamily={"Tsukimi Rounded"}
                                sx={{
                                    fontSize: { xs: "42px", sm: "64px" }
                                }}
                            >
                                V
                            </Box>
                            OYAGER
                        </Box>
                    </Typography>
                    <Typography
                        variant="h3"
                        component="p"
                        sx={{
                            maxWidth: "700px",
                            px: 5,
                            fontWeight: 500,
                            fontSize: {
                                xs: "0.875rem",
                                sm: "1.25rem",
                                md: "1.5rem"
                            }
                        }}
                    >
                        Your registration is now complete. Click Continue to
                        view your confirmation.
                    </Typography>
                    <GradientButton
                        text="CONTINUE"
                        link="/register/general#confirmation"
                    />
                </Container>
            </Box>

            <Confetti width={width} height={height} />
        </>
    );
}
