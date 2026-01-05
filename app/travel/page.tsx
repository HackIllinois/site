"use client";
import React, { useState } from "react";
import InteractiveMap from "./InteractiveMap";
import styles from "./styles.module.scss";
import {
    Box,
    Dialog,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import GradientText from "@/components/GradientText";
import clsx from "clsx";
import MouseIcon from "@mui/icons-material/Mouse";
import MapLegend from "./MapLegend";
import { TouchApp } from "@mui/icons-material";
import { motion, Variants } from "framer-motion";
import { EllipseHeader } from "./EllipseHeader";

const internationalData = [
    {
        location: "Waterloo (Canada)",
        amount: "$350",
        color: "#AC00EA" // Purple
    },
    {
        location: "Singapore",
        amount: "$500",
        color: "#EB2FD4" // Violet/Magenta
    },
    {
        location: "China",
        amount: "$500",
        color: "#FF7274" // Red/Pink
    },
    {
        location: "India",
        amount: "$500",
        color: "#FFBA59" // Orange/Yellow
    },
    {
        location: "UK",
        amount: "$500",
        color: "#76B373" // Green
    },
    {
        location: "Not listed",
        amount: "$350",
        color: "#9f9f9fff" // Sky Blue
    }
];

const InternationalPricingCard = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#F3E5F5", // Matches the light purple background
                borderRadius: "20px",
                padding: "20px 30px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "250px"
            }}
        >
            {internationalData.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            flexShrink: 0
                        }}
                    />
                    <Typography
                        sx={{
                            color: "#401A79",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            fontFamily: "Montserrat",
                            lineHeight: 1.2
                        }}
                    >
                        {item.location}: {item.amount}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

const TravelPage: React.FC = () => {
    const theme = useTheme();
    // Use 'lg' to match the breakpoint where your layout shifts from column to row
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [openMobileModal, setOpenMobileModal] = useState(false);

    const handleMobileClick = () => {
        if (isMobile) {
            setOpenMobileModal(true);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const InternationalTrigger = (
        <div
            className={styles.internationalWrapper}
            onClick={handleMobileClick}
            style={{
                cursor: isMobile ? "pointer" : "default"
            }}
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
    );

    return (
        <main className={styles.main}>
            <div className={styles.travelSection}>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10rem",
                        marginBottom: {
                            xs: 0,
                            md: "-3rem"
                        }
                    }}
                >
                    <svg
                        viewBox="0 0 800 150"
                        preserveAspectRatio="xMidYMid meet"
                        style={{
                            width: "100%",
                            maxWidth: "800px",
                            height: "auto"
                        }}
                    >
                        <defs>
                            <path
                                id="travelDetailsCurve"
                                d="M 50,100 Q 400,20 750,100"
                            />
                        </defs>
                        <text className={styles.headerText}>
                            <textPath
                                style={{
                                    fontFamily: "Tsukimi Rounded, sans-serif"
                                }}
                                href="#travelDetailsCurve"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                TRAVEL DETAILS
                            </textPath>
                        </text>
                    </svg>
                </Box>

                <EllipseHeader />
                <Box
                    sx={{
                        backgroundColor: "#FAD0FF",
                        px: {
                            xs: 2,
                            lg: 6
                        },
                        zIndex: 7
                    }}
                >
                    <Box className={styles.contentContainer}>
                        <Box
                            component={motion.div}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            sx={{
                                marginBottom: { xs: "2rem", lg: "5rem" },
                                zIndex: 10
                            }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: "18px", md: "24px" },
                                        fontWeight: 600,
                                        color: "#401a79",
                                        textAlign: "center",
                                        mb: 2,
                                        textShadow:
                                            "0 2px 10px rgba(255, 255, 255, 0.2)",
                                        mt: {
                                            xs: "5rem",
                                            md: "0"
                                        }
                                    }}
                                >
                                    To be considered for reimbursement:
                                </Typography>
                            </motion.div>
                            <motion.p
                                className={styles.requirementText}
                                variants={itemVariants}
                            >
                                Participants must opt-in during the registration
                                process for HackIllinois and this will{" "}
                                <b>not</b> impact your chances of being admitted
                                to the event.
                            </motion.p>
                        </Box>

                        {/* Qualified Section */}
                        <motion.div
                            className={styles.qualifiedSection}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: "18px", md: "24px" },
                                        margin: "0 auto 1rem",
                                        fontWeight: 600,
                                        color: "#401a79",
                                        textAlign: "center",
                                        mb: 2,
                                        textShadow:
                                            "0 2px 10px rgba(255, 255, 255, 0.2)"
                                    }}
                                >
                                    To be qualified for reimbursement:
                                </Typography>
                            </motion.div>
                            <div className={styles.requirementsGrid}>
                                <motion.div
                                    className={styles.requirementItem}
                                    variants={itemVariants}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: "125px", lg: "150px" },
                                            height: {
                                                xs: "125px",
                                                lg: "150px"
                                            },
                                            margin: "0 auto 1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img
                                            src="/travel/RSVPYes.svg"
                                            alt="RSVP"
                                            className={styles.requirementIcon}
                                        />
                                    </Box>
                                    <GradientText
                                        fontFamily="Montserrat"
                                        fontWeight={600}
                                        sx={{
                                            fontSize: {
                                                xs: "16px",
                                                md: "22px"
                                            }
                                        }}
                                    >
                                        RSVP &quot;Yes&quot; to attend
                                        HackIllinois
                                    </GradientText>
                                </motion.div>
                                <motion.div
                                    className={styles.requirementItem}
                                    variants={itemVariants}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: "125px", lg: "150px" },
                                            height: {
                                                xs: "125px",
                                                lg: "150px"
                                            },
                                            margin: "0 auto 1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img
                                            src="/travel/AttendGlobe.png"
                                            alt="Attend"
                                            className={styles.requirementIcon}
                                        />
                                    </Box>

                                    <GradientText
                                        fontFamily="Montserrat"
                                        fontWeight={600}
                                        sx={{
                                            fontSize: {
                                                xs: "16px",
                                                md: "22px"
                                            }
                                        }}
                                    >
                                        Attend HackIllinois in person
                                    </GradientText>
                                </motion.div>
                                <motion.div
                                    className={styles.requirementItem}
                                    variants={itemVariants}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: "125px", lg: "150px" },
                                            height: {
                                                xs: "125px",
                                                lg: "150px"
                                            },
                                            margin: "0 auto 1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <img
                                            src="/travel/Submit.svg"
                                            alt="Submit"
                                            className={styles.requirementIcon}
                                        />
                                    </Box>
                                    <GradientText
                                        fontFamily="Montserrat"
                                        fontWeight={600}
                                        sx={{
                                            fontSize: {
                                                xs: "16px",
                                                md: "22px"
                                            }
                                        }}
                                    >
                                        Submit a qualifying project
                                    </GradientText>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Disclaimer Section */}
                        <motion.div
                            className={styles.disclaimerSection}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.p
                                className={clsx(
                                    styles.disclaimerText,
                                    styles.italic
                                )}
                                variants={itemVariants}
                            >
                                Please be aware that failing to meet any of
                                these requirements will result in
                                disqualification from receiving any
                                reimbursement.
                            </motion.p>
                            <motion.p
                                className={styles.disclaimerText}
                                variants={itemVariants}
                            >
                                The determination of reimbursement amounts is
                                influenced by several factors, including but not
                                limited to an applicant&apos;s geographic
                                location and their distance from the University
                                of Illinois Urbana-Champaign campus. Although a
                                preliminary reimbursement amount may be
                                indicated upon acceptance, please understand
                                that this amount is <b>not guaranteed</b> and
                                may be subject to adjustments based on the final
                                review of eligibility criteria.
                            </motion.p>
                        </motion.div>

                        {/* Reimbursement Section */}
                        <motion.div
                            className={styles.reimbursementSection}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div variants={itemVariants}>
                                <GradientText
                                    fontFamily="Montserrat"
                                    fontWeight={600}
                                    sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "24px",
                                            md: "30px"
                                        }
                                    }}
                                >
                                    REIMBURSEMENT CAPS:
                                </GradientText>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 1
                                    }}
                                >
                                    {/* Desktop View */}
                                    <Box
                                        sx={{
                                            display: { xs: "none", md: "flex" },
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <MouseIcon
                                            sx={{ color: "#401A79", mt: 3 }}
                                        />
                                        <Typography
                                            sx={{
                                                color: "#401A79",
                                                mt: 3,
                                                fontSize: "16px"
                                            }}
                                        >
                                            Hover over a location to see its
                                            reimbursement cap.
                                        </Typography>
                                    </Box>

                                    {/* Mobile View */}
                                    <Box
                                        sx={{
                                            display: { xs: "flex", md: "none" },
                                            alignItems: "center",
                                            gap: 1,
                                            opacity: 0.7
                                        }}
                                    >
                                        <TouchApp
                                            sx={{ color: "#401A79", mt: 3 }}
                                        />
                                        <Typography
                                            sx={{
                                                color: "#401A79",
                                                mt: 3,
                                                fontSize: {
                                                    xs: "14px",
                                                    md: "16px"
                                                }
                                            }}
                                        >
                                            Click over a location to see its
                                            reimbursement cap.
                                        </Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                            <motion.div variants={itemVariants}>
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: {
                                                xs: "column",
                                                lg: "row"
                                            }
                                        }}
                                    >
                                        <InteractiveMap
                                            className={styles.usMap}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap-reverse",
                                            flexDirection: {
                                                xs: "row",
                                                lg: "column"
                                            },
                                            alignItems: "center",
                                            justifyContent: {
                                                xs: "space-between",
                                                lg: "center"
                                            },
                                            gap: {
                                                xs: 2,
                                                lg: 6
                                            }
                                        }}
                                    >
                                        <MapLegend />
                                        <Box
                                            className={
                                                styles.internationalContainer
                                            }
                                            sx={{
                                                display: "flex",
                                                alignItems: "flex-end",
                                                justifyContent: "center",
                                                zIndex: 10,
                                                flexDirection: "column"
                                            }}
                                        >
                                            {!isMobile ? (
                                                <Tooltip
                                                    title={
                                                        <InternationalPricingCard />
                                                    }
                                                    placement="left"
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                bgcolor:
                                                                    "transparent", // Remove default tooltip black box
                                                                p: 0,
                                                                maxWidth: "none"
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {InternationalTrigger}
                                                </Tooltip>
                                            ) : (
                                                <>
                                                    {InternationalTrigger}
                                                    <Dialog
                                                        open={openMobileModal}
                                                        onClose={() =>
                                                            setOpenMobileModal(
                                                                false
                                                            )
                                                        }
                                                        PaperProps={{
                                                            style: {
                                                                backgroundColor:
                                                                    "transparent",
                                                                boxShadow:
                                                                    "none"
                                                            }
                                                        }}
                                                    >
                                                        <InternationalPricingCard />
                                                    </Dialog>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </motion.div>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            className={styles.contactSection}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.p
                                className={styles.contactText}
                                variants={itemVariants}
                            >
                                For further questions, please contact{" "}
                                <a
                                    href="mailto:travel@hackillinois.org"
                                    className={styles.contactLink}
                                >
                                    travel@hackillinois.org
                                </a>
                            </motion.p>
                        </motion.div>
                    </Box>
                </Box>
            </div>
            <img
                src="/travel/bottom.svg"
                alt="Bottom Wave"
                className={styles.bottomWaveImage}
            />
        </main>
    );
};

export default TravelPage;
