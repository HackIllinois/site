"use client";

import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import Loading from "@/components/Loading/Loading";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import {
    declineAdmissionRSVP,
    loadAdmissionRSVP,
    loadSubmission
} from "@/util/api";
import { RSVPInfo, RegistrationApplicationSubmitted } from "@/util/types";
import { WarningAmberRounded } from "@mui/icons-material";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RSVP() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);
    const [registrationData, setRegistrationData] =
        useState<RegistrationApplicationSubmitted | null>(null);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
                setErrorMessage(
                    error?.message ||
                        "Failed to load RSVP data. Please try again."
                );
                setShowErrorAlert(true);
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        loadRSVPData();
    }, [router]);

    const handleAccept = async () => {
        if (submitting) return;

        const reimbursementAmount = rsvpData?.reimbursementValue ?? 0;

        // If user has reimbursement > $0, show confirmation modal
        if (reimbursementAmount > 0) {
            setShowConfirmDialog(true);
        } else {
            // If no reimbursement, redirect directly to profile-setup
            router.push("/profile-setup");
        }
    };

    const handleDeclineClick = () => {
        setShowDeclineDialog(true);
    };

    const handleDeclineConfirm = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            await declineAdmissionRSVP();
            await loadRSVPData();
            setShowDeclineDialog(false);
        } catch (error: any) {
            console.error("Error declining RSVP:", error);
            setErrorMessage(
                error?.message || "Failed to decline RSVP. Please try again."
            );
            setShowErrorAlert(true);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeclineCancel = () => {
        setShowDeclineDialog(false);
    };

    const handleConfirmConfirm = async () => {
        if (submitting) return;
        setSubmitting(true);
        router.push("/profile-setup");
    };

    const handleConfirmCancel = () => {
        setShowConfirmDialog(false);
    };

    if (loading) return <Loading />;

    if (rsvpData?.status !== "ACCEPTED") {
        return (
            <>
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
                        background:
                            "linear-gradient(to bottom, #16133e, #3a3069)"
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
                            zIndex: 1,
                            // Darken via brightness transformation
                            filter: "brightness(0.7)"
                        }}
                    />
                </Box>
                <ErrorSnackbar
                    open={showErrorAlert}
                    onClose={() => setShowErrorAlert(false)}
                    message={errorMessage}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                />
            </>
        );
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
                        zIndex: 1,
                        // Darken via brightness transformation
                        filter: "brightness(0.7)"
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
                            fontSize: { xs: "32px", md: "50px" },
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
                            marginBottom: { xs: "1rem", md: "3rem" },
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
                            marginTop: { xs: "1rem", md: "3rem" },
                            maxWidth: "700px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: '"Montserrat", sans-serif',
                                fontSize: {
                                    xs: "16px",
                                    md: "24px"
                                },
                                fontWeight: 600,
                                color: "white",
                                textAlign: "left",
                                marginBottom: "0.5rem"
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
            <ErrorSnackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                message={errorMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
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
                            xs: "column-reverse",
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
                        background: "#111115", // Dark background
                        border: "2px solid #FF6B6B", // Red alert border
                        borderRadius: "24px",
                        boxShadow: "0 0 40px rgba(255, 107, 107, 0.15)", // Subtle red glow
                        color: "white",
                        overflow: "hidden"
                    }
                }}
            >
                {/* System Alert Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        pt: 2,
                        pb: 1,
                        color: "#FF6B6B",
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontWeight: 700,
                        fontSize: "18px",
                        letterSpacing: "1px"
                    }}
                >
                    <WarningAmberRounded sx={{ fontSize: 28 }} />
                    SYSTEM ALERT
                    <WarningAmberRounded sx={{ fontSize: 28 }} />
                </Box>

                <DialogTitle
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "20px", md: "24px" },
                        fontWeight: 600,
                        color: "white",
                        textAlign: "center",
                        padding: "0.5rem 2rem"
                    }}
                >
                    Are you sure you want to decline?
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "14px",
                            color: "#E0E0E0",
                            textAlign: "center",
                            mt: 1
                        }}
                    >
                        This action cannot be reversed.
                    </Typography>
                </DialogContent>

                <DialogActions
                    disableSpacing
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column-reverse",
                            md: "row"
                        },
                        justifyContent: "center",
                        gap: 2,
                        padding: "0 2rem 3rem",
                        mt: 2,
                        paddingBottom: 2
                    }}
                >
                    <Button
                        onClick={handleDeclineCancel}
                        sx={{
                            padding: "10px 32px",
                            background: "transparent",
                            border: "2px solid #FF6B6B",
                            minWidth: "150px",
                            borderRadius: "50px",
                            color: "#FF6B6B",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "14px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            "&:hover": {
                                background: "rgba(255, 107, 107, 0.1)",
                                borderColor: "#FF4F4F"
                            }
                        }}
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleDeclineConfirm}
                        disabled={submitting}
                        sx={{
                            padding: "10px 32px",
                            background: "transparent",
                            border: "2px solid #FF6B6B",
                            borderRadius: "50px",
                            color: "#FF6B6B",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "14px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            "&:hover": {
                                background: "rgba(255, 107, 107, 0.1)",
                                borderColor: "#FF4F4F"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                borderColor: "#555",
                                color: "#777"
                            }
                        }}
                    >
                        YES, DECLINE
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showConfirmDialog}
                onClose={handleConfirmCancel}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "#111115", // Dark background
                        border: "1px solid #2AFF00", // Neon Green border
                        borderRadius: "24px",
                        boxShadow: "0 0 40px rgba(42, 255, 0, 0.15)", // Green glow
                        color: "white",
                        overflow: "hidden"
                    }
                }}
            >
                {/* System Confirmation Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        pt: 3,
                        pb: 1,
                        color: "#2AFF00",
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontWeight: 700,
                        fontSize: "18px",
                        letterSpacing: "1px",
                        textAlign: "center"
                    }}
                >
                    SYSTEM NOTICE
                </Box>

                <DialogTitle
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "20px", md: "24px" },
                        fontWeight: 600,
                        color: "white",
                        textAlign: "center",
                        padding: "0.5rem 2rem"
                    }}
                >
                    Are you sure you would like to confirm?
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "14px",
                            color: "#E0E0E0",
                            textAlign: "center",
                            lineHeight: 1.7,
                            mt: 1
                        }}
                    >
                        Because capacity and reimbursements are limited,
                        confirming your spot reserves space and funding that
                        cannot be reassigned later.
                        <br />
                        <br />
                        Please only confirm if you genuinely believe you can
                        attend.
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", md: "row" },
                        justifyContent: "center",
                        gap: 2,
                        padding: "0 2rem 3rem",
                        paddingBottom: 3,
                        mt: 2
                    }}
                >
                    <Button
                        onClick={handleConfirmCancel}
                        sx={{
                            padding: "10px 24px",
                            background: "transparent",
                            border: "1px solid #2AFF00",
                            borderRadius: "50px",
                            color: "#2AFF00",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "13px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            width: { xs: "100%", md: "auto" },
                            whiteSpace: "nowrap",
                            "&:hover": {
                                background: "rgba(42, 255, 0, 0.1)",
                                borderColor: "#2AFF00",
                                boxShadow: "0 0 15px rgba(42, 255, 0, 0.2)"
                            }
                        }}
                    >
                        LET ME THINK AGAIN
                    </Button>
                    <Button
                        onClick={handleConfirmConfirm}
                        disabled={submitting}
                        sx={{
                            padding: "10px 24px",
                            background: "transparent",
                            border: "1px solid #2AFF00",
                            borderRadius: "50px",
                            color: "#2AFF00",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "13px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            width: { xs: "100%", md: "auto" },
                            whiteSpace: "nowrap",
                            "&:hover": {
                                background: "rgba(42, 255, 0, 0.1)",
                                borderColor: "#2AFF00",
                                boxShadow: "0 0 15px rgba(42, 255, 0, 0.2)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                borderColor: "#555",
                                color: "#777"
                            }
                        }}
                    >
                        I CONFIRM I CAN ATTEND
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
