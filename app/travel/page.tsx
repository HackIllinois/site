import type { Metadata } from "next";
import TravelScene from "./scene/TravelScene";
import Reimbursement from "./reimbursement/Reimbursement";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
    title: "Travel Information | HackIllinois 2027",
    description:
        "Travel reimbursement requirements and regional reimbursement caps for HackIllinois."
};

export default function TravelPage() {
    return (
        <main className={styles.page}>
            <TravelScene />
            <section className={styles.hero} aria-labelledby="travel-title">
                <h1 id="travel-title">Travel Information</h1>
            </section>
            <section
                className={styles.board}
                aria-labelledby="reimbursement-title"
            >
                <div className={styles.introduction}>
                    <h2 id="reimbursement-title">
                        HackIllinois is offering travel reimbursements for
                        qualifying attendees!
                    </h2>
                    <div className={styles.introCopy}>
                        <p>
                            Participants must opt in for travel reimbursements
                            during HackIllinois registration. Opting in will not
                            impact your chances of being admitted to the event.
                        </p>
                        <p>
                            To be qualified for reimbursement, please complete
                            the requirements below:
                        </p>
                    </div>
                </div>
                <ol
                    className={styles.requirements}
                    aria-label="Reimbursement requirements"
                >
                    <li>RSVP &quot;Yes&quot; to attend HackIllinois</li>
                    <li>Attend HackIllinois in person</li>
                    <li>Submit a qualifying project</li>
                </ol>
                <p className={styles.warning}>
                    Warning: Failure to meet any of these requirements will
                    result in disqualification from receiving reimbursement.
                </p>
                <div className={styles.details}>
                    <Reimbursement />
                    <aside
                        className={styles.policy}
                        aria-label="Reimbursement policy"
                    >
                        <p>
                            Disclaimer: The determination of reimbursement
                            amounts is influenced by several factors, including
                            but not limited to an applicant&apos;s geographic
                            location and their distance from the University of
                            Illinois Urbana-Champaign campus. Although a
                            preliminary reimbursement amount may be indicated
                            upon acceptance, please understand that this amount
                            is <strong>not guaranteed</strong> and may be
                            subject to adjustments based on the final review of
                            eligibility criteria.
                        </p>
                        <p>
                            For further questions, please reach out to{" "}
                            <a href="mailto:contact@hackillinois.org">
                                contact@hackillinois.org
                            </a>
                            .
                        </p>
                    </aside>
                </div>
            </section>
        </main>
    );
}
