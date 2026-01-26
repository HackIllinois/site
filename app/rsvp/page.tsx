"use client";

import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import Loading from "@/components/Loading/Loading";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { loadAdmissionRSVP, loadSubmission } from "@/util/api";
import { RSVPInfo, RegistrationApplicationSubmitted } from "@/util/types";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useMediaQuery
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RSVP() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);
    const [registrationData, setRegistrationData] =
        useState<RegistrationApplicationSubmitted | null>(null);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const isVerySmallScreen = useMediaQuery("(max-width:300px)");

    const loadRSVPData = async () => {
        try {
            const [rsvpData, registrationData] = await Promise.all([
                loadAdmissionRSVP(),
                loadSubmission()
            ]);

            console.log(
                "rsvpData",
                rsvpData,
                "registrationData",
                registrationData
            );

            setRsvpData(rsvpData);
            setRegistrationData(registrationData);

            if (!rsvpData.emailSent || rsvpData.status !== "ACCEPTED") {
                router.push("/register/general");
                return;
            }

            if (rsvpData.response === "ACCEPTED") {
                router.push("/profile");
            }
            setLoading(false);
        } catch (error: any) {
            if (
                error?.status === 404 ||
                error?.statusCode === 404 ||
                error.error === "NotFound"
            ) {
                router.push("/register/general");
            } else {
                console.error("Error loading RSVP data:", error);
                router.push("/");
            }
        }
    };
    useEffect(() => {
        loadRSVPData();
    }, [router, searchParams]);

    const handleAccept = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            router.push("/profile");
        } catch (error) {
            console.error("Error accepting RSVP:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeclineClick = () => {
        setShowDeclineDialog(true);
    };

    const handleDeclineConfirm = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            setRsvpData((prev: RSVPInfo | null) =>
                prev ? { ...prev, response: "DECLINED" } : null
            );
            setShowDeclineDialog(false);
        } catch (error) {
            console.error("Error declining RSVP:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeclineCancel = () => {
        setShowDeclineDialog(false);
    };

    if (loading) return <Loading />;

    if (rsvpData?.status !== "ACCEPTED") {
        return <></>;
    }

    if (rsvpData?.response === "DECLINED") {
        return (
            <Box
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: {
                        xs: "flex-start",
                        md: "center"
                    },
                    width: "100vw",
                    minHeight: "100vh",
                    overflowX: "hidden",
                    margin: 0,
                    padding: 0,
                    position: "relative",
                    background: "linear-gradient(to bottom, #16133e, #3a3069)"
                }}
            >
                <img
                    src="/rsvp/post_decision_screen.svg"
                    alt="Background"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        zIndex: 1
                    }}
                />
                <Box
                    sx={{ height: "80px", position: "relative", zIndex: 10 }}
                />
                <Container
                    sx={{
                        position: "relative",
                        zIndex: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        maxWidth: "900px",
                        margin: "0 auto"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: { xs: "42px", md: "55px" },
                            fontWeight: 700,
                            color: "white",
                            textShadow: "0 4px 20px rgba(255, 255, 255, 0.3)",
                            marginBottom: "1rem",
                            animation: "fadeInDown 0.8s ease-out",
                            "@keyframes fadeInDown": {
                                from: {
                                    opacity: 0,
                                    transform: "translateY(-30px)"
                                },
                                to: {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            }
                        }}
                    >
                        {"We're sorry to see you go!"}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "16px", md: "20px" },
                            color: "rgba(255, 255, 255, 0.95)",
                            lineHeight: 1.8,
                            maxWidth: "700px",
                            marginBottom: "3rem",
                            animation: "fadeInDown 0.8s ease-out 0.2s both",
                            "@keyframes fadeInDown": {
                                from: {
                                    opacity: 0,
                                    transform: "translateY(-30px)"
                                },
                                to: {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            }
                        }}
                    >
                        If you would like to stay up to date with HackIllinois,
                        consider following our socials or subscribing to our
                        newsletter.
                    </Typography>
                    <SocialIconsRow />
                    <Box
                        sx={{
                            marginTop: "3rem",
                            width: "100%",
                            maxWidth: "700px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Tsukimi Rounded", sans-serif',
                                fontSize: "24px",
                                fontWeight: 600,
                                color: "white",
                                textAlign: "left",
                                marginBottom: "1rem",
                                paddingLeft: "1rem"
                            }}
                        >
                            Newsletter signup
                        </Typography>
                        <NewsletterSubscription />
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",

                justifyContent: {
                    xs: "flex-start",
                    md: "center"
                },
                width: "100vw",
                minHeight: "100vh",
                overflowX: "hidden",
                margin: 0,
                padding: 0,
                position: "relative",
                background: "linear-gradient(to bottom, #16133e, #3a3069)",
                marginTop: {
                    xs: "50px",
                    md: "0px"
                }
            }}
        >
            <img
                src="/rsvp/decision_screen.svg"
                alt="Background"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: 1,
                    filter: "brightness(0.7)"
                }}
            />
            <Box sx={{ height: "80px", position: "relative", zIndex: 10 }} />
            <Container
                sx={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "100%",
                    margin: "0 auto",
                    padding: "0 2rem",
                    paddingBottom: "3rem"
                }}
            >
                <Typography
                    sx={{
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontSize: { xs: "24px", sm: "36px", md: "50px" },
                        fontWeight: 700,
                        color: "white",
                        textShadow: "0 4px 20px rgba(255, 255, 255, 0.3)",
                        marginBottom: "1rem",
                        animation: "fadeInDown 0.8s ease-out",
                        "@keyframes fadeInDown": {
                            from: {
                                opacity: 0,
                                transform: "translateY(-30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    {isVerySmallScreen ? "CONGRATS!" : "CONGRATULATIONS!"}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "14x", sm: "22px", md: "23px" },
                        fontWeight: 500,
                        textWrap: "balance",
                        color: "rgba(255, 255, 255, 0.95)",
                        marginBottom: "1rem",
                        animation: "fadeInDown 0.8s ease-out 0.2s both",
                        "@keyframes fadeInDown": {
                            from: {
                                opacity: 0,
                                transform: "translateY(-30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    {rsvpData?.admittedPro ? (
                        "Welcome on board as a"
                    ) : rsvpData?.correctProChallenge ? (
                        <>
                            {
                                "While we unfortunately couldn't offer you a spot as a HackVoyager, "
                            }
                            <br />
                            {"you've been accepted as a"}
                        </>
                    ) : (
                        "Welcome on board as a"
                    )}
                </Typography>
                {rsvpData?.admittedPro ? (
                    <img
                        src="/rsvp/hackVoyager.svg"
                        alt="Hack Voyager"
                        style={{
                            maxWidth: "500px",
                            width: "100%",
                            height: "auto",
                            marginBottom: "1rem",
                            animation: "scaleIn 0.8s ease-out 0.4s both"
                        }}
                    />
                ) : (
                    <img
                        src="/rsvp/generalAttendee.svg"
                        alt="General Attendee"
                        style={{
                            maxWidth: "500px",
                            width: "100%",
                            height: "auto",
                            marginBottom: "1rem",
                            animation: "scaleIn 0.8s ease-out 0.4s both"
                        }}
                    />
                )}
                {registrationData?.requestTravelReimbursement && (
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "18px", sm: "20px", md: "29px" },
                            fontWeight: 600,
                            color: "white",
                            marginBottom: "1rem",
                            textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                            animation: "fadeInDown 0.8s ease-out 0.6s both",
                            "@keyframes fadeInDown": {
                                from: {
                                    opacity: 0,
                                    transform: "translateY(-30px)"
                                },
                                to: {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            }
                        }}
                    >
                        with a reimbursement total of{" "}
                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(135deg, #ffba9a 0%, #ee1eee 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontWeight: 520
                            }}
                        >
                            ${rsvpData?.reimbursementValue ?? 0}
                        </Box>
                    </Typography>
                )}
                <Typography
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "14px", sm: "16px", md: "21px" },
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: 1.7,
                        maxWidth: "1000px",
                        marginBottom: "1rem",
                        animation: "fadeInDown 0.8s ease-out 0.8s both",
                        textWrap: "balance",
                        "@keyframes fadeInDown": {
                            from: {
                                opacity: 0,
                                transform: "translateY(-30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    If you would like to attend HackIllinois 2026, click{" "}
                    <b>Next</b> to finish RSVP process.
                </Typography>
                <Typography
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "14px", sm: "16px", md: "21px" },
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: 1.7,
                        maxWidth: "1000px",
                        marginBottom: "1rem",
                        textWrap: "balance",
                        animation: "fadeInDown 0.8s ease-out 0.8s both",
                        "@keyframes fadeInDown": {
                            from: {
                                opacity: 0,
                                transform: "translateY(-30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    If you won&apos;t be attending, please click{" "}
                    <b>Decline.</b>{" "}
                </Typography>
                <Typography
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "14px", sm: "16px", md: "21px" },
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: 1.7,
                        maxWidth: "1000px",
                        marginBottom: "2.5rem",
                        animation: "fadeInDown 0.8s ease-out 0.8s both",
                        "@keyframes fadeInDown": {
                            from: {
                                opacity: 0,
                                transform: "translateY(-30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    <Box component="span" sx={{ fontWeight: 700 }}>
                        This cannot be reversed.
                    </Box>
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        gap: { xs: "1rem", md: "2rem" },
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: "100%", md: "auto" },
                        animation: "fadeInUp 0.8s ease-out 1s both",
                        "@keyframes fadeInUp": {
                            from: {
                                opacity: 0,
                                transform: "translateY(30px)"
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        }
                    }}
                >
                    <Button
                        onClick={handleDeclineClick}
                        disabled={submitting}
                        sx={{
                            padding: {
                                xs: "12px 32px",
                                md: "18px 48px"
                            },
                            backgroundColor: "#F46D6D",
                            border: "#FF0000 2px solid",
                            borderRadius: "50px",
                            color: "#0a1a0a",
                            minWidth: {
                                xs: "100px",
                                md: "200px"
                            },
                            fontFamily: "Tsukimi Rounded, sans-serif",
                            fontSize: {
                                xs: "14px",
                                md: "20px"
                            },
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            width: { xs: "100%", md: "auto" },
                            maxWidth: { xs: "300px", md: "none" },
                            "&:hover:not(:disabled)": {
                                transform: "scale(1.03)",
                                boxShadow: "0 6px 25px rgba(255, 107, 107, 0.6)"
                            },
                            "&:active:not(:disabled)": {
                                transform: "translateY(0)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        DECLINE
                    </Button>
                    <Button
                        onClick={handleAccept}
                        disabled={submitting}
                        sx={{
                            padding: {
                                xs: "12px 32px",
                                md: "18px 48px"
                            },
                            backgroundColor: "#8EDB91",
                            border: "#2AFF00 2px solid",
                            minWidth: {
                                xs: "100px",
                                md: "200px"
                            },
                            borderRadius: "50px",
                            color: "#0a1a0a",
                            fontFamily: "Tsukimi Rounded, sans-serif",
                            fontSize: {
                                xs: "14px",
                                md: "20px"
                            },
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0, 255, 43, 0.4)",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            width: { xs: "100%", md: "auto" },
                            maxWidth: { xs: "300px", md: "none" },
                            "&:hover:not(:disabled)": {
                                transform: "scale(1.03)",
                                boxShadow: "0 6px 25px rgba(0, 255, 43, 0.6)"
                            },
                            "&:active:not(:disabled)": {
                                transform: "translateY(0)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        NEXT
                    </Button>
                </Box>
            </Container>
            <Dialog
                open={showDeclineDialog}
                onClose={handleDeclineCancel}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "rgba(22, 19, 62, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        color: "white"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontSize: { xs: "22px", md: "28px" },
                        fontWeight: 700,
                        color: "white",
                        textAlign: "center",
                        padding: {
                            xs: "1.5rem 1.5rem 0.5rem",
                            md: "2rem 2rem 1rem"
                        }
                    }}
                >
                    Are you sure you want to decline?
                </DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "14px", md: "16px" },
                            color: "rgba(255, 255, 255, 0.9)",
                            lineHeight: 1.7,
                            textAlign: "center",
                            padding: { xs: "0.5rem 1.5rem", md: "1rem 2rem" }
                        }}
                    >
                        This action cannot be reversed. If you decline, you will
                        not be able to attend HackIllinois 2026.
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: "0.75rem", md: "1rem" },
                        justifyContent: "center",
                        padding: {
                            xs: "0.5rem 1.5rem 1.5rem",
                            md: "1rem 2rem 2rem"
                        }
                    }}
                >
                    <Button
                        onClick={handleDeclineCancel}
                        sx={{
                            padding: "12px 32px",
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            borderRadius: "50px",
                            color: "white",
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            width: { xs: "100%", md: "auto" },
                            "&:hover": {
                                background: "rgba(255, 255, 255, 0.2)",
                                borderColor: "rgba(255, 255, 255, 0.4)"
                            }
                        }}
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleDeclineConfirm}
                        disabled={submitting}
                        sx={{
                            padding: "12px 32px",
                            background:
                                "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
                            border: "none",
                            borderRadius: "50px",
                            color: "white",
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "16px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
                            transition: "all 0.3s ease",
                            width: { xs: "100%", md: "auto" },
                            "&:hover:not(:disabled)": {
                                transform: "translateY(-2px)",
                                boxShadow:
                                    "0 6px 25px rgba(255, 107, 107, 0.6)",
                                background:
                                    "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        YES, DECLINE
                    </Button>
                </DialogActions>
            </Dialog>
            <style jsx global>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </Box>
    );
}
