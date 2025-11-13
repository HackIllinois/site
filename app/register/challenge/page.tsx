"use client";
import { Box, Button, Typography } from "@mui/material";
import { Source_Code_Pro } from "next/font/google";
import LANDING from "@/public/registration/pro/landing.svg";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

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
                        mb: "53px",
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
                        mb: 4,
                        fontSize: { xs: "20px", sm: "24px" }
                    }}
                >
                    out!
                </Typography>

                {/* Begin button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        fontWeight: 800,
                        fontSize: { xs: "20px", sm: "24px" },
                        textTransform: "none",
                        px: { xs: 6, sm: 8 },
                        py: 1,
                        borderRadius: "30px",
                        "&:hover": {
                            backgroundColor: "white"
                        }
                    }}
                >
                    BEGIN
                </Button>
            </Box>
        </main>
    );
};

export default ProChallenge;
