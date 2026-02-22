"use client";

import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import PathPrizesSection from "./PathPrizesSection";
import TrackPrizesSection from "./TrackPrizesSection";
import ExtraPathPrizesSection from "./ExtraPathPrizesSection";
import { containerVariants, itemVariants, twinkle } from "./animations";

const Prizes: React.FC = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#020316"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: {
                        xs: 'url("/prizes/backgrounds/prizesbg.svg")'
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: "100px",
                    pb: "200px"
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                        backgroundImage: 'url("/prizes/backgrounds/stars.svg")',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        opacity: 0.4,
                        animation: `${twinkle} 8s ease-in-out infinite`
                    }}
                />

                <HeroSection />

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
                            href="https://docs.google.com/document/d/1zh8RqtR5cnsNl8iO6Bjjg7fdSRFs8Sx_0sDPUazuwy0/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textDecoration: "none",
                                mb: "60px",
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
                <PathPrizesSection />
                <TrackPrizesSection />
                <ExtraPathPrizesSection />
            </Box>
        </Box>
    );
};

export default Prizes;
