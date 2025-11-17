import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

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
                    xs: `url("/challenge/backgrounds/mobile/success.png"), url("/challenge/backgrounds/success.png")`,
                    md: `url("/challenge/backgrounds/success.png")`
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
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontSize: "3rem"
                }}
            >
                Congratulations, you passed!
            </Typography>
            <Container
                sx={{
                    width: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 3,
                    mt: 6
                }}
            >
                <Typography
                    variant="h3"
                    component="p"
                    sx={{
                        fontWeight: 600
                    }}
                >
                    You are invited to apply as a
                </Typography>
                <Typography
                    variant="h1"
                    component="b"
                    sx={{
                        textShadow: "0 0 30px #ffffff"
                    }}
                >
                    HackVoyager
                </Typography>
                <Typography
                    variant="h3"
                    component="p"
                    sx={{
                        fontWeight: 500
                    }}
                >
                    To finish registering, click continue to complete the rest
                    of the application
                </Typography>
                <Link
                    prefetch={false}
                    href="/register/general#review-and-submit"
                >
                    <Button variant="contained" sx={{ color: "black", mt: 3 }}>
                        Continue
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}
