"use client";

import { FORCE_REGISTRATION_CLOSED } from "@/app/register/constants";
import GithubAuthPage from "@/app/register/general/formPages/GithubAuthPage";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Saloon.module.scss";

/** A spinning poker chip, used while the saloon loads. */
export function SaloonLoading({ text = "Shuffling the deck…" }) {
    return (
        <main className={styles.page}>
            <div className={styles.center} role="status">
                <svg
                    className={styles.spinChip}
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                >
                    <circle cx="50" cy="50" r="48" fill="#1e6a4e" />
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#fbf1dc"
                        strokeWidth="10"
                        strokeDasharray="14 19"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="28"
                        fill="#1e6a4e"
                        stroke="#fbf1dc"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                </svg>
                <p className={styles.loadingText}>{text}</p>
            </div>
        </main>
    );
}

/** A parchment notice in the middle of the saloon, for dead ends like "not on the Pro track". */
export function SaloonNotice({
    heading,
    sub,
    children,
    actionHref,
    actionText
}: {
    heading: string;
    sub?: string;
    children: ReactNode;
    actionHref?: string;
    actionText?: string;
}) {
    return (
        <main className={styles.page}>
            <div className={styles.center}>
                <div className={styles.gateCard}>
                    {sub && <p className={styles.posterSub}>{sub}</p>}
                    <h1 className={styles.posterHeading}>{heading}</h1>
                    <hr className={styles.posterRule} />
                    <div className={styles.posterNote}>{children}</div>
                    {actionHref && actionText && (
                        <div
                            className={styles.btnRow}
                            style={{ justifyContent: "center" }}
                        >
                            <Link href={actionHref} className={styles.btnBrass}>
                                {actionText}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

/**
 * Only lets signed-in applicants who submitted a Pro-track application through.
 * Redirects to /registration-closed when registration is closed.
 */
export default function ChallengeGate({ children }: { children: ReactNode }) {
    const registrationAuth = useRegistrationAuth({
        isClosed: FORCE_REGISTRATION_CLOSED,
        isProtected: !FORCE_REGISTRATION_CLOSED,
        shouldLoadSubmission: true
    });

    if (registrationAuth.loadError) {
        return (
            <SaloonNotice heading="Couldn’t load your application">
                <button onClick={() => window.location.reload()}>
                    Try again
                </button>
            </SaloonNotice>
        );
    }
    if (registrationAuth.isLoading) {
        return <SaloonLoading />;
    }

    if (!registrationAuth.authenticated) {
        return <GithubAuthPage />;
    }

    if (!registrationAuth.submission) {
        return (
            <SaloonNotice
                sub="Hold your horses"
                heading="Not so fast"
                actionHref="/register/general"
                actionText="Finish your application"
            >
                Submit your HackIllinois application with the Pro track box
                ticked, then come back to take on Saloon Rush.
            </SaloonNotice>
        );
    }

    if (!registrationAuth.submission.pro) {
        return (
            <SaloonNotice
                sub="Members only"
                heading="Pro track only"
                actionHref="/"
                actionText="Back to town"
            >
                Saloon Rush is the HackOutlaws Pro track challenge. Your
                application wasn’t submitted for the Pro track, so there’s no
                seat at this table for you this time.
            </SaloonNotice>
        );
    }

    return <>{children}</>;
}
