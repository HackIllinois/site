"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PathPrize from "./PathPrize";
import SectionHeader from "./SectionHeader";
import { bob, containerVariants, itemVariants } from "./animations";

const MotionBox = motion.create(Box);

const PathPrizesSection: React.FC = () => {
    return (
        <>
            <SectionHeader
                title="PATH PRIZES"
                subtitles={[
                    "Awarded to the entire winning team, not per member."
                ]}
            />

            <MotionBox
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: "100px",
                    width: "90vw",
                    maxWidth: "1200px",
                    mx: "auto",
                    mt: "60px",
                    justifyItems: "center",
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
                        topText="BEST VOYAGER HACK"
                        bottomText="$5000"
                        radius={100}
                        height={580}
                        topTextOffset={-2}
                        bottomTextOffset={-2}
                        topGradientWord="VOYAGER"
                        topGradient={{
                            from: "#A315D6",
                            mid: "#FDAB60",
                            to: "#A315D6"
                        }}
                        bottomTextFontSize={{
                            xs: "clamp(18px, 7vw, 24px)",
                            sm: "21px",
                            md: "30px",
                            lg: "32px",
                            xl: "32px"
                        }}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "-40px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize2.svg"
                        topText="BEST GENERAL HACK"
                        bottomText="$2500"
                        radius={110}
                        height={550}
                        bottomTextFontSize={{
                            xs: "clamp(18px, 7vw, 24px)",
                            sm: "21px",
                            md: "30px",
                            lg: "32px",
                            xl: "32px"
                        }}
                    />
                </MotionBox>
            </MotionBox>
        </>
    );
};

export default PathPrizesSection;
