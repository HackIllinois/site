import { montserrat } from "@/theme/fonts";
import { Box, Button, Container, Typography } from "@mui/material";

export default function ChallengeResult() {
    return (
        <Box
            sx={{
                minHeight: "100vh", // full viewport height
                height: "100%",
                width: "100%",
                pb: "50px",
                backgroundImage: `url("/challenge/backgrounds/failure.svg")`,
                backgroundSize: "cover", // fill the screen
                backgroundRepeat: "no-repeat", // prevent tiling
                backgroundPosition: "center", // center the image
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 4,
                    mt: 6
                }}
            >
                <Typography
                    sx={{
                        fontSize: "2rem",
                        fontWeight: 600,
                        maxWidth: "600px"
                    }}
                >
                    Unfortunately, your solution did not pass the challenge
                </Typography>
                <Typography
                    variant="h3"
                    component="p"
                    sx={{
                        fontWeight: 500
                    }}
                >
                    Please select one of the following options:
                </Typography>
                <Button
                    variant="contained"
                    href="/challenge/"
                    sx={{
                        color: "black",
                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`
                    }}
                >
                    Try again
                </Button>
                <Button
                    variant="contained"
                    href="/register/general"
                    sx={{
                        color: "black",
                        fontFamily: `${montserrat.style.fontFamily}, sans-serif`
                    }}
                >
                    Back to registration
                </Button>
            </Container>
        </Box>
    );
}
