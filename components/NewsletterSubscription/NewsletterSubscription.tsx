"use client";

import React, { useState } from "react";
import { Box, Button, Snackbar, TextField, Alert } from "@mui/material";

export const NewsletterSubscription = () => {
    const [email, setEmail] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error"
    >("success");

    const handleSubscribeClick = async () => {
        const trimmed = email.trim();

        if (!trimmed) {
            setSnackbarSeverity("error");
            setSnackbarMessage("Add your email to subscribe!");
            setSnackbarOpen(true);
            return;
        }

        // Hook up your real subscription logic here

        setSnackbarSeverity("success");
        setSnackbarMessage(
            "You're in! We'll send you HackIllinois updates soon ✨"
        );
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    p: "4px",
                    borderRadius: "40px",
                    background:
                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                    display: "inline-block",
                    width: "100%",
                    maxWidth: 520
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "stretch",
                        borderRadius: "40px",
                        overflow: "hidden",
                        bgcolor: "#F7F7F7"
                    }}
                >
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        variant="standard"
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                px: { xs: 2.5, sm: 3 },
                                py: 1,
                                "& .MuiInputBase-input": {
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    color: "#555555",
                                    "&::placeholder": {
                                        color: "#B0B0B0",
                                        opacity: 1
                                    }
                                }
                            }
                        }}
                    />

                    <Button
                        onClick={handleSubscribeClick}
                        disableElevation
                        sx={{
                            borderRadius: "40px",
                            px: 8,
                            minWidth: 140,
                            fontWeight: 800,
                            fontSize: "16px",
                            fontFamily: "Tsukimi Rounded",
                            textTransform: "uppercase",
                            color: "white",
                            backgroundImage:
                                "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)",
                            backgroundSize: "150% 100%",
                            backgroundPosition: "50% 0%",
                            transition: "background-position 0.5s ease",
                            whiteSpace: "nowrap",
                            "&:hover": {
                                backgroundPosition: "-20% 0%",
                                backgroundImage:
                                    "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)"
                            }
                        }}
                    >
                        SUBSCRIBE
                    </Button>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    variant="outlined"
                    sx={{
                        bgcolor: "#FFFFFF",
                        color: "#401A79",
                        borderColor:
                            snackbarSeverity === "error"
                                ? "#F48B82"
                                : "#D3C3FF",
                        fontFamily: "Montserrat",
                        fontSize: "14px"
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewsletterSubscription;
