"use client";
import LANDING from "@/public/registration/pro/landing.svg";
import { montserrat } from "@/theme/fonts";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const ProChallenge: React.FC = () => {
    return (
        <main className={"screen"}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "100vh",
                    height: "100%",
                    width: "100%",
                    pt: "80px",
                    pb: "50px",
                    backgroundImage: `url(${LANDING.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    Ready to be a
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        mb: "40px",
                        fontWeight: 800,
                        fontSize: { xs: "28px", sm: "32px" }
                    }}
                >
                    HackVoyager?
                </Typography>

                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    Complete the following
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    sx={{
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    coding challenge to find
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    fontSize={28}
                    sx={{
                        mb: "40px",
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    out!
                </Typography>

                {/* Begin button */}
                <Link prefetch={false} href="/challenge/description">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#D9D9D9",
                            color: "black",
                            fontWeight: 800,
                            fontSize: { xs: "18px", sm: "20px" },
                            textTransform: "none",
                            px: { xs: 6, sm: 8 },
                            py: 1,
                            borderRadius: "30px",
                            fontFamily: `${montserrat.style.fontFamily}, sans-serif`,
                            "&:hover": {
                                backgroundColor: "white"
                            }
                        }}
                    >
                        BEGIN
                    </Button>
                </Link>
            </Box>
        </main>
    );
};

export default ProChallenge;
