import { ChallengeStatus } from "@/util/types";
import clsx from "clsx";
import styles from "./Saloon.module.scss";

const percent = (ratio: number) => `${Math.round(ratio * 100)}%`;

/** The applicant's challenge status, styled as a wanted poster. */
export default function WantedPoster({ status }: { status: ChallengeStatus }) {
    const { normalizedScore, passRatio, complete } = status;
    const calibrated = normalizedScore !== null;
    const fill = calibrated ? Math.min(normalizedScore, 1) : 0;

    let note: string;
    if (complete) {
        note = `You beat the house. Reviewers see your best score, so keep improving if you like.`;
    } else if (!calibrated) {
        note =
            "The house score for your floor plan isn’t posted yet. Your scores are saved; once it’s posted, upload again to be checked against the bar.";
    } else if (status.attempts === 0) {
        note = `Reach ${percent(passRatio)} of the house score to pass.`;
    } else {
        note = `You’re at ${percent(normalizedScore)} of the house score. Reach ${percent(passRatio)} to pass.`;
    }

    return (
        <aside className={styles.poster} aria-label="Your challenge status">
            <p className={styles.posterSub}>HackOutlaws Pro Track</p>
            <h2 className={styles.posterHeading}>WANTED</h2>
            <p className={styles.posterSub}>
                A gang boss who can beat the house
            </p>
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

            {calibrated && (
                <div
                    className={styles.meter}
                    role="meter"
                    aria-label="Best score as a share of the house score"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(normalizedScore * 100)}
                >
                    <div
                        className={clsx(
                            styles.meterFill,
                            complete && styles.meterFillPassed
                        )}
                        style={{ width: `${fill * 100}%` }}
                    />
                    <div
                        className={styles.meterMark}
                        style={{ left: `${passRatio * 100}%` }}
                        data-label={`pass ${percent(passRatio)}`}
                    />
                </div>
            )}

            <p className={styles.posterNote}>{note}</p>

            <span
                className={complete ? styles.stampPassed : styles.stampPending}
            >
                {complete ? "PASSED" : "AT LARGE"}
            </span>

            <p className={styles.posterReward}>
                Reward: a seat at the Pro table
            </p>
        </aside>
    );
}
