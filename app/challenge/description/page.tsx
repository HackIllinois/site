"use client";

import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import NotProTrackPage from "@/app/register/general/formPages/NotProTrackPage";
import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import CHALLENGE_DESCRIPTION_BACKGROUND from "@/public/registration/backgrounds/challenge-description-background.svg";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";

export default function ChallengeDescription() {
    const registrationAuth = useRegistrationAuth(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadResult, setUploadResult] = useState<string | null>(null);
    const [fileIdCopied, setFileIdCopied] = useState(false);

    const DUMMY_FILE_ID = "FILE-1234567890-ABCDEF";
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleFileSelect = useCallback(
        (file: File | null) => {
            if (!file) return;

            if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
                setSelectedFile(null);
                setUploadError("Please upload a JPEG (.jpg) image.");
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

    const handleSubmit = () => {
        if (!selectedFile) {
            setUploadResult("Please upload an image before submitting.");
            return;
        }

        // For now, always indicate mismatch
        setUploadResult(
            "Your uploaded image did not match the expected one. Please try again."
        );
    };

    const handleFileIdClick = async () => {
        try {
            await navigator.clipboard.writeText(DUMMY_FILE_ID);
        } catch {
            // clipboard might not be available; still show snackbar so user knows
        }
        setFileIdCopied(true);
    };

    if (registrationAuth.isLoading || !registrationAuth.submission) {
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
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "18vh"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    maxWidth: "800px",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    border: "2px solid rgba(255, 255, 255, 0.2)"
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        mb: 3,
                        textAlign: "left"
                    }}
                >
                    Challenge
                </Typography>

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
                            {DUMMY_FILE_ID}
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
                            accept="image/jpeg,image/jpg"
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
                            Drag and drop a JPEG file here, or click to browse.
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
                                color: "rgba(255, 118, 118)",
                                fontFamily: "Montserrat"
                            }}
                        >
                            {uploadResult}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        mt: 4
                    }}
                >
                    <Button
                        variant="text"
                        size="small"
                        href="/challenge/result/success"
                        sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            "&:hover": {
                                color: "white"
                            }
                        }}
                    >
                        Go to success page (REMOVE THIS IN PRODUCTION)
                    </Button>
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
