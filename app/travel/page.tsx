"use client";
import Head from "next/head";
import Background from "@/public/travel/background/background.svg";
import ScrollMobile from "@/public/travel/items/scroll-mobile.svg";
import ScrollDesktop from "@/public/travel/items/scroll-desktop.svg";
import Chariot from "@/public/travel/items/chariot.svg";
import styles from "./styles.module.scss";
import Image from "next/image";
import useWindowSize from "@/hooks/use-window-size";

const Travel: React.FC = () => {
    const windowSizeHook = useWindowSize();

    return (
        <>
            <Head>
                <title>HackIllinois | Travel</title>
            </Head>
            <div
                className={styles.container}
                style={{
                    backgroundImage: `url(${Background.src})`
                }}
            >
                <div className={styles.travelDetails}>
                    <Image
                        className={styles.chariot}
                        src={Chariot.src}
                        alt="Chariot"
                        width={200}
                        height={160}
                    />
                    <h3>TRAVEL DETAILS</h3>
                </div>
                <div className={styles.overlayContainer}>
                    <Image
                        src={
                            windowSizeHook?.width &&
                            windowSizeHook?.width <= 768
                                ? ScrollMobile.src
                                : ScrollDesktop.src
                        }
                        alt="Scroll"
                        width={300}
                        height={300}
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                            <p>
                                {
                                    "For HackIllinois 2025, we are excited to offer travel reimbursements to qualifying attendees. To be considered for reimbursement, participants must opt-in during the registration process for HackIllinois."
                                }
                            </p>
                            <p>
                                {
                                    "It's important to note that opting in for reimbursement consideration will not impact your chances of being admitted to the event."
                                }
                            </p>
                            <p>
                                To qualify for reimbursement, attendees{" "}
                                <b>must</b> meet the following criteria:
                            </p>
                            <ul>
                                <li>
                                    Receive an acceptance to HackIllinois with a
                                    specified reimbursement amount notified in
                                    their acceptance portal.
                                </li>
                                <li>RSVP ‘Yes’ to attend HackIllinois.</li>
                                <li>Attend HackIllinois 2025 in person.</li>
                                <li>
                                    Submit a qualifying project for the
                                    HackIllinois hackathon.
                                </li>
                            </ul>
                            <p>
                                Please be aware that failing to meet any of
                                these requirements will result in
                                disqualification from receiving any
                                reimbursement.
                            </p>
                            <p>
                                The determination of reimbursement amounts is
                                influenced by several factors, including but not
                                limited to an applicant’s geographic location
                                and their distance from the University of
                                Illinois Urbana-Champaign campus. Although a
                                preliminary reimbursement amount may be
                                indicated upon acceptance, please understand
                                that this amount is not guaranteed and may be
                                subject to adjustments based on the final review
                                of eligibility criteria.
                            </p>
                            <p>
                                For further questions regarding travel logistics
                                or reimbursement, please contact{" "}
                                <a href="mailto:travel@hackillinois.org">
                                    travel@hackillinois.org
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Travel;
