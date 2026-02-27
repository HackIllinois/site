"use client";

import { FORCE_REGISTRATION_CLOSED } from "@/app/register/constants";
import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function ChallengeResult() {
    const registrationAuth = useRegistrationAuth({
        isClosed: FORCE_REGISTRATION_CLOSED,
        isProtected: !FORCE_REGISTRATION_CLOSED,
        shouldLoadSubmission: true
    });
    if (registrationAuth.isLoading) {
        return (
            <Loading
                backgroundImage={"/challenge/backgrounds/failure.svg"}
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
                backgroundImage={"/challenge/backgrounds/failure.svg"}
            />
        );
    }

    return (
        <>
            <Box
                sx={{
                    minHeight: { xs: "140vh", sm: "120vh" }, // full viewport height
                    minWidth: "100vw",
                    height: "100%",
                    width: "100%",
                    backgroundImage: {
                        xs: `url("/challenge/backgrounds/mobile/failure.svg"), url("/challenge/backgrounds/failure.svg")`,
                        md: `url("/challenge/backgrounds/failure.svg")`
                    },
                    backgroundSize: "cover", // fill the screen
                    backgroundRepeat: "no-repeat", // prevent tiling
                    backgroundPosition: "center", // center the image
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    fontFamily={"Tsukimi Rounded"}
                    sx={{
                        fontSize: { xs: "22px", sm: "36px", md: "40px" },
                        textAlign: "center",
                        px: 2,
                        fontWeight: 700,
                        mt: "140px"
                    }}
                >
                    Unfortunately, your solution
                </Typography>
                <Typography
                    variant="h1"
                    component="h1"
                    fontFamily={"Tsukimi Rounded"}
                    sx={{
                        fontSize: { xs: "22px", sm: "36px", md: "40px" },
                        textAlign: "center",
                        px: 2,
                        fontWeight: 700,
                        mt: 2
                    }}
                >
                    did not pass the challenge
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
                        Please select one of the following options:
                    </Typography>

                    <Box
                        sx={{
                            position: "absolute",
                            height: {
                                xs: "310px",
                                sm: "280px",
                                md: "320px",
                                lg: "340px",
                                xl: "370px"
                            },
                            width: "370px",
                            top: { xs: "30%", sm: "34%", md: "39%", lg: "44%" },
                            left: {
                                sm: "5%",
                                xs: "1%",
                                md: "6%",
                                lg: "15%",
                                xl: "22%"
                            },
                            backgroundImage:
                                'url("/challenge/failure/left_rock.svg")',
                            backgroundSize: "contain", // fill the screen
                            backgroundRepeat: "no-repeat", // prevent tiling
                            backgroundPosition: "center" // center the image
                        }}
                    >
                        <Link prefetch={false} href="/challenge">
                            <Box
                                sx={{
                                    p: "6px",
                                    borderRadius: "40px",
                                    background:
                                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                                    display: "inline-block",
                                    mt: { xs: "60px", sm: "80px" }
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
                                            sm: "18px",
                                            md: "20px"
                                        },
                                        textTransform: "none",
                                        px: { xs: 4, sm: 6 },
                                        py: 1.5,
                                        borderRadius: "40px",
                                        fontFamily: "Tsukimi Rounded",
                                        border: "none",
                                        transition:
                                            "background-position 0.5s ease",
                                        "&:hover": {
                                            backgroundPosition: "-20% 0%"
                                        }
                                    }}
                                >
                                    TRY AGAIN
                                </Button>
                            </Box>
                        </Link>

                        <Typography
                            component="p"
                            sx={{
                                maxWidth: "700px",
                                px: 5,
                                fontWeight: 500,
                                fontSize: {
                                    xs: "17px",
                                    sm: "13px",
                                    md: "15px"
                                },
                                pt: "10px"
                            }}
                        >
                            You have unlimited attempts!
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                maxWidth: "300px",
                                px: 5,
                                fontWeight: 500,
                                fontSize: {
                                    xs: "17px",
                                    sm: "13px",
                                    md: "15px"
                                },
                                pt: "10px",
                                mx: "auto",
                                textAlign: "center"
                            }}
                        >
                            Note: number of attempts will be considered in your
                            application
                        </Typography>
                    </Box>
                    {/* second rock below */}

                    <Box
                        sx={{
                            position: "absolute",
                            height: {
                                xs: "420px",
                                sm: "400px",
                                md: "430px",
                                lg: "450px",
                                xl: "470px"
                            },
                            width: "470px",
                            top: { xs: "62%", sm: "58%", md: "53%", lg: "48%" },
                            right: {
                                sm: "5%",
                                xs: "-15%",
                                md: "6%",
                                lg: "15%",
                                xl: "22%"
                            },
                            backgroundImage:
                                'url("/challenge/failure/right_rock.svg")',
                            backgroundSize: "contain", // fill the screen
                            backgroundRepeat: "no-repeat", // prevent tiling
                            backgroundPosition: "center" // center the image
                        }}
                    >
                        <Link
                            prefetch={false}
                            href="/register/general#application-questions"
                        >
                            <Box
                                sx={{
                                    p: "6px",
                                    borderRadius: "60px",
                                    background:
                                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                                    display: "inline-block",
                                    mt: { xs: "80px", sm: "100px" }
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
                                            sm: "18px",
                                            md: "20px"
                                        },
                                        textTransform: "none",
                                        px: { xs: 4, sm: 4 },
                                        py: 1.5,
                                        borderRadius: "60px",
                                        fontFamily: "Tsukimi Rounded",
                                        border: "none",
                                        transition:
                                            "background-position 0.5s ease",
                                        "&:hover": {
                                            backgroundPosition: "-20% 0%"
                                        }
                                    }}
                                >
                                    RETURN TO
                                    <br />
                                    REGISTRATION
                                </Button>
                            </Box>
                        </Link>

                        <Typography
                            component="p"
                            sx={{
                                maxWidth: {
                                    xs: "340px",
                                    sm: "330px",
                                    md: "350px"
                                },
                                px: 5,
                                fontWeight: 500,
                                fontSize: {
                                    xs: "17px",
                                    sm: "13px",
                                    md: "16px"
                                },
                                pt: "10px",
                                mx: "auto",
                                textAlign: "center"
                            }}
                        >
                            If you are no longer interested in applying as a
                            HackVoyager, you can return to the registration form
                            and continue applying as a regular attendee.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
