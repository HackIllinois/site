import { FC } from "react";

import styles from "./Events.module.scss";
import CLOUDS from "@/public/home/events/clouds.svg";

import Image from "next/image";

const Events: FC = () => {
    return (
        <section className={styles.eventsMain}>
            <Image alt="clouds" src={CLOUDS} className={styles.clouds} />
            <div className={styles.eventDescription}>
                <h1>The Event</h1>
                <p>
                    HackIllinois is University of Illinois at
                    Urbana-Champaign&apos;s premiere collegiate hackathon.
                </p>
                <p>
                    Join us in-person from February 28th to March 2nd at the
                    Siebel Center for Computer Science! Participants can work
                    individually or in teams to submit projects to a specific
                    track for a chance to win prizes.{" "}
                </p>
                <p>
                    <b>
                        <i>Pursue your prophecy!</i>
                    </b>
                </p>
            </div>
        </section>
    );
};

export default Events;
