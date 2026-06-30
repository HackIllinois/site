"use client";

import { useState } from "react";
import { Box, Typography, Tabs, Tab, Link as MuiLink } from "@mui/material";

function CodeOfConductContent({ setTab }: { setTab: (tab: number) => void }) {
    return (
        <Box>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 3
                }}
            >
                HackIllinois Code of Conduct
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                The HackIllinois Code of Conduct is established to create a
                positive, safe, and inclusive environment for all participants.
                This document sets forth the principles and expectations that
                guide the behavior of attendees, volunteers, staff, and anyone
                involved in HackIllinois.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Respect for Participants
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                All individuals participating in HackIllinois are expected to
                demonstrate integrity, respect, and professionalism at all
                times. HackIllinois enforces a zero-tolerance policy toward any
                form of harassment, discrimination, or exclusionary behavior.
                This includes, but is not limited to:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Hate speech or offensive language based on race, gender,
                    sexual orientation, disability, religion, or any other
                    protected characteristic.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Unwanted physical contact or sexual advances. Intimidation,
                    bullying, or deliberate disruption of another
                    participant&apos;s experience.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Any form of harassment, including but not limited to
                    stalking
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                If any incident of harassment or discriminatory behavior is
                reported, it will be promptly reviewed by HackIllinois staff,
                and can be escalated by event staff&apos;s discretion.
                Consequences will be determined on a case-by-case basis, and may
                include immediate removal from the event and notification of the
                appropriate university authorities. Further details on the
                consequences can be found in the{" "}
                <MuiLink
                    component="a"
                    href="#alignment-uiuc"
                    onClick={(e: { preventDefault: () => void }) => {
                        e.preventDefault();
                        document
                            .getElementById("alignment-uiuc")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                        color: "#a78bfa",
                        fontWeight: 700,
                        cursor: "pointer"
                    }}
                >
                    Alignment with UIUC Siebel School of Computing Code of
                    Conduct
                </MuiLink>{" "}
                section.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Respect for Event Spaces/Resources
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                Participants are expected to maintain the integrity of the
                spaces and resources provided by HackIllinois. This includes:
                Adhering to facility rules as outlined in the attendee guide.
                Maintain clean and organized common areas (e.g. dispose of waste
                and restore spaces to their original condition) Properly use and
                care for equipment and materials.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Adherence to Safety Protocols
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                The safety of all participants is of utmost importance.
                HackIllinois expects full cooperation with all established
                safety protocols:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 3 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    No firearms, weapons (real or fake), or any forms of
                    violence.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    In the case of an emergency, remain composed and follow
                    staff guidance.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    If you feel unwell or observe any concerning behavior,
                    please notify event staff or contact on-site EMTs or police
                    immediately.
                </Typography>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Respect for Event Staff
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                Event staff are present to ensure the event runs smoothly,
                safely, and inclusively. Participants are expected to:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 3 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Follow the instructions of HackIllinois event staff and
                    volunteers at all times.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Treat event staff with respect and cooperation.
                </Typography>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Reporting and Support Resources
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                HackIllinois strives to create a supportive and welcoming
                environment for all. If at any point during the event you feel
                unsafe, uncomfortable, or in need of assistance:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Reach out to a HackIllinois staff member or volunteer for
                    support.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Utilize CS Cares, a resource available to provide assistance
                    and ensure attendees feel welcomed and supported.
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Reports of misconduct or violations of the Code of Conduct
                    will be handled confidentially and with the utmost
                    seriousness to maintain a safe event atmosphere.
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                Reports of misconduct or violations can be submitted
                confidentially via email directly to{" "}
                <MuiLink
                    href="mailto:conduct@hackillinois.org"
                    sx={{ color: "#a78bfa", fontWeight: 700 }}
                >
                    conduct@hackillinois.org
                </MuiLink>
                , which is monitored 24/7 during HackIllinois business hours.
                All reports will be reviewed by a Code of Conduct Committee,
                which includes trained leadership and event staff. For a full
                description of our process for handling complaints, please see{" "}
                <MuiLink
                    component="button"
                    onClick={() => {
                        setTab(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    sx={{
                        color: "#a78bfa",
                        fontWeight: 700,
                        cursor: "pointer",
                        verticalAlign: "baseline",
                        fontSize: "inherit",
                        fontFamily: "inherit"
                    }}
                >
                    Complaint Procedures
                </MuiLink>{" "}
                .
            </Typography>

            <Typography
                id="alignment-uiuc"
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3,
                    scrollMarginTop: "80px"
                }}
            >
                Alignment with UIUC Siebel School of Computing Code of Conduct
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                HackIllinois fully complies with the broader Code of Conduct of
                the UIUC Siebel School of Computing and Data Science, and the
                ACM Code of Conduct. Violations of this Code of Conduct will be
                taken seriously. Consequences will be determined on a
                case-by-case basis by the designated staff members, who reserve
                the right to take immediate action, which include, but are not
                limited to:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 3 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Immediate removal from the event without a refund, or
                    reimbursement
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Reporting the incident to UIUC Office for Student Conflict
                    Resolution (OSCR) or other appropriate university
                    authorities Reporting to the violator&apos;s home
                    institution if applicable
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Ineligibility for event awards
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Permanent ban from future HackIllinois events
                </Typography>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Agreement to the Code of Conduct
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                By participating in HackIllinois, you acknowledge and agree to
                uphold this Code of Conduct. You understand that violations may
                result in immediate action, up to and including removal from the
                event and exclusion from future HackIllinois activities.
                HackIllinois is committed to maintaining an inclusive, safe, and
                productive environment for all. Thank you for contributing to
                this community and respecting the principles that allow us to
                collaborate and innovate together.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Photo and Media Consent
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                By attending HackIllinois, you consent to being photographed,
                filmed, or otherwise recorded by HackIllinois staff or
                designated media personnel. These photos, videos, and recordings
                may be used by HackIllinois for promotional purposes, including
                but not limited to social media, websites, and future event
                marketing materials.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Taxes
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                All prizes awarded at HackIllinois are subject to applicable
                federal, state, and local taxes. Winners are solely responsible
                for reporting and paying any taxes associated with their prizes.
                HackIllinois and its organizers make no representations
                regarding the tax implications of any prize and recommend that
                winners consult a tax professional regarding their individual
                obligations.
            </Typography>
        </Box>
    );
}

function ComplaintProceduresContent() {
    return (
        <Box>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 3
                }}
            >
                HackIllinois Complaint Procedures
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                This document outlines the procedures HackIllinois organizers
                will follow when a complaint or violation of the Code of Conduct
                is reported. Our goal is to ensure a fair, transparent, and
                respectful process for addressing concerns.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Submitting a Complaint
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                Complaints can be submitted by emailing a report to{" "}
                <MuiLink
                    href="mailto:conduct@hackillinois.org"
                    sx={{ color: "#a78bfa", fontWeight: 700 }}
                >
                    conduct@hackillinois.org
                </MuiLink>
                . Reports should include:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 3 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    A description of the incident (including dates, times, and
                    involved parties).
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Any supporting evidence (e.g., screenshots, witness
                    statements).
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Whether the reporter wishes to remain anonymous.
                </Typography>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Initial Review
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                Upon receiving a report, HackIllinois staff will:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Confirm receipt of the report within 2 hours (if contact
                    information is provided).
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Notify the reporter of the next steps.
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                The report will be forwarded to the HackIllinois Code of Conduct
                Committee, which consists of:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    The HackIllinois co-directors
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    The HackIllinois leadership team
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    A minimum of two trained staff members
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                The Committee will review the report and assess whether
                immediate action is necessary to ensure the safety of
                participants.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Investigation
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                The Committee will:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Interview the reporter (if not anonymous) for additional
                    context
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Speak with any witnesses identified in the report
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Notify the accused individual(s) of the report and provide
                    an opportunity to respond
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                All information related to the investigation will be handled
                confidentially, shared only with Committee members and relevant
                university authorities if necessary.
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Consequences
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                Once the investigation is complete, the Committee will determine
                an appropriate course of action. Possible consequences include,
                but are not limited to:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 3 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    A formal warning
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Removal from the event without a refund
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Disqualification from awards or prizes
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Reporting the incident to the UIUC Office for Student
                    Conflict Resolution (OSCR)
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Permanent ban from all future HackIllinois events
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Reporting the incident to the violator&apos;s home
                    institution (if applicable)
                </Typography>
            </Box>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Appeals Process
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                If the accused party believes the resolution was unfair, they
                may submit a written appeal within 24 hours of being notified of
                the decision. Appeals should be sent to{" "}
                <MuiLink
                    href="mailto:conduct@hackillinois.org"
                    sx={{ color: "#a78bfa", fontWeight: 700 }}
                >
                    conduct@hackillinois.org
                </MuiLink>
                , where they will be reviewed by an external party (e.g., a
                university representative, or member of CS Cares).
            </Typography>

            <Typography
                variant="h5"
                component="h2"
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    mb: 1.5,
                    mt: 3
                }}
            >
                Follow Up
            </Typography>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 1.5,
                    lineHeight: 1.7
                }}
            >
                HackIllinois staff will:
            </Typography>
            <Box component="ul" sx={{ ml: 3, mb: 2 }}>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Notify the reporter of the outcome (within confidentiality
                    limits).
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Provide resources or additional support as necessary (e.g.,
                    referral to CS Cares or university counseling services).
                </Typography>
                <Typography
                    component="li"
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        mb: 0.5,
                        lineHeight: 1.7
                    }}
                >
                    Record the incident in the event&apos;s incident log for
                    future reference.
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: "Montserrat, sans-serif",
                    mb: 3,
                    lineHeight: 1.7
                }}
            >
                The above processes will help HackIllinois Leadership in
                maintaining a safe, inclusive event environment.
            </Typography>
        </Box>
    );
}

const Legal: React.FC = () => {
    const [tab, setTab] = useState(0);

    return (
        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
            <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                sx={{
                    mb: 4,
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#a78bfa"
                    },
                    "& .MuiTab-root": {
                        fontFamily: "Montserrat, sans-serif",
                        color: "rgba(255, 255, 255, 0.6)",
                        textTransform: "none",
                        fontSize: "16px",
                        "&.Mui-selected": {
                            color: "white"
                        }
                    }
                }}
            >
                <Tab label="Code of Conduct" />
                <Tab label="Complaint Procedures" />
            </Tabs>
            {tab === 0 && <CodeOfConductContent setTab={setTab} />}
            {tab === 1 && <ComplaintProceduresContent />}
        </Box>
    );
};

export default Legal;
