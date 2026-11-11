"use client";

import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./components/Entrance.module.scss";
import PlayingCard, { CardSpec } from "./components/PlayingCard";
import saloon from "./components/Saloon.module.scss";
import SaloonDoor from "./components/SaloonDoor";
import { DEFAULT_PASS_RATIO } from "./constants";

const DOOR_SWING_MS = 950;
const SCROLL_TO_DOORS_MS = 500;

const CARDS: CardSpec[] = [
    {
        rank: "A",
        suit: "♠",
        icon: <StarBorderIcon fontSize="inherit" />,
        title: "What is HackOutlaws?",
        body: "The Pro Track: an exclusive path for hackers who have mastered the fundamentals and want a tougher table to play at."
    },
    {
        rank: "K",
        suit: "♥",
        icon: <EmojiEventsOutlinedIcon fontSize="inherit" />,
        title: "The reward",
        body: "Outlaws compete for the grand HackOutlaws prize ($5000) and present their project in a Shark Tank style showcase, among other perks."
    },
    {
        rank: "Q",
        suit: "♣",
        icon: <HowToRegOutlinedIcon fontSize="inherit" />,
        title: "How to join",
        body: "Tick the Pro Track box on your application, then beat Saloon Rush, a coding challenge you can take any time before registration closes."
    },
    {
        rank: "J",
        suit: "♦",
        icon: <BoltIcon fontSize="inherit" />,
        title: "Why it’s different",
        body: "A competitive room with a bigger prize pool. General attendees compete in a space built for learning at every level."
    }
];

function Horseshoe({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
            <path
                d="M8 6 C 2 16, 4 32, 20 34 C 36 32, 38 16, 32 6"
                fill="none"
                stroke="#c7c2b8"
                strokeWidth="6"
                strokeLinecap="round"
            />
            <g fill="#4a3a2c">
                <circle cx="7" cy="16" r="1.3" />
                <circle cx="10" cy="26" r="1.3" />
                <circle cx="33" cy="16" r="1.3" />
                <circle cx="30" cy="26" r="1.3" />
            </g>
        </svg>
    );
}

/**
 * The Pro Track landing page: the saloon front up top (push through the doors to start
 * Saloon Rush), and what HackOutlaws is and how to join below.
 */
export default function ProTrackLanding() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        router.prefetch("/challenge/description");
        const pending = timers.current;
        return () => pending.forEach(clearTimeout);
    }, [router]);

    const enter = () => {
        if (open) return;
        setOpen(true);
        timers.current.push(
            setTimeout(
                () => router.push("/challenge/description"),
                DOOR_SWING_MS
            )
        );
    };

    // From further down the page: scroll back to the doors so the swing is seen, then open them
    const enterFromBelow = () => {
        if (open) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        timers.current.push(setTimeout(enter, SCROLL_TO_DOORS_MS));
    };

    return (
        <>
            <main className={styles.entrance}>
                <p className={styles.kicker}>
                    HackOutlaws · Pro Track Challenge
                </p>

                <div className={clsx(styles.facade, open && styles.open)}>
                    <h1 className={styles.sign}>Saloon Rush</h1>
                    <div className={styles.lintel}>
                        <Horseshoe className={styles.horseshoe} />
                        <Horseshoe className={styles.horseshoe} />
                    </div>
                    <div className={styles.frame}>
                        <div className={styles.post} />
                        <div className={styles.doorway}>
                            <button
                                type="button"
                                className={styles.doors}
                                onClick={enter}
                                aria-label="Push through the doors to start Saloon Rush"
                            >
                                <span className={styles.doorLeft}>
                                    <SaloonDoor />
                                </span>
                                <span className={styles.doorRight}>
                                    <SaloonDoor />
                                </span>
                            </button>
                        </div>
                        <div className={styles.post} />
                    </div>

                    <div className={styles.poster} aria-hidden="true">
                        <strong>WANTED</strong>
                        <span>Pro hackers who can beat the house</span>
                        <em>Pro Track</em>
                    </div>
                </div>

                <p className={styles.tagline}>
                    One night, one pickpocket, a saloon full of contracts. Write
                    a program that plans the perfect run, beat the house’s
                    score, and earn your seat at the Pro table.
                </p>

                <nav className={styles.signpost} aria-label="Saloon Rush">
                    <button
                        type="button"
                        className={styles.boardRight}
                        onClick={enter}
                        disabled={open}
                    >
                        Step inside
                    </button>
                    <a href="#hackoutlaws" className={styles.boardLeft}>
                        What’s HackOutlaws?
                    </a>
                </nav>
            </main>

            <div className={clsx(saloon.page, saloon.pageFlush)}>
                <div className={saloon.container}>
                    <section
                        id="hackoutlaws"
                        aria-labelledby="hackoutlaws-title"
                    >
                        <h2
                            id="hackoutlaws-title"
                            className={saloon.sectionTitle}
                        >
                            Wanted: HackOutlaws
                        </h2>
                        <p className={saloon.sectionSub}>
                            The Pro Track at HackIllinois. Four cards tell you
                            everything.
                        </p>
                        <ul className={saloon.cards}>
                            {CARDS.map(card => (
                                <PlayingCard key={card.rank} {...card} />
                            ))}
                        </ul>
                    </section>

                    <section
                        className={saloon.section}
                        aria-labelledby="ride-title"
                    >
                        <h2 id="ride-title" className={saloon.sectionTitle}>
                            Ride with the gang
                        </h2>
                        <p className={saloon.sectionSub}>
                            Three steps from stranger to outlaw.
                        </p>
                        <div className={saloon.ledger}>
                            <ol className={saloon.steps}>
                                <li className={saloon.step}>
                                    <span className={saloon.chipRed}>
                                        <span>1</span>
                                    </span>
                                    <h3 className={saloon.ruleHeading}>
                                        Apply
                                    </h3>
                                    <p className={saloon.ruleText}>
                                        Submit the{" "}
                                        <Link href="/register/general">
                                            HackIllinois application
                                        </Link>{" "}
                                        and tick the Pro Track box.
                                    </p>
                                </li>
                                <li className={saloon.step}>
                                    <span className={saloon.chipBlack}>
                                        <span>2</span>
                                    </span>
                                    <h3 className={saloon.ruleHeading}>
                                        Push through the doors
                                    </h3>
                                    <p className={saloon.ruleText}>
                                        Download your floor plan, write a
                                        program that plans the night, and upload
                                        the plan it makes. Every upload is
                                        scored on the spot.
                                    </p>
                                </li>
                                <li className={saloon.step}>
                                    <span className={saloon.chipBrass}>
                                        <span>3</span>
                                    </span>
                                    <h3 className={saloon.ruleHeading}>
                                        Beat the house
                                    </h3>
                                    <p className={saloon.ruleText}>
                                        Reach{" "}
                                        {Math.round(DEFAULT_PASS_RATIO * 100)}%
                                        of the house’s score to pass. Upload as
                                        often as you like; reviewers see your
                                        best.
                                    </p>
                                </li>
                            </ol>
                            <p className={saloon.stepNote}>
                                If you don’t pass the challenge, you’re still
                                considered for general admission.
                            </p>
                        </div>
                    </section>

                    <section
                        className={clsx(saloon.section, saloon.finale)}
                        aria-labelledby="finale-title"
                    >
                        <h2 id="finale-title" className={saloon.sectionTitle}>
                            Ready to draw?
                        </h2>
                        <p className={saloon.sectionSub}>
                            The doors are open until registration closes.
                        </p>
                        <div className={saloon.btnRow}>
                            <button
                                type="button"
                                className={saloon.btnBrass}
                                onClick={enterFromBelow}
                                disabled={open}
                            >
                                Step inside the saloon
                            </button>
                            <Link
                                href="/register/general"
                                className={saloon.btnGhost}
                            >
                                Apply to HackIllinois
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
