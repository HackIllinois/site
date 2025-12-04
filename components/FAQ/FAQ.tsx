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

const faqItems = [
    {
        question: "Who is eligible to attend?",
        answer: "HackIllinois is open to all current college students and recent graduates (within 1 year of graduation). You don't need any prior coding experience - we welcome students of all skill levels! Whether you're a beginner or an experienced hacker, there's a place for you at HackIllinois."
    },
    {
        question: "How can I get help during the event?",
        answer: "We'll have mentors available throughout the entire hackathon to help you with your projects! You can also attend our workshops and tech talks to learn new skills. Our staff and sponsors will be on-site to answer questions and provide guidance. Additionally, we'll have a dedicated help desk and online support channels to ensure you get the assistance you need."
    },
    {
        question: "Where is HackIllinois located?",
        answer: "HackIllinois 2026 will be held at the Siebel Center for Computer Science at the University of Illinois Urbana-Champaign. The address is 201 N Goodwin Ave, Urbana, IL 61801. The event will take place from February 27th to March 1st. We'll provide more detailed location and parking information closer to the event date."
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
                <Box key={item.question} sx={{ mb: 2 }}>
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
