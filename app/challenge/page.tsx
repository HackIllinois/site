import type { Metadata } from "next";
import Link from "next/link";
import SceneArt from "@/components/Frontier/SceneArt";
import shared from "@/components/Frontier/Frontier.module.scss";
import BarDrinks from "./components/BarDrinks";
import CactusAnimation from "./components/CactusAnimation";
import RouletteWheel from "./components/RouletteWheel";
import SaloonMotion from "./components/SaloonMotion";
import TableProps from "./components/TableProps";
import styles from "./track.module.scss";

export const metadata: Metadata = {
    title: "HackOutlaws | HackIllinois Pro Track",
    description:
        "Join the HackIllinois Pro Track, enter the Saloon Rush coding challenge and compete for the HackOutlaws grand prize."
};

function SaloonArt({
    name,
    phoneName,
    height,
    phoneHeight,
    priority = false
}: {
    name: string;
    phoneName?: string;
    height: number;
    phoneHeight: number;
    priority?: boolean;
}) {
    const src = "/challenge/saloon/" + name;
    return (
        <SceneArt
            src={src}
            height={height}
            phone={{
                src: `/challenge/saloon/${phoneName ?? name}-phone`,
                width: 402,
                height: phoneHeight
            }}
            priority={priority}
        />
    );
}

// Brass plaque with notched corners and a stud at each end.
function Plaque() {
    return (
        <svg viewBox="0 0 423 59" preserveAspectRatio="none" aria-hidden="true">
            <path
                d="M14 1.5H409A13 15 0 0 0 422 16.5V42.5A13 15 0 0 0 409 57.5H14A13 15 0 0 0 1 42.5V16.5A13 15 0 0 0 14 1.5Z"
                fill="#2d1713"
                stroke="#d39a6c"
                strokeWidth="2"
            />
            <circle cx="28.5" cy="29.5" r="6.5" fill="#d9a04d" />
            <circle cx="394.5" cy="29.5" r="6.5" fill="#d9a04d" />
        </svg>
    );
}

export default function ProTrackLanding() {
    return (
        <div className={shared.page}>
            <main className={styles.saloon}>
                <SaloonMotion />
                <section className={styles.entrance}>
                    <SaloonArt
                        name="entrance"
                        height={1024}
                        phoneHeight={780}
                        priority
                    />
                    <TableProps scene="entrance" play="load" />
                    <h1>
                        Hack<span>Outlaws</span>
                    </h1>
                    <Link href="#about-outlaws" className={styles.plaque}>
                        <Plaque />
                        <span>HackIllinois Pro-Track</span>
                    </Link>
                </section>
                <section className={styles.roulette} id="about-outlaws">
                    <SaloonArt name="roulette" height={816} phoneHeight={370} />
                    <TableProps scene="roulette" play="view" />
                    <RouletteWheel />
                    <div className={styles.rouletteCopy} data-reveal>
                        <h2>What is HackOutlaws?</h2>
                        <p>
                            HackOutlaws is an exclusive path tailored for
                            attendees who have mastered the fundamentals and are
                            now looking to test their skills in a more
                            challenging environment.
                        </p>
                        <p className={styles.arena}>
                            It’s a{" "}
                            <em>specialized arena for experienced hackers</em>{" "}
                            who want to put those skills to the test.
                        </p>
                    </div>
                </section>
                <section className={styles.benefits}>
                    <SaloonArt
                        name="benefits-animated"
                        phoneName="benefits"
                        height={1180}
                        phoneHeight={790}
                    />
                    <CactusAnimation />
                    <div className={styles.menu} data-reveal>
                        <small>The Pro Track Menu</small>
                        <h2>
                            Benefits of
                            <br />
                            Being a<br />
                            HackOutlaw
                        </h2>
                        <dl>
                            <dt>
                                Grand Prize <span>$5000</span>
                            </dt>
                            <dd>Compete for the grand HackOutlaw prize.</dd>
                            <dt>
                                Showcase <span>★</span>
                            </dt>
                            <dd>
                                Present your project in a Shark Tank-inspired
                                showcase.
                            </dd>
                            <dt>
                                Other perks <span>★</span>
                            </dt>
                            <dd>Sign up and find out!</dd>
                        </dl>
                    </div>
                </section>
                <section className={styles.admission}>
                    <SaloonArt
                        name="admission"
                        height={1098}
                        phoneHeight={732}
                    />
                    <div className={styles.menu} data-reveal>
                        <h2>
                            How Do I<br />
                            Become a<br />
                            HackOutlaw?
                        </h2>
                        <p>
                            Choose Pro Track on your{" "}
                            <Link href="/register/general">registration</Link>{" "}
                            and complete the Saloon Rush coding challenge.
                        </p>
                        <p>
                            If you don’t submit the challenge, you’ll still be
                            considered for general admission.
                        </p>
                        <Link
                            className={styles.start}
                            href="/challenge/description"
                        >
                            Start Saloon Rush <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </section>
                <section className={styles.bar}>
                    <SaloonArt name="bar" height={1002} phoneHeight={693} />
                    <BarDrinks />
                    <div className={styles.menu} data-reveal>
                        <h2>
                            How are HackOutlaws Different from General
                            Attendees?
                        </h2>
                        <p>
                            HackOutlaws is designed for advanced hackers,
                            fostering a competitive atmosphere for a higher
                            prize pool, while general attendees compete in an
                            environment that supports learning at every level.
                        </p>
                        <p>
                            All attendees can enjoy HackIllinois’ events,
                            workshops, company Q&amp;As, and the Company Expo.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
