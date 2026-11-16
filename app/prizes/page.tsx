import type { Metadata } from "next";
import shared from "@/components/Frontier/Frontier.module.scss";
import styles from "./styles.module.scss";
import { prizeSections } from "./content/prize-data";

export const metadata: Metadata = {
    title: "Prizes | HackIllinois 2027",
    description:
        "Explore sample path, track, company, and extra prizes for HackIllinois. Final prize details will be announced."
};

export default function PrizesPage() {
    return (
        <main className={`${shared.page} ${styles.page}`}>
            <section className={styles.hero} aria-labelledby="prizes-title">
                <div className={styles.signpost}>
                    <p className={styles.cue}>Jump to a prize section</p>
                    <h1 id="prizes-title">Prizes</h1>
                    <nav
                        aria-label="Prize sections"
                        className={styles.navigation}
                    >
                        {prizeSections.map(section => (
                            <a key={section.id} href={`#${section.id}`}>
                                {section.label}
                            </a>
                        ))}
                    </nav>
                </div>
                <p className={styles.sampleNotice}>
                    <strong>Sample prize information</strong>
                    These are preview examples. Final prizes, sponsors, and
                    eligibility details will be announced.
                </p>
            </section>
            <div className={styles.trail}>
                {prizeSections.map(section => (
                    <section
                        key={section.id}
                        id={section.id}
                        className={styles.section}
                        aria-labelledby={`${section.id}-title`}
                    >
                        <header className={styles.sectionHeading}>
                            <h2 id={`${section.id}-title`} tabIndex={-1}>
                                {section.label} Prizes
                            </h2>
                            {section.description && (
                                <p>{section.description}</p>
                            )}
                        </header>
                        <div className={styles.grid}>
                            {section.prizes.map((prize, index) => (
                                <article
                                    key={`${section.id}-${index}`}
                                    className={styles.prize}
                                >
                                    <h3>{prize.title}</h3>
                                    <div className={styles.barrel}>
                                        {/* Static Figma artwork; the prize text remains selectable and readable. */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`/prizes/frontier/barrels/${prize.artwork}.webp`}
                                            alt=""
                                            width={480}
                                            height={438}
                                            loading="lazy"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className={styles.sponsor}
                                        >
                                            {prize.label}
                                        </span>
                                    </div>
                                    <div className={styles.rewards}>
                                        {prize.rewards.map(reward => (
                                            <p key={reward}>{reward}</p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
                <a className={styles.backToTop} href="#prizes-title">
                    Back to prize sections ↑
                </a>
            </div>
        </main>
    );
}
