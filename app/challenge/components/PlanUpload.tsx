"use client";

import { loadChallengeStatus, submitChallenge } from "@/util/api";
import { ChallengeErrorBody, ChallengeStatus } from "@/util/types";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useRef, useState } from "react";
import { MAX_PLAN_SIZE_BYTES } from "../constants";
import styles from "./Saloon.module.scss";
import ScoreReport from "./ScoreReport";

type Outcome =
    | { kind: "graded" }
    | { kind: "invalid"; reason: string }
    | { kind: "error"; title: string; message: string };

const isJsonFile = (file: File) =>
    file.type === "application/json" ||
    file.name.toLowerCase().endsWith(".json");

/** Turns a non-200 response from POST /registration/challenge/ into something to show. */
function describeError(status: number, body: ChallengeErrorBody): Outcome {
    if (body.error === "InvalidPlan") {
        return { kind: "invalid", reason: body.reason ?? body.message };
    }
    if (status === 413) {
        return {
            kind: "error",
            title: "That file’s too heavy",
            message: "plan.json must be 1 MB or smaller."
        };
    }
    if (body.error === "NoFileUploaded") {
        return {
            kind: "error",
            title: "No plan found",
            message: "Please upload your plan.json."
        };
    }
    if (body.error === "NoChallengeFound") {
        return {
            kind: "error",
            title: "No floor plan yet",
            message:
                "We couldn’t find your challenge. Refresh the page and try again."
        };
    }
    if (body.error === "RegistrationClosed") {
        return {
            kind: "error",
            title: "The saloon is closed",
            message: body.message
        };
    }
    return {
        kind: "error",
        title: "Something went wrong",
        message:
            body.message ||
            "There was a problem grading your plan. Please try again."
    };
}

export default function PlanUpload({
    status,
    onStatusChange,
    onPassed
}: {
    status: ChallengeStatus;
    onStatusChange: (status: ChallengeStatus) => void;
    onPassed: () => void;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [outcome, setOutcome] = useState<Outcome | null>(null);

    const chooseFile = (picked: File | null) => {
        if (!picked) return;
        if (!isJsonFile(picked)) {
            setFile(null);
            setFileError("That’s not a .json file. Upload your plan.json.");
            return;
        }
        if (picked.size > MAX_PLAN_SIZE_BYTES) {
            setFile(null);
            setFileError("plan.json must be 1 MB or smaller.");
            return;
        }
        setFile(picked);
        setFileError(null);
    };

    const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setDragging(false);
        chooseFile(event.dataTransfer.files?.[0] ?? null);
    };

    const handleSubmit = async () => {
        if (!file) return;
        setSubmitting(true);
        setOutcome(null);
        try {
            const response = await submitChallenge(file);
            if (response.status === 200) {
                const next = response.body as ChallengeStatus;
                const justPassed = !status.complete && next.complete;
                onStatusChange(next);
                setOutcome({ kind: "graded" });
                if (justPassed) onPassed();
            } else {
                // Grading can succeed before the completion email fails. Read the
                // saved result before asking the applicant to submit the plan again.
                const latest = await loadChallengeStatus().catch(() => null);
                if (latest) onStatusChange(latest);
                if (latest?.complete && !status.complete) {
                    setOutcome({ kind: "graded" });
                    onPassed();
                } else {
                    setOutcome(
                        describeError(
                            response.status,
                            response.body as ChallengeErrorBody
                        )
                    );
                }
            }
        } catch {
            setOutcome({
                kind: "error",
                title: "Couldn’t reach the saloon",
                message:
                    "Your plan didn’t upload. Check your connection, refresh the page and try again."
            });
        } finally {
            setSubmitting(false);
            // Let the same file be picked again after editing it.
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    let result: React.ReactNode;
    if (outcome?.kind === "invalid") {
        result = (
            <div className={styles.noticeError} aria-live="polite">
                <strong>Your plan.json couldn’t be graded</strong>
                <code>{outcome.reason}</code>
                <p style={{ margin: "10px 0 0" }}>
                    Fix the file and upload it again. This still counted as an
                    attempt, but attempts are unlimited and don’t affect your
                    score.
                </p>
            </div>
        );
    } else if (outcome?.kind === "error") {
        result = (
            <div className={styles.noticeError} aria-live="polite">
                <strong>{outcome.title}</strong>
                {outcome.message}
            </div>
        );
    } else if (status.lastReport) {
        result = (
            <ScoreReport
                label={outcome ? "This upload" : "Your last upload"}
                report={status.lastReport}
            />
        );
    } else {
        result = (
            <div className={styles.emptyReport}>
                No plans on the table yet.
                <br />
                Upload one and the dealer will tally your haul.
            </div>
        );
    }

    return (
        <div className={styles.uploadGrid}>
            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json,application/json"
                    hidden
                    onChange={event =>
                        chooseFile(event.target.files?.[0] ?? null)
                    }
                />
                <button
                    type="button"
                    className={
                        dragging ? styles.dropzoneActive : styles.dropzone
                    }
                    onClick={() => inputRef.current?.click()}
                    onDragOver={event => {
                        event.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <UploadFileIcon aria-hidden="true" />
                    <p className={styles.dropTitle}>Lay down your plan</p>
                    <p className={styles.dropHint}>
                        Drop plan.json here, or click to browse. 1 MB max.
                    </p>
                    {file && (
                        <span className={styles.fileChip}>
                            <InsertDriveFileOutlinedIcon
                                fontSize="small"
                                aria-hidden="true"
                            />
                            {file.name}
                        </span>
                    )}
                </button>
                {fileError && (
                    <p className={styles.inlineError} role="alert">
                        {fileError}
                    </p>
                )}

                <div className={styles.btnRow} style={{ marginTop: 20 }}>
                    <button
                        type="button"
                        className={styles.btnBrass}
                        onClick={handleSubmit}
                        disabled={!file || submitting}
                    >
                        {submitting ? "Tallying…" : "Submit plan"}
                    </button>
                </div>
                <p
                    className={styles.dropHint}
                    style={{ color: "rgba(251,241,220,0.75)", marginTop: 16 }}
                >
                    Upload as often as you like. Only your best score counts,
                    and it never goes down.
                </p>
            </div>

            <div>{result}</div>
        </div>
    );
}
