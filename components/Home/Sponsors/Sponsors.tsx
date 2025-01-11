import { FC } from "react";

import styles from "./Sponsors.module.scss";
import BACKGROUND from "@/public/home/sponsors/sponsor-background.svg";

import Image from "next/image";
import FAQ from "@/components/FAQ/FAQ";

const Sponsors: FC = () => {
    return (
        <section className={styles.sponsorsMain}>
            <Image
                alt="background"
                src={BACKGROUND}
                className={styles.background}
            />
            <FAQ />
            {/* <div className={styles.faq}>
                <div className={styles.faqInner}>
                    <h3>What is a Hackathon?</h3>
                    <p>A hackathon is a collaborative event where teams utilize their skills to create projects that solve problems or identify new opportunities! They typically run for a short and continuous period of time. For Hacklllinois, meals will be provided.</p>
                    <h3>Are there any prizes or incentives?</h3>
                    <p>Yes! Cash prizes will be offered for winning teams in several different categories, including <Link href={"/olympians"}>HackOlympians</Link>. Additionally, there are various mini-games and events that offer plenty of opportunities to win prizes through our Point Shop!</p>
                    <h3>What is <i>HackOlympians</i>?</h3>
                    <p><Link href={"/olympians"}>HackOlympians</Link> is an exclusive path tailored for prospective attendees to dive into a competitively elevated hackathon atmosphere for an increased prize value. It's a specialized arena for experienced hackers who have mastered the fundamentals and are now looking to test their skills in a more challenging environment. Admission into HackOlympians requires completing our application, which includes a coding challenge.</p>
                </div>
                <div className={styles.faqInner}>
                    <h3>What are the benefits of being a HackOlympian?</h3>
                    <p>Attendees in this path have the exclusive opportunity to compete for the grand Olympians prize. Additionally, they will gain access to special networking opportunities with our event sponsors and the chance to present their project in a thrilling Shark-Tank inspired showcase, among other exciting perks - but spots are limited, so register soon!</p>
                    <h3>How is HackOlympians different from standard Hackillinois attendance?</h3>
                    <p>HackIllinois is a historically welcoming space for coders of all skill levels, particularly those who are just starting out. This inclusive environment encourages beginner-level coders to engage and learn, while HackOlympians caters to more advanced participants, fostering a competitive and stimulating atmosphere for seasoned hackers. All attendees from both paths will enjoy access to Hacklllinois's vibrant array of events, workshops, company Q&As, and the Company Expo. Each path will maintain the spirit of inclusivity and learning to ensure that all attendees, regardless of their track, experience the full magic of Hackillinois! Additionally, all Hackillinois attendees are eligible to compete in all our sponsored tracks.*</p>
                    <p className={styles.footnote}>*The Best Beginner and General prizes are reserved for Hackillinois General attendees, while the Best Olympians prize is reserved for HackOlympians attendees.</p>
                </div>
            </div> */}
            <h1 className={styles.sponsor}>Sponsors</h1>
        </section>
    );
};

export default Sponsors;
