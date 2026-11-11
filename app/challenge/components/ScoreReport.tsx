import { ChallengeGradeReport } from "@/util/types";
import styles from "./Saloon.module.scss";

/** The grader's report for one uploaded plan. */
export default function ScoreReport({
    label,
    report
}: {
    label: string;
    report: ChallengeGradeReport;
}) {
    return (
        <div className={styles.report} aria-live="polite">
            <p className={styles.reportLabel}>{label}</p>
            <div className={styles.reportScore}>
                <strong>{report.score}</strong>
                <span>points on {report.instance}</span>
            </div>

            <dl className={styles.reportStats}>
                <div>
                    <dt>Completed</dt>
                    <dd>
                        {report.completed} / {report.totalContracts}
                    </dd>
                </div>
                <div>
                    <dt>On time</dt>
                    <dd>{report.onTime}</dd>
                </div>
                <div>
                    <dt>Minutes late</dt>
                    <dd>{report.lateMinutes}</dd>
                </div>
                <div>
                    <dt>Minutes walked</dt>
                    <dd>{report.travelMinutes}</dd>
                </div>
            </dl>

            {report.errors.length > 0 && (
                <div className={styles.errors}>
                    <h4>Caught by the sheriff</h4>
                    <p>
                        Each mercenary’s route stopped at their first invalid
                        command. Contracts finished before it still count.
                    </p>
                    <ul>
                        {report.errors.map(error => (
                            <li key={`${error.mercenary}-${error.index}`}>
                                {error.message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
