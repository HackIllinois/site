import type { Metadata } from "next";
import Link from "next/link";
import FrontierNav from "@/components/Frontier/FrontierNav";
import SceneArt from "@/components/Frontier/SceneArt";
import shared from "@/components/Frontier/Frontier.module.scss";
import styles from "./track.module.scss";

export const metadata: Metadata = {
    title: "HackOutlaws | HackIllinois Pro Track",
    description:
        "Join the HackIllinois Pro Track, enter the Saloon Rush coding challenge and compete for the HackOutlaws grand prize."
};

function SaloonArt({
    name,
    height,
    phoneHeight,
    priority = false
}: {
    name: string;
    height: number;
    phoneHeight: number;
    priority?: boolean;
}) {
    const src = "/challenge/saloon/" + name;
    return (
        <SceneArt
            src={src}
            height={height}
            phone={{ src: src + "-phone", width: 402, height: phoneHeight }}
            priority={priority}
        />
    );
}

export default function ProTrackLanding() {
    return (
        <div className={shared.page}>
            <FrontierNav />
            <main className={styles.saloon}>
                <section className={styles.entrance}>
                    <SaloonArt
                        name="entrance"
                        height={1024}
                        phoneHeight={780}
                        priority
                    />
                    <h1>
                        Hack<span>Outlaws</span>
                    </h1>
                    <a href="#about-outlaws" className={styles.plaque}>
                        HackIllinois Pro-Track
                    </a>
                </section>
                <section className={styles.roulette} id="about-outlaws">
                    <SaloonArt name="roulette" height={816} phoneHeight={370} />
                    <div>
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
                        name="benefits"
                        height={1180}
                        phoneHeight={790}
                    />
                    <div className={styles.menu}>
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
                    <div className={styles.menu}>
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
                            Start Saloon Rush →
                        </Link>
                    </div>
                </section>
                <section className={styles.bar}>
                    <SaloonArt name="bar" height={1002} phoneHeight={693} />
                    <div className={styles.menu}>
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
