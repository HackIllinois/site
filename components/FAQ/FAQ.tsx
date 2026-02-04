"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import styles from "./FAQ.module.scss";

// We change the type of 'answer' implicitly to React.ReactNode (string | JSX)
// to allow the anchor link in the reimbursement section.
const faqItems = [
    {
        question: "Who is eligible to attend?",
        answer: "HackIllinois is open to all current college students and recent graduates (within 1 year of graduation). You do not need any prior coding experience - we welcome students of all skill levels! Whether you are a beginner or an experienced hacker, there is a place for you at HackIllinois."
    },
    {
        question: "Where is HackIllinois located?",
        answer: "HackIllinois 2026 will be held in the University of Illinois Urbana-Champaign. We'll provide more detailed location and parking information closer to the event date."
    },
    {
        question: "Will overnight hacking space be provided?",
        answer: "Yes! HackIllinois will provide overnight hacking space for attendees this year. This dedicated space allows you to work on your project throughout the night in a safe environment."
    },
    {
        question: "Will there be reimbursement?",
        answer: (
            <>
                Yes! HackIllinois will offer only travel reimbursement this year
                to attendees that submit a qualified project. You can view
                details on how to qualify for reimbursement and how much you may
                be eligible for{" "}
                <a
                    href="/travel"
                    style={{ color: "inherit", textDecoration: "underline" }}
                >
                    here
                </a>
                .
            </>
        )
    },
    {
        question: "What prizes will be offered this year?",
        answer: (
            <>
                This year, we’re expanding our prize lineup! Alongside{" "}
                <strong>Best General Project</strong> and{" "}
                <strong>Best HackVoyager Project</strong>, we’re introducing new
                awards that celebrate creativity, design, and fun, such as{" "}
                <strong>Best UI/UX Design</strong>,{" "}
                <strong>Most Popular</strong>, and more! Additionally, attendees
                can earn points throughout the event and redeem them for items
                in our point shop. You can find more details about this
                year&apos;s prizes{" "}
                <a
                    href="/prizes"
                    style={{ color: "inherit", textDecoration: "underline" }}
                >
                    here
                </a>
                .
            </>
        )
    },
    {
        question: "How can I get help during the event?",
        answer: `
We will have mentors available during the event to help with anything you need and there will also be workshops and tech talks for fostering new skillsets! HackIllinois staff will also be available on-site throughout the entire event to answer questions & provide guidance in addition to our online support channels for assistance!`
    }
];

export const FAQ = () => {
    const [expanded, setExpanded] = useState<number | false>(0);

    const handleChange =
        (panelIndex: number) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panelIndex : false);
        };

    // 1. Define container variants for staggering children
    const containerVariants: Variants = {
        hidden: { opacity: 1 }, // Container remains visible
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each item
                delayChildren: 0.1 // Slight delay before starting sequence
            }
        }
    };

    // 2. Define item variants for the fade-up animation
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 }, // Start slightly down and invisible
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        // 3. Convert outer div to motion.div and apply container variants
        <motion.div
            className={styles.faqItems}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible
        >
            {faqItems.map((item, index) => (
                // 4. Wrap each item in a motion div with item variants
                <motion.div key={index} variants={itemVariants}>
                    <Box sx={{ mb: 2 }}>
                        <Accordion
                            expanded={expanded === index}
                            onChange={handleChange(index)}
                            disableGutters
                            elevation={0}
                            square={false}
                            sx={{
                                background:
                                    "linear-gradient(135deg, rgba(163, 112, 170, 0.7) 0%, rgba(151, 132, 203, 0.7) 100%)",
                                backdropFilter: "blur(10px)",
                                borderRadius: "32px !important",
                                border: "3px solid #3F2B75",
                                color: "white",
                                overflow: "hidden",
                                "&:before": {
                                    display: "none"
                                },
                                "&.Mui-expanded": {
                                    margin: 0
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: "white",
                                            fontSize: "2rem"
                                        }}
                                    />
                                }
                                sx={{
                                    minHeight: 80,
                                    px: 4,
                                    py: 2,
                                    "& .MuiAccordionSummary-content": {
                                        margin: 0
                                    }
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        fontFamily: "Tsukimi Rounded",
                                        fontWeight: 700,
                                        fontSize: "1.25rem",
                                        textAlign: "left"
                                    }}
                                >
                                    {item.question}
                                </Typography>
                            </AccordionSummary>

                            {item.answer && (
                                <AccordionDetails
                                    sx={{
                                        px: 4,
                                        pb: 4,
                                        pt: 0,
                                        textAlign: "left"
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: {
                                                xs: "0.9rem",
                                                md: "1rem"
                                            },
                                            lineHeight: 1.6,
                                            textAlign: "left",
                                            mb: 2
                                        }}
                                    >
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            )}
                        </Accordion>
                    </Box>
                </motion.div>
            ))}
        </motion.div>
    );
};
