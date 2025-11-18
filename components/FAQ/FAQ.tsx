"use client";
import React, { useEffect, useState } from "react";
import styles from "./FAQ.module.scss";
import Link from "next/link";
import clsx from "clsx";

const faqData = [
    {
        question: <strong>Who is eligible to attend?</strong>,
        answer: (
            <p>
                HackIllinois is open to all current college students and recent
                graduates (within 1 year of graduation). You don&apos;t need
                any prior coding experience - we welcome students of all skill
                levels! Whether you&apos;re a beginner or an experienced hacker,
                there&apos;s a place for you at HackIllinois.
            </p>
        )
    },
    {
        question: <strong>How can I get help during the event?</strong>,
        answer: (
            <p>
                We&apos;ll have mentors available throughout the entire
                hackathon to help you with your projects! You can also attend
                our workshops and tech talks to learn new skills. Our staff and
                sponsors will be on-site to answer questions and provide
                guidance. Additionally, we&apos;ll have a dedicated help desk
                and online support channels to ensure you get the assistance you
                need.
            </p>
        )
    },
    {
        question: <strong>Where is HackIllinois located?</strong>,
        answer: (
            <p>
                HackIllinois 2025 will be held at the Siebel Center for Computer
                Science at the University of Illinois Urbana-Champaign. The
                address is 201 N Goodwin Ave, Urbana, IL 61801. The event will
                take place from February 28th to March 2nd. We&apos;ll provide
                more detailed location and parking information closer to the
                event date.
            </p>
        )
    }
];

const FAQ: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const faqsPerPage = windowWidth < 1350 ? 3 : faqData.length;
    const totalPages = Math.ceil(faqData.length / faqsPerPage);
    const showArrows = totalPages > 1;

    const navigatePage = (direction: number) => {
        setCurrentPage(prevPage =>
            Math.max(0, Math.min(totalPages - 1, prevPage + direction))
        );
    };

    const currentFAQs = faqData.slice(
        currentPage * faqsPerPage,
        (currentPage + 1) * faqsPerPage
    );

    return (
        <div className={styles.faqContainer}>
            {showArrows && (
                <button
                    className={clsx(styles.faqArrow, styles.faqArrowLeft)}
                    onClick={() => navigatePage(-1)}
                    disabled={currentPage === 0}
                >
                    &#x25C0;
                </button>
            )}
            <div className={styles.faqContent}>
                {currentFAQs.map((faq, index) => (
                    <div className={styles.faqItem} key={index}>
                        <h3>{faq.question}</h3>
                        {faq.answer}
                    </div>
                ))}
            </div>
            {showArrows && (
                <button
                    className={clsx(styles.faqArrow, styles.faqArrowRight)}
                    onClick={() => navigatePage(1)}
                    disabled={currentPage === totalPages - 1}
                >
                    &#x25B6;
                </button>
            )}
        </div>
    );
};

export default FAQ;
