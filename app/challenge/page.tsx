import { Box, Typography, Button } from "@mui/material";

export default function DesignChallenge() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                height: "100%",
                width: "100%",
                backgroundImage: `url("/challenge/backgrounds/design_chal.png")`,
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
                    maxWidth: "1100px",
                    textAlign: "center",
                    padding: "2rem"
                }}
            >
                <Typography variant="h6" sx={{ color: "white", marginBottom: "26.5rem", lineHeight: 1.6, fontFamily: "Montserrat" }}>
                    Welcome, recruit! You've been selected for a critical mission to map uncharted celestial formations.
                    Using skeleton extraction and graph algorithms, you'll reconstruct constellations from stellar data.
                    Complete the challenge to prove your skills in computer vision and algorithmic problem-solving.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href="https://colab.research.google.com/drive/1cUrrh1vvm0zovPdJ5Yr7jB9j6CovsQ4i"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        background: "linear-gradient(135deg, #ff6b35 0%, #ff8555 100%)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #ff8555 0%, #ffa575 100%)",
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
        </Box>
    );
}
