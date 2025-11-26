import CHALLENGE_DESCRIPTION_BACKGROUND from "@/public/registration/backgrounds/challenge-description-background.svg";
import { Box, Button, Typography } from "@mui/material";

export default function ChallengeDescription() {
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
                    maxWidth: "800px",
                    textAlign: "center",
                    padding: "2rem",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
                    variant="h6"
                    sx={{
                        color: "white",
                        lineHeight: 1.6,
                        fontFamily: "Montserrat",
                        textAlign: "left"
                    }}
                >
                    {`Welcome, recruit! You've been selected for a critical
                    mission to map uncharted celestial formations. Using
                    skeleton extraction and graph algorithms, you'll reconstruct
                    constellations from stellar data. Complete the challenge to
                    prove your skills in computer vision and algorithmic
                    problem-solving.`}
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 4
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        href="https://colab.research.google.com/drive/1cUrrh1vvm0zovPdJ5Yr7jB9j6CovsQ4i"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            mr: "auto",
                            background:
                                "linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #ff8555 0%, #ffa575 100%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 20px rgba(255, 107, 53, 0.4)"
                            },
                            padding: "14px 40px",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            fontFamily: "Montserrat",
                            borderRadius: "30px",
                            boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                            transition: "all 0.3s ease",
                            textTransform: "none",
                            letterSpacing: "0.5px"
                        }}
                    >
                        Start Challenge →
                    </Button>
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
                        Success
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        href="/challenge/result/failure"
                        sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            "&:hover": {
                                color: "white"
                            }
                        }}
                    >
                        Failure
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
