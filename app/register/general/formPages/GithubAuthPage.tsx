import { authenticate } from "@/util/api";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const REGISTRATION_PASSWORD = "hackillinois2026";

const GithubAuthPage = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState("");

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === REGISTRATION_PASSWORD) {
            setIsAuthorized(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    const handleAuthenticate = async () => {
        await authenticate();
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
                    {isAuthorized
                        ? "Sign in with your GitHub account to get started"
                        : "Enter your registration password to continue"}
                </Typography>

                {/* Priority and final deadline boxes */}
                <Box
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
                            borderRadius: "67px",
                            px: { xs: 3, md: 4 },
                            py: { xs: 2, md: 0 },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background:
                                "linear-gradient(90deg, rgba(163,21,214,0.6) 0%, rgba(253,171,96,0.6) 51.44%, rgba(163,21,214,0.6) 100%)"
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
                            Those who register by this deadline will be entered
                            in a raffle to win an{" "}
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
                    </Box>

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
                </Box>

                {isAuthorized ? (
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
                ) : (
                    <Box
                        component="form"
                        onSubmit={handlePasswordSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2
                        }}
                    >
                        <TextField
                            type="password"
                            placeholder="Enter registration password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                "& .MuiInputBase-root": {
                                    color: "white",
                                    fontFamily: "Montserrat"
                                },
                                "& .MuiInputBase-input": {
                                    padding: "12px 16px",
                                    "&::placeholder": {
                                        color: "rgba(255, 255, 255, 0.6)"
                                    }
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "rgba(163, 21, 214, 0.8)"
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#A315D6"
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#A315D6"
                                    }
                            }}
                        />
                        {error && (
                            <Typography
                                sx={{
                                    color: "#ff6b6b",
                                    fontFamily: "Montserrat",
                                    fontSize: "14px"
                                }}
                            >
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                background:
                                    "linear-gradient(90deg, #A315D6 0%, #FDAB60 51.44%, #A315D6 100%)",
                                color: "white",
                                padding: "10px 30px",
                                fontSize: "16px",
                                fontWeight: 600,
                                borderRadius: "999px",
                                textTransform: "none",
                                fontFamily: "Montserrat",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                                "&:hover": {
                                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5)"
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default GithubAuthPage;
