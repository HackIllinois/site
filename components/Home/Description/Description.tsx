import styles from "./Description.module.scss";
import Image from "next/image";

const Description: React.FC = () => {
    return (
        <section className={styles.container}>
            <Image
                src="/backgrounds/second.png"
                alt="About background"
                fill
                className={styles.backgroundImage}
            />
            <div className={styles.content}>
                <h1>About The Event</h1>
                <p>
                    HackIllinois is University of Illinois at
                    Urbana-Champaign&apos;s premier collegiate hackathon. Join us
                    in-person from February 28th to March 2nd at the Siebel
                    Center for Computer Science!
                </p>
                <p>
                    Participants can work individually or in teams to submit
                    projects to a specific track for a chance to win prizes.
                    Whether you&apos;re a beginner or an experienced hacker,
                    HackIllinois offers workshops, mentorship, and an inclusive
                    environment for everyone to learn and create.
                </p>
            </div>
        </section>
    );
};

export default Description;
