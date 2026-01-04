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

const internationalData = [
    {
        location: "Waterloo (Canada)",
        amount: "$350",
        color: "#2AB7DA" // Light Blue
    },
    {
        location: "Singapore",
        amount: "$400",
        color: "#2A4ECA" // Dark Blue
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
                <h1 className={styles.title}>TRAVEL DETAILS</h1>

                <div className={styles.ellipseSection}>
                    <img
                        src="/travel/ellipse.svg"
                        alt="Ellipse"
                        className={styles.ellipseImage}
                    />
                    <svg
                        className={styles.ellipseTextSvg}
                        viewBox="0 0 1512 2101"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <path
                                id="ellipseCurve"
                                d="M 90,250 Q 756,-40 1412,250"
                            />
                        </defs>
                        <text className={styles.ellipseTextPath}>
                            <textPath
                                href="#ellipseCurve"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                For HackIllinois 2026, we are excited to offer
                                travel reimbursements to qualifying attendees!
                            </textPath>
                        </text>
                    </svg>
                </div>
                <Box
                    sx={{
                        backgroundColor: "#FAD0FF",
                        px: {
                            xs: 2,
                            lg: 6
                        }
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "1500px",
                            margin: "0 auto"
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: { xs: "2rem", lg: "5rem" },
                                zIndex: 10
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: "18px", md: "24px" },
                                    fontWeight: 600,
                                    color: "#401a79",
                                    textAlign: "center",
                                    mb: 2,
                                    textShadow:
                                        "0 2px 10px rgba(255, 255, 255, 0.2)"
                                }}
                            >
                                To be considered for reimbursement:
                            </Typography>
                            <p className={styles.requirementText}>
                                Participants must opt-in during the registration
                                process for HackIllinois and this will{" "}
                                <b>not</b> impact your chances of being admitted
                                to the event.
                            </p>
                        </Box>

                        {/* Qualified Section */}
                        <div className={styles.qualifiedSection}>
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
                            <div className={styles.requirementsGrid}>
                                <div className={styles.requirementItem}>
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
                                                md: "20px"
                                            }
                                        }}
                                    >
                                        RSVP &quot;Yes&quot; to attend
                                        HackIllinois
                                    </GradientText>
                                </div>
                                <div className={styles.requirementItem}>
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
                                                md: "20px"
                                            }
                                        }}
                                    >
                                        Attend HackIllinois in person
                                    </GradientText>
                                </div>
                                <div className={styles.requirementItem}>
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
                                                md: "20px"
                                            }
                                        }}
                                    >
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
                                Please be aware that failing to meet any of
                                these requirements may result in
                                disqualification from receiving any
                                reimbursement.
                            </p>
                            <p className={styles.disclaimerText}>
                                The determination of reimbursement amounts is
                                influenced by several factors, including but not
                                limited to an applicant&apos;s geographic
                                location and their distance from the University
                                of Illinois Urbana-Champaign campus. Although a
                                preliminary reimbursement amount may be
                                indicated upon acceptance, please understand
                                that this amount is not guaranteed and may be
                                subject to adjustments based on the final review
                                of eligibility criteria.
                            </p>
                        </div>

                        {/* Reimbursement Section */}
                        <div className={styles.reimbursementSection}>
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
                                            mt: 3
                                        }}
                                    >
                                        Click over a location to see its
                                        reimbursement cap.
                                    </Typography>
                                </Box>
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
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column",
                                            lg: "row"
                                        }
                                    }}
                                >
                                    <InteractiveMap className={styles.usMap} />
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
                                                            boxShadow: "none"
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
