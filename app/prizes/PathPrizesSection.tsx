"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PathPrize from "./PathPrize";
import SectionHeader from "./SectionHeader";
import { bob, containerVariants, itemVariants } from "./animations";

const MotionBox = motion(Box);

const PathPrizesSection: React.FC = () => {
    return (
        <>
            <SectionHeader
                title="PATH PRIZES"
                subtitles={["These prizes are for the entire team."]}
            />

            <MotionBox
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: "20px",
                    width: "90vw",
                    maxWidth: "1200px",
                    mx: "auto",
                    mt: "50px",
                    justifyItems: { xs: "center", sm: "center" },
                    "& > *": {
                        animation: `${bob} 1.8s ease-in-out infinite`,
                        willChange: "transform"
                    },
                    "& > *:nth-of-type(1)": { animationDelay: "0s" },
                    "& > *:nth-of-type(2)": { animationDelay: "0.15s" }
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <MotionBox variants={itemVariants}>
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize1.svg"
                        topText="BEST VOYAGERS HACK"
                        bottomText="$5000"
                        radius={100}
                        width={600}
                        height={600}
                        centerOffsetY={10}
                        bottomTextSize={40}
                        topTextOffset={40}
                        bottomTextOffset={65}
                        bottomLetterSpacing={4}
                        topGradientWord="VOYAGERS"
                        topGradient={{
                            from: "#A315D6",
                            mid: "#FDAB60",
                            to: "#A315D6"
                        }}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "-100px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize2.svg"
                        topText="BEST GENERAL HACK"
                        bottomText="$2500"
                        radius={110}
                        width={580}
                        height={580}
                        centerOffsetY={10}
                        centerOffsetX={-10}
                        bottomTextSize={40}
                        topTextOffset={60}
                        bottomTextOffset={40}
                        bottomLetterSpacing={4}
                    />
                </MotionBox>
            </MotionBox>
        </>
    );
};

export default PathPrizesSection;
