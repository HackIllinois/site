"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { twinkle, containerVariants, itemVariants } from "../prizes/animations";

const FAQ = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                bgcolor: "#020316",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: { xs: "80px", md: "90px" },
                    pb: { xs: "20px", md: "30px" },
                    px: { xs: 2, md: 4 }
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

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                        width: "100%",
                        maxWidth: "1400px",
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        flex: 1
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: "36px", md: "48px" },
                                fontFamily: "Tsukimi Rounded",
                                fontWeight: 700,
                                color: "white",
                                textAlign: "center",
                                mb: 1
                            }}
                        >
                            FAQs
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                fontSize: { xs: "14px", md: "16px" },
                                fontFamily: "Montserrat",
                                color: "rgba(255, 255, 255, 0.7)",
                                textAlign: "center",
                                mb: 2
                            }}
                        >
                            Things to know about HackIllinois 2026
                        </Typography>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flex: 1,
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                flex: 1,
                                borderRadius: "12px",
                                overflow: "auto",
                                overflowY: "scroll",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                bgcolor: "white",
                                "&::-webkit-scrollbar": {
                                    width: "12px"
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: "#f1f1f1",
                                    borderRadius: "6px"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: "#888",
                                    borderRadius: "6px"
                                },
                                "&::-webkit-scrollbar-thumb:hover": {
                                    background: "#555"
                                },
                                scrollbarWidth: "auto",
                                scrollbarColor: "#888 #f1f1f1"
                            }}
                        >
                            <iframe
                                src="https://docs.google.com/document/d/e/2PACX-1vTuOSNOiGwSrG4Wg9m9xbjsSh10gzwR06LMtX1dudlo7rerEts0ICyUz8dmoWSwsJPE2sX-ChSupe3n/pub?embedded=true"
                                style={{
                                    width: "100%",
                                    height: "300%",
                                    minWidth: "100%",
                                    border: "none",
                                    display: "block"
                                }}
                                title="FAQ Document"
                            />
                        </Box>
                    </motion.div>
                </motion.div>
            </Box>
        </Box>
    );
};

export default FAQ;
