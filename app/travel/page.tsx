"use client";
import React from "react";
import InteractiveMap from "./InteractiveMap";
import styles from "./styles.module.scss";
import { Box, Typography } from "@mui/material";
import GradientText from "@/components/GradientText";
import clsx from "clsx";
import MouseIcon from "@mui/icons-material/Mouse";
import MapLegend from "./MapLegend";

const TravelPage: React.FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.travelSection}>
                <h1 className={styles.title}>TRAVEL DETAILS</h1>

                <Box
                    sx={{
                        backgroundColor: "#FAD0FF"
                    }}
                >
                    <div className={styles.requirementsSection}>
                        <h2 className={styles.sectionTitle}>
                            To be considered for reimbursement:
                        </h2>
                        <p className={styles.requirementText}>
                            Participants must opt-in during the registration
                            process for HackIllinois and this will <b>not</b>{" "}
                            impact their chances of being admitted to the event.
                        </p>
                    </div>

                    {/* Qualified Section */}
                    <div className={styles.qualifiedSection}>
                        <h2 className={styles.sectionTitle}>
                            To be qualified for reimbursement:
                        </h2>
                        <div className={styles.requirementsGrid}>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/RSVPYes.svg"
                                        alt="RSVP"
                                        className={styles.requirementIcon}
                                    />
                                </div>
                                <GradientText>
                                    RSVP &quot;Yes&quot; to attend HackIllinois
                                </GradientText>
                            </div>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/AttendGlobe.svg"
                                        alt="Attend"
                                        className={styles.requirementIcon}
                                    />
                                </div>

                                <GradientText>
                                    Attend HackIllinois in person
                                </GradientText>
                            </div>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/Submit.svg"
                                        alt="Submit"
                                        className={styles.requirementIcon}
                                    />
                                </div>
                                <GradientText>
                                    Submit a qualifying project
                                </GradientText>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Section */}
                    <div className={styles.disclaimerSection}>
                        <p
                            className={clsx(
                                styles.disclaimerText,
                                styles.italic
                            )}
                        >
                            Please be aware that failing to meet any of these
                            requirements may result in disqualification from
                            receiving any reimbursement.
                        </p>
                        <p className={styles.disclaimerText}>
                            The determination of reimbursement amounts is
                            influenced by several factors, including but not
                            limited to an applicant&apos;s geographic location
                            and their distance from the University of Illinois
                            Urbana-Champaign campus. Although a preliminary
                            reimbursement amount may be indicated upon
                            acceptance, please understand that this amount is
                            not guaranteed and may be subject to adjustments
                            based on the final review of eligibility criteria.
                        </p>
                    </div>

                    {/* Reimbursement Section */}
                    <div className={styles.reimbursementSection}>
                        <GradientText
                            fontSize={"2rem"}
                            fontFamily="Montserrat"
                            fontWeight={600}
                            sx={{
                                width: "100%",
                                textAlign: "center"
                            }}
                        >
                            REIMBURSEMENT CAPS:
                        </GradientText>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1
                            }}
                        >
                            <MouseIcon sx={{ color: "#401A79", mt: 3 }} />
                            <Typography
                                sx={{
                                    color: "#401A79",
                                    textAlign: "center",
                                    mt: 3
                                }}
                            >
                                Hover over a location to see its reimbursement
                                cap.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: {
                                    xs: "column",
                                    lg: "row"
                                }
                            }}
                        >
                            <InteractiveMap className={styles.usMap} />
                            <div className={styles.legendWrapper}>
                                <MapLegend />
                                <Box
                                    className={styles.internationalContainer}
                                    sx={{
                                        zIndex: 10,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }}
                                >
                                    <div
                                        className={styles.internationalWrapper}
                                    >
                                        <img
                                            src="/travel/Group 912.png"
                                            alt="International"
                                            className={styles.internationalIcon}
                                            style={{
                                                height: "auto"
                                            }}
                                        />
                                    </div>
                                </Box>
                            </div>
                        </Box>
                    </div>

                    {/* Contact Section */}
                    <div className={styles.contactSection}>
                        <p className={styles.contactText}>
                            For further questions, please contact{" "}
                            <a
                                href="mailto:travel@hackillinois.org"
                                className={styles.contactLink}
                            >
                                travel@hackillinois.org
                            </a>
                        </p>
                    </div>

                    <img
                        src="/travel/bottom.svg"
                        alt="Bottom Wave"
                        className={styles.bottomWaveImage}
                    />
                </Box>
            </div>
        </main>
    );
};

export default TravelPage;
