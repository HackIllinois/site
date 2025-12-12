"use client";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import LANDING from "@/public/registration/pro/landing.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import GithubAuthPage from "../register/general/formPages/GithubAuthPage";
import NotProTrackPage from "../register/general/formPages/NotProTrackPage";
import { getChallenge } from "@/util/api";
import { useEffect } from "react";

const ProChallenge: React.FC = () => {
    const registrationAuth = useRegistrationAuth(true);

    async function handleLoadChallengeStatus() {
        try {
            const res = await getChallenge();
            if (res.complete) {
                window.location.href = "/challenge/result/success";
            }
        } catch {
            // TODO: handle this error
        }
    }

    useEffect(() => {
        handleLoadChallengeStatus();
    }, []);

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
                <Box
                    sx={{
                        mt: "20px",
                        mb: "20px",
                        width: {
                            xs: "310px",
                            sm: "540px"
                        }
                    }}
                >
                    <Image
                        src="/design-reference/HACKVOYAGER_.svg"
                        alt="HackVoyagers"
                        width={600}
                        height={150}
                        style={{
                            width: "100%",
                            height: "auto"
                        }}
                    />
                </Box>
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
