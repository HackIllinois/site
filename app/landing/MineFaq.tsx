"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../page.module.scss";

const questions = [
    [
        "Who is eligible to attend?",
        "College students and recent graduates of all experience levels can apply. You must be at least 18 by February 26, 2027."
    ],
    [
        "Will overnight hacking space be provided?",
        "Yes. Attendees can stay and work on their projects in the overnight hacking space."
    ],
    [
        "Will there be reimbursement?",
        <>
            See the <Link href="/travel">travel reimbursement page</Link> for
            eligibility, amounts and instructions.
        </>
    ],
    [
        "How can I help during the event?",
        <>
            Find out how to join the event as a{" "}
            <Link href="/mentors">mentor</Link> or{" "}
            <Link href="/judges">judge</Link>.
        </>
    ],
    [
        "Where is HackIllinois located?",
        "HackIllinois 2027 will be held at the University of Illinois Urbana-Champaign. We’ll share more detailed location and parking information closer to the event."
    ],
    [
        "How do I register?",
        <>
            Head to <Link href="/register/general">registration</Link> to start
            your application. You can choose the Pro Track if you’d like to take
            the coding challenge.
        </>
    ],
    [
        "What prizes will be offered this year?",
        <>
            Explore the <Link href="/prizes">prizes page</Link> for the event’s
            awards and tracks.
        </>
    ]
] as const;

export default function MineFaq() {
    const [active, setActive] = useState<number | null>(4);
    function item(index: number) {
        const [question, answer] = questions[index];
        return (
            <div key={question}>
                <h3>
                    <button
                        type="button"
                        aria-expanded={active === index}
                        aria-controls={`answer-${index}`}
                        onClick={() =>
                            setActive(active === index ? null : index)
                        }
                    >
                        {question}
                    </button>
                </h3>
                <div
                    hidden={active !== index}
                    id={`answer-${index}`}
                    className={styles.answer}
                >
                    {answer}
                </div>
            </div>
        );
    }
    return (
        <div className={styles.questions}>
            <h2>FAQ</h2>
            <div className={styles.columns}>
                <div>{[0, 1, 2, 3].map(item)}</div>
                <div>{[4, 5, 6].map(item)}</div>
            </div>
        </div>
    );
}
