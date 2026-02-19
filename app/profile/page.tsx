"use client";
import { useState, useEffect, useMemo } from "react";
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
    loadAdmissionRSVP,
    loadProfile,
    loadQRCode,
    updateProfile
} from "@/util/api";
import Loading from "@/components/Loading/Loading";
import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import { AvatarCarousel, type AvatarItem } from "./AvatarCarousel";
import { QRCodeSVG } from "qrcode.react";

export default function Profile() {
    const router = useRouter();
    const base =
        "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/avatars";

    const avatarItems: AvatarItem[] = useMemo(
        () => [
            { id: "character1", src: `${base}/character1.png` },
            { id: "character2", src: `${base}/character2.png` },
            { id: "character3", src: `${base}/character3.png` },
            { id: "character4", src: `${base}/character4.png` },
            { id: "character5", src: `${base}/character5.png` }
        ],
        [base]
    );

    const [mode, setMode] = useState<"profile" | "avatar">("profile");
    const [avatarId, setAvatarId] = useState("");
    const [draftAvatarId, setDraftAvatarId] = useState(avatarId);
    const [name, setName] = useState("");
    const [track, setTrack] = useState("");
    const [loading, setLoading] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [qrInfo, setQrInfo] = useState("");
    const [qrLoading, setQrLoading] = useState(false);

    const avatarUrl = `${base}/${avatarId}.png`;

    const openAvatarPicker = () => {
        setDraftAvatarId(avatarId);
        setMode("avatar");
    };

    const cancelAvatarPicker = () => {
        setMode("profile");
    };

    const handleShowQR = async () => {
        setShowQR(true);
        if (qrInfo) return;
        setQrLoading(true);
        try {
            const data = await loadQRCode();
            setQrInfo(data.qrInfo);
        } catch (error: any) {
            console.error("Error loading QR code:", error);
            setErrorMessage(
                error?.message || "Failed to load QR code. Please try again."
            );
            setShowErrorAlert(true);
            setShowQR(false);
        } finally {
            setQrLoading(false);
        }
    };

    const confirmAvatarPicker = async () => {
        setLoading(true);
        try {
            setAvatarId(draftAvatarId);
            await updateProfile({ avatarId: draftAvatarId });
            setMode("profile");
        } catch (error: any) {
            console.error("Error updating avatar:", error);
            setErrorMessage(
                error?.message || "Failed to update avatar. Please try again."
            );
            setShowErrorAlert(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // TODO: Remove this redirect once the rest of RSVP is finished.
        // redirect("/");
        const loadData = async () => {
            try {
                const RSVPInfo = await loadAdmissionRSVP();

                if (
                    RSVPInfo.response !== "ACCEPTED" ||
                    RSVPInfo.status !== "ACCEPTED"
                ) {
                    router.push("/profile-unavailable");
                    return;
                }
                const profile = await loadProfile();
                setAvatarId(
                    profile.avatarUrl.split("/").pop()!.replace(".png", "")
                );
                setName(profile.displayName);

                setTrack(
                    RSVPInfo.admittedPro ? "HACKVOYAGER" : "GENERAL ATTENDEE"
                );
                setLoading(false);
            } catch (error: any) {
                console.error("Error loading profile data:", error);
                setErrorMessage(
                    error?.message ||
                        "Failed to load profile data. Please try again."
                );
                setShowErrorAlert(true);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <Loading backgroundImage="/profile/background.jpg" />;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                background: `url("/profile/background.jpg") center / cover no-repeat`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 0, sm: 1 }
            }}
        >
            <ErrorSnackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                message={errorMessage}
            />
            {/* 3 column grid */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1400,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "none",
                        sm: "clamp(70px, 10vw, 150px) minmax(0, 1fr) clamp(70px, 10vw, 150px)"
                    },
                    gridTemplateRows: {
                        sm: "none",
                        xs: "clamp(70px, 10vw, 150px) minmax(0, 1fr) clamp(70px, 10vw, 150px)"
                    },
                    alignItems: "center",
                    mt: { xs: "90px", sm: "70px" },
                    mb: { xs: "70px", sm: "70px" }
                }}
            >
                {/* left bar */}
                <Box
                    component="img"
                    src="/profile/left-bar.svg"
                    alt=""
                    sx={{
                        height: "662px",
                        justifySelf: "center",
                        pointerEvents: "none",
                        marginLeft: { xs: "0vw", sm: "14vw" },
                        marginBottom: { xs: "-7vh", sm: "6px" },
                        zIndex: 4,
                        transform: { xs: "rotate(90deg)", sm: "none" }
                    }}
                />

                {/* center section */}
                <Box
                    sx={{
                        width: "100%",
                        height: {
                            xs: mode === "profile" ? undefined : "550px",
                            sm: "550px"
                        },
                        borderTop: { xs: "none", sm: "2px solid #00FF2B" },
                        borderBottom: { xs: "none", sm: "2px solid #00FF2B" },
                        background: {
                            xs: "linear-gradient(90deg, rgba(0, 204, 3, .4) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)",
                            sm: "linear-gradient(90deg, rgba(0, 204, 3, .01) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)"
                        },
                        backdropFilter: "blur(7.5px)",
                        overflow: "hidden",
                        pt: { xs: "30px", md: "0px" },
                        pb: { xs: "100px", md: "0px" }
                    }}
                >
                    <Box
                        sx={{ width: "100%", textAlign: "center", mt: "15px" }}
                    >
                        <Typography
                            sx={{
                                color: "#DDFFE4",
                                WebkitTextStroke: "0.5px #1F0",
                                fontFamily: "Tsukimi Rounded",
                                fontSize: "45px",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}
                        >
                            PROFILE
                        </Typography>
                    </Box>

                    {mode === "profile" ? (
                        <Box
                            sx={{
                                ml: { xs: "5%", sm: "9%", lg: "12%" },
                                mr: { xs: "7%", sm: "14%", lg: " 12%" },
                                mt: "15px",
                                height: { xs: "auto", sm: "70%" },
                                display: "flex",
                                flexDirection: "column",
                                gap: { xs: "15px", sm: "5%" }
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "none",
                                        sm: "minmax(0, 1fr) minmax(0, 1fr)"
                                    },
                                    gridTemplateRows: {
                                        xs: "minmax(0, 1fr) minmax(0, 1fr)",
                                        sm: "none"
                                    },
                                    gap: "5%"
                                }}
                            >
                                {/* avatar box */}
                                <Box
                                    sx={{
                                        height: "100%",
                                        backgroundImage: `
                    url("${avatarUrl}"),
                    linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                  `,
                                        backgroundSize: {
                                            xs: "auto 65%, 25% 25%",
                                            sm: "auto 80%, 25% 25%",
                                            md: "auto 85%, 25% 25%",
                                            lg: "auto 90%, 25% 25%",
                                            xl: "auto 90%, 25% 25%"
                                        },
                                        backgroundRepeat: "no-repeat, repeat",
                                        backgroundPosition:
                                            "center center, center",
                                        border: "1px solid rgba(149, 255, 130, 0.50)",
                                        boxShadow:
                                            "0 0 20px 0 rgba(0, 0, 0, 0.25) inset",
                                        position: "relative"
                                    }}
                                >
                                    <Box
                                        component="button"
                                        onClick={openAvatarPicker}
                                        aria-label="Edit avatar"
                                        sx={{
                                            all: "unset",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            width: 45,
                                            height: 45,
                                            border: "2px solid #1F0",
                                            background: "rgba(4, 255, 0, 0.15)",
                                            boxShadow:
                                                "0 0 10px 3px rgba(30, 255, 0, 0.75) inset",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="29"
                                            height="29"
                                            viewBox="0 0 29 29"
                                            fill="none"
                                        >
                                            <path
                                                d="M27.2163 3.33799L25.0649 1.18661C23.4813 -0.396961 20.722 -0.394112 19.1472 1.18661L16.9986 3.33514C16.9986 3.33514 16.9958 3.33657 16.9944 3.338C16.9929 3.33942 16.9929 3.34085 16.9915 3.34228L9.5585 10.7753C8.90508 11.4287 8.39008 12.1891 8.02485 13.038L5.85776 18.0927C5.30993 19.3766 5.59241 20.8404 6.57536 21.8219C7.22878 22.4768 8.0876 22.8206 8.96643 22.8206C9.41726 22.8206 9.87379 22.7293 10.3075 22.5424L15.3651 20.3753C16.214 20.013 16.9758 19.4979 17.6278 18.8431L27.2163 9.25454C28.847 7.62389 28.847 4.96755 27.2163 3.33683L27.2163 3.33799ZM16.0142 17.2307C15.5662 17.6787 15.0469 18.0296 14.4662 18.2779L9.40716 20.445C8.99201 20.6247 8.51123 20.5334 8.19024 20.211C7.86924 19.89 7.77794 19.4121 7.95627 18.9927L10.1234 13.9394C10.373 13.3588 10.7254 12.8366 11.1719 12.3887L17.8 5.76058L22.6421 10.6027L16.0142 17.2307ZM25.6027 7.64361L24.2574 8.98894L19.4153 4.14682L20.7606 2.80148C21.4811 2.08389 22.7308 2.08389 23.4513 2.80148L25.6026 4.95286C26.3431 5.69328 26.3431 6.90173 25.6027 7.64361ZM25.1091 20.8V23.8431C25.1091 26.1514 23.233 28.0274 20.9247 28.0274L4.18436 28.0289C1.87604 28.0289 0 26.1528 0 23.8445V7.0541C0 5.92275 0.443673 4.86419 1.24976 4.07096C2.05438 3.27773 3.10867 2.87829 4.25573 2.86971L7.24884 2.91821C7.87943 2.9282 8.38161 3.44749 8.37018 4.07809C8.3602 4.70152 7.85087 5.20086 7.22886 5.20086H7.20889L4.21577 5.15235C3.7293 5.14522 3.21711 5.33781 2.85046 5.69734C2.48524 6.05828 2.28265 6.53907 2.28265 7.05264V23.843C2.28265 24.8916 3.13577 25.7448 4.18437 25.7448H20.9233C21.9719 25.7448 22.825 24.8916 22.825 23.843V20.8C22.825 20.1694 23.3357 19.6587 23.9663 19.6587C24.5969 19.6587 25.1076 20.1694 25.1076 20.8L25.1091 20.8Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </Box>
                                </Box>

                                {/* right info box */}
                                <Box
                                    sx={{
                                        height: "100%",
                                        backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
                  `,
                                        backgroundSize: "25% 25%",
                                        border: "1px solid rgba(149, 255, 130, 0.50)",
                                        boxShadow:
                                            "0 0 20px 0 rgba(0, 0, 0, 0.25) inset",
                                        padding: "30px",
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <Box
                                        component="button"
                                        onClick={() =>
                                            router.push("/profile-setup")
                                        }
                                        aria-label="Edit profile"
                                        sx={{
                                            all: "unset",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            width: 45,
                                            height: 45,
                                            border: "2px solid #1F0",
                                            background: "rgba(4, 255, 0, 0.15)",
                                            boxShadow:
                                                "0 0 10px 3px rgba(30, 255, 0, 0.75) inset",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="29"
                                            height="29"
                                            viewBox="0 0 29 29"
                                            fill="none"
                                        >
                                            <path
                                                d="M27.2163 3.33799L25.0649 1.18661C23.4813 -0.396961 20.722 -0.394112 19.1472 1.18661L16.9986 3.33514C16.9986 3.33514 16.9958 3.33657 16.9944 3.338C16.9929 3.33942 16.9929 3.34085 16.9915 3.34228L9.5585 10.7753C8.90508 11.4287 8.39008 12.1891 8.02485 13.038L5.85776 18.0927C5.30993 19.3766 5.59241 20.8404 6.57536 21.8219C7.22878 22.4768 8.0876 22.8206 8.96643 22.8206C9.41726 22.8206 9.87379 22.7293 10.3075 22.5424L15.3651 20.3753C16.214 20.013 16.9758 19.4979 17.6278 18.8431L27.2163 9.25454C28.847 7.62389 28.847 4.96755 27.2163 3.33683L27.2163 3.33799ZM16.0142 17.2307C15.5662 17.6787 15.0469 18.0296 14.4662 18.2779L9.40716 20.445C8.99201 20.6247 8.51123 20.5334 8.19024 20.211C7.86924 19.89 7.77794 19.4121 7.95627 18.9927L10.1234 13.9394C10.373 13.3588 10.7254 12.8366 11.1719 12.3887L17.8 5.76058L22.6421 10.6027L16.0142 17.2307ZM25.6027 7.64361L24.2574 8.98894L19.4153 4.14682L20.7606 2.80148C21.4811 2.08389 22.7308 2.08389 23.4513 2.80148L25.6026 4.95286C26.3431 5.69328 26.3431 6.90173 25.6027 7.64361ZM25.1091 20.8V23.8431C25.1091 26.1514 23.233 28.0274 20.9247 28.0274L4.18436 28.0289C1.87604 28.0289 0 26.1528 0 23.8445V7.0541C0 5.92275 0.443673 4.86419 1.24976 4.07096C2.05438 3.27773 3.10867 2.87829 4.25573 2.86971L7.24884 2.91821C7.87943 2.9282 8.38161 3.44749 8.37018 4.07809C8.3602 4.70152 7.85087 5.20086 7.22886 5.20086H7.20889L4.21577 5.15235C3.7293 5.14522 3.21711 5.33781 2.85046 5.69734C2.48524 6.05828 2.28265 6.53907 2.28265 7.05264V23.843C2.28265 24.8916 3.13577 25.7448 4.18437 25.7448H20.9233C21.9719 25.7448 22.825 24.8916 22.825 23.843V20.8C22.825 20.1694 23.3357 19.6587 23.9663 19.6587C24.5969 19.6587 25.1076 20.1694 25.1076 20.8L25.1091 20.8Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </Box>
                                    <Typography
                                        sx={{
                                            color: "#FFF",
                                            fontFamily: "Montserrat",
                                            fontSize: {
                                                xs: "15px",
                                                sm: "18px"
                                            },
                                            fontStyle: "italic",
                                            fontWeight: 400
                                        }}
                                    >
                                        NAME
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#FFF",
                                            fontFamily: "Montserrat",
                                            fontSize: {
                                                xs: "20px",
                                                sm: "24px"
                                            },
                                            fontWeight: 600,
                                            overflow: {
                                                sm: "hidden"
                                            },
                                            textOverflow: "ellipsis",
                                            wordBreak: {
                                                xs: "break-word",
                                                sm: "normal"
                                            },
                                            overflowWrap: {
                                                xs: "break-word",
                                                sm: "normal"
                                            },
                                            whiteSpace: {
                                                xs: "normal",
                                                sm: "nowrap"
                                            },
                                            maxWidth: "100%"
                                        }}
                                    >
                                        {name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#FFF",
                                            fontFamily: "Montserrat",
                                            fontSize: {
                                                xs: "15px",
                                                sm: "18px"
                                            },
                                            fontStyle: "italic",
                                            fontWeight: 400,
                                            marginTop: "50px"
                                        }}
                                    >
                                        TRACK
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#FFF",
                                            fontFamily: "Montserrat",
                                            fontSize: {
                                                xs: "20px",
                                                sm: "24px"
                                            },
                                            overflow: {
                                                sm: "hidden"
                                            },
                                            textOverflow: "ellipsis",
                                            fontWeight: 600
                                        }}
                                    >
                                        {track}
                                    </Typography>

                                    <Box
                                        sx={{
                                            mt: "auto",
                                            display: { xs: "none", sm: "flex" },
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Box
                                            component="button"
                                            onClick={handleShowQR}
                                            sx={{
                                                all: "unset",
                                                cursor: "pointer",
                                                px: 4,
                                                py: 1,
                                                fontFamily: "Tsukimi Rounded",
                                                borderRadius: "50px",
                                                border: "4px solid #1AFF00",
                                                background:
                                                    "rgba(4, 255, 0, 0.15)",
                                                boxShadow:
                                                    "0 0 10px 3px rgba(30, 255, 0, 0.75) inset",
                                                color: "white",
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: "20px",
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    background:
                                                        "rgba(4, 255, 0, 0.25)",
                                                    boxShadow:
                                                        "0 0 15px 5px rgba(30, 255, 0, 0.85) inset"
                                                }
                                            }}
                                        >
                                            SHOW QR
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: "flex", sm: "none" },
                                    justifyContent: "center",
                                    pb: 2
                                }}
                            >
                                <Box
                                    component="button"
                                    onClick={handleShowQR}
                                    sx={{
                                        all: "unset",
                                        cursor: "pointer",
                                        px: 4,
                                        py: 1,
                                        fontFamily: "Tsukimi Rounded",
                                        borderRadius: "50px",
                                        border: "4px solid #1AFF00",
                                        background: "rgba(4, 255, 0, 0.15)",
                                        boxShadow:
                                            "0 0 10px 3px rgba(30, 255, 0, 0.75) inset",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            background: "rgba(4, 255, 0, 0.25)",
                                            boxShadow:
                                                "0 0 15px 5px rgba(30, 255, 0, 0.85) inset"
                                        }
                                    }}
                                >
                                    SHOW QR
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        // AVATAR CAROUSEL
                        <Box
                            sx={{
                                pl: { xs: 0, sm: 2, md: 7 },
                                pr: { xs: 0, sm: 7, md: 10 },
                                mt: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#FFF",
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "20px", sm: "24px" },
                                    fontWeight: 600,
                                    ml: { xs: "20px", md: "8%" }
                                }}
                            >
                                Choose your avatar
                            </Typography>

                            {/* carosel element for choosing avatar (for the other form page aswell) */}

                            <AvatarCarousel
                                items={avatarItems}
                                value={draftAvatarId}
                                onChange={setDraftAvatarId}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    justifyContent: "center"
                                }}
                            >
                                <Box
                                    component="button"
                                    onClick={cancelAvatarPicker}
                                    sx={{
                                        all: "unset",
                                        cursor: "pointer",
                                        px: 2,
                                        py: 1,
                                        fontFamily: "Tsukimi Rounded",
                                        borderRadius: "50px",
                                        border: "4px solid #F00",
                                        background: "#FF8383",
                                        boxShadow:
                                            "0 2px 0 0 rgba(77, 11, 11, 0.75)",
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "20px"
                                    }}
                                >
                                    CANCEL
                                </Box>

                                <Box
                                    component="button"
                                    onClick={confirmAvatarPicker}
                                    sx={{
                                        all: "unset",
                                        cursor: "pointer",
                                        px: 2,
                                        py: 1,
                                        fontFamily: "Tsukimi Rounded",
                                        borderRadius: "50px",
                                        border: "4px solid #1AFF00",
                                        background: "#B5FFC3",
                                        boxShadow:
                                            "0 2px 0 0 rgba(29, 94, 14, 0.75)",
                                        color: "#2F5C34",
                                        fontWeight: 600,
                                        fontSize: "20px"
                                    }}
                                >
                                    CONFIRM
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* right bar */}
                <Box
                    component="img"
                    src="/profile/right-bar.svg"
                    alt=""
                    sx={{
                        height: "650px",
                        justifySelf: "center",
                        pointerEvents: "none",
                        marginLeft: "-7vw",
                        zIndex: 4,
                        transform: { xs: "rotate(90deg)", sm: "none" }
                    }}
                />
            </Box>

            <Dialog
                open={showQR}
                onClose={() => setShowQR(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "#111115",
                        border: "1px solid #2AFF00",
                        borderRadius: "24px",
                        boxShadow: "0 0 40px rgba(42, 255, 0, 0.15)",
                        color: "white",
                        overflow: "hidden"
                    }
                }}
            >
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pb: 4
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: { xs: "20px", md: "24px" },
                            fontWeight: 600,
                            color: "white",
                            textAlign: "center",
                            mb: 3
                        }}
                    >
                        Your QR Code
                    </Typography>

                    {qrLoading ? (
                        <CircularProgress sx={{ color: "#2AFF00", my: 4 }} />
                    ) : (
                        <Box
                            sx={{
                                background: "white",
                                p: 2,
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <QRCodeSVG value={qrInfo} size={"100%"} />
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
