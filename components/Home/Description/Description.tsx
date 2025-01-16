import styles from "./Description.module.scss";

import Image from "next/image";
import BACKGROUND from "@/public/home/description/background.svg";

const Description: React.FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.main}>
                <h1>The Event</h1>
                <p>
                    HackIllinois is University of Illinois at
                    Urbana-Champaign&apos;s premier collegiate hackathon.
                </p>
                <p>
                    Join us in-person from February 28th to March 2nd at the
                    Siebel Center for Computer Science!
                </p>
                <p>
                    Participants can work individually or in teams to submit
                    projects to a specific track for a chance to win prizes.
                </p>
                <p>
                    <strong>Pursue your prophecy!</strong>
                </p>
            </div>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
        </section>
    );
};

export default Description;
