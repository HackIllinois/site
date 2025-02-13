const CodeOfConduct: React.FC = () => {
    return (
        <>
            <section id="introduction">
                <h1>HackIllinois Complaint Procedures</h1>
                <p>
                    This document outlines the procedures HackIllinois
                    organizers will follow when a complaint or violation of the
                    Code of Conduct is reported. Our goal is to ensure a fair,
                    transparent, and respectful process for addressing concerns.
                </p>
            </section>
            <section id="submitting-a-complaint">
                <a href="#submitting-a-complaint">
                    <h2>Submitting a Complaint</h2>
                </a>
                <p>
                    Complaints can be submitted by emailing a report to{" "}
                    <a href="mailto:conduct@hackillinois.org">
                        conduct@hackillinois.org
                    </a>
                    . Reports should include:
                </p>
                <ul>
                    <li>
                        A description of the incident (including dates, times,
                        and involved parties).
                    </li>
                    <li>
                        Any supporting evidence (e.g., screenshots, witness
                        statements).
                    </li>
                    <li>Whether the reporter wishes to remain anonymous.</li>
                </ul>
            </section>
            <section id="initial-review">
                <a href="#initial-review">
                    <h2>Initial Review</h2>
                </a>
                <p>Upon receiving a report, HackIllinois staff will:</p>
                <ul>
                    <li>
                        Confirm receipt of the report within 2 hours (if contact
                        information is provided).
                    </li>
                    <li>Notify the reporter of the next steps.</li>
                </ul>
                <br />
                <p>
                    The report will be forwarded to the HackIllinois Code of
                    Conduct Committee, which consists of:
                </p>
                <ul>
                    <li>The HackIllinois co-directors</li>
                    <li>The HackIllinois leadership team</li>
                    <li>A minimum of two trained staff members</li>
                </ul>
                <br />
                <p>
                    The Committee will review the report and assess whether
                    immediate action is necessary to ensure the safety of
                    participants.
                </p>
            </section>
            <section id="investigation">
                <a href="#investigation">
                    <h2>Investigation</h2>
                </a>
                <p>The Committee will:</p>
                <ul>
                    <li>
                        Interview the reporter (if not anonymous) for additional
                        context
                    </li>
                    <li>Speak with any witnesses identified in the report</li>
                    <li>
                        Notify the accused individual(s) of the report and
                        provide an opportunity to respond
                    </li>
                </ul>
                <br />
                <p>
                    All information related to the investigation will be handled
                    confidentially, shared only with Committee members and
                    relevant university authorities if necessary.
                </p>
            </section>
            <section id="consequences">
                <a href="#consequences">
                    <h2>Consequences</h2>
                </a>
                <p>
                    Once the investigation is complete, the Committee will
                    determine an appropriate course of action. Possible
                    consequences include, but are not limited to:
                </p>
                <ul>
                    <li>A formal warning</li>
                    <li>Removal from the event without a refund</li>
                    <li>Disqualification from awards or prizes</li>
                    <li>
                        Reporting the incident to the UIUC Office for Student
                        Conflict Resolution (OSCR)
                    </li>
                    <li>Permanent ban from all future HackIllinois events</li>
                    <li>
                        Reporting the incident to the violator’s home
                        institution (if applicable)
                    </li>
                </ul>
            </section>
            <section id="appeals-process">
                <a href="#appeals-process">
                    <h2>Appeals Process</h2>
                </a>
                <p>
                    If the accused party believes the resolution was unfair,
                    they may submit a written appeal within 24 hours of being
                    notified of the decision. Appeals should be sent to{" "}
                    <a href="mailto:conduct@hackillinois.org">
                        conduct@hackillinois.org
                    </a>
                    , where they will be reviewed by an external party (e.g., a
                    university representative, or member of CS Cares).
                </p>
            </section>
            <section id="follow-up">
                <a href="#follow-up">
                    <h2>Follow Up</h2>
                </a>
                <p>HackIllinois staff will:</p>
                <ul>
                    <li>
                        Notify the reporter of the outcome (within
                        confidentiality limits).
                    </li>
                    <li>
                        Provide resources or additional support as necessary
                        (e.g., referral to CS Cares or university counseling
                        services).
                    </li>
                    <li>
                        Record the incident in the event’s incident log for
                        future reference.
                    </li>
                </ul>
                <br />
                <p>
                    The above processes will help HackIllinois Leadership in
                    maintaining a safe, inclusive event environment.
                </p>
            </section>
        </>
    );
};

export default CodeOfConduct;
