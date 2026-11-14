"use client";

import useWindowSize from "@/hooks/use-window-size";
import { loadChallengeStatus } from "@/util/api";
import { ChallengeStatus } from "@/util/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ChallengeGate, {
    SaloonLoading,
    SaloonNotice
} from "../../components/ChallengeGate";
import styles from "../../components/Saloon.module.scss";

function Passed() {
    const { width, height } = useWindowSize();
    const [status, setStatus] = useState<ChallengeStatus | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        loadChallengeStatus()
            .then(setStatus)
            .catch(() => setFailed(true));
    }, []);

    if (failed) {
        return (
            <SaloonNotice
                sub="Trouble at the bar"
                heading="Doors jammed"
                actionHref="/challenge/description"
                actionText="Back to the saloon"
            >
                We couldn’t load your challenge. Please try again.
            </SaloonNotice>
        );
    }

    if (!status) {
        return <SaloonLoading text="Counting the winnings…" />;
    }

    if (!status.complete) {
        return (
            <SaloonNotice
                sub="Not yet, partner"
                heading="Still at large"
                actionHref="/challenge/description"
                actionText="Back to the saloon"
            >
                You haven’t passed Saloon Rush yet. Your best haul so far is{" "}
                {status.bestScore}.
            </SaloonNotice>
        );
    }

    return (
        <main className={styles.page}>
            {width && height && (
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
                />
            )}
            <div className={styles.center}>
                <div className={styles.gateCard}>
                    <p className={styles.posterSub}>HackOutlaws Pro Track</p>
                    <h1 className={styles.posterHeading}>You beat the house</h1>
                    <hr className={styles.posterRule} />
                    <dl className={styles.posterStats}>
                        <div className={styles.posterStat}>
                            <dt>Floor plan</dt>
                            <dd>{status.instanceId}</dd>
                        </div>
                        <div className={styles.posterStat}>
                            <dt>Best haul</dt>
                            <dd>{status.bestScore}</dd>
                        </div>
                        <div className={styles.posterStat}>
                            <dt>Attempts</dt>
                            <dd>{status.attempts}</dd>
                        </div>
                    </dl>
                    <p className={styles.posterNote}>
                        You passed Saloon Rush. Reviewers see your best score,
                        so you can keep tuning your plan until registration
                        closes.
                    </p>
                    <span className={styles.stampPassed}>PASSED</span>
                    <div
                        className={styles.btnRow}
                        style={{ justifyContent: "center" }}
                    >
                        <Link
                            href="/challenge/description"
                            className={styles.btnBrass}
                        >
                            Back to the saloon
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ChallengeSuccess() {
    return (
        <ChallengeGate>
            <Passed />
        </ChallengeGate>
    );
}
