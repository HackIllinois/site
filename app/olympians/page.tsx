import styles from "./styles.module.scss";
import Link from "next/link";
import Background from "@/components/Olympians/Background";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HackIllinois | Olympians"
};

const AboutProTrack: React.FC = () => {
    return (
        <div className={styles.container}>
            <Background />
            <section className={styles.proTrackPage}>
                <div className={styles.title}>
                    <h1>
                        Introducing <br />
                        <b>
                            Hack
                            <span className={styles.emphasizedText}>
                                Olympians
                            </span>
                        </b>
                    </h1>
                </div>
                <div className={styles.descriptions}>
                    <div>
                        <h2>What are HackOlympians?</h2>
                        <br></br>
                        <p>
                            HackOlympians is an exclusive path tailored for
                            prospective attendees to dive into a competitively
                            elevated hackathon atmosphere for an increased prize
                            value.
                            <br></br>
                            <br></br>
                            It&apos;s a{" "}
                            <span className={styles.emphasizedText}>
                                specialized arena for experienced hackers
                            </span>{" "}
                            who have mastered the fundamentals and are now
                            looking to test their skills in a more challenging
                            environment.
                            <br></br>
                            <br></br>
                            Admission into HackOlympians requires completing our
                            application, which includes a coding challenge.
                        </p>
                    </div>
                    <div className={styles.spacer}></div>
                    <div>
                        <h2>What are the benefits of being a HackOlympian?</h2>
                        <br></br>
                        <p>
                            Attendees in this path have the exclusive
                            opportunity to compete for the{" "}
                            <span className={styles.emphasizedText}>
                                grand HackOlympians prize (to be released soon).
                            </span>
                            <br></br>
                            <br></br>
                            Additionally, they will gain access to{" "}
                            <span className={styles.emphasizedText}>
                                special networking opportunities
                            </span>{" "}
                            with our event sponsors and the chance to present
                            their project in a{" "}
                            <span className={styles.emphasizedText}>
                                thrilling Shark-Tank inspired showcase
                            </span>
                            , among other exciting perks – but spots are
                            limited, so register soon!
                        </p>
                    </div>
                    <div>
                        <h2>
                            How is HackOlympians different from standard
                            Hackillinois attendance?
                        </h2>
                        <br></br>
                        <p>
                            HackIllinois is a historically welcoming space for
                            coders of all skill levels, particularly those who
                            are just starting out. This inclusive environment
                            encourages beginner-level coders to engage and
                            learn,
                            <span className={styles.emphasizedText}>
                                {" "}
                                while HackOlympians caters to more advanced
                                participants, fostering a competitive and
                                stimulating atmosphere for seasoned hackers.
                            </span>
                            <br></br>
                            <br></br>
                            All attendees from both paths will enjoy access to
                            Hacklllinois&apos;s vibrant array of events,
                            workshops, company Q&As, and the Company Expo. Each
                            path will maintain the spirit of inclusivity and
                            learning to ensure that all attendees, regardless of
                            their track, experience the full magic of
                            Hackillinois!
                            <br></br>
                            <br></br>
                            Additionally, all Hackillinois attendees are
                            eligible to compete in all our sponsored tracks.*
                            <br></br>
                            <br></br>
                            <i>
                                *The Best Beginner and General prizes are
                                reserved for Hackillinois General attendees,
                                while the Best Olympians prize is reserved for
                                HackOlympians attendees.
                            </i>
                        </p>
                    </div>
                    <div>
                        <h2>How do I become a HackOlympian?</h2>
                        <br></br>
                        <p>
                            Admission into HackOlympians requires{" "}
                            <Link href="/register/challenge/">
                                completing a special challenge
                            </Link>{" "}
                            in addition to registering.
                            <br />
                            <br />
                            <i>
                                Note: You MUST{" "}
                                <b>
                                    complete the challenge before submitting
                                    registration
                                </b>
                                . Once you submit, you can no longer complete
                                the challenge.
                            </i>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutProTrack;
