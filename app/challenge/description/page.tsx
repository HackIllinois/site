"use client";

import useWindowSize from "@/hooks/use-window-size";
import { downloadChallengeWorld, loadChallengeStatus } from "@/util/api";
import { ChallengeErrorBody, ChallengeStatus } from "@/util/types";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CodeIcon from "@mui/icons-material/Code";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ChallengeGate, {
    SaloonLoading,
    SaloonNotice
} from "../components/ChallengeGate";
import CodeBlock from "../components/CodeBlock";
import PlanUpload from "../components/PlanUpload";
import PlayingCard, { CardSpec } from "../components/PlayingCard";
import styles from "../components/Saloon.module.scss";
import WantedPoster from "../components/WantedPoster";
import {
    DEFAULT_PASS_RATIO,
    EXAMPLE_PLAN,
    EXAMPLE_WORLD,
    SCORING
} from "../constants";

function Saloon() {
    const { width, height } = useWindowSize();
    const [status, setStatus] = useState<ChallengeStatus | null>(null);
    const [loadError, setLoadError] = useState<ChallengeErrorBody | null>(null);
    const [downloading, setDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        loadChallengeStatus()
            .then(setStatus)
            .catch((error: ChallengeErrorBody) =>
                setLoadError(
                    error?.error
                        ? error
                        : {
                              error: "Unknown",
                              message: "Couldn’t load your challenge."
                          }
                )
            );
    }, []);

    const handleDownload = async () => {
        setDownloading(true);
        setDownloadError(null);
        try {
            await downloadChallengeWorld();
        } catch (error) {
            setDownloadError(
                (error as ChallengeErrorBody)?.message ??
                    "Couldn’t download your floor plan. Please try again."
            );
        } finally {
            setDownloading(false);
        }
    };

    if (loadError) {
        if (loadError.error === "MissingPro") {
            return (
                <SaloonNotice
                    sub="Members only"
                    heading="Pro track only"
                    actionHref="/"
                    actionText="Back to town"
                >
                    Saloon Rush is the HackOutlaws Pro track challenge, and your
                    application wasn’t submitted for the Pro track.
                </SaloonNotice>
            );
        }
        if (loadError.error === "NotFound") {
            return (
                <SaloonNotice
                    sub="Hold your horses"
                    heading="Not so fast"
                    actionHref="/register/general"
                    actionText="Finish your application"
                >
                    We couldn’t find a submitted application. Submit yours with
                    the Pro track box ticked, then come back.
                </SaloonNotice>
            );
        }
        return (
            <SaloonNotice
                sub="Trouble at the bar"
                heading="Doors jammed"
                actionHref="/challenge/description"
                actionText="Try again"
            >
                {loadError.message}
            </SaloonNotice>
        );
    }

    if (!status) {
        return <SaloonLoading text="Unrolling your floor plan…" />;
    }

    const passPercent = Math.round(
        (status.passRatio ?? DEFAULT_PASS_RATIO) * 100
    );

    const cards: CardSpec[] = [
        {
            rank: "A",
            suit: "♠",
            icon: <MapOutlinedIcon />,
            title: "Get the floor plan",
            body: "Download world.json: your saloon, every contract and your pickpocket. Each applicant is dealt one of several floor plans."
        },
        {
            rank: "K",
            suit: "♥",
            icon: <CodeIcon />,
            title: "Plan the night",
            body: "Write a program, in any language, that plans your pickpocket’s route: which bags to grab, in what order, and when to drop each one off. Use any approach you like."
        },
        {
            rank: "Q",
            suit: "♣",
            icon: <UploadFileOutlinedIcon />,
            title: "Lay down your plan",
            body: "Upload plan.json. We replay every move in seconds and show exactly where a route went wrong."
        },
        {
            rank: "J",
            suit: "♦",
            icon: <AutoGraphIcon />,
            title: "Beat the house",
            body: `Reach ${passPercent}% of our reference score to pass. Resubmit as often as you like; only your best counts.`
        }
    ];

    return (
        <main className={styles.page}>
            {celebrate && width && height && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    colors={[
                        "#dca543",
                        "#f3cf7d",
                        "#b3262b",
                        "#1e6a4e",
                        "#fbf1dc"
                    ]}
                    style={{ position: "fixed", zIndex: 1000 }}
                    onConfettiComplete={() => setCelebrate(false)}
                />
            )}

            <div className={styles.container}>
                {/* ---------- Hero ---------- */}
                <section className={styles.hero}>
                    <div>
                        <p className={styles.kicker}>
                            HackOutlaws · Pro Track Challenge
                        </p>
                        <h1 className={styles.title}>
                            Saloon
                            <br />
                            Rush
                        </h1>
                        <p className={styles.lede}>
                            You run a HackOutlaw gang for one night in the
                            roughest saloon in the territory. The dealers want
                            cash bags lifted from the game tables and carried to
                            their back rooms, each before its own deadline. Plan
                            the night, upload the plan, and get scored on the
                            spot.
                        </p>
                        <div className={styles.btnRow}>
                            <button
                                type="button"
                                className={styles.btnBrass}
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                <FileDownloadOutlinedIcon aria-hidden="true" />
                                {downloading
                                    ? "Fetching…"
                                    : "Download world.json"}
                            </button>
                            <a href="#upload" className={styles.btnGhost}>
                                Upload a plan
                            </a>
                        </div>
                        {downloadError && (
                            <p className={styles.inlineError} role="alert">
                                {downloadError}
                            </p>
                        )}
                    </div>
                    <WantedPoster status={status} />
                </section>

                {/* ---------- How it works ---------- */}
                <section className={styles.section} aria-labelledby="how">
                    <h2 id="how" className={styles.sectionTitle}>
                        How the night works
                    </h2>
                    <p className={styles.sectionSub}>
                        Higher stakes, bolder builders. Four cards, one winning
                        hand.
                    </p>
                    <ul
                        className={styles.cards}
                        style={{ listStyle: "none", padding: 0, margin: 0 }}
                    >
                        {cards.map(card => (
                            <PlayingCard key={card.rank} {...card} />
                        ))}
                    </ul>
                </section>

                {/* ---------- House rules ---------- */}
                <section className={styles.section} aria-labelledby="rules">
                    <h2 id="rules" className={styles.sectionTitle}>
                        House rules
                    </h2>
                    <p className={styles.sectionSub}>
                        Everything is known up front and nothing is random. The
                        same plan always gets the same score.
                    </p>

                    <div className={styles.ledger}>
                        <div className={styles.ledgerGrid}>
                            <div>
                                <h3 className={styles.ruleHeading}>
                                    <span>♠</span> The night
                                </h3>
                                <p className={styles.ruleText}>
                                    Time is in whole minutes, from{" "}
                                    <code>0</code> when the doors open to{" "}
                                    <code>shift_end</code>, the sheriff’s last
                                    round. No new contracts show up mid-night.
                                </p>
                                <h3
                                    className={styles.ruleHeading}
                                    style={{ marginTop: 28 }}
                                >
                                    <span>♥</span> The floor plan
                                </h3>
                                <p className={styles.ruleText}>
                                    An undirected graph. Spots are the{" "}
                                    <code>hideout</code>, a{" "}
                                    <code>game_table</code> (where bags are
                                    picked up), a <code>back_room</code> (where
                                    they’re dropped off), or a plain{" "}
                                    <code>hallway</code>.
                                </p>
                                <p className={styles.ruleText}>
                                    Each connection has a <code>length</code> in
                                    paces and a <code>crowd</code> from 1.0
                                    (empty walkway) to 2.5 (a crush of
                                    drinkers).
                                </p>
                            </div>

                            <div>
                                <h3 className={styles.ruleHeading}>
                                    <span>♣</span> Contracts
                                </h3>
                                <p className={styles.ruleText}>
                                    Each contract is one cash bag with a{" "}
                                    <code>table</code>, a <code>back_room</code>
                                    , a <code>ready_at</code> minute and a{" "}
                                    <code>deadline</code>. Lift the bag at its
                                    table once it’s ready, then carry it to its
                                    back room.
                                </p>
                                <p className={styles.ruleText}>
                                    You don’t have to take every contract.
                                    Choosing which ones are worth the walk is
                                    part of the game.
                                </p>
                                <h3
                                    className={styles.ruleHeading}
                                    style={{ marginTop: 28 }}
                                >
                                    <span>♦</span> Walking
                                </h3>
                                <p className={styles.ruleText}>
                                    Crossing one connection takes
                                </p>
                                <code className={styles.formula}>
                                    ceil(length ÷ speed × crowd) minutes
                                </code>
                                <p className={styles.ruleText}>
                                    Walking between two spots takes the fastest
                                    path, adding up the connections along the
                                    way. Every mercenary starts at their hideout
                                    at minute 0.
                                </p>
                            </div>

                            <div className={styles.ledgerWide}>
                                <h3 className={styles.ruleHeading}>
                                    <span>♠</span> Your crew
                                </h3>
                                <div className={styles.crew}>
                                    <div className={styles.crewCard}>
                                        <span className={styles.crewTag}>
                                            Tier 1 · your gang
                                        </span>
                                        <h4 style={{ marginTop: 8 }}>
                                            Pickpocket
                                        </h4>
                                        <dl>
                                            <dt>Speed</dt>
                                            <dd>2 paces / min</dd>
                                            <dt>Satchel</dt>
                                            <dd>4 cash bags at once</dd>
                                            <dt>Crowds</dt>
                                            <dd>Slow her down</dd>
                                        </dl>
                                    </div>
                                    <div className={styles.crewCardLocked}>
                                        <span className={styles.crewTag}>
                                            Later tier
                                        </span>
                                        <h4 style={{ marginTop: 8 }}>
                                            Disguiser
                                        </h4>
                                        <p className={styles.ruleText}>
                                            Blends into crowds, but stays off
                                            the main floor.
                                        </p>
                                    </div>
                                    <div className={styles.crewCardLocked}>
                                        <span className={styles.crewTag}>
                                            Later tier
                                        </span>
                                        <h4 style={{ marginTop: 8 }}>
                                            Heavy Lifter
                                        </h4>
                                        <p className={styles.ruleText}>
                                            Carries the most, but can’t fit
                                            through crawlspaces.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.ledgerWide}>
                                <h3 className={styles.ruleHeading}>
                                    <span>♥</span> Commands
                                </h3>
                                <p className={styles.ruleText}>
                                    Your plan lists timestamped commands for
                                    each mercenary. Every command needs a whole
                                    minute <code>t</code> that is no earlier
                                    than that mercenary’s previous command and
                                    no later than <code>shift_end</code>.
                                </p>
                                <div className={styles.tableWrap}>
                                    <table className={styles.cmdTable}>
                                        <thead>
                                            <tr>
                                                <th>Command</th>
                                                <th>Valid when</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <code>go</code> +{" "}
                                                    <code>to</code>
                                                </td>
                                                <td>
                                                    <code>t</code> is at least
                                                    the previous command’s{" "}
                                                    <code>t</code> plus the
                                                    fastest walk to{" "}
                                                    <code>to</code>. Arriving
                                                    later is fine; she just
                                                    waits.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <code>pickup</code> +{" "}
                                                    <code>contract</code>
                                                </td>
                                                <td>
                                                    She’s at the contract’s game
                                                    table,{" "}
                                                    <code>t ≥ ready_at</code>,
                                                    nobody lifted the bag yet,
                                                    and her satchel has room.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <code>dropoff</code> +{" "}
                                                    <code>contract</code>
                                                </td>
                                                <td>
                                                    She’s at the contract’s back
                                                    room, carrying that bag.
                                                    That completes the contract.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p
                                    className={styles.ruleText}
                                    style={{ marginTop: 14 }}
                                >
                                    The first invalid command stops the rest of
                                    that mercenary’s route, but contracts
                                    finished before it still count. A file we
                                    can’t read at all (bad JSON, the wrong floor
                                    plan, an unknown spot or contract) isn’t
                                    graded, and we tell you why.
                                </p>
                            </div>

                            <div className={styles.ledgerWide}>
                                <h3 className={styles.ruleHeading}>
                                    <span>♣</span> Scoring
                                </h3>
                                <div className={styles.chips}>
                                    <div className={styles.chipItem}>
                                        <div className={styles.chip}>
                                            <span>
                                                {SCORING.pointsPerContract}
                                            </span>
                                        </div>
                                        <p>points per completed contract</p>
                                    </div>
                                    <div className={styles.chipItem}>
                                        <div className={styles.chipRed}>
                                            <span>
                                                −{SCORING.penaltyPerLateMinute}
                                            </span>
                                        </div>
                                        <p>per minute past the deadline</p>
                                    </div>
                                    <div className={styles.chipItem}>
                                        <div className={styles.chipBlack}>
                                            <span>
                                                {SCORING.minPointsPerContract}
                                            </span>
                                        </div>
                                        <p>
                                            minimum for a late contract, so it’s
                                            always worth finishing
                                        </p>
                                    </div>
                                    <div className={styles.chipItem}>
                                        <div className={styles.chipBrass}>
                                            <span>{passPercent}%</span>
                                        </div>
                                        <p>
                                            of our reference solver’s score to
                                            pass
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Paperwork ---------- */}
                <section className={styles.section} aria-labelledby="files">
                    <h2 id="files" className={styles.sectionTitle}>
                        The paperwork
                    </h2>
                    <p className={styles.sectionSub}>
                        Your program reads world.json and writes plan.json. A
                        plan only works on the floor plan named in its{" "}
                        <code>instance</code>.
                    </p>
                    <div className={styles.paperwork}>
                        <CodeBlock
                            filename="world.json (trimmed)"
                            code={EXAMPLE_WORLD}
                            caption="What you download. Yours has every spot, connection and contract for your floor plan."
                        />
                        <CodeBlock
                            filename="plan.json"
                            code={EXAMPLE_PLAN}
                            copyable
                            caption="A valid plan that scores 100. The pickpocket reaches table T3 at minute 12 and waits until the bag is ready at 24. She walks 8 minutes to back room B17 and drops it off at 32, before the minute-37 deadline."
                        />
                    </div>
                </section>

                {/* ---------- Upload ---------- */}
                <section
                    id="upload"
                    className={styles.section}
                    aria-labelledby="upload-title"
                >
                    <h2 id="upload-title" className={styles.sectionTitle}>
                        Deal me in
                    </h2>
                    <p className={styles.sectionSub}>
                        Upload your plan.json and the dealer tallies your haul
                        in seconds.
                    </p>
                    <div className={styles.felt}>
                        {status.complete && (
                            <div
                                className={styles.noticeSuccess}
                                style={{ marginBottom: 28 }}
                            >
                                <strong>Welcome to the gang</strong>
                                You passed Saloon Rush with a best haul of{" "}
                                {status.bestScore}. Keep tuning if you like:
                                reviewers see your best score.
                            </div>
                        )}
                        <PlanUpload
                            status={status}
                            onStatusChange={setStatus}
                            onPassed={() => setCelebrate(true)}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default function ChallengeDescription() {
    return (
        <ChallengeGate>
            <Saloon />
        </ChallengeGate>
    );
}
