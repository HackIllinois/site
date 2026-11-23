"use client";

import Loading from "@/components/Loading/Loading";
import RegistrationBackground from "@/components/RegistrationBackground/RegistrationBackground";
import { registrationBackgrounds } from "@/modules/RegistrationBackgrounds";
import { authenticate, devLogin, getDevUsers } from "@/util/api";
import { LOCAL_AUTH_ENABLED } from "@/util/api-config";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const authButtonSx = {
    backgroundColor: "#75462d",
    color: "#ffffff",
    padding: "12px 24px",
    fontSize: { xs: "18px", sm: "20px", md: "22px" },
    fontWeight: 600,
    borderRadius: "999px",
    textTransform: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    "& .MuiButton-startIcon": {
        marginRight: 1,
        "& svg": { fontSize: "1.4rem" }
    },
    "&:hover": {
        backgroundColor: "#8c5638",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5)"
    },
    "&:active": {
        backgroundColor: "#5f3825",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)"
    },
    fontFamily: "Montserrat"
};

const REDIRECT_ATTEMPTED_KEY = "googleAuthRedirectAttempted";

type LocalSignInMode = "existing" | "fresh";

const GithubAuthPage = ({
    mechathonMessage: _mechathonMessage = false
}: {
    mechathonMessage?: boolean;
}) => {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [signingInMode, setSigningInMode] = useState<LocalSignInMode | null>(
        null
    );
    const [signInError, setSignInError] = useState(() => {
        if (typeof window === "undefined" || LOCAL_AUTH_ENABLED) {
            return "";
        }
        const searchParams = new URLSearchParams(window.location.search);
        const errorParam = searchParams.get("error");
        if (errorParam) {
            return errorParam === "access_denied"
                ? "Sign in was cancelled. Please try again."
                : `Sign in error: ${errorParam}. Please try again.`;
        }
        if (sessionStorage.getItem(REDIRECT_ATTEMPTED_KEY)) {
            return "Sign in could not be completed. Please try again.";
        }
        return "";
    });

    useEffect(() => {
        if (LOCAL_AUTH_ENABLED) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const errorParam = urlParams.get("error");
        if (errorParam || sessionStorage.getItem(REDIRECT_ATTEMPTED_KEY)) {
            return;
        }

        try {
            sessionStorage.setItem(REDIRECT_ATTEMPTED_KEY, "true");
            authenticate("google");
        } catch (error) {
            setSignInError(
                error instanceof Error
                    ? error.message
                    : "Could not redirect to sign in. Please try again."
            );
        }
    }, []);

    const handleRetryGoogleAuth = () => {
        setSignInError("");
        sessionStorage.setItem(REDIRECT_ATTEMPTED_KEY, "true");
        try {
            authenticate("google");
        } catch (error) {
            setSignInError(
                error instanceof Error
                    ? error.message
                    : "Could not redirect to sign in. Please try again."
            );
        }
    };

    const handleLocalSignIn = async (mode: LocalSignInMode) => {
        setIsSigningIn(true);
        setSigningInMode(mode);
        setSignInError("");
        try {
            if (typeof window !== "undefined") {
                sessionStorage.removeItem(REDIRECT_ATTEMPTED_KEY);
            }
            if (mode === "existing") {
                const { users } = await getDevUsers();
                const user = users[0];
                if (!user) {
                    throw new Error(
                        "No local test users are available. Restart Adonix to create them, then try again."
                    );
                }
                await devLogin({ userId: user.userId });
            } else {
                await devLogin({});
            }
            window.location.reload();
        } catch (error) {
            setSignInError(
                error instanceof Error
                    ? error.message
                    : "Could not sign in. Please try again."
            );
            setIsSigningIn(false);
            setSigningInMode(null);
        }
    };

    if (!LOCAL_AUTH_ENABLED) {
        if (signInError) {
            return (
                <Box
                    sx={{
                        width: "100%",
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 3
                    }}
                >
                    <Alert severity="error" sx={{ mb: 3, maxWidth: 500 }}>
                        {signInError}
                    </Alert>
                    <Button
                        variant="contained"
                        onClick={handleRetryGoogleAuth}
                        sx={authButtonSx}
                    >
                        Try signing in with Google again
                    </Button>
                </Box>
            );
        }
        return <Loading />;
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
            <RegistrationBackground
                background={registrationBackgrounds.auth}
                next={registrationBackgrounds.personal_info}
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
                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        mb: 3,
                        color: "white",
                        opacity: 0.9,
                        fontFamily: "Montserrat",
                        fontSize: {
                            xs: "20px",
                            md: "24px"
                        },
                        paddingLeft: 6,
                        paddingRight: 6
                    }}
                >
                    Sign in to get started!
                </Typography>

                {/* Priority and final deadline boxes */}
                {/* <Box
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "80vw",
                            md: "716px"
                        },
                        maxWidth: "716px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        mb: "26px"
                    }}
                >
                    <Box
                        sx={{
                            minHeight: { xs: "auto", md: "103px" },
                            borderRadius: { xs: "15px", md: "67px" },
                            px: { xs: 3, md: 4 },
                            py: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background:
                                "linear-gradient(90deg, rgba(163,21,214,0.6) 0%, rgba(253,171,96,0.6) 51.44%, rgba(163,21,214,0.6) 100%)"
                        }}
                    >
                        {mechathonMessage ? (
                            <>
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "14px",
                                            sm: "16px",
                                            md: "20px"
                                        },
                                        lineHeight: "100%",
                                        textAlign: "center",
                                        textWrap: "balance",
                                        mb: "12px",
                                        color: "white"
                                    }}
                                >
                                    ONLY MECHATHON* REGISTRATION IS OPEN
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "14px",
                                            sm: "16px",
                                            md: "20px"
                                        },
                                        lineHeight: "100%",
                                        textAlign: "center",
                                        mb: "12px",
                                        color: "white"
                                    }}
                                >
                                    PRIORITY DEADLINE: Feb 10th, 2026
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 500,
                                        fontStyle: "italic",
                                        fontSize: { xs: "14px", md: "16px" },
                                        lineHeight: "100%",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >
                                    *Mechathon is the HackIllinois hardware
                                    track hosted by John Deere.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "14px",
                                            sm: "16px",
                                            md: "20px"
                                        },
                                        lineHeight: "100%",
                                        textAlign: "center",
                                        mb: "12px",
                                        color: "white"
                                    }}
                                >
                                    PRIORITY DEADLINE: Jan 4th, 2026
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontWeight: 500,
                                        fontStyle: "italic",
                                        fontSize: { xs: "14px", md: "16px" },
                                        lineHeight: "100%",
                                        textAlign: "center",
                                        color: "white"
                                    }}
                                >
                                    Those who register by this deadline will be
                                    entered in a raffle to win an{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            fontWeight: 600,
                                            fontStyle: "italic"
                                        }}
                                    >
                                        iPad
                                    </Box>
                                    !
                                </Typography>
                            </>
                        )}
                    </Box>
                    {!mechathonMessage ? (
                        <Box
                            sx={{
                                minHeight: {
                                    xs: "auto",
                                    md: "67px"
                                },
                                borderRadius: "67px",
                                px: { xs: 3, md: 4 },
                                py: { xs: 2, md: 0 },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(64, 26, 121, 0.6)"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontWeight: 700,
                                    fontSize: {
                                        xs: "14px",
                                        sm: "16px",
                                        md: "20px"
                                    },
                                    lineHeight: "100%",
                                    textAlign: "center",
                                    color: "white"
                                }}
                            >
                                FINAL DEADLINE: Jan 27th, 2026
                            </Typography>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box> */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px"
                    }}
                >
                    <Box>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PersonOutlineIcon />}
                            onClick={() => handleLocalSignIn("existing")}
                            disabled={isSigningIn}
                            sx={authButtonSx}
                        >
                            {signingInMode === "existing"
                                ? "Signing in…"
                                : "Sign in as an existing test user"}
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PersonOutlineIcon />}
                            onClick={() => handleLocalSignIn("fresh")}
                            disabled={isSigningIn}
                            sx={authButtonSx}
                        >
                            {signingInMode === "fresh"
                                ? "Signing in…"
                                : "Sign in as a fresh test user"}
                        </Button>
                    </Box>
                </Box>
                {signInError && (
                    <Alert severity="error" sx={{ mt: 3, maxWidth: 500 }}>
                        {signInError}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default GithubAuthPage;
