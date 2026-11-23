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
            body: "Download world.json. It contains the map, orders, deadlines and available Hack-Outlaws."
        },
        {
            rank: "K",
            suit: "♥",
            icon: <CodeIcon />,
            title: "Plan the night",
            body: "Write a program that assigns orders to Hack-Outlaws and creates a route for each one."
        },
        {
            rank: "Q",
            suit: "♣",
            icon: <UploadFileOutlinedIcon />,
            title: "Submit your plan",
            body: "Upload plan.json below. The grader validates it and returns a score."
        },
        {
            rank: "J",
            suit: "♦",
            icon: <AutoGraphIcon />,
            title: "Improve your score",
            body: `Reach ${passPercent}% of the reference score to pass. You can submit again at any time.`
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
                        <h1 className={styles.title}>
                            Saloon
                            <br />
                            Rush
                        </h1>
                        <p className={styles.lede}>
                            Plan a route for your Hack-Outlaw gang, deliver
                            jewelry by the deadlines, and earn as many points as
                            possible.
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
                        Challenge rules
                    </h2>

                    <div className={styles.ledger}>
                        <div className={styles.ledgerGrid}>
                            <div>
                                <h3 className={styles.ruleHeading}>
                                    <span>♠</span> The goal
                                </h3>
                                <p className={styles.ruleText}>
                                    Read <code>world.json</code>, assign
                                    contracts to Hack-Outlaws, choose routes and
                                    write
                                    <code>plan.json</code>. Complete as many
                                    contracts as possible and deliver them as
                                    close to their deadlines as possible.
                                </p>
                                <h3
                                    className={styles.ruleHeading}
                                    style={{ marginTop: 28 }}
                                >
                                    <span>♥</span> World model
                                </h3>
                                <p className={styles.ruleText}>
                                    Time is in whole minutes from <code>0</code>
                                    through <code>shift_end</code>. The map is
                                    an undirected graph of hideouts, game
                                    tables, back rooms, fences and
                                    intersections.
                                </p>
                                <p className={styles.ruleText}>
                                    Every node, connection, contract and
                                    Hack-Outlaw is known up front. Nothing is
                                    random: the same plan and instance always
                                    produce the same score.
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
                                    <code>deadline</code>. The Hack-Outlaw must
                                    visit the table after <code>ready_at</code>,
                                    pick up the bag and carry it to the back
                                    room.
                                </p>
                                <ul className={styles.ruleList}>
                                    <li>Each bag uses one cargo slot.</li>
                                    <li>Pickup and dropoff take no minutes.</li>
                                    <li>
                                        A bag cannot be picked up twice or
                                        delivered after it is already complete.
                                    </li>
                                    <li>
                                        Incomplete or undropped contracts score
                                        zero.
                                    </li>
                                </ul>
                                <p className={styles.ruleText}>
                                    You do not have to take every contract.
                                    Choosing which contracts are worth the
                                    travel is part of the challenge.
                                </p>
                                <h3
                                    className={styles.ruleHeading}
                                    style={{ marginTop: 28 }}
                                >
                                    <span>♦</span> Walking
                                </h3>
                                <p className={styles.ruleText}>
                                    Each connection has a <code>length</code>, a
                                    <code> crowd</code> or{" "}
                                    <code>congestion</code> multiplier, and
                                    optional tags such as <code>narrow</code> or{" "}
                                    <code>exposed</code>.
                                </p>
                                <code className={styles.formula}>
                                    ceil(length ÷ speed × congestion) minutes
                                </code>
                                <p className={styles.ruleText}>
                                    Travel between two spots uses the shortest
                                    valid path for that Hack-Outlaw&apos;s
                                    class. Every Hack-Outlaw starts at its
                                    hideout at minute <code>0</code>. Waiting is
                                    implicit: a later <code>t</code> means it
                                    waits at its current node.
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
                                            <dd>Slows them down</dd>
                                        </dl>
                                    </div>
                                    <div className={styles.crewCard}>
                                        <h4 style={{ marginTop: 8 }}>
                                            Disguiser
                                        </h4>
                                        <dl>
                                            <dt>Speed</dt>
                                            <dd>1 pace / min</dd>
                                            <dt>Capacity</dt>
                                            <dd>2 orders</dd>
                                            <dt>Crowds</dt>
                                            <dd>Ignore congestion</dd>
                                            <dt>Edges</dt>
                                            <dd>No exposed edges</dd>
                                        </dl>
                                    </div>
                                    <div className={styles.crewCard}>
                                        <h4 style={{ marginTop: 8 }}>
                                            Heavy Lifter
                                        </h4>
                                        <dl>
                                            <dt>Speed</dt>
                                            <dd>1.5 paces / min</dd>
                                            <dt>Capacity</dt>
                                            <dd>8 orders</dd>
                                            <dt>Crowds</dt>
                                            <dd>Affected</dd>
                                            <dt>Edges</dt>
                                            <dd>No narrow edges</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.ledgerWide}>
                                <h3 className={styles.ruleHeading}>
                                    <span>♥</span> Commands
                                </h3>
                                <p className={styles.ruleText}>
                                    Your plan lists timestamped commands for
                                    each Hack-Outlaw. Every command needs a
                                    whole minute <code>t</code> that is no
                                    earlier than that Hack-Outlaw’s previous
                                    command and no later than{" "}
                                    <code>shift_end</code>.
                                </p>
                                <div className={styles.tableWrap}>
                                    <table
                                        className={`${styles.cmdTable} ${styles.ledgerTable}`}
                                    >
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
                                                    later is fine; the
                                                    Hack-Outlaw just waits.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <code>pickup</code> +{" "}
                                                    <code>contract</code>
                                                </td>
                                                <td>
                                                    The Hack-Outlaw is at the
                                                    contract’s game table,{" "}
                                                    <code>t ≥ ready_at</code>,
                                                    nobody lifted the bag yet,
                                                    and the satchel has room.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <code>dropoff</code> +{" "}
                                                    <code>contract</code>
                                                </td>
                                                <td>
                                                    The Hack-Outlaw is at the
                                                    contract’s back room,
                                                    carrying that bag. That
                                                    completes the contract.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p
                                    className={styles.ruleText}
                                    style={{ marginTop: 14 }}
                                >
                                    You do not need to list every intermediate
                                    intersection. A <code>go</code> command
                                    moves along the shortest valid path.
                                </p>
                            </div>

                            <div className={styles.ledgerWide}>
                                <h3 className={styles.ruleHeading}>
                                    <span>♦</span> Validation
                                </h3>
                                <p className={styles.ruleText}>
                                    Broken files are rejected without a score:
                                    invalid JSON, an instance that does not
                                    match
                                    <code>world.json</code>, unknown
                                    Hack-Outlaws or nodes, and unknown
                                    contracts.
                                </p>
                                <p className={styles.ruleText}>
                                    An invalid command stops only that
                                    Hack-Outlaw&apos;s route. Contracts
                                    delivered before the invalid command still
                                    count. The report identifies the route,
                                    command index and why the command failed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Submission and grading ---------- */}
                <section
                    id="submission"
                    className={styles.section}
                    aria-labelledby="submission-title"
                >
                    <h2 id="submission-title" className={styles.sectionTitle}>
                        Submission and grading
                    </h2>
                    <div className={styles.felt}>
                        <h3 className={styles.ruleHeading}>
                            Create your submission
                        </h3>
                        <p className={styles.ruleText}>
                            Use any language or approach. The program you submit
                            is not graded directly; it only needs to produce a
                            <code>plan.json</code>. Download{" "}
                            <code>world.json</code>, read the instance data, and
                            write a route for each Hack-Outlaw you use.
                        </p>
                        <p className={styles.ruleText}>
                            <code>world.json</code> contains{" "}
                            <code>instance</code>,<code>shift_end</code>,{" "}
                            <code>nodes</code>,<code>connections</code>,{" "}
                            <code>mercenaries</code>
                            and <code>contracts</code>. Each node has an{" "}
                            <code>id</code> and type. Each connection has{" "}
                            <code>a</code>, <code>b</code>, <code>length</code>,
                            <code>crowd</code> and optional <code>tags</code>.
                            Each contract has <code>id</code>,{" "}
                            <code>table</code>, <code>back_room</code>,{" "}
                            <code>ready_at</code> and <code>deadline</code>.
                        </p>
                        <div className={styles.paperwork}>
                            <CodeBlock
                                filename="world.json (trimmed)"
                                code={EXAMPLE_WORLD}
                                caption="The map and contracts available to your program."
                            />
                            <CodeBlock
                                filename="plan.json"
                                code={EXAMPLE_PLAN}
                                copyable
                                caption="Use the exact instance name and exact mercenary IDs from world.json."
                            />
                        </div>
                        <p className={styles.ruleText}>
                            In <code>plan.json</code>, <code>instance</code>{" "}
                            must match <code>world.json</code>. The{" "}
                            <code>routes</code>
                            object uses one mercenary ID as each key. Each route
                            is an array of timestamped commands. Routes may be
                            empty. Commands are in chronological order:
                        </p>
                        <ul className={styles.ruleList}>
                            <li>
                                <code>{`{"t": 12, "cmd": "go", "to": "T3"}`}</code>{" "}
                                arrives at node <code>T3</code> at minute 12.
                            </li>
                            <li>
                                <code>{`{"t": 24, "cmd": "pickup", "contract": "C-01"}`}</code>{" "}
                                picks up contract <code>C-01</code> at its
                                table.
                            </li>
                            <li>
                                <code>{`{"t": 32, "cmd": "dropoff", "contract": "C-01"}`}</code>{" "}
                                delivers <code>C-01</code> to its back room.
                            </li>
                        </ul>
                        <p className={styles.ruleText}>
                            <code>t</code> must be a whole minute greater than
                            or equal to the previous command and no greater than{" "}
                            <code>shift_end</code>. Do not include every hallway
                            in the route; use <code>go</code> to travel between
                            named nodes. The shortest path is calculated by the
                            grader.
                        </p>

                        <h3
                            className={styles.ruleHeading}
                            style={{ marginTop: 32 }}
                        >
                            Submit your plan
                        </h3>
                        <p className={styles.ruleText}>
                            Upload <code>plan.json</code> using the upload box
                            below. It must be a JSON file no larger than 1 MB.
                            Submission deadline: <strong>TBD</strong>.
                        </p>
                        <p className={styles.ruleText}>
                            Submissions are unlimited and do not affect your
                            score. The grader returns a report immediately, and
                            only your highest valid score is kept.
                        </p>
                        <p className={styles.ruleText}>
                            To be accepted into the Pro Challenge, your best
                            score must reach <strong>{passPercent}%</strong> of
                            the reference solver&apos;s score. No other score or
                            application cutoff is required by the challenge
                            grading page.
                        </p>

                        <h3
                            className={styles.ruleHeading}
                            style={{ marginTop: 32 }}
                        >
                            How grading works
                        </h3>
                        <p className={styles.ruleText}>
                            The grader replay begins with each Hack-Outlaw at
                            its starting hideout at minute 0. It replays routes
                            in time order, checks whether <code>go</code>,
                            <code>pickup</code> and <code>dropoff</code>{" "}
                            commands are valid, and counts a contract only after
                            a valid dropoff.
                        </p>
                        <div className={styles.chips}>
                            <div className={styles.chipItem}>
                                <div className={styles.chip}>
                                    <span>{SCORING.pointsPerContract}</span>
                                </div>
                                <p>points for a completed delivery</p>
                            </div>
                            <div className={styles.chipItem}>
                                <div className={styles.chipRed}>
                                    <span>−{SCORING.penaltyPerLateMinute}</span>
                                </div>
                                <p>points per minute late</p>
                            </div>
                            <div className={styles.chipItem}>
                                <div className={styles.chipBlack}>
                                    <span>{SCORING.minPointsPerContract}</span>
                                </div>
                                <p>minimum points per delivery</p>
                            </div>
                        </div>
                        <p className={styles.ruleText}>
                            A delivered contract earns 100 points minus 5 points
                            for each minute it arrives after its deadline. The
                            score for one contract is never lower than 20
                            points:
                            <code className={styles.formula}>
                                max(20, 100 - 5 × max(0, dropoff time -
                                deadline))
                            </code>
                        </p>
                        <p className={styles.ruleText}>
                            Undelivered contracts score 0, even if they were
                            picked up. Tie-breaking is the total Hack-Outlaw
                            travel minutes, with fewer travel minutes first,
                            followed by earlier submission time.
                        </p>

                        <h3
                            className={styles.ruleHeading}
                            style={{ marginTop: 32 }}
                        >
                            Tiers
                        </h3>
                        <div className={styles.crew}>
                            <div className={styles.crewCard}>
                                <h4>Tier 1: Solo Mission</h4>
                                <p className={styles.ruleText}>
                                    One Hack-Outlaw, about 15 contracts and no
                                    route restrictions beyond its class. This
                                    tier tests shortest paths and the sequencing
                                    of pickups and dropoffs.
                                </p>
                            </div>
                            <div className={styles.crewCard}>
                                <h4>Tier 2: Full Crew</h4>
                                <p className={styles.ruleText}>
                                    Mixed classes, edge restrictions and more
                                    contracts than the crew can carry. It tests
                                    assignment, route trade-offs and choosing
                                    which contracts to leave behind.
                                </p>
                            </div>
                            <div className={styles.crewCard}>
                                <h4>Tier 3: Saloon Heist</h4>
                                <p className={styles.ruleText}>
                                    Adds coins and power-ups to the routing
                                    problem. It tests resource allocation on top
                                    of assignment and sequencing.
                                </p>
                            </div>
                        </div>
                        <p className={styles.ruleText}>
                            Each tier is scored separately. The final score is
                            the sum of each tier’s score divided by the
                            reference solver’s score for that tier, multiplied
                            by 100.
                        </p>
                        <p className={styles.ruleText}>
                            Tier 3 starts with 0 coins. Deliveries on or before
                            their deadline earn 50 coins; deliveries at least 10
                            minutes early earn 100. Coins may be spent
                            immediately on one of these power-ups:
                        </p>
                        <div className={styles.tableWrap}>
                            <table className={styles.cmdTable}>
                                <thead>
                                    <tr>
                                        <th>Power-up</th>
                                        <th>Cost</th>
                                        <th>Effect</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Big Belly Burger</td>
                                        <td>300 coins</td>
                                        <td>
                                            One Hack-Outlaw moves 1.5× faster
                                            for 30 minutes after activation.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Refreshing Cactus Cocktail</td>
                                        <td>150 coins</td>
                                        <td>
                                            Adds 15 minutes to one
                                            contract&apos;s deadline.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Extra Satchel</td>
                                        <td>400 coins</td>
                                        <td>
                                            Adds 2 cargo slots to one
                                            Hack-Outlaw for the rest of the
                                            shift.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={styles.ruleText}>
                            Tier 3 plans can include a <code>powerups</code>
                            array. Each entry identifies an activation time{" "}
                            <code>t</code>, a power-up name, and the affected
                            Hack-Outlaw or contract. A power-up is bought and
                            activated in one command. There is no inventory: the
                            effect begins immediately. The grader verifies that
                            coins earned by all earlier dropoffs cover the cost
                            and that the referenced Hack-Outlaw or contract
                            exists.
                        </p>
                        <p className={styles.ruleText}>
                            Unaffordable or invalid power-ups are skipped and
                            logged. The rest of the plan continues unless later
                            commands depend on an effect that was skipped.
                        </p>

                        <div id="upload" style={{ marginTop: 32 }}>
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
