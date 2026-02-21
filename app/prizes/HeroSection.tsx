"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations";

const HeroSection: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div variants={itemVariants}>
                <Box
                    sx={{
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
                        mr: { xs: 2, md: 0 },
                        pt: 8,
                        pb: 9,
                        width: "100vw"
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                textAlign: "center"
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
                                    This year{" "}
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
    );
};

export default HeroSection;
