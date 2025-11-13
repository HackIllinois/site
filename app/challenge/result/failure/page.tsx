import { Box, Button, Container, Typography } from "@mui/material";

export default function ChallengeResult() {
    return (
        <Box
            sx={{
                minHeight: "100vh", // full viewport height
                minWidth: "100vw",
                height: "100%",
                width: "100%",
                pb: "50px",
                backgroundImage: {
                    xs: `url("/challenge/backgrounds/mobile/failure.png"), url("/challenge/backgrounds/failure.png")`,
                    md: `url("/challenge/backgrounds/failure.png")`
                },
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
                    width: "600px",
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
                    variant="h3"
                    component="h1"
                    sx={{
                        fontSize: "2rem",
                        fontWeight: 600
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
                <Button variant="contained" sx={{ color: "black" }}>
                    Continue
                </Button>
                <Button variant="contained" sx={{ color: "black" }}>
                    Continue
                </Button>
            </Container>
        </Box>
    );
}
