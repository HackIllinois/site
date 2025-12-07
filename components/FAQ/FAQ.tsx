"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./FAQ.module.scss";
import Link from "next/link";
import clsx from "clsx";
import GlobalContext from "@/app/context";

const FAQ: React.FC = () => {
    const { eventStatus } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    const faqData = [
        {
            question: <strong>What is a Hackathon?</strong>,
            answer: (
                <p>
                    A hackathon is a collaborative event where teams utilize
                    their skills to create projects that solve problems or
                    identify new opportunities! They typically run for a short
                    and continuous period of time. For Hacklllinois, meals will
                    be provided.
                </p>
            )
        },
        {
            question: <strong>Are there any prizes or incentives?</strong>,
            answer: (
                <p>
                    Yes! Cash prizes will be offered for winning teams in
                    several different categories, including{" "}
                    <Link prefetch={false} href={"/olympians"}>
                        HackOlympians
                    </Link>
                    . Additionally, there are various mini-games and events that
                    offer plenty of opportunities to win prizes through our
                    Point Shop!
                </p>
            )
        },
        {
            question: (
                <strong>
                    What is the difference between a path and a track?
                </strong>
            ),
            answer: (
                <p>
                    Paths distinguish your level of expertise whereas tracks
                    specify the type of project you are creating. Our paths are
                    General and{" "}
                    <Link prefetch={false} href={"/olympians"}>
                        HackOlympian
                    </Link>
                    {""}; General encompasses beginner and intermediate hackers
                    competing for a smaller cash prize, while HackOlympians are
                    experienced hackers looking for a chance to compete in a
                    more competitive arena with a larger cash prize. Tracks are
                    designed by our sponsors to provide a specialized topic to
                    center your project around. Each participant must choose
                    both a path and track when submitting their project.
                </p>
            )
        },
        {
            question: (
                <strong>
                    What is <i>HackOlympians</i>?
                </strong>
            ),
            answer: (
                <p>
                    <Link prefetch={false} href={"/olympians"}>
                        HackOlympians
                    </Link>{" "}
                    is an exclusive path tailored for prospective attendees to
                    dive into a competitively elevated hackathon atmosphere for
                    an increased prize value. It&apos;s a specialized arena for
                    experienced hackers who have mastered the fundamentals and
                    are now looking to test their skills in a more challenging
                    environment. Admission into HackOlympians requires
                    completing our application, which includes a{" "}
                    {eventStatus === "registration" ? (
                        <Link prefetch={false} href="/register/challenge">
                            coding challenge
                        </Link>
                    ) : (
                        "coding challenge"
                    )}
                    .
                </p>
            )
        },
        {
            question: (
                <strong>What are the benefits of being a HackOlympian?</strong>
            ),
            answer: (
                <p>
                    Attendees in this path have the exclusive opportunity to
                    compete for the grand Olympians prize. Additionally, they
                    will gain access to special networking opportunities with
                    our event sponsors and the chance to present their project
                    in a thrilling Shark-Tank inspired showcase, among other
                    exciting perks
                    {eventStatus === "registration"
                        ? " - but spots are limited, so register soon!"
                        : "!"}
                </p>
            )
        },
        {
            question: (
                <strong>
                    How is HackOlympians different from standard HackIllinois
                    attendance?
                </strong>
            ),
            answer: (
                <>
                    <p>
                        HackIllinois is a historically welcoming space for
                        coders of all skill levels, particularly those who are
                        just starting out. This inclusive environment encourages
                        beginner-level coders to engage and learn, while
                        HackOlympians caters to more advanced participants,
                        fostering a competitive and stimulating atmosphere for
                        seasoned hackers. All attendees from both paths will
                        enjoy access to Hacklllinois&apos;s vibrant array of
                        events, workshops, company Q&As, and the Company Expo.
                        Each path will maintain the spirit of inclusivity and
                        learning to ensure that all attendees, regardless of
                        their track, experience the full magic of HackIllinois!
                        Additionally, all HackIllinois attendees are eligible to
                        compete in all our sponsored tracks.*
                    </p>
                    <br />
                    <p>
                        *The Best Beginner and General prizes are reserved for
                        HackIllinois General attendees, while the Best Olympians
                        prize is reserved for HackOlympians attendees.
                    </p>
                </>
            )
        }
    ];

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

    const faqsPerPage = useMemo(() => {
        if (windowWidth <= 432) {
            return 1;
        } else if (windowWidth <= 1350) {
            return 2;
        } else {
            return 5;
        }
    }, [windowWidth, faqData]);
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
                    &#x25c4;
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
                    &#x25ba;
                </button>
            )}
        </div>
    );
};

export default FAQ;
