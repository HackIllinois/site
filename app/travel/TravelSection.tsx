"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { motion, Variants } from "framer-motion";
import InteractiveMap from "./InteractiveMap";
import styles from "./styles.module.scss";

const TravelSection = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={styles.travelSection}>
            <div className={styles.travelBackgrounds}>
                <Image
                    src="/design-reference/stars.svg"
                    alt="Stars Background"
                    fill
                    className={styles.starsBackground}
                    priority
                />
            </div>

            <motion.div
                className={styles.content}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            mt: 8,
                            mb: 4,
                            textAlign: "center",
                            fontSize: { xs: "2.5rem", md: "3rem" },
                            fontWeight: 700,
                            color: "white"
                        }}
                    >
                        TRAVEL DETAILS
                    </Typography>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className={styles.ellipseSection}
                >
                    <Image
                        src="/travel/ellipse.svg"
                        alt="Ellipse Background"
                        width={1000}
                        height={280}
                        className={styles.ellipseImage}
                        priority
                    />
                    <Typography className={styles.ellipseText}>
                        For HackIllinois 2026, we are excited to offer travel
                        reimbursements to qualifying attendees!
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            mt: 6,
                            mb: 3,
                            textAlign: "center",
                            fontSize: { xs: "1.8rem", md: "2rem" },
                            fontWeight: 600,
                            color: "white"
                        }}
                    >
                        To be considered for <strong>reimbursement</strong>:
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 2,
                            mb: 6,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            color: "white",
                            textAlign: "center",
                            maxWidth: "800px",
                            margin: "0 auto"
                        }}
                    >
                        Participants must opt-in during the registration process
                        for HackIllinois and this will not impact your chances
                        of being admitted to the event.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            mt: 4,
                            mb: 3,
                            textAlign: "center",
                            fontSize: { xs: "1.8rem", md: "2rem" },
                            fontWeight: 600,
                            color: "white"
                        }}
                    >
                        To be qualified for reimbursement:
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className={styles.requirementsGrid}>
                        <div className={styles.requirementItem}>
                            <div className={styles.iconContainer}>
                                <Image
                                    src="/travel/RSVPYes.svg"
                                    alt="RSVP"
                                    width={80}
                                    height={80}
                                    className={styles.requirementIcon}
                                />
                            </div>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "1rem", md: "1.1rem" },
                                    color: "white",
                                    textAlign: "center",
                                    mt: 1
                                }}
                            >
                                RSVP &quot;Yes&quot; to attend HackIllinois
                            </Typography>
                        </div>
                        <div className={styles.requirementItem}>
                            <div className={styles.iconContainer}>
                                <Image
                                    src="/travel/AttendGlobe.svg"
                                    alt="Attend"
                                    width={80}
                                    height={80}
                                    className={styles.requirementIcon}
                                />
                            </div>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "1rem", md: "1.1rem" },
                                    color: "white",
                                    textAlign: "center",
                                    mt: 1
                                }}
                            >
                                Attend HackIllinois in person
                            </Typography>
                        </div>
                        <div className={styles.requirementItem}>
                            <div className={styles.iconContainer}>
                                <Image
                                    src="/travel/Submit.svg"
                                    alt="Submit"
                                    width={80}
                                    height={80}
                                    className={styles.requirementIcon}
                                />
                            </div>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "1rem", md: "1.1rem" },
                                    color: "white",
                                    textAlign: "center",
                                    mt: 1
                                }}
                            >
                                Submit a qualifying project
                            </Typography>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 6,
                            mb: 4,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            color: "white",
                            textAlign: "center",
                            maxWidth: "900px",
                            margin: "0 auto"
                        }}
                    >
                        Please be aware that failing to meet any of these
                        requirements will result in disqualification from
                        receiving any reimbursement.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 2,
                            mb: 6,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            color: "white",
                            textAlign: "center",
                            maxWidth: "900px",
                            margin: "0 auto"
                        }}
                    >
                        The determination of reimbursement amounts is influenced
                        by several factors, including but not limited to an
                        applicant&apos;s geographic location and their distance
                        from the University of Illinois Urbana-Champaign campus.
                        Although a preliminary reimbursement amount may be
                        indicated upon acceptance, please understand that this
                        amount is not guaranteed and may be subject to
                        adjustments based on the final review of eligibility
                        criteria.
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontFamily: "Tsukimi Rounded",
                            mt: 6,
                            mb: 4,
                            textAlign: "center",
                            fontSize: { xs: "1.8rem", md: "2rem" },
                            fontWeight: 600,
                            color: "white"
                        }}
                    >
                        REIMBURSEMENT CAPS:
                    </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className={styles.usMapContainer}>
                        <InteractiveMap className={styles.usMap} />
                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FF66DC" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9rem", color: "white" }}
                                >
                                    $100
                                </Typography>
                            </div>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FDAB60" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9rem", color: "white" }}
                                >
                                    $200
                                </Typography>
                            </div>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FF66DC" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9em", color: "white" }}
                                >
                                    $250
                                </Typography>
                            </div>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FDAB60" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9em", color: "white" }}
                                >
                                    $275
                                </Typography>
                            </div>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FF66DC" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9em", color: "white" }}
                                >
                                    $300
                                </Typography>
                            </div>
                            <div className={styles.legendItem}>
                                <div
                                    className={styles.legendColor}
                                    style={{ backgroundColor: "#FDAB60" }}
                                ></div>
                                <Typography
                                    component="span"
                                    sx={{ fontSize: "0.9em", color: "white" }}
                                >
                                    $350
                                </Typography>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className={styles.internationalContainer}>
                        <Image
                            src="/travel/international.svg"
                            alt="International"
                            width={80}
                            height={80}
                            className={styles.internationalIcon}
                        />
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: "white"
                            }}
                        >
                            INTERNATIONAL
                        </Typography>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            mt: 8,
                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                            color: "white",
                            textAlign: "center"
                        }}
                    >
                        For further questions, please contact{" "}
                        <Typography
                            component="a"
                            href="mailto:travel@hackillinois.org"
                            sx={{ color: "#00bfff", textDecoration: "none" }}
                        >
                            travel@hackillinois.org
                        </Typography>
                    </Typography>
                </motion.div>
            </motion.div>

            <div className={styles.bottomWave}>
                <Image
                    src="/travel/bottom.svg"
                    alt="Bottom Wave"
                    width={1920}
                    height={300}
                    className={styles.bottomWaveImage}
                    priority
                />
            </div>
        </section>
    );
};

export default TravelSection;
