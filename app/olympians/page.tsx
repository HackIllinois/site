import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

const AboutProTrack: React.FC = () => {
    return (
        <section className={styles.proTrackPage}>
            <div className={styles.title}>
                <h1>
                    Introducing{" "}
                    <b>
                        Hack<em>Olympians!</em>
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
                        <em>specialized arena for experienced hackers</em> who
                        have mastered the fundamentals and are now looking to
                        test their skills in a more challenging environment.
                    </p>
                </div>
                <div>
                    <h2>What are the benefits of being a HackOlympian?</h2>
                    <br></br>
                    <p>
                        Attendees in this path have the exclusive opportunity to
                        compete for the{" "}
                        <em>grand HackOlympians prize of $2,000.</em>
                        <br></br>
                        <br></br>
                        Additionally, they will gain access to{" "}
                        <em>special networking opportunities</em> with our event
                        sponsors and the chance to present their project in a{" "}
                        <em>thrilling Shark-Tank inspired showcase</em>, among
                        other exciting perks – but spots are limited, so
                        register soon!
                    </p>
                </div>
                <div>
                    <h2>
                        How is HackOlympians different from standard
                        HackIllinois attendance?
                    </h2>
                    <br></br>
                    <p>
                        HackIllinois is a historically welcoming space for all
                        skill levels, especially for beginner-level coders. We
                        created{" "}
                        <em>
                            HackOlympians to be inclusive of advanced skill
                            levels and create a more engaging environment for
                            seasoned hackers.
                        </em>
                        <br></br>
                        <br></br>
                        All attendees from both paths will enjoy access to
                        HackIllinois&apos;s vibrant array of events, workshops,
                        company Q&As, and the Company Expo. Each path will
                        maintain the spirit of inclusivity and learning to
                        ensure that all attendees, regardless of their track,
                        experience the full magic of HackIllinois!
                        <br></br>
                        <br></br>
                        Additionally, all HackIllinois attendees are eligible to
                        compete in all our sponsored tracks.*
                        <br></br>
                        <br></br>
                        <i>
                            *The Best Beginner and General tracks are reserved
                            for HackIllinois General attendees, while the Best
                            HackOlympians track is reserved for HackOlympians
                            attendees.
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
                            . Once you submit, you can no longer complete the
                            challenge.
                        </i>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutProTrack;
