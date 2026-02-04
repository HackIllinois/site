import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { LATE_REGISTRATION_PASSWORD } from "../constants";

interface PasswordAuthPageProps {
    onAuthenticated: () => void;
}

const PasswordAuthPage = ({ onAuthenticated }: PasswordAuthPageProps) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === LATE_REGISTRATION_PASSWORD) {
            setError(false);
            onAuthenticated();
        } else {
            setError(true);
            setPassword("");
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
                    justifyContent: { xs: "flex-start", md: "center" },
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
                        mb: 4,
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
                    Please enter the late registration password.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "80vw",
                            md: "500px"
                        },
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3
                    }}
                >
                    <TextField
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        placeholder="Enter password"
                        error={error}
                        helperText={error ? "Incorrect password" : ""}
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                borderRadius: "12px",
                                fontFamily: "Montserrat",
                                "& fieldset": {
                                    borderColor: error
                                        ? "#d32f2f"
                                        : "rgba(163, 21, 214, 0.3)"
                                },
                                "&:hover fieldset": {
                                    borderColor: error
                                        ? "#d32f2f"
                                        : "rgba(163, 21, 214, 0.6)"
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: error ? "#d32f2f" : "#A315D6"
                                }
                            },
                            "& .MuiFormHelperText-root": {
                                fontFamily: "Montserrat",
                                fontSize: "14px",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                margin: 0,
                                marginTop: "8px",
                                padding: "4px 8px",
                                borderRadius: "4px"
                            }
                        }}
                    />

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
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<LockIcon />}
                            disabled={!password}
                            sx={{
                                width: "100%",
                                backgroundColor: "#24292f",
                                color: "#ffffff",
                                padding: "10px 20px",
                                fontSize: "16px",
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
                                "&:disabled": {
                                    backgroundColor: "#4a4a4a",
                                    color: "#888888",
                                    boxShadow: "none"
                                },
                                fontFamily: "Montserrat"
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PasswordAuthPage;
