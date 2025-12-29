"use client";
import React from "react";
import InteractiveMap from "./InteractiveMap";
import styles from "./styles.module.scss";

const TravelPage: React.FC = () => {
    return (
        <main className={styles.main}>
            <div className={styles.travelSection}>
                {/* Ellipse - Full width background */}
                <div className={styles.ellipseSection}>
                    <img
                        src="/travel/ellipse.svg"
                        alt="Ellipse"
                        className={styles.ellipseImage}
                    />
                    <svg
                        className={styles.ellipseTextSvg}
                        viewBox="0 0 1512 2101"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <path
                                id="ellipseCurve"
                                d="M 90,230 A 668,200 0 0,1 1412,230"
                            />
                        </defs>
                        <text className={styles.ellipseTextPath}>
                            <textPath
                                href="#ellipseCurve"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                For HackIllinois 2026, we are excited to offer
                                travel reimbursements to qualifying attendees!
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* Content Over the Ellipse */}
                <div className={styles.content}>
                    <h1 className={styles.title}>TRAVEL DETAILS</h1>

                    {/* Requirements Section */}
                    <div className={styles.requirementsSection}>
                        <h2 className={styles.sectionTitle}>
                            To be considered for reimbursement:
                        </h2>
                        <p className={styles.requirementText}>
                            Participants must opt-in during the registration
                            process for HackIllinois and this will not impact
                            their chances of being admitted to the event.
                        </p>
                    </div>

                    {/* Qualified Section */}
                    <div className={styles.qualifiedSection}>
                        <h2 className={styles.sectionTitle}>
                            To be qualified for reimbursement:
                        </h2>
                        <div className={styles.requirementsGrid}>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/RSVPYes.svg"
                                        alt="RSVP"
                                        className={styles.requirementIcon}
                                    />
                                </div>
                                <p className={styles.requirementText}>
                                    RSVP "Yes" to attend HackIllinois
                                </p>
                            </div>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/AttendGlobe.svg"
                                        alt="Attend"
                                        className={styles.requirementIcon}
                                    />
                                </div>
                                <p className={styles.requirementText}>
                                    Attend HackIllinois in person
                                </p>
                            </div>
                            <div className={styles.requirementItem}>
                                <div className={styles.iconContainer}>
                                    <img
                                        src="/travel/Submit.svg"
                                        alt="Submit"
                                        className={styles.requirementIcon}
                                    />
                                </div>
                                <p className={styles.requirementText}>
                                    Submit a qualifying project
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer Section */}
                    <div className={styles.disclaimerSection}>
                        <p className={styles.disclaimerText}>
                            Please be aware that failing to meet any of these
                            requirements may result in disqualification from
                            receiving any reimbursement.
                        </p>
                        <p className={styles.disclaimerText}>
                            The determination of reimbursement amounts is
                            influenced by several factors, including but not
                            limited to an applicant's geographic location and
                            their distance from the University of Illinois
                            Urbana-Champaign campus. Although a preliminary
                            reimbursement amount may be indicated upon
                            acceptance, please understand that this amount is not
                            guaranteed and may be subject to adjustments based on
                            the final review of eligibility criteria.
                        </p>
                    </div>

                    {/* Reimbursement Section */}
                    <div className={styles.reimbursementSection}>
                        <h2 className={styles.sectionTitle}>
                            REIMBURSEMENT CAPS:
                        </h2>
                        <div className={styles.usMapContainer}>
                            <InteractiveMap className={styles.usMap} />
                            <div className={styles.legendWrapper}>
                                <img
                                    src="/travel/key.svg"
                                    alt="Key"
                                    className={styles.legend}
                                />
                                <div className={styles.internationalContainer}>
                                    <div className={styles.internationalWrapper}>
                                        <img
                                            src="/travel/Group 912.png"
                                            alt="International"
                                            className={styles.internationalIcon}
                                        />
                                        <img
                                            src="/travel/international popup.svg"
                                            alt="International Popup"
                                            className={styles.internationalPopup}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className={styles.contactSection}>
                        <p className={styles.contactText}>
                            For further questions, please contact{" "}
                            <a
                                href="mailto:travel@hackillinois.org"
                                className={styles.contactLink}
                            >
                                travel@hackillinois.org
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom Wave Footer - Over the ellipse at the bottom */}
                <div className={styles.bottomWave}>
                    <img
                        src="/travel/bottom.svg"
                        alt="Bottom Wave"
                        className={styles.bottomWaveImage}
                    />
                </div>
            </div>
        </main>
    );
};

export default TravelPage;
