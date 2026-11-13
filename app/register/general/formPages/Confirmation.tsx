"use client";

import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";
import { Montserrat, Tsukimi_Rounded } from "next/font/google";
import { useEffect, useState } from "react";
import { getChallenge } from "@/util/api";
import { valuesToDraftContent } from "@/util/validation";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

const tsukimi = Tsukimi_Rounded({
    subsets: ["latin"],
    weight: ["500", "600", "700"]
});

interface ConfirmationProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    onSetErrorMessage: (message: string) => void;
    onShowErrorAlert: (showErrorAlert: boolean) => void;
    /**
     * Local testing without login: skip the challenge API call and show the
     * payload that would have been submitted.
     */
    localPreview?: boolean;
}

const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/hackillinois/",
    twitter: "https://twitter.com/hackillinois",
    linkedin: "https://www.linkedin.com/company/hackillinois/"
};

const SocialIconButton = ({
    href,
    label,
    children
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) => (
    <IconButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        sx={{
            width: 48,
            height: 48,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" }
        }}
    >
        {children}
    </IconButton>
);

const Confirmation = ({
    formik,
    onSetErrorMessage,
    onShowErrorAlert,
    localPreview = false
}: ConfirmationProps) => {
    const { values } = formik;
    const [challengePassed, setChallengePassed] = useState(false);
    const [loading, setLoading] = useState(true);

    async function load() {
        if (localPreview) {
            setLoading(false);
            return;
        }
        try {
            const res = await getChallenge(false);
            if (res && res.complete) {
                setChallengePassed(true);
            }
        } catch (error) {
            onSetErrorMessage("Failed to load challenge status.");
            onShowErrorAlert(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "400px",
                mt: { xs: "60px", md: "40px" },
                px: 2
            }}
        >
            {loading ? (
                <CircularProgress
                    size={60}
                    thickness={4}
                    sx={{ color: "white" }}
                />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 700,
                        pt: { xs: 6, md: 10 }
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: `${tsukimi.style.fontFamily}, sans-serif`,
                            fontWeight: 700,
                            fontSize: { xs: "32px", sm: "48px", md: "56px" },
                            color: "white",
                            lineHeight: 1.1,
                            mb: 3,
                            zIndex: 1,
                            textShadow: "3px 3px 10px rgba(0,0,0,0.4)"
                        }}
                    >
                        {values.pro
                            ? challengePassed
                                ? "Application Complete!"
                                : "Application\nNext Steps"
                            : "Application Submitted!"}
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontWeight: 500,
                            fontSize: { xs: "14px", sm: "18px" },
                            color: "rgba(255,255,255,0.9)",
                            mb: 1,
                            zIndex: 1,
                            textShadow: "1px 1px 6px rgba(0,0,0,0.3)"
                        }}
                    >
                        Thank you for applying to HackIllinois 2027!
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontWeight: 500,
                            fontSize: { xs: "14px", sm: "18px" },
                            color: "rgba(255,255,255,0.9)",
                            mb: 4,
                            zIndex: 1,
                            textShadow: "1px 1px 6px rgba(0,0,0,0.3)"
                        }}
                    >
                        Status updates will be sent to your email.
                    </Typography>

                    {values.pro && (
                        <>
                            <Typography
                                sx={{
                                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                                    fontWeight: 500,
                                    fontSize: { xs: "13px", sm: "17px" },
                                    color: "rgba(255,255,255,0.85)",
                                    mb: 3,
                                    zIndex: 1,
                                    textShadow: "1px 1px 6px rgba(0,0,0,0.3)"
                                }}
                            >
                                {challengePassed ? (
                                    <>
                                        You&apos;ve successfully finished the
                                        HackVoyagers Challenge
                                        <br />
                                        and will be considered for the
                                        HackVoyagers track.
                                    </>
                                ) : (
                                    "To join the Pro Track, you'll need to complete the Pro Track Challenge."
                                )}
                            </Typography>
                            {!challengePassed && (
                                <Button
                                    component="a"
                                    href="/challenge/"
                                    target="_blank"
                                    variant="contained"
                                    sx={{
                                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                                        fontWeight: 600,
                                        fontSize: { xs: "14px", sm: "17px" },
                                        textTransform: "none",
                                        color: "white",
                                        backgroundColor: "rgba(56, 56, 56)",
                                        borderRadius: "10px",
                                        px: 3,
                                        py: 1,
                                        mb: 4,
                                        "&:hover": {
                                            backgroundColor: "rgba(20, 20, 20)"
                                        }
                                    }}
                                >
                                    Go to Pro Track Challenge
                                </Button>
                            )}
                        </>
                    )}

                    <Typography
                        sx={{
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontWeight: 500,
                            fontSize: { xs: "13px", sm: "16px" },
                            color: "rgba(255,255,255,0.75)",
                            mb: 2,
                            zIndex: 1
                        }}
                    >
                        Stay tuned for more HackIllinois news on our social
                        media!
                    </Typography>

                    {localPreview && (
                        <Box
                            sx={{
                                width: "100%",
                                mb: 4,
                                p: 2,
                                textAlign: "left",
                                borderRadius: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                border: "1px solid rgba(255,255,255,0.4)"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#fff",
                                    fontWeight: 700,
                                    mb: 1,
                                    fontFamily: `${montserrat.style.fontFamily}, sans-serif`
                                }}
                            >
                                Local preview: not sent to the API. This is the
                                payload that would be submitted:
                            </Typography>
                            <Box
                                component="pre"
                                sx={{
                                    m: 0,
                                    color: "#d6ffd6",
                                    fontSize: "12px",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    maxHeight: "60vh",
                                    overflow: "auto"
                                }}
                            >
                                {JSON.stringify(
                                    valuesToDraftContent(values),
                                    null,
                                    2
                                )}
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", gap: 2, zIndex: 1 }}>
                        <SocialIconButton
                            href={SOCIAL_LINKS.instagram}
                            label="Instagram"
                        >
                            <InstagramIcon />
                        </SocialIconButton>
                        <SocialIconButton
                            href={SOCIAL_LINKS.twitter}
                            label="X / Twitter"
                        >
                            <XIcon />
                        </SocialIconButton>
                        <SocialIconButton
                            href={SOCIAL_LINKS.linkedin}
                            label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </SocialIconButton>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Confirmation;
