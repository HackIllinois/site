"use client";

import { useEffect, useRef, useState } from "react";
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

function companyInitials(companyName: string) {
    const initials = companyName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();

    return initials || "HI";
}

function jobDescription(value: string) {
    const description = value.replace(/^\s*job\s+description:?\s*/i, "").trim();

    return description || "No job description has been provided yet.";
}

function visiblePageIndexes(current: number, total: number) {
    const count = Math.min(4, total);
    const start = Math.min(
        Math.max(current - 1, 0),
        Math.max(total - count, 0)
    );

    return Array.from({ length: count }, (_, index) => start + index);
}

function syncOpenStamp(stamp: HTMLSpanElement | null, scrollTop: number) {
    if (!stamp) return;

    stamp.style.setProperty("--open-scroll-offset", `${-scrollTop}px`);
    stamp.style.setProperty(
        "--open-scroll-opacity",
        `${Math.max(0, 0.9 - scrollTop / 50)}`
    );
}

function CompanyLogo({ job }: { job: JobPosting }) {
    const logo = webUrl(job.logoUrl);
    const [failed, setFailed] = useState(false);

    if (!logo || failed) {
        return (
            <span
                className={styles.logoPlaceholder}
                aria-label={`${job.companyName} logo placeholder`}
            >
                <span>{companyInitials(job.companyName)}</span>
                <small>Company logo</small>
            </span>
        );
    }

    return (
        <Image
            unoptimized
            src={logo}
            loading="lazy"
            width="220"
            height="140"
            alt={`${job.companyName} logo`}
            onError={() => setFailed(true)}
        />
    );
}

export default function JobBoard({ jobs }: { jobs: JobPosting[] | null }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<JobPosting | null>(null);
    const [detailsScrollable, setDetailsScrollable] = useState(false);
    const [detailsAtEnd, setDetailsAtEnd] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const detailsScroll = useRef<HTMLDivElement>(null);
    const openStamp = useRef<HTMLSpanElement>(null);
    const router = useRouter();
    const filtered = (jobs ?? []).filter(job =>
        [job.companyName, job.jobTitle, job.jobDescription]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    );
    const pages = Math.ceil(filtered.length / pageSize);
    const current = Math.min(page, Math.max(0, pages - 1));
    const pageOptions = visiblePageIndexes(current, pages);
    const applicationUrl = selected
        ? webUrl(selected.applicationUrl)
        : undefined;
    const description = selected ? jobDescription(selected.jobDescription) : "";

    useEffect(() => {
        const scroller = detailsScroll.current;
        if (!selected || !scroller) {
            setDetailsScrollable(false);
            setDetailsAtEnd(false);
            return;
        }

        const updateScrollState = () => {
            const remaining =
                scroller.scrollHeight -
                scroller.scrollTop -
                scroller.clientHeight;
            setDetailsScrollable(
                scroller.scrollHeight > scroller.clientHeight + 2
            );
            setDetailsAtEnd(remaining <= 2);
            syncOpenStamp(openStamp.current, scroller.scrollTop);
        };

        scroller.scrollTop = 0;
        updateScrollState();
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(scroller);

        return () => observer.disconnect();
    }, [selected]);

    return (
        <main className={styles.room}>
            <SceneArt
                src="/job-board/jobs-room"
                height={1410}
                phone={{
                    src: "/job-board/jobs-room-mobile",
                    width: 402,
                    height: 1544,
                    format: "png"
                }}
                priority
            />
            <div className={styles.lighting} aria-hidden="true">
                {[styles.lightHaloLeft, styles.lightHaloRight].map(side => (
                    <span key={side} className={`${styles.lightHalo} ${side}`}>
                        <Image
                            className={styles.lightGlow}
                            src="/job-board/light-glow.png"
                            width={495}
                            height={496}
                            alt=""
                        />
                        <Image
                            className={styles.lightCore}
                            src="/job-board/light-core.png"
                            width={142}
                            height={164}
                            alt=""
                        />
                    </span>
                ))}
            </div>
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
                                return (
                                    <li key={job._id}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDetailsAtEnd(false);
                                                setSelected(job);
                                                dialog.current?.showModal();
                                            }}
                                        >
                                            <strong
                                                className={styles.cardCompany}
                                            >
                                                {job.companyName}
                                            </strong>
                                            <span className={styles.jobTitle}>
                                                {job.jobTitle}
                                            </span>
                                            <span className={styles.cardLogo}>
                                                <CompanyLogo job={job} />
                                            </span>
                                            <span
                                                className={styles.cardLocation}
                                            >
                                                Location not provided
                                            </span>
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
                        <div className={styles.pageRow}>
                            <button
                                className={`${styles.pageArrow} ${styles.pagePrevious}`}
                                type="button"
                                disabled={current === 0}
                                onClick={() => setPage(current - 1)}
                            >
                                <span className={shared.hidden}>
                                    Previous page
                                </span>
                            </button>
                            <span
                                className={styles.pageNumbers}
                                aria-live="polite"
                            >
                                {pageOptions.map(pageIndex => (
                                    <button
                                        key={pageIndex}
                                        type="button"
                                        className={
                                            pageIndex === current
                                                ? styles.currentPage
                                                : undefined
                                        }
                                        aria-current={
                                            pageIndex === current
                                                ? "page"
                                                : undefined
                                        }
                                        aria-label={`Page ${pageIndex + 1}`}
                                        onClick={() => setPage(pageIndex)}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                ))}
                            </span>
                            <button
                                className={`${styles.pageArrow} ${styles.pageNext}`}
                                type="button"
                                disabled={current === pages - 1}
                                onClick={() => setPage(current + 1)}
                            >
                                <span className={shared.hidden}>Next page</span>
                            </button>
                        </div>
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
                    <>
                        <article>
                            <Image
                                className={styles.detailTack}
                                src="/job-board/thumbtack.png"
                                width={126}
                                height={143}
                                alt=""
                                aria-hidden="true"
                            />
                            <button
                                type="button"
                                className={styles.close}
                                aria-label="Close job details"
                                onClick={() => dialog.current?.close()}
                            >
                                ×
                            </button>

                            <header className={styles.detailHeader}>
                                <h2 id="job-title">{selected.jobTitle}</h2>
                                <p className={styles.company}>
                                    {selected.companyName}
                                </p>
                            </header>

                            <span ref={openStamp} className={styles.openStamp}>
                                <span aria-hidden="true">★ ★ ★</span>
                                OPEN
                                <span aria-hidden="true">★ ★ ★</span>
                            </span>

                            <div className={styles.detailGrid}>
                                <div className={styles.logoFrame}>
                                    <span className={styles.tack} />
                                    <span className={styles.tack} />
                                    <span className={styles.tack} />
                                    <span className={styles.tack} />
                                    <CompanyLogo
                                        key={selected._id}
                                        job={selected}
                                    />
                                </div>

                                <div className={styles.detailCopy}>
                                    <div
                                        ref={detailsScroll}
                                        className={`${styles.detailScroll} ${
                                            detailsScrollable && !detailsAtEnd
                                                ? styles.detailScrollFaded
                                                : ""
                                        }`}
                                        tabIndex={0}
                                        aria-label="Job location and description"
                                        onScroll={event => {
                                            const scroller =
                                                event.currentTarget;
                                            const remaining =
                                                scroller.scrollHeight -
                                                scroller.scrollTop -
                                                scroller.clientHeight;
                                            setDetailsAtEnd(remaining <= 2);
                                            syncOpenStamp(
                                                openStamp.current,
                                                scroller.scrollTop
                                            );
                                        }}
                                    >
                                        <h3>Location</h3>
                                        <p className={styles.location}>
                                            Location not provided
                                        </p>
                                        <h3>Job Description</h3>
                                        <p className={styles.description}>
                                            {description}
                                        </p>
                                    </div>
                                    {detailsScrollable && !detailsAtEnd && (
                                        <div
                                            className={styles.scrollFade}
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </div>

                            {applicationUrl ? (
                                <a
                                    className={styles.apply}
                                    href={applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/job-board/apply-button.png"
                                        fill
                                        sizes="(max-width: 700px) 220px, 311px"
                                        alt=""
                                    />
                                    <span className={shared.hidden}>
                                        Apply for {selected.jobTitle}
                                    </span>
                                </a>
                            ) : (
                                <span
                                    className={`${styles.apply} ${styles.applyUnavailable}`}
                                    aria-label="Application link not available"
                                >
                                    <Image
                                        src="/job-board/apply-button.png"
                                        fill
                                        sizes="(max-width: 700px) 220px, 311px"
                                        alt=""
                                    />
                                </span>
                            )}
                        </article>
                        <p className={styles.dismissHint}>
                            Click outside the poster or press Esc to exit
                        </p>
                    </>
                )}
            </dialog>
        </main>
    );
}
