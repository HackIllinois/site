import type { Metadata } from "next";
import Link from "next/link";
import FrontierNav from "@/components/Frontier/FrontierNav";
import SceneArt from "@/components/Frontier/SceneArt";
import shared from "@/components/Frontier/Frontier.module.scss";
import { socials } from "@/modules/FooterData";
import MarqueeClock from "./landing/MarqueeClock";
import MineFaq from "./landing/MineFaq";
import FrontierNewsletter from "./landing/FrontierNewsletter";
import styles from "./page.module.scss";

export const metadata: Metadata = {
    title: "HackIllinois 2027 | Forge Your Frontier",
    description:
        "Join HackIllinois on February 26–28, 2027 at the University of Illinois Urbana-Champaign."
};

const art = "/landing/frontier/";
const stories = [
    [
        "Did the HackVoyagers path this year and the Shark Tank showcase was a different level. Presenting to actual company reps and having to defend your technical decisions on the spot is something you can’t replicate in class. Even though we didn’t take the grand prize, it was the most valuable 16 hours of my undergrad.",
        "S.V. | Senior, CS + Statistics"
    ],
    [
        "I was nervous going in as a first-year with barely any project experience. HackIllinois made it feel welcoming though. I teamed up with people I met at the team formation event and we built something functional by Sunday morning. Can’t wait to come back next year with more experience.",
        "S.L. | Freshman, Computer Science"
    ],
    [
        "The John Deere hardware track was the perfect excuse to finally combine software and hardware in a real project. Getting to work with actual components and compete for the Best Hardware Hack was a different experience from your typical app-building hackathon. HackAstra didn’t disappoint.",
        "P.S. | Junior, Electrical & Computer Engineering"
    ]
];

export default function Home() {
    return (
        <div className={shared.page}>
            <FrontierNav />
            <main className={styles.landing}>
                <section className={styles.scene} aria-labelledby="event-name">
                    <SceneArt
                        src={art + "marquee"}
                        height={1477}
                        phone={{
                            src: art + "marquee-phone",
                            width: 1104,
                            height: 1477,
                            small: 570
                        }}
                        priority
                    />
                    <h1 id="event-name" className={shared.hidden}>
                        HackIllinois 2027
                    </h1>
                    <MarqueeClock />
                    <Link
                        className={styles.marqueeLink}
                        href="/register/general"
                        aria-label="Register for HackIllinois, February 26–28 at the University of Illinois Urbana-Champaign"
                    >
                        <span>Register now</span>
                    </Link>
                </section>
                <section className={styles.scene}>
                    <SceneArt src={art + "saloon"} height={1429} />
                    <Link href="/challenge" className={styles.saloonSign}>
                        <span>Introducing...</span>
                        <h2>HackOutlaws</h2>
                    </Link>
                    <Link
                        href="/challenge"
                        className={styles.door}
                        aria-label="Enter the HackOutlaws saloon"
                    />
                </section>
                <section
                    className={styles.scene}
                    aria-label="Last year at HackIllinois"
                >
                    <SceneArt
                        src={art + "gallery"}
                        height={1294}
                        alt="Last year we had over 800 hackers and 226 projects."
                    />
                </section>
                <section className={styles.stories}>
                    <SceneArt src={art + "stories"} height={2056} />
                    <div className={styles.storyContent}>
                        <h2>Hear from the Hackers</h2>
                        {stories.map(([quote, author]) => (
                            <blockquote key={author}>
                                <p>“{quote}”</p>
                                <cite>{author}</cite>
                            </blockquote>
                        ))}
                    </div>
                </section>
                <section className={styles.sponsors}>
                    <SceneArt src={art + "sponsors"} height={1344} />
                    <div className={styles.sponsorContent}>
                        <h2>Sponsors</h2>
                        <div
                            className={styles.sponsorBoard}
                            aria-label="2027 sponsors to be announced"
                        >
                            <p>2027 sponsors to be announced</p>
                            {Array.from({ length: 23 }, (_, index) => (
                                <i key={index} aria-hidden="true" />
                            ))}
                        </div>
                    </div>
                </section>
                <section className={styles.mine}>
                    <SceneArt src={art + "mine"} height={1690} />
                    <MineFaq />
                </section>
                <footer className={styles.frontier} id="newsletter">
                    <SceneArt
                        src={art + "frontier"}
                        height={1758}
                        phone={{
                            src: art + "frontier-phone",
                            width: 650,
                            height: 1465
                        }}
                    />
                    <div className={styles.letter}>
                        <p>Howdy, hackers!</p>
                        <p>
                            Join us February 26–28 at the University of Illinois
                            Urbana-Champaign.
                        </p>
                        <Link href="/register/general">
                            Register for HackIllinois
                        </Link>
                        <p>
                            Forge Your Frontier,
                            <br />
                            The HackIllinois Team
                        </p>
                        <FrontierNewsletter />
                    </div>
                    <div className={styles.social}>
                        <h2>Stay up-to-date with HackIllinois!</h2>
                        <div>
                            {socials.map(({ name, url, image }) => (
                                <a key={name} href={url} aria-label={name}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={image}
                                        alt=""
                                        width="32"
                                        height="32"
                                        loading="lazy"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
