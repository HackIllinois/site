import { authenticate } from "@/util/api";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Typography } from "@mui/material";

const GithubAuthPage = () => {
    const handleAuthenticate = async () => {
        await authenticate();
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url("/registration/backgrounds/personal_info.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transform: "scale(1.25)"
                }}
            ></Box>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 20px"
                    }}
                >
                    <img
                        src="/registration/hackastra-logo.png"
                        alt="Hackastra Logo"
                        style={{
                            width: "auto",
                            height: "80px",
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
                            paddingLeft: 6,
                            paddingRight: 6
                        }}
                    >
                        Sign in with your GitHub account to get started
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<GitHubIcon />}
                        onClick={handleAuthenticate}
                        sx={{
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
                            fontFamily: "Montserrat"
                        }}
                    >
                        Sign in with GitHub
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default GithubAuthPage;
