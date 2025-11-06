"use client";
import { Box, Paper, Typography } from "@mui/material";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const ProChallenge: React.FC = () => {
    return (
        <main className={"screen"}>
            <Box
                sx={{
                    minHeight: "100vh",
                    height: "100%",
                    width: "100%",
                    pb: "50px"
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255,0)",
                        height: "100%",
                        pt: "170px",
                        px: "50px"
                    }}
                >
                    <Typography
                        fontFamily={"Montserrat"}
                        style={{ marginBottom: "1rem" }}
                        variant="h4"
                    >
                        Pro Challenge Registration
                    </Typography>
                </Paper>
            </Box>
        </main>
    );
};

export default ProChallenge;
