"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PathPrize from "./PathPrize";
import SectionHeader from "./SectionHeader";
import { bob, containerVariants, itemVariants } from "./animations";

const MotionBox = motion(Box);

const ExtraPathPrizesSection: React.FC = () => {
    return (
        <>
            <SectionHeader
                title="EXTRA PRIZES"
                pt="120px"
                subtitles={["Prizes are for each member."]}
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
                    "& > *:nth-of-type(6)": { animationDelay: "0.75s" },
                    "& > *:nth-of-type(7)": { animationDelay: "0.90s" },
                    "& > *:nth-of-type(8)": { animationDelay: "1.05s" },
                    "& > *:nth-of-type(9)": { animationDelay: "1.20s" },
                    "& > *:nth-of-type(10)": { animationDelay: "1.35s" }
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize3.svg"
                        topText="BEST BEGINNER HACK"
                        bottomText="EPOMAKER Mechanical Keyboard"
                        radius={165}
                        width={410}
                        height={410}
                        centerOffsetY={8}
                        centerOffsetX={0}
                        bottomTextSize={30}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={30}
                        showHelpIcon
                        helpAngleDeg={338}
                        helpSize={30}
                        helpRotationDeg={19}
                        helpTooltip="At least half of the members are first time hackers."
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize4.svg"
                        topText="BEST UI/UX DESIGN"
                        bottomText="FUJIFILM Camera Package"
                        radius={160}
                        width={430}
                        height={430}
                        centerOffsetY={12}
                        centerOffsetX={0}
                        bottomTextSize={30}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={30}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize5.svg"
                        topText="BEST SOCIAL IMPACT"
                        secondText="MARSHALL Speaker +"
                        bottomText="$50 Donation to charity of choice"
                        radius={120}
                        width={580}
                        height={580}
                        centerOffsetY={10}
                        centerOffsetX={10}
                        bottomTextSize={20}
                        topTextOffset={40}
                        bottomTextOffset={56}
                        topTextSize={20}
                        showHelpIcon
                        helpAngleDeg={313}
                        helpSize={21}
                        helpRotationDeg={5}
                        helpTooltip="Recognizes the project that has the potential to create the most significant positive change or address a pressing societal issue. Whether through addressing environmental concerns, improving accessibility, or tackling social injustices, among many other possibilities, this category highlights projects that aim to make a tangible difference in the world."
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "10px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize6.svg"
                        topText="MOST POPULAR"
                        bottomText="SONY Headphones"
                        radius={125}
                        width={590}
                        height={590}
                        centerOffsetY={8}
                        centerOffsetX={-6}
                        bottomTextSize={20}
                        topTextOffset={58}
                        bottomTextOffset={40}
                        topTextSize={20}
                        showHelpIcon
                        helpAngleDeg={330}
                        helpSize={20}
                        helpRotationDeg={15}
                        helpTooltip="Determined by attendee votes."
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize7.svg"
                        topText="MOST CREATIVE"
                        bottomText="NINJA Coffee Machine"
                        radius={165}
                        width={410}
                        height={410}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        bottomTextSize={30}
                        topTextOffset={45}
                        bottomTextOffset={50}
                        topTextSize={30}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize8.svg"
                        topText="MOST USELESS"
                        bottomText="NERF gun + Walkie-Talkie"
                        radius={150}
                        width={470}
                        height={470}
                        centerOffsetY={-2}
                        centerOffsetX={9}
                        bottomTextSize={25}
                        topTextOffset={60}
                        bottomTextOffset={50}
                        topTextSize={25}
                        showHelpIcon
                        helpTooltip="Celebrates projects that are delightfully impractical — but still well-designed and fully functional. We're not looking for broken demos or unfinished apps, but thoughtfully built projects that explore fun, novel, or whimsical ideas rather than serious real-world problems."
                        helpAngleDeg={333}
                        helpSize={28}
                        helpRotationDeg={15}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize10.svg"
                        topText="BEST USE OF OPENAI"
                        bottomText="5k OpenAI API credits"
                        radius={130}
                        width={540}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        bottomTextSize={25}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize9.svg"
                        topText="BEST USE OF NESSIE"
                        bottomText="$300 gift card/person"
                        bottomBottomText={
                            <p
                                style={{
                                    marginTop: "10px",
                                    textWrap: "balance",
                                    textAlign: "center"
                                }}
                            >
                                Winners receive a <b>$300</b> gift card per
                                person on their team
                            </p>
                        }
                        radius={130}
                        width={540}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        bottomTextSize={25}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize11.svg"
                        topText="BEST USE OF CLOUDFLARE"
                        bottomText="5k Cloudflare Credits"
                        radius={130}
                        width={540}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        bottomTextSize={25}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox
                    variants={itemVariants}
                    sx={{ mt: { xs: "0px", sm: "0px" } }}
                >
                    <PathPrize
                        backgroundSrc="/prizes/path_prizes/prize12.svg"
                        topText="BEST USE OF"
                        bottomText="SUPERMEMORY"
                        bottomBottomText={
                            <p
                                style={{
                                    marginTop: "10px",
                                    textWrap: "balance",
                                    textAlign: "center"
                                }}
                            >
                                Pair of <b>Meta Raybans</b> for each winning
                                team member
                            </p>
                        }
                        radius={130}
                        width={540}
                        height={540}
                        centerOffsetY={10}
                        centerOffsetX={0}
                        bottomTextSize={25}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>
            </MotionBox>
        </>
    );
};

export default ExtraPathPrizesSection;
