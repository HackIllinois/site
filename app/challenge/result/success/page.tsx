"use client";

import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
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
                    backgroundPosition: "center", // center the image
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
                            textShadow: "0 0 30px #ffffff"
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                fontSize: { xs: "44px", sm: "64px" }
                            }}
                        >
                            H
                        </Box>
                        <Box component="span">ACK</Box>

                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #FEB963 32.69%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: { xs: "44px", sm: "64px" }
                            }}
                        >
                            V
                        </Box>
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #FEB963 32.69%, #FF61E2 67.79%, #FEB963 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textShadow: "0 0 30px #FEB963"
                            }}
                        >
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
                    <Link
                        prefetch={false}
                        href="/register/general#confirmation"
                    >
                        <Box
                            sx={{
                                p: "6px",
                                borderRadius: "40px",
                                background:
                                    "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                                display: "inline-block"
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundImage:
                                        "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)",
                                    backgroundSize: "150% 100%",
                                    backgroundPosition: "50% 0%",
                                    color: "white",
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: "16px",
                                        sm: "15px",
                                        md: "20px"
                                    },
                                    textTransform: "none",
                                    px: { xs: 4, sm: 6 },
                                    py: 1.5,
                                    borderRadius: "40px",
                                    fontFamily: "Tsukimi Rounded",
                                    border: "none",
                                    transition: "background-position 0.5s ease",
                                    "&:hover": {
                                        backgroundPosition: "-20% 0%"
                                    }
                                }}
                            >
                                CONTINUE
                            </Button>
                        </Box>
                    </Link>
                </Container>
            </Box>

            <Confetti width={width} height={height} />
        </>
    );
}
