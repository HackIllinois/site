"use client";

import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import useWindowSize from "@/hooks/use-window-size";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Confetti from "react-confetti";
import { getChallenge } from "@/util/api";
import { useEffect, useState } from "react";

export default function ChallengeResult() {
    const registrationAuth = useRegistrationAuth(true);
    const { width, height } = useWindowSize();
    const [challengePassed, setChallengePassed] = useState(false);
    const [challengeLoading, setChallengeLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await getChallenge();
                if (res.complete) {
                    setChallengePassed(true);
                }
            } finally {
                setChallengeLoading(false);
            }
        }

        load();
    }, []);

    if (challengeLoading) {
        return (
            <Loading
                backgroundImage={"/challenge/backgrounds/success.svg"}
                zoom={false}
            />
        );
    }

    if (!challengePassed) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    px: 3,
                    backgroundImage: `url("/challenge/backgrounds/success.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "Tsukimi Rounded",
                        color: "white",
                        fontWeight: 700,
                        mb: 2
                    }}
                >
                    You still must complete the Pro Challenge
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "rgba(255,255,255,0.8)",
                        maxWidth: "600px",
                        mb: 3,
                        fontFamily: "Montserrat"
                    }}
                >
                    Please return to the challenge page and complete the
                    challenge.
                </Typography>

                <GradientButton text="START CHALLENGE" link="/challenge/" />
            </Box>
        );
    }

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
                        <Box
                            sx={{
                                mt: "-40px",
                                mb: { xs: "-50px", sm: "-65px" },
                                width: {
                                    xs: "370px",
                                    sm: "640px"
                                }
                            }}
                        >
                            <Image
                                src="/design-reference/HACKVOYAGERS_GLOW.svg"
                                alt="HackVoyagers"
                                width={600}
                                height={150}
                                style={{
                                    width: "100%",
                                    height: "auto"
                                }}
                            />
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
