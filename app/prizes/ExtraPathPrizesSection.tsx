"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PathPrize from "./PathPrize";
import SectionHeader from "./SectionHeader";
import { bob, containerVariants, itemVariants } from "./animations";

const MotionBox = motion.create(Box);

const gridSx = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: { xs: "60px", sm: "100px" },
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
    "& > *:nth-of-type(2)": { animationDelay: "0.15s" },
    "& > *:nth-of-type(3)": { animationDelay: "0.30s" },
    "& > *:nth-of-type(4)": { animationDelay: "0.45s" },
    "& > *:nth-of-type(5)": { animationDelay: "0.60s" },
    "& > *:nth-of-type(6)": { animationDelay: "0.75s" }
};

const ExtraPathPrizesSection: React.FC = () => {
    return (
        <>
            {/* ── COMPANY PRIZES ── */}
            <SectionHeader title="COMPANY PRIZES" pt="120px" />

            <MotionBox
                sx={gridSx}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
            >
                {/* Solana prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize13.svg"
                        topText="BEST USE OF"
                        topSecondRow="SOLANA"
                        bottomText="$5K in Crypto for the team and Ledger Nano S Plus"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                    />
                </MotionBox>

                {/* Supermemory prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize12.svg"
                        topText="BEST USE OF SUPERMEMORY"
                        bottomText="Pair of Meta Raybans for each member"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                    />
                </MotionBox>

                {/* OpenAI prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize10.svg"
                        topText="BEST USE OF"
                        topSecondRow="OPENAI API"
                        bottomText="$5k of OpenAI API credits for each member"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={130}
                    />
                </MotionBox>

                {/* Nessie (Capital One) prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize9.svg"
                        topText="BEST USE OF"
                        topSecondRow={
                            <>
                                CAPITAL ONE NESSIE{" "}
                                <span
                                    style={{
                                        fontWeight: 400,
                                        fontSize: "0.7em"
                                    }}
                                >
                                    (HACKATHON API)
                                </span>
                            </>
                        }
                        bottomText="$300 gift card for each member"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={130}
                    />
                </MotionBox>

                {/* Actian prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize14.svg"
                        topText="BEST USE OF ACTIAN VectorAI DB"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={120}
                        bottomBottomText={
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <strong>1st place:</strong> $300 in prepaid
                                    AmEx gift cards for the team
                                </li>
                                <li>
                                    <strong>2nd place:</strong> $120 in prepaid
                                    AmEx gift cards for the team
                                </li>
                                <li>
                                    <strong>3rd place:</strong> Anker USB-C Hubs
                                    for each team member
                                </li>
                            </ul>
                        }
                    />
                </MotionBox>

                {/* Cloudflare prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize11.svg"
                        topText="BEST USE OF CLOUDFLARE DEVELOPER PLATFORM"
                        bottomText="$5K Cloudflare credits for each member"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={120}
                    />
                </MotionBox>

                {/* Aedify prize */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize15.svg"
                        topText="BEST DEPLOYED ON AEDIFY"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={120}
                        bottomBottomText={
                            <ul>
                                <li>
                                    <b>$300</b> in platform credits per member
                                </li>
                                <li>
                                    <b>5 months free of OpenClaw</b> ($100
                                    value) per member
                                </li>
                            </ul>
                        }
                    />
                </MotionBox>
            </MotionBox>

            {/* ── EXTRA HACK PRIZES ── */}
            <SectionHeader
                title="EXTRA HACK PRIZES"
                pt="120px"
                subtitles={["Awarded to each member of the winning team."]}
            />

            <MotionBox
                sx={gridSx}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
            >
                {/* Best Beginner Hack */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize3.svg"
                        topText="BEST BEGINNER HACK"
                        bottomText="EPOMAKER Mechanical Keyboard"
                        radius={130}
                        height={540}
                        centerOffsetY={8}
                        centerOffsetX={0}
                        showHelpIcon
                        helpTooltip="At least half of the members are first time hackers."
                        titleMinHeight={75}
                    />
                </MotionBox>

                {/* Best UI/UX Design */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize4.svg"
                        topText="BEST UI/UX DESIGN"
                        bottomText="FUJIFILM Camera Package"
                        radius={130}
                        height={540}
                        centerOffsetY={12}
                        centerOffsetX={0}
                        titleMinHeight={75}
                    />
                </MotionBox>

                {/* Best Social Impact */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize5.svg"
                        topText="BEST SOCIAL IMPACT"
                        bottomText="$50 Donation to charity of choice"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={10}
                        showHelpIcon
                        helpTooltip="Recognizes the project that has the potential to create the most significant positive change or address a pressing societal issue. Whether through addressing environmental concerns, improving accessibility, or tackling social injustices, among many other possibilities, this category highlights projects that aim to make a tangible difference in the world."
                    />
                </MotionBox>

                {/* Most Popular */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "10px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize6.svg"
                        topText="MOST POPULAR"
                        bottomText="SONY Headphones"
                        radius={130}
                        height={540}
                        centerOffsetY={8}
                        centerOffsetX={-6}
                        showHelpIcon
                        helpTooltip="Determined by attendee votes."
                    />
                </MotionBox>

                {/* Most Creative */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize7.svg"
                        topText="MOST CREATIVE"
                        bottomText="NINJA Coffee Machine"
                        radius={130}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        titleMinHeight={75}
                    />
                </MotionBox>

                {/* Most Useless */}
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize8.svg"
                        topText="MOST USELESS"
                        bottomText="NERF gun + Walkie-Talkie"
                        radius={130}
                        height={540}
                        centerOffsetY={-2}
                        centerOffsetX={9}
                        titleMinHeight={75}
                        showHelpIcon
                        helpTooltip="Celebrates projects that are delightfully impractical — but still well-designed and fully functional. We're not looking for broken demos or unfinished apps, but thoughtfully built projects that explore fun, novel, or whimsical ideas rather than serious real-world problems."
                    />
                </MotionBox>
            </MotionBox>
        </>
    );
};

export default ExtraPathPrizesSection;
