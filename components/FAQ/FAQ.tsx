"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./FAQ.module.scss";

// We change the type of 'answer' implicitly to React.ReactNode (string | JSX)
// to allow the anchor link in the reimbursement section.
const faqItems = [
    {
        question: "Who is eligible to attend?",
        answer: "HackIllinois is open to all current college students and recent graduates (within 1 year of graduation). You do not need any prior coding experience - we welcome students of all skill levels! Whether you are a beginner or an experienced hacker, there is a place for you at HackIllinois."
    },
    {
        question: "How can I get help during the event?",
        answer: "HackIllinois 2026 will be held in the University of Illinois Urbana-Champaign. We'll provide more detailed location and parking information closer to the event date."
    },
    {
        question: "Will there be reimbursement?",
        answer: (
            <>
                Yes! HackIllinois will offer only travel reimbursement this year
                to attendees that submit a project. Final amounts will be
                announced closer to the event and will be organized by zones.
                <br />
                <br />
                To stay updated, we encourage you to{" "}
                <a
                    href="#newsletter"
                    style={{ color: "inherit", textDecoration: "underline" }}
                >
                    sign up for our newsletter
                </a>
                . You will receive an email as soon as the reimbursement details
                are released.
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

    return (
        <div className={styles.faqItems}>
            {faqItems.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
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
                                    sx={{ color: "white", fontSize: "2rem" }}
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
                                        fontSize: { xs: "0.9rem", md: "1rem" },
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
            ))}
        </div>
    );
};
