"use client";

import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import { getChallenge, submitChallenge } from "@/util/api";
import { ChallengeStatus } from "@/util/types";
import CHALLENGE_DESCRIPTION_BACKGROUND from "@/public/registration/backgrounds/challenge_background.svg";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useCallback, useRef, useState, useEffect } from "react";

export default function ChallengeDescription() {
    const registrationAuth = useRegistrationAuth(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadResult, setUploadResult] = useState<string | null>(null);
    const [fileIdCopied, setFileIdCopied] = useState(false);
    const [challengeStatus, setChallengeStatus] =
        useState<ChallengeStatus | null>(null);
    const [challengeLoading, setChallengeLoading] = useState(true);
    const [challengePassed, setChallengePassed] = useState(false);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    async function handleLoadChallengeStatus() {
        try {
            const res = await getChallenge();
            setChallengeStatus(res);
            if (res.complete) {
                setChallengePassed(true);
                window.location.href = "/challenge/result/success";
            }
        } finally {
            setChallengeLoading(false);
        }
    }

    useEffect(() => {
        handleLoadChallengeStatus();
    }, []);

    const handleFileSelect = useCallback(
        (file: File | null) => {
            if (!file) return;

            if (file.type !== "image/png") {
                setSelectedFile(null);
                setUploadError("Please upload a PNG (.png) image.");
                setUploadResult(null);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                setSelectedFile(null);
                setUploadError("File must be 10MB or smaller.");
                setUploadResult(null);
                return;
            }

            setSelectedFile(file);
            setUploadError(null);
            setUploadResult(null);
        },
        [MAX_FILE_SIZE]
    );

    const handleFileInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] ?? null;
        handleFileSelect(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0] ?? null;
        handleFileSelect(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDropzoneClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setUploadResult("Please upload an image before submitting.");
            return;
        }
        try {
            const { status, body } = await submitChallenge(selectedFile);

            if (status === 200 && body.complete) {
                setUploadResult("Correct! You solved the challenge.");
                setChallengePassed(true);
                setTimeout(() => {
                    window.location.href = "/challenge/result/success";
                }, 1500);
            } else if (status === 400 && body.error === "IncorrectSolution") {
                setUploadResult(body.message);
            } else if (status === 400 && body.error === "AlreadySolved") {
                setUploadResult(body.message);
            } else if (status === 403) {
                setUploadResult(body.message);
            } else {
                setUploadResult(
                    "There was a problem with your submission. Please try again."
                );
            }
        } catch (err) {
            setUploadResult(
                "There was a problem uploading the image. Please refresh the page and try again."
            );
        }
    };

    const handleFileIdClick = async () => {
        if (!challengeStatus) return;
        try {
            await navigator.clipboard.writeText(challengeStatus.inputFileId);
        } catch {
            // clipboard might not be available; still show snackbar so user knows
        }
        setFileIdCopied(true);
    };

    if (registrationAuth.isLoading) {
        return (
            <Loading
                backgroundImage={CHALLENGE_DESCRIPTION_BACKGROUND.src}
                zoom={false}
            />
        );
    }

    if (challengeLoading) {
        return (
            <Loading
                backgroundImage={CHALLENGE_DESCRIPTION_BACKGROUND.src}
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
                backgroundImage={CHALLENGE_DESCRIPTION_BACKGROUND.src}
            />
        );
    }

    return (
        <Box
            sx={{
                minWidth: "100vw",
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                backgroundImage: `url("${CHALLENGE_DESCRIPTION_BACKGROUND.src}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "18vh",
                paddingBottom: "14vh"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "center",
                    padding: {
                        xs: "6rem 4rem 6rem 4rem",
                        lg: "5rem 5rem 7rem 5rem"
                    },
                    mb: 1,

                    backgroundImage: `url("/registration/backgrounds/frame.svg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    border: "none",
                    borderRadius: 0,
                    aspectRatio: { lg: "1530 / 995" }
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h2" sx={{ mb: 8 }}>
                        CODING CHALLENGE
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        mb: 2,
                        color: "white",
                        lineHeight: 1.6,
                        fontFamily: "Montserrat",
                        textAlign: "left"
                    }}
                >
                    {
                        "By the end of the challenge, you'll generate a constellation image. This will use Python and Google Colab."
                    }
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    href="https://colab.research.google.com/drive/1cUrrh1vvm0zovPdJ5Yr7jB9j6CovsQ4i"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        background:
                            "linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #ff8555 0%, #ffa575 100%)"
                        },
                        padding: "8px 20px",
                        fontSize: "16px",
                        fontFamily: "Montserrat",
                        borderRadius: "30px",
                        transition: "all 0.3s ease",
                        textTransform: "none",
                        letterSpacing: "0.5px"
                    }}
                >
                    Begin Challenge →
                </Button>

                <Typography
                    variant="h6"
                    sx={{
                        color: "white",
                        fontFamily: "Montserrat",
                        textAlign: "left",
                        mt: 3
                    }}
                >
                    {"For Part 1: Preparation"}
                </Typography>

                <Box
                    sx={{
                        textAlign: "left"
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "white", mb: 1, fontFamily: "Montserrat" }}
                    >
                        Copy and paste this File ID into the Jupyter Notebook.
                    </Typography>

                    {/* Clickable, highlighted box instead of TextField */}
                    <Box
                        onClick={handleFileIdClick}
                        sx={{
                            mt: 1,
                            px: 2,
                            py: 1.5,
                            borderRadius: 1,
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                borderColor: "white",
                                backgroundColor: "rgba(255, 255, 255, 0.08)"
                            },
                            "&:active": {
                                transform: "scale(0.99)"
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white",
                                fontFamily: "Montserrat",
                                fontSize: 14,
                                wordBreak: "break-all"
                            }}
                        >
                            {challengeStatus?.inputFileId}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontFamily: "Montserrat",
                                fontSize: 12,
                                ml: 2
                            }}
                        >
                            Click to copy
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        color: "white",
                        fontFamily: "Montserrat",
                        textAlign: "left",
                        mt: 3
                    }}
                >
                    {"After Part 3: Refine Constellation"}
                </Typography>

                <Box
                    sx={{
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "white", fontFamily: "Montserrat" }}
                    >
                        {`Upload your final image. If it matches the expected output, you'll be invited to apply as a HackVoyager.
                        You have unlimited re-submissions.`}
                    </Typography>

                    <Box
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleDropzoneClick}
                        sx={{
                            border: "2px dashed rgba(255, 255, 255, 0.6)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.35)",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.45)"
                            }
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png"
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgba(255, 255, 255, 0.9)",
                                fontFamily: "Montserrat"
                            }}
                        >
                            Drag and drop a PNG file here, or click to browse.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                mt: 1,
                                fontFamily: "Montserrat"
                            }}
                        >
                            Max file size: 10MB
                        </Typography>
                        {selectedFile && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "rgba(144, 238, 144, 0.95)",
                                    mt: 1,
                                    fontFamily: "Montserrat"
                                }}
                            >
                                {selectedFile.name}
                            </Typography>
                        )}
                        {uploadError && (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#ffb3b3",
                                    mt: 1,
                                    fontFamily: "Montserrat"
                                }}
                            >
                                {uploadError}
                            </Typography>
                        )}
                    </Box>

                    {selectedFile && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                mt: 1
                            }}
                        >
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={handleSubmit}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #ff8555 0%, #ffa575 100%)"
                                    },
                                    padding: "8px 20px",
                                    fontFamily: "Montserrat",
                                    textTransform: "none",
                                    borderRadius: "24px",
                                    fontSize: "16px",
                                    px: 4
                                }}
                            >
                                Submit Image
                            </Button>
                        </Box>
                    )}

                    {uploadResult && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                color: challengePassed
                                    ? "rgba(144, 238, 144, 0.95)"
                                    : "rgba(255, 118, 118)",
                                fontFamily: "Montserrat",
                                mb: 3
                            }}
                        >
                            {uploadResult}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Snackbar
                open={fileIdCopied}
                autoHideDuration={3000}
                onClose={(_, reason) => {
                    if (reason === "clickaway") return;
                    setFileIdCopied(false);
                }}
                message="File ID copied to clipboard"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
}
