"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations";

const HeroSection: React.FC = () => {
    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={itemVariants}>
                    <Box
                        sx={{
                            mr: { xs: 2, md: 0 },
                            pt: 8,
                            pb: 9,
                            width: "100vw",
                            position: "relative",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                backgroundImage: `url("/prizes/rocket.svg")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: {
                                    xs: "auto 150px",
                                    md: "auto 140px"
                                },
                                backgroundPosition: {
                                    xs: "right center",
                                    md: "center"
                                },
                                "@media (max-width: 349px)": {
                                    opacity: 0.4
                                }
                            }
                        }}
                    >
                        <motion.div variants={itemVariants}>
                            {/* Sub-350px: short version */}
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    display: "none",
                                    "@media (max-width: 349px)": {
                                        display: "block"
                                    }
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        background:
                                            "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                        display: "inline-block",
                                        fontSize: "18px",
                                        fontWeight: 700
                                    }}
                                >
                                    HackIllinois has
                                    <br />
                                    $75K+ in prizes!
                                </Box>
                            </Typography>
                            {/* 350px+: full version */}
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    "@media (max-width: 349px)": {
                                        display: "none"
                                    }
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        background:
                                            "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                        display: "inline-block",
                                        fontSize: {
                                            xs: "19px",
                                            sm: "25px"
                                        },
                                        fontWeight: 700,
                                        maxWidth: "55vw",
                                        ml: { xs: -15, md: 0 }
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "inline"
                                            }
                                        }}
                                    >
                                        This year,{" "}
                                    </Box>
                                    HackIllinois has{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            fontSize: {
                                                xs: "20px",
                                                sm: "35px"
                                            }
                                        }}
                                    >
                                        $75K+
                                    </Box>{" "}
                                    in prizes!
                                </Box>
                            </Typography>
                        </motion.div>
                    </Box>
                </motion.div>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 1
                }}
            >
                <motion.div variants={itemVariants}>
                    <Typography
                        sx={{
                            color: "rgba(255, 255, 255, 0.85)",
                            fontFamily: "Montserrat",
                            fontSize: { xs: "15px", sm: "18px" },
                            fontWeight: 500,
                            textAlign: "center",
                            px: 2,
                            mb: "16px"
                        }}
                    >
                        Click here for a spreadsheet of prizes with updated
                        details.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Box
                        component="a"
                        href="https://go.hackillinois.org/prizes"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            textDecoration: "none",
                            mb: "40px",
                            p: {
                                xs: "4px",
                                sm: "5px",
                                md: "6px"
                            },
                            borderRadius: "40px",
                            background:
                                "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                            display: "inline-block"
                        }}
                    >
                        <Button
                            sx={{
                                backgroundImage:
                                    "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)",
                                backgroundSize: "150% 100%",
                                backgroundPosition: "50% 0%",
                                color: "white",
                                fontWeight: 800,
                                fontSize: {
                                    xs: "14px",
                                    sm: "18px",
                                    md: "20px"
                                },
                                textTransform: "none",
                                px: { xs: 2.5, sm: 4, md: 6 },
                                py: { xs: 1, sm: 1.25, md: 1.5 },
                                borderRadius: "40px",
                                fontFamily: "Tsukimi Rounded",
                                border: "none",
                                transition: "background-position 0.5s ease",
                                "&:hover": {
                                    backgroundPosition: "-20% 0%"
                                }
                            }}
                        >
                            Full prize details
                        </Button>
                    </Box>
                </motion.div>
            </motion.div>
        </>
    );
};

export default HeroSection;
