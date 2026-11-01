"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { twinkle, containerVariants, itemVariants } from "../prizes/animations";

const FAQ = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#020316",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
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
                        flexDirection: "column"
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
                                mb: 1
                            }}
                        >
                            Things to know about HackIllinois
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography
                            component="a"
                            href="https://hackillinois.org/attendee_guide.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                fontSize: { xs: "14px", md: "16px" },
                                fontFamily: "Montserrat",
                                color: "#4fc3f7",
                                textAlign: "center",
                                display: "block",
                                mb: 3,
                                "&:hover": {
                                    color: "#81d4fa"
                                }
                            }}
                        >
                            Open in new tab
                        </Typography>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "950px",
                                height: "80vh",
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
                            {/* Source - https://stackoverflow.com/a/18432886 */}
                            {/* Posted by Kevin Lynch */}
                            {/* Retrieved 2026-02-25, License - CC BY-SA 3.0 */}
                            <object
                                data="https://hackillinois.org/attendee_guide.pdf"
                                type="application/pdf"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    minWidth: "100%",
                                    border: "none",
                                    display: "block"
                                }}
                            >
                                <p
                                    style={{
                                        padding: "20px",
                                        textAlign: "center"
                                    }}
                                >
                                    Your web browser doesn&apos;t have a PDF
                                    plugin. Instead you can{" "}
                                    <a href="https://hackillinois.org/attendee_guide.pdf">
                                        click here to download the PDF file.
                                    </a>
                                </p>
                            </object>
                        </Box>
                    </motion.div>
                </motion.div>
            </Box>
        </Box>
    );
};

export default FAQ;
