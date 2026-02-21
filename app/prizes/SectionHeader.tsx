"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animations";

type SectionHeaderProps = {
    title: string;
    subtitles?: React.ReactNode[];
    pt?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitles,
    pt = "20px"
}) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ width: "90%" }}
        >
            <motion.div variants={itemVariants}>
                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "35px",
                        fontWeight: 700,
                        pt
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
                            fontFamily: "Tsukimi Rounded",
                            fontSize: "48px",
                            fontWeight: 700
                        }}
                    >
                        {title}
                    </Box>
                </Typography>
            </motion.div>

            {subtitles?.map((subtitle, i) => (
                <motion.div key={i} variants={itemVariants}>
                    <Typography
                        sx={{
                            color: "rgba(255, 255, 255, 0.85)",
                            textAlign: "center",
                            textWrap: "balance",
                            fontFamily: "Montserrat",
                            fontSize: "18px",
                            fontWeight: 500,
                            lineHeight: 1.6,
                            maxWidth: "1000px",
                            mx: "auto",
                            mt: i === 0 ? "12px" : "4px"
                        }}
                    >
                        {subtitle}
                    </Typography>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default SectionHeader;
