"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import TrackPrize from "./TrackPrize";
import SectionHeader from "./SectionHeader";
import { bob, containerVariants, itemVariants } from "./animations";

const MotionBox = motion(Box);

const TrackPrizesSection: React.FC = () => {
    return (
        <>
            <SectionHeader
                title="TRACK PRIZES"
                pt="60px"
                subtitles={[
                    <span
                        key="desc"
                        style={{ marginBottom: "12px", display: "block" }}
                    >
                        Designed by our sponsors to provide a specialized topic
                        to center your project around.
                    </span>,
                    <>
                        Each team can only compete in{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(180deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: 700
                            }}
                        >
                            ONE
                        </span>{" "}
                        track.
                    </>,
                    <>
                        Each track winning team will also receive a{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(180deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: 700
                            }}
                        >
                            $2500
                        </span>{" "}
                        cash prize.
                    </>
                ]}
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
                    "& > *:nth-of-type(2)": { animationDelay: "0.15s" },
                    "& > *:nth-of-type(3)": { animationDelay: "0.30s" },
                    "& > *:nth-of-type(4)": { animationDelay: "0.45s" },
                    "& > *:nth-of-type(5)": { animationDelay: "0.60s" }
                }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <MotionBox variants={itemVariants}>
                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track2.svg"
                        topText="BEST API"
                        bottomText={
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <strong>1st place:</strong> $2000 for the
                                    team,{" "}
                                    <a
                                        href="https://www.jbl.com/JBLTOURONEM2BAM.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#73b0ff" }}
                                    >
                                        JBL Tour One M2 Headphones
                                    </a>{" "}
                                    for each team member
                                </li>
                                <li>
                                    <strong>Honorable Mention:</strong> $500 for
                                    the team, $100 Amazon gift card for each
                                    team member
                                </li>
                            </ul>
                        }
                        radiusX={200}
                        radiusY={150}
                        width={500}
                        height={500}
                        centerOffsetY={10}
                        centerOffsetX={13}
                        bottomTextSize={16}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox variants={itemVariants}>
                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track3.svg"
                        topText="BEST AI INFERENCE"
                        bottomText={
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <strong>1st place:</strong> $2000 for the
                                    team, 5K in Modal Credits per person, a
                                    visit to SF or NY Modal Office with lunch
                                    with the Modal team
                                </li>
                                <li>
                                    <strong>2nd place:</strong> $500 for the
                                    team, $1K in Modal Credits and Airpods for
                                    each team member
                                </li>
                                <li>
                                    <strong>3rd place:</strong> $1K in Modal
                                    Credits and Airpods for each team member
                                </li>
                            </ul>
                        }
                        radiusX={200}
                        radiusY={150}
                        width={500}
                        height={500}
                        centerOffsetY={10}
                        centerOffsetX={13}
                        bottomTextSize={16}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox variants={itemVariants}>
                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track1.svg"
                        topText="BEST HARDWARE HACK"
                        bottomText={
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <strong>$2500 prize</strong>
                                </li>
                                <li>
                                    <strong>Ride Along</strong> at{" "}
                                    <strong>Coal Valley Ranch Demo Site</strong>{" "}
                                    on May 15th
                                </li>
                                <li>
                                    <strong>Conference call</strong>{" "}
                                    <strong>with leadership</strong> (on
                                    coordinated date)
                                </li>
                            </ul>
                        }
                        radiusX={200}
                        radiusY={150}
                        width={500}
                        height={500}
                        centerOffsetY={10}
                        centerOffsetX={13}
                        bottomTextSize={16}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>

                <MotionBox variants={itemVariants}>
                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track6.svg"
                        topText="BEST AI INSPECTION"
                        bottomText={
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <strong>1st place:</strong> $1500 for the
                                    team, Ray-Ban Meta AI glasses for each
                                    member, Cat swag and a pitch presentation to
                                    a Caterpillar Executive team member
                                </li>
                                <li>
                                    <strong>2nd place:</strong> $700 for the
                                    team, gaming keyboard for each member, Cat
                                    swag and a pitch presentation to a
                                    Caterpillar Executive team member
                                </li>
                                <li>
                                    <strong>3rd place:</strong> $300 for the
                                    team, gaming keyboard for each member, Cat
                                    swag and sharing the hack with a Caterpillar
                                    Executive team member
                                </li>
                            </ul>
                        }
                        radiusX={200}
                        radiusY={150}
                        width={500}
                        height={500}
                        centerOffsetY={10}
                        centerOffsetX={13}
                        bottomTextSize={16}
                        topTextOffset={50}
                        bottomTextOffset={50}
                        topTextSize={25}
                    />
                </MotionBox>
            </MotionBox>
        </>
    );
};

export default TrackPrizesSection;
