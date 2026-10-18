"use client";

import { authenticate, devLogin, getDevUsers } from "@/util/api";
import { UserInfo } from "@/util/types";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";

const GithubAuthPage = () => {
    const [showLocalSignIn, setShowLocalSignIn] = useState(false);
    const [localUsers, setLocalUsers] = useState<UserInfo[]>([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [localSignInError, setLocalSignInError] = useState("");
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);

    useEffect(() => {
        const isLocalHost =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1";
        if (process.env.NODE_ENV !== "development" || !isLocalHost) return;

        setShowLocalSignIn(true);
        setIsLoadingUsers(true);
        getDevUsers()
            .then(response => {
                setLocalUsers(response.users);
                setSelectedUserId(response.users[0]?.userId ?? "");
            })
            .catch(error => {
                setLocalSignInError(
                    `Could not load local seed users: ${error instanceof Error ? error.message : "Please try again."}`
                );
            })
            .finally(() => setIsLoadingUsers(false));
    }, []);

    const handleAuthenticate = async () => {
        await authenticate();
    };

    const handleLocalSignIn = async (userId?: string) => {
        setIsSigningIn(true);
        setLocalSignInError("");
        try {
            await devLogin(userId ? { userId } : {});
            window.location.reload();
        } catch (error) {
            setLocalSignInError(
                `Could not sign in locally: ${error instanceof Error ? error.message : "Please try again."}`
            );
            setIsSigningIn(false);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                width: "100%",
                overflowY: "auto"
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    backgroundImage: `url("/registration/backgrounds/personal_info.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transform: "scale(1.25)",
                    zIndex: -1
                }}
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
                <img
                    src="/registration/hackastra-logo.png"
                    alt="Hackastra Logo"
                    style={{
                        width: "auto",
                        maxHeight: "110px",
                        maxWidth: "100%",
                        marginBottom: "20px",
                        objectFit: "contain"
                    }}
                />
                <Typography
                    variant="h6"
                    component="p"
                    sx={{
                        mb: 3,
                        color: "white",
                        opacity: 0.9,
                        fontFamily: "Montserrat",
                        fontSize: {
                            xs: "16px",
                            md: "20px"
                        },
                        paddingLeft: 6,
                        paddingRight: 6
                    }}
                >
                    Sign in with your GitHub account to get started
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
                        borderRadius: "999px",
                        padding: "5px",
                        background:
                            "linear-gradient(90deg, #A315D6 0%, #FDAB60 51.44%, #A315D6 100%)",
                        display: "inline-flex"
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<GitHubIcon />}
                        onClick={handleAuthenticate}
                        sx={{
                            backgroundColor: "#24292f",
                            color: "#ffffff",
                            padding: "10px 20px",
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px"
                            },
                            fontWeight: 600,
                            borderRadius: "999px",
                            textTransform: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            "& .MuiButton-startIcon": {
                                marginRight: 1,
                                "& svg": {
                                    fontSize: "1.3rem"
                                }
                            },
                            "&:hover": {
                                backgroundColor: "#1b1f23",
                                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5)"
                            },
                            "&:active": {
                                backgroundColor: "#0f1113",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)"
                            },
                            fontFamily: "Montserrat"
                        }}
                    >
                        Sign in with GitHub
                    </Button>
                </Box>
                {showLocalSignIn && (
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            mt: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            color: "white"
                        }}
                    >
                        <Typography component="h2" variant="h6">
                            Local sign in
                        </Typography>
                        {localSignInError && (
                            <Alert severity="error">{localSignInError}</Alert>
                        )}
                        <FormControl fullWidth>
                            <InputLabel id="local-seed-user-label">
                                Seed user
                            </InputLabel>
                            <Select
                                labelId="local-seed-user-label"
                                value={selectedUserId}
                                label="Seed user"
                                onChange={event =>
                                    setSelectedUserId(event.target.value)
                                }
                                disabled={isLoadingUsers || isSigningIn}
                                sx={{ backgroundColor: "white" }}
                            >
                                {localUsers.map(user => (
                                    <MenuItem
                                        key={user.userId}
                                        value={user.userId}
                                    >
                                        {user.name} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            disabled={!selectedUserId || isSigningIn}
                            onClick={() => handleLocalSignIn(selectedUserId)}
                        >
                            {isSigningIn
                                ? "Signing in…"
                                : "Sign in as selected seed"}
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={isSigningIn}
                            onClick={() => handleLocalSignIn()}
                            sx={{ color: "white", borderColor: "white" }}
                        >
                            Create and sign in as fresh registrant
                        </Button>
                        {isLoadingUsers && (
                            <Typography component="p">
                                Loading seed users…
                            </Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default GithubAuthPage;
