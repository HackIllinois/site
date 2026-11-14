"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { JobPosting } from "@/util/types";
import SceneArt from "@/components/Frontier/SceneArt";
import shared from "@/components/Frontier/Frontier.module.scss";
import styles from "./jobs.module.scss";

const pageSize = 8;
function webUrl(value: string) {
    try {
        const url = new URL(value);
        if (url.protocol === "https:" || url.protocol === "http:")
            return url.href;
    } catch {}
    return undefined;
}

export default function JobBoard({ jobs }: { jobs: JobPosting[] | null }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<JobPosting | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const router = useRouter();
    const filtered = (jobs ?? []).filter(job =>
        [job.companyName, job.jobTitle, job.jobDescription]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    );
    const pages = Math.ceil(filtered.length / pageSize);
    const current = Math.min(page, Math.max(0, pages - 1));
    return (
        <main className={styles.room}>
            <SceneArt src="/job-board/jobs-room" height={1410} priority />
            <h1 className={shared.hidden}>Job Board</h1>
            <div className={styles.board}>
                <label className={styles.search}>
                    <span className={shared.hidden}>Search job postings</span>
                    <input
                        type="search"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setPage(0);
                        }}
                        placeholder="Search bounties by role or company…"
                    />
                </label>
                {!jobs ? (
                    <div className={styles.message}>
                        <p>Job postings couldn’t be loaded.</p>
                        <button type="button" onClick={() => router.refresh()}>
                            Try again
                        </button>
                    </div>
                ) : filtered.length === 0 ? (
                    <p role="status" className={styles.message}>
                        {query
                            ? "No jobs match your search."
                            : "There are no open positions posted yet."}
                    </p>
                ) : (
                    <ul className={styles.grid}>
                        {filtered
                            .slice(current * pageSize, (current + 1) * pageSize)
                            .map(job => {
                                const logo = webUrl(job.logoUrl);
                                return (
                                    <li key={job._id}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelected(job);
                                                dialog.current?.showModal();
                                            }}
                                        >
                                            <strong>{job.companyName}</strong>
                                            <span>{job.jobTitle}</span>
                                            {logo && (
                                                <Image
                                                    unoptimized
                                                    src={logo}
                                                    loading="lazy"
                                                    width="100"
                                                    height="56"
                                                    alt=""
                                                />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
                )}
                {pages > 1 && (
                    <nav
                        className={styles.pages}
                        aria-label="Job listing pages"
                    >
                        <button
                            type="button"
                            disabled={current === 0}
                            onClick={() => setPage(current - 1)}
                        >
                            ← Previous
                        </button>
                        <span aria-live="polite">
                            {current + 1} / {pages}
                        </span>
                        <button
                            type="button"
                            disabled={current === pages - 1}
                            onClick={() => setPage(current + 1)}
                        >
                            Next →
                        </button>
                    </nav>
                )}
            </div>
            <dialog
                ref={dialog}
                className={styles.detail}
                aria-labelledby="job-title"
                onClose={() => setSelected(null)}
                onClick={event => {
                    if (event.target === dialog.current) dialog.current.close();
                }}
            >
                {selected && (
                    <article>
                        <button
                            className={styles.close}
                            aria-label="Close job details"
                            onClick={() => dialog.current?.close()}
                        >
                            ×
                        </button>
                        <h2 id="job-title">{selected.jobTitle}</h2>
                        <p className={styles.company}>{selected.companyName}</p>
                        <h3>Job description</h3>
                        <p className={styles.description}>
                            {selected.jobDescription}
                        </p>
                        {webUrl(selected.applicationUrl) && (
                            <a
                                className={styles.apply}
                                href={webUrl(selected.applicationUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apply ↗
                            </a>
                        )}
                    </article>
                )}
            </dialog>
        </main>
    );
}
