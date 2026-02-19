"use client";

import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import Loading from "@/components/Loading/Loading";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function CTF() {
    const [loading, setLoading] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 250);

        (window as any).$FETCH_FLAG$ = {
            reward: "flag{flag-3}",
            reveal: () => {
                console.log("flag{flag-4}");
            }
        };

        (window as any).$HINT_1$ = {
            hint: "Elements"
        };

        (window as any).$HINT_2$ = {
            hint: "Elements -> id=UNLOCK-ME -> Uncheck display: none"
        };

        (window as any).$HINT_3$ = {
            hint: "Console -> window -> $FETCH_FLAG$"
        };

        (window as any).$HINT_4$ = {
            hint: "Console -> window -> $FETCH_FLAG$ -> $FETCH_FLAG$.reveal()"
        };

        (window as any).$HINT_5$ = {
            hint: 'Console -> fetch("/ctf/miniapi/") -> Network -> Response'
        };

        (window as any).$HINT_6$ = {
            hint: 'Console -> fetch("/ctf/miniapi/unlock?secret=xxx") -> Network -> Response'
        };

        return () => clearTimeout(t);
    }, []);

    const pingMiniApi = async () => {
        try {
            await fetch("/ctf/miniapi");
        } catch (e: any) {
            setErrorMessage(e?.message || "Failed to ping MiniAPI.");
            setShowErrorAlert(true);
        }
    };

    const pingMiniApiAgain = async () => {
        try {
            await fetch("/ctf/miniapi/unlock");
        } catch (e: any) {
            setErrorMessage(e?.message || "Failed to ping MiniAPI.");
            setShowErrorAlert(true);
        }
    };

    if (loading) return <Loading />;

    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: { xs: "flex-start", md: "center" },
                width: "100vw",
                minHeight: "100vh",
                overflowX: "hidden",
                margin: 0,
                padding: 0,
                position: "relative",
                background: "linear-gradient(to bottom, #070a12, #1b1f4b)"
            }}
        >
            <ErrorSnackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                message={errorMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />

            {/* FLAG 1 — Elements */}
            <Box data-ctf-flag="flag{flag-1}" sx={{ display: "none" }}>
                YOUR FIRST FLAG HERE!
            </Box>

            {/* Background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    backgroundImage:
                        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.10), transparent 35%)," +
                        "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 40%)," +
                        "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06), transparent 45%)",
                    filter: "brightness(0.9)"
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
                    maxWidth: "900px",
                    margin: "0 auto",
                    px: { xs: 2, md: 4 },
                    pb: 6
                }}
            >
                <Typography
                    sx={{
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontSize: { xs: "30px", md: "56px" },
                        fontWeight: 700,
                        color: "white",
                        textShadow: "0 4px 20px rgba(255, 255, 255, 0.25)",
                        mb: 2,
                        animation: "fadeInDown 0.8s ease-out"
                    }}
                >
                    HackAstra CTF
                </Typography>

                <Typography
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "14px", md: "20px" },
                        color: "rgba(255, 255, 255, 0.95)",
                        lineHeight: 1.9,
                        maxWidth: "750px",
                        mb: 3,
                        animation: "fadeInDown 0.8s ease-out 0.15s both"
                    }}
                >
                    Instructions here!
                </Typography>

                <Box
                    sx={{
                        width: "fit-content",
                        display: "inline-block",
                        backgroundColor: "rgba(19, 19, 19, 0.65)",
                        border: "1px solid rgba(255, 255, 255, 0.10)",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.45)",
                        px: 3,
                        py: 2,
                        borderRadius: "16px",
                        mb: 3,
                        animation: "fadeInUp 0.8s ease-out 0.3s both"
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "13px", md: "16px" },
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.92)"
                        }}
                    >
                        Objective
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "13px", md: "16px" },
                            color: "rgba(255,255,255,0.85)",
                            mt: 1
                        }}
                    >
                        Find flags in increasing difficulty.
                    </Typography>
                </Box>

                {/* FLAG 2 — “unhide me” via DevTools */}
                <Box
                    id="UNLOCK-ME"
                    sx={{
                        mt: 3,
                        px: 3,
                        py: 2,
                        borderRadius: "16px",
                        backgroundColor: "rgba(19, 19, 19, 0.65)",
                        border: "1px solid rgba(255, 255, 255, 0.10)",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.45)",
                        display: "none",
                        "&::after": {
                            content: '"flag{flag-2}"',
                            color: "rgba(255, 255, 255, 0.9)",
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "16px",
                            fontWeight: 700,
                            display: "block"
                        }
                    }}
                />

                {/* MiniAPI button (Network discovery) */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.25,
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={pingMiniApi}
                        sx={{
                            borderRadius: "999px",
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: 800,
                            textTransform: "none"
                        }}
                    >
                        Ping!
                    </Button>
                </Box>

                {/* MiniAPI button (Network discovery) */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.25,
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={pingMiniApiAgain}
                        sx={{
                            borderRadius: "999px",
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: 800,
                            textTransform: "none"
                        }}
                    >
                        Pong?
                    </Button>
                </Box>

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
                            transform: translateY(22px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </Container>
        </Box>
    );
}
