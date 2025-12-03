"use client";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import LANDING from "@/public/registration/pro/landing.svg";
import { montserrat } from "@/theme/fonts";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import GithubAuthPage from "../register/general/formPages/GithubAuthPage";
import NotProTrackPage from "../register/general/formPages/NotProTrackPage";
import { GradientButton } from "@/components/GradientButton/GradientButton";

const ProChallenge: React.FC = () => {
    const registrationAuth = useRegistrationAuth(true);

    if (registrationAuth.isLoading) {
        return <Loading backgroundImage={LANDING.src} zoom={false} />;
    }

    if (!registrationAuth.authenticated) {
        return <GithubAuthPage />;
    }

    if (!registrationAuth.submission?.pro) {
        return <NotProTrackPage />;
    }

    return (
        <main className={"screen"}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "100vh",
                    height: "100%",
                    width: "100%",
                    pt: "80px",
                    pb: "50px",
                    backgroundImage: `url(${LANDING.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontWeight: 500,
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    Ready to be a
                </Typography>
                <Typography
                    fontFamily={"Tsukimi Rounded"}
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "32px", sm: "54px" }
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            fontSize: { xs: "42px", sm: "64px" }
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
                            fontSize: { xs: "42px", sm: "64px" }
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
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        OYAGER
                    </Box>
                    <Box component="span">?</Box>
                </Typography>

                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    Complete the following
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    coding challenge to find
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    fontSize={28}
                    sx={{
                        mb: "20px",
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    out!
                </Typography>

                {/* Begin button */}
                <GradientButton text="BEGIN" link="/challenge/description" />
            </Box>
        </main>
    );
};

export default ProChallenge;
