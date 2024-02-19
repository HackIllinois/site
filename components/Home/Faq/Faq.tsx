"use client";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import FAQHeader from "@/public/home/faq/faq header.svg";
import Image from "next/image";

import {
    BefDur,
    BefGen,
    DurGen,
    DurBef,
    GenBef,
    GenDur
} from "@/public/home/faq/faq-lotties-spellbook/index";
import {
    BefDur2,
    BefGen2,
    DurGen2,
    DurBef2,
    GenBef2,
    GenDur2
} from "@/public/home/faq/faq-lotties-scroll/index";

type FaqItem = {
    question: string;
    answer: JSX.Element | string; // JSX.Element if you're including HTML elements or strings
};

type FaqPage = {
    questions: FaqItem[];
    imgSrc: string;
};

const faqPages: Record<string, FaqPage> = {
    page1: {
        questions: [
            {
                question: "What is a Hackathon?",
                answer: (
                    <p>
                        A hackathon is a collaborative event where teams utilize
                        their skills to create projects that solve problems or
                        identify new opportunities! They typically run for a
                        short and continuous period of time. For HackIllinois,
                        all meals will be provided.
                    </p>
                )
            },
            {
                question: "Who can participate?",
                answer: <p>Anyone 18 years of age and over may participate!</p>
            },
            {
                question: "How long does the hackathon last?",
                answer: (
                    <p>
                        HackIllinois runs for 36 hours total, from Friday
                        evening to Sunday morning.
                    </p>
                )
            },
            {
                question: "Are there any prizes or incentives?",
                answer: (
                    <p>
                        Yes! Cash prizes will be offered for winning teams in
                        several different categories, including our brand new
                        path{" "}
                        <a
                            onClick={() =>
                                (window.location.pathname = "/knights")
                            }
                        >
                            HackIllinois Knights
                        </a>
                        . Additionally, there are various mini-games and events
                        that offer plenty of opportunities to win prizes!
                    </p>
                )
            }
            // More questions for page 1
        ],
        imgSrc: "/home/faq/faq-svgs-spellbook/gen_p1.svg"
    },
    page2: {
        questions: [
            {
                question: "What should I do if I need help on my project?",
                answer: (
                    <p>
                        Both in-person and virtual mentors will be available to
                        assist teams. Mentors are recruited from companies
                        across the country and in many technical specialties.
                    </p>
                )
            },
            {
                question:
                    "What resources or tools will be provided to attendees?",
                answer: (
                    <p>
                        We provide technical workshops, mentors, a GitHub
                        student developer pack, and more! Additional resources
                        will be provided as sponsor/event details are finalized.
                    </p>
                )
            }
            // More questions for page 2
        ],
        imgSrc: "/home/faq/faq-svgs-spellbook/gen_p2.svg"
    },
    page3: {
        questions: [
            {
                question: "How can I register?",
                answer: (
                    <p>
                        We have a registration portal, which has now closed admissions for 2024.
                        <br></br>
                        <br></br>In
                        addition, we will have a travel reimbursement form
                        within registration. More information regarding travel
                        reimbursements will be available upon acceptance.
                    </p>
                )
            },
            {
                question:
                    "Are there any themes or specific challenges we need to address?",
                answer: (
                    <p>
                        Hacklllinois provides several different tracks for teams
                        to follow. The specific track themes will be released
                        soon.
                    </p>
                )
            },
            {
                question: "Are there facilities for overnight stays?",
                answer: (
                    <p>
                        Unfortunately, we do not have a facility that provides
                        overnight stays. During registration, you can opt in to
                        be considered for travel reimbursements. More information regarding travel
                        reimbursements will be available upon acceptance.
                    </p>
                )
            },
            {
                question: "Are there any prizes or incentives?",
                answer: (
                    <p>
                        We provide collaborative events with UIUC classes,
                        student organizations, and other universities for you to
                        check out! We also host social activities as well,
                        listed in the &ldquo;During&rdquo; section.
                    </p>
                )
            }
            // More questions for page 3
        ],
        imgSrc: "/home/faq/faq-svgs-spellbook/bef_p1.svg"
    },
    page4: {
        questions: [
            {
                question:
                    "How are teams formed? Can I bring my own team? What if I don't have a team yet?",
                answer: (
                    <p>
                        Feel free to form your own team! (Max size of 4) But
                        don&apos;t worry if you do not have one - we will have a
                        team matching workshop available, along with team
                        matching channels on Discord.
                    </p>
                )
            },
            {
                question:
                    "What if I'm new to coding or hackathons, can I still participate? What else can I do?",
                answer: (
                    <p>
                        Of course! Hackathons epitomize learning and trying new
                        things, and we are dedicated to fostering a safe
                        learning community. We will be offering as much support
                        as possible through workshops, mentors, and more.
                    </p>
                )
            }
            // More questions for page 4
        ],
        imgSrc: "/home/faq/faq-svgs-spellbook/bef_p2.svg"
    },
    page5: {
        questions: [
            {
                question:
                    "Are there specific APIs, datasets, or tools that we must use?",
                answer: (
                    <p>
                        Nope! The world is your oyster - use whatever you like!
                    </p>
                )
            },
            {
                question:
                    "What are the criteria for judging and how will projects be evaluated?",
                answer: (
                    <p>
                        Projects will be judged based on creativity, technical
                        difficulty, and impact. More details will be released
                        soon!
                    </p>
                )
            },
            {
                question:
                    "What should we prioritize: the technical details, user experience, business model, or the impact of our solution?",
                answer: (
                    <p>Check our attendee guide (coming soon) for more info!</p>
                )
            },
            {
                question:
                    "Is there a schedule for relaxation or fun activities, like games or entertainment segments?",
                answer: (
                    <p>
                        Other than working on your project, we provide fun
                        themed activities throughout the 36 hours (i.e. gaming
                        tournaments, crafting breaks, coding challenges, snack
                        time, etc.). This schedule will be released soon.
                    </p>
                )
            },
            {
                question:
                    "Are there any networking opportunities with sponsors or industry professionals?",
                answer: (
                    <p>
                        Yes! We will have a company expo, project showcases, as
                        well as socials for you to meet and discuss with
                        sponsors.
                    </p>
                )
            }
            // More questions for page 5
        ],
        imgSrc: "/home/faq/blank.svg"
    },
    page6: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for page 6
        ],
        imgSrc: "/home/faq/faq-svgs-spellbook/during_p2.svg"
    },
    page7: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for mobile page 1
        ],
        imgSrc: "/home/faq/faq-svgs-scroll/general_scroll.svg"
    },
    page8: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for hidden page 1
        ],
        imgSrc: "/home/faq/blank.svg"
    },
    page9: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for mobile page 2
        ],
        imgSrc: "/home/faq/blank.svg"
    },
    page10: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for hidden page 2
        ],
        imgSrc: "/home/faq/blank.svg"
    },
    page11: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for mobile page 3
        ],
        imgSrc: "/home/faq/faq-svgs-scroll/during_scroll.svg"
    },
    page12: {
        questions: [
            { question: "", answer: <p></p> }
            // More questions for hidden page 3
        ],
        imgSrc: "/home/faq/blank.svg"
    }
    // Add more pages as needed
};

const FAQ = () => {
    const [pageNum, setPageNum] = useState(1);
    const isMobile = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 900;
        }
    };
    const [isVisible, setIsVisible] = useState(true);
    const [mobile, setMobile] = useState(isMobile());
    const [lottie, setLottie] = useState("");

    const handleResize = () => {
        const newMobile = isMobile();

        const newUsebd = newMobile ? BefDur2 : BefDur;
        const newUsebg = newMobile ? BefGen2 : BefGen;
        const newUsedg = newMobile ? DurGen2 : DurGen;
        const newUsedb = newMobile ? DurBef2 : DurBef;
        const newUsegb = newMobile ? GenBef2 : GenBef;
        const newUsegd = newMobile ? GenDur2 : GenDur;

        setMobile(newMobile);
        setUsebd(newUsebd);
        setUsebg(newUsebg);
        setUsedg(newUsedg);
        setUsedb(newUsedb);
        setUsegb(newUsegb);
        setUsegd(newUsegd);

        if (display === usegb) {
            console.log("before");
            changeDisplay(newUsegb);
        } else if (display === usegd) {
            console.log("during");
            changeDisplay(newUsegd);
        } else if (display === usebd) {
            console.log("during");
            changeDisplay(newUsebd);
        } else if (display === usebg) {
            changeDisplay(newUsebg);
        } else if (display === usedg) {
            changeDisplay(newUsedg);
        } else if (display === usedb) {
            console.log("before");
            changeDisplay(newUsedb);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
        }, 850);
    };

    const [usebd, setUsebd] = useState(mobile ? BefDur2 : BefDur);
    const [usebg, setUsebg] = useState(mobile ? BefGen2 : BefGen);
    const [usedg, setUsedg] = useState(mobile ? DurGen2 : DurGen);
    const [usedb, setUsedb] = useState(mobile ? DurBef2 : DurBef);
    const [usegb, setUsegb] = useState(mobile ? GenBef2 : GenBef);
    const [usegd, setUsegd] = useState(mobile ? GenDur2 : GenDur);

    const [display, setDisplay] = useState(usedg);

    const handleClick = (id: number) => {
        setPageNum(id + 1);
        if (display == usegb) {
            if (id == 2) {
                changeDisplay(usebd);
            } else if (id == 0) {
                changeDisplay(usebg);
            }
        } else if (display == usegd) {
            if (id == 1) {
                changeDisplay(usedb);
            } else if (id == 0) {
                changeDisplay(usedg);
            }
        } else if (display == usebd) {
            if (id == 0) {
                changeDisplay(usedg);
            } else if (id == 1) {
                changeDisplay(usedb);
            }
        } else if (display == usebg) {
            if (id == 1) {
                changeDisplay(usegb);
            } else if (id == 2) {
                changeDisplay(usegd);
            }
        } else if (display == usedg) {
            if (id == 1) {
                changeDisplay(usegb);
            } else if (id == 2) {
                changeDisplay(usegd);
            }
        } else if (display == usedb) {
            if (id == 0) {
                changeDisplay(usebg);
            } else if (id == 2) {
                changeDisplay(usebd);
            }
        }
    };

    const changeDisplay = (disp: any) => {
        setDisplay(display === disp ? display : disp);
        if (display != disp) toggleVisibility();
    };

    useEffect(() => {
        setLottie(mobile ? styles.faqScroll : styles.faqSpellbook);
        const general = document.getElementById("general");
        const before = document.getElementById("before");
        const during = document.getElementById("during");

        const genheading = document.querySelectorAll('[aria-label="GENERAL"]');
        const beforeheading = document.querySelectorAll(
            '[aria-label="BEFORE"]'
        );
        const duringheading = document.querySelectorAll(
            '[aria-label="DURING"]'
        );

        const handleGeneralClick = () => handleClick(0);
        const handleBeforeClick = () => handleClick(1);
        const handleDuringClick = () => handleClick(2);

        genheading.forEach(heading => {
            heading.addEventListener("click", handleGeneralClick);
        });
        beforeheading.forEach(heading => {
            heading.addEventListener("click", handleBeforeClick);
        });
        duringheading.forEach(heading => {
            heading.addEventListener("click", handleDuringClick);
        });

        general?.addEventListener("click", handleGeneralClick);
        before?.addEventListener("click", handleBeforeClick);
        during?.addEventListener("click", handleDuringClick);

        window.addEventListener("resize", handleResize);

        return () => {
            general?.removeEventListener("click", handleGeneralClick);
            before?.removeEventListener("click", handleBeforeClick);
            during?.removeEventListener("click", handleDuringClick);
            genheading.forEach(heading => {
                heading.removeEventListener("click", handleGeneralClick);
            });
            beforeheading.forEach(heading => {
                heading.removeEventListener("click", handleBeforeClick);
            });
            duringheading.forEach(heading => {
                heading.removeEventListener("click", handleDuringClick);
            });

            window.removeEventListener("resize", handleResize);
        };
    }, [display, mobile]);

    faqPages.page7 = {
        questions: [...faqPages.page1.questions, ...faqPages.page2.questions],
        imgSrc: "/home/faq/faq-svgs-scroll/general_scroll.svg"
    };

    faqPages.page9 = {
        questions: [...faqPages.page3.questions, ...faqPages.page4.questions],
        imgSrc: "/home/faq/blank.svg"
    };

    faqPages.page11 = {
        questions: [...faqPages.page5.questions],
        imgSrc: "/home/faq/faq-svgs-scroll/during_scroll.svg"
    };

    return (
        <section className={styles.faq}>
            <div className={styles.faqContainer}>
                <div className={styles.faqItemContainer1}>
                    <Image
                        src={FAQHeader}
                        alt="FAQ Header"
                        className={styles.faqHeader}
                    />
                </div>

                <div className={styles.faqLotties}>
                    <div className={lottie}>
                        {
                            <Lottie
                                className={styles.lottieSize}
                                animationData={display}
                                loop={false}
                                autoplay={true}
                            />
                        }
                        <div
                            className={
                                isVisible
                                    ? styles.faqLottieText
                                    : styles.hideText
                            }
                        >
                            {faqPages[
                                `page${
                                    isMobile()
                                        ? 2 * (pageNum + 3) - 1
                                        : 2 * pageNum - 1
                                }` as keyof typeof faqPages
                            ].questions.map((faq, index) => (
                                <div key={index}>
                                    <h2>{faq.question}</h2>
                                    {faq.answer}
                                </div>
                            ))}
                            <img
                                src={
                                    faqPages[
                                        `page${
                                            isMobile()
                                                ? 2 * (pageNum + 3) - 1
                                                : 2 * pageNum - 1
                                        }` as keyof typeof faqPages
                                    ].imgSrc
                                }
                                className={styles.image}
                            />
                        </div>
                        <div
                            className={
                                isVisible
                                    ? styles.faqLottieText2
                                    : styles.hideText2
                            }
                        >
                            {faqPages[
                                `page${
                                    isMobile() ? 2 * (pageNum + 3) : 2 * pageNum
                                }` as keyof typeof faqPages
                            ].questions.map((faq, index) => (
                                <div key={index}>
                                    <h2>{faq.question}</h2>
                                    {faq.answer}
                                </div>
                            ))}
                            <img
                                src={
                                    faqPages[
                                        `page${
                                            isMobile()
                                                ? 2 * (pageNum + 3)
                                                : 2 * pageNum
                                        }` as keyof typeof faqPages
                                    ].imgSrc
                                }
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
