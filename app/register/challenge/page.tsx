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
                    fontSize={28}
                    sx={{ fontWeight: 600 }}
                >
                    Ready to be a
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    fontSize={40}
                    sx={{
                        mb: "53px",
                        fontWeight: 800
                    }}
                >
                    HackVoyager?
                </Typography>

                <Typography fontFamily={"Montserrat"} fontSize={28}>
                    Complete the following
                </Typography>
                <Typography fontFamily={"Montserrat"} fontSize={28}>
                    coding challenge to find
                </Typography>
                <Typography
                    fontFamily={"Montserrat"}
                    fontSize={28}
                    sx={{ mb: 4 }}
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
                        fontSize: "27px",
                        textTransform: "none",
                        px: 10,
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
