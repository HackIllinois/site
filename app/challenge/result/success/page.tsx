import { montserrat } from "@/theme/fonts";
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
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                    textAlign: "center",
                    px: 2
                }}
            >
                Congratulations, you passed!
            </Typography>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 3,
                    mt: { xs: 4, md: 6 },
                    px: { xs: 2, sm: 3 }
                }}
            >
                <Typography
                    variant="h3"
                    component="p"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }
                    }}
                >
                    You are invited to apply as a
                </Typography>
                <Typography
                    variant="h1"
                    component="b"
                    sx={{
                        textShadow: "0 0 30px #ffffff",
                        fontSize: { xs: "3rem", sm: "4rem", md: "5rem" }
                    }}
                >
                    HackVoyager
                </Typography>
                <Typography
                    variant="h3"
                    component="p"
                    sx={{
                        maxWidth: "700px",
                        px: 5,
                        fontWeight: 500,
                        fontSize: {
                            xs: "0.875rem",
                            sm: "1.25rem",
                            md: "1.5rem"
                        }
                    }}
                >
                    Your registration is now complete. Click Continue to view
                    your confirmation.
                </Typography>
                <Link prefetch={false} href="/register/general#confirmation">
                    <Button
                        variant="contained"
                        sx={{
                            color: "black",
                            mt: 3,
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            padding: { xs: "10px 20px", sm: "12px 30px" }
                        }}
                    >
                        Continue
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}
