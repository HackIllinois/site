/**
 * Text of the four HackIllinois legal documents shown on /legal.
 *
 * The wording here is approved legal text. Do not edit it (including
 * punctuation) without sign-off; only the structure (headings, lists, links)
 * is presentational.
 */

export type LegalTabId =
    | "code-of-conduct"
    | "complaint-procedures"
    | "privacy-policy"
    | "terms-and-conditions";

/** A run of text, an external/mailto link, or a link to another tab. */
export type Inline =
    | string
    | { text: string; href: string }
    | { text: string; tab: LegalTabId };

export type Rich = string | Inline[];

export type Block =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: Rich }
    | { type: "ul"; items: Rich[] };

export type LegalDoc = {
    id: LegalTabId;
    /** Tab label. */
    label: string;
    /** One-line summary shown under the document title. */
    description: string;
    title: string;
    blocks: Block[];
};

const CONDUCT_EMAIL: Inline = {
    text: "conduct@hackillinois.org",
    href: "mailto:conduct@hackillinois.org"
};
const CONTACT_EMAIL: Inline = {
    text: "contact@hackillinois.org",
    href: "mailto:contact@hackillinois.org"
};

const PARTICIPANT_DEFINITION =
    "“Participant” means any individual who attends, participates in, or is otherwise involved in a HackIllinois Event, including hackers, mentors, judges, volunteers, organizers, speakers, sponsors, guests, and other authorized attendees, unless otherwise specified.";

const CHANGES_TO_POLICY: Block[] = [
    {
        type: "p",
        text: "HackIllinois may update this Privacy Policy, Terms & Conditions, Code of Conduct, and Complaint Procedures from time to time at its discretion to reflect changes in its services, event operations, applicable requirements, or organizational practices."
    },
    {
        type: "p",
        text: "The updated version will be published through the applicable HackIllinois website or service and will identify the date on which it was last updated."
    }
];

const CONTACT_US_PARAGRAPH: Block = {
    type: "p",
    text: [
        "Questions, concerns, reports, or requests regarding this Privacy Policy, Terms & Conditions, Code of Conduct, or Complaint Procedures may be directed to ",
        CONTACT_EMAIL,
        "."
    ]
};

const codeOfConduct: LegalDoc = {
    id: "code-of-conduct",
    label: "Code of Conduct",
    description:
        "Community standards, expected conduct, protected grounds, and prohibited behavior",
    title: "HackIllinois Code of Conduct",
    blocks: [
        {
            type: "p",
            text: "HackIllinois is built around the idea that people create better things when they can learn from one another, experiment freely, and work together in a welcoming environment."
        },
        {
            type: "p",
            text: "Every HackIllinois participant is expected to contribute to an environment where others can participate without being intimidated, excluded, or mistreated. All individuals participating in HackIllinois are expected to demonstrate integrity, respect, and professionalism at all times."
        },

        { type: "h2", text: "1. Definitions" },
        { type: "p", text: PARTICIPANT_DEFINITION },

        { type: "h2", text: "2. Scope" },
        {
            type: "p",
            text: "These standards apply during HackIllinois events and to event-related activities and communications, including official online spaces, social activities, workshops, project work, judging, mentorship, and other activities organized, sponsored, or facilitated by HackIllinois."
        },
        {
            type: "p",
            text: "HackIllinois may take appropriate action when conduct occurring outside an official event directly affects the safety or participation of members of the HackIllinois community or materially impacts an individual's participation in an Event."
        },

        { type: "h2", text: "3. Community Standards" },
        { type: "h3", text: "3.1. Participate in Good Faith" },
        {
            type: "p",
            text: "Participants are expected to engage with HackIllinois activities honestly and constructively. This includes participating in workshops, mentorship, judging, team formation, project development, and other Event activities without intentionally disrupting, misleading, or undermining others."
        },
        { type: "h3", text: "3.2. Give Credit" },
        {
            type: "p",
            text: "Participants should appropriately acknowledge the contributions, ideas, code, designs, resources, and other work of others. Participants must not misrepresent another person's work as their own or intentionally interfere with another participant's ability to receive appropriate recognition for their contributions."
        },
        { type: "h3", text: "3.3. Respect Consent and Boundaries" },
        {
            type: "p",
            text: "Participants must respect the physical, social, and digital boundaries of others. Do not pressure another person to interact, share personal information, participate in an activity, provide physical contact, or continue an interaction after they have indicated that they do not wish to do so."
        },
        { type: "h3", text: "3.4. Respect Shared Spaces and Resources" },
        {
            type: "p",
            text: "HackIllinois facilities, equipment, food, workspaces, and other shared resources are provided for the benefit of the community. Participants are expected to use these resources responsibly, follow applicable instructions, and avoid actions that unnecessarily prevent others from accessing or using them. Participants are expected to maintain clean and organized common areas, dispose of waste, and restore spaces to their original condition."
        },
        { type: "h3", text: "3.5. Keep Event Spaces Safe" },
        {
            type: "p",
            text: "Participants should remain aware of their surroundings and avoid conduct that could create unnecessary risks to themselves or others. Safety concerns, hazards, emergencies, or potentially dangerous conduct should be reported to an organizer or other appropriate personnel as soon as reasonably possible."
        },
        {
            type: "p",
            text: "In the case of an emergency, remain composed and follow staff guidance."
        },
        { type: "h3", text: "3.6. Support an Accessible Community" },
        {
            type: "p",
            text: "Participants should make reasonable efforts to ensure that others can participate in HackIllinois activities. This includes being considerate of differences in experience, communication style, language, ability, and access needs, and avoiding unnecessary barriers to participation."
        },
        { type: "h3", text: "3.7. Resolve Disagreements Constructively" },
        {
            type: "p",
            text: "Disagreements about ideas, projects, decisions, judging, or other Event matters are expected. Participants should address disagreements through appropriate channels rather than through intimidation, retaliation, personal attacks, or disruption of another person's participation."
        },
        { type: "h3", text: "3.8. Protect the Integrity of the Event" },
        {
            type: "p",
            text: "Participants must not intentionally manipulate, disrupt, or interfere with Event operations, registration, judging, project submissions, prizes, technical infrastructure, or other processes in a manner that undermines the Event or another participant's ability to participate."
        },
        { type: "h3", text: "3.9. Look Out for the Community" },
        {
            type: "p",
            text: "Participants who observe a serious safety concern, harassment, discrimination, or other potential violation are encouraged to notify a HackIllinois organizer or other designated reporting channel. Participants should not retaliate against or intentionally interfere with someone who makes a good-faith report or participates in an investigation."
        },
        { type: "h3", text: "3.10. Respect Event Staff" },
        {
            type: "p",
            text: "Event staff are present to ensure the event runs smoothly, safely, and inclusively. Participants are expected to treat event staff with respect and cooperation."
        },

        { type: "h2", text: "4. Protected Grounds" },
        {
            type: "p",
            text: "HackIllinois prohibits harassment and discrimination based on protected characteristics, including age, creed or religion, sex (including pregnancy and breastfeeding), sexual orientation, gender identity, gender expression, disability (including mental, physical, developmental, or learning disabilities), race, ancestry, place of origin, ethnic origin, citizenship, color, and any other characteristic protected by applicable law."
        },
        {
            type: "p",
            text: "HackIllinois may also take action against conduct that is otherwise inconsistent with the safety, dignity, or values of the HackIllinois community."
        },

        { type: "h2", text: "5. Prohibited Behavior" },
        {
            type: "p",
            text: "HackIllinois enforces a zero-tolerance policy toward any form of harassment, discrimination, or exclusionary behavior."
        },
        { type: "h3", text: "5.1. Harassment" },
        {
            type: "p",
            text: "Harassment includes unwelcome comments or actions that a person knows or reasonably should know are offensive, embarrassing, humiliating, demeaning, threatening, or otherwise unwelcome. Harassment may consist of a single serious incident or a course of conduct."
        },
        {
            type: "p",
            text: "HackIllinois prohibits stalking, bullying, and other forms of harassment."
        },
        {
            type: "p",
            text: "HackIllinois prohibits sexual and gender-based harassment."
        },
        { type: "p", text: "Examples may include:" },
        {
            type: "ul",
            items: [
                "Unwelcome sexual contact",
                "Unwelcome sexual remarks",
                "Inappropriate staring or leering",
                "Gender-related verbal abuse, threats, or taunting",
                "Unwelcome demands for dates",
                "Requests for sexual favors",
                "Displaying sexually offensive images, recordings, or material",
                "Offensive sexual jokes or comments about participants, organizers, sponsors, volunteers, or other attendees",
                "Other unwelcome sexual or gender-based conduct"
            ]
        },
        { type: "h3", text: "5.2. Discrimination" },
        {
            type: "p",
            text: "HackIllinois prohibits discrimination and unequal treatment based on protected characteristics. No participant may intentionally or unintentionally impose additional burdens, deny benefits, or otherwise disadvantage another person on the basis of a protected characteristic."
        },
        {
            type: "p",
            text: "Hate speech or offensive language based on race, gender, sexual orientation, disability, religion, or any other protected characteristic is prohibited."
        },
        { type: "h3", text: "5.3. Abusive, Lewd, or Obscene Conduct" },
        {
            type: "p",
            text: "Participants may not use electronic devices, online platforms, social media, or other communication methods to engage in illegal, abusive, lewd, offensive, indecent, sexual, obscene, threatening, or harassing conduct."
        },
        {
            type: "p",
            text: "This prohibition applies both to in-person interactions and HackIllinois-related digital spaces."
        },
        { type: "h3", text: "5.4. Threats and Violence" },
        {
            type: "p",
            text: "Threats of violence, physical intimidation, physical assault, or other conduct that creates a significant risk to the safety of another person are prohibited."
        },
        { type: "h3", text: "5.5. Alcohol, Drugs, and Weapons" },
        {
            type: "p",
            text: "Alcohol, illegal drugs, and weapons of any kind, including firearms and real or fake weapons, are prohibited at HackIllinois events except where expressly permitted by applicable law and event or University policy."
        },

        { type: "h2", text: "6. Reporting and Support Resources" },
        {
            type: "p",
            text: "All individuals participating in HackIllinois are expected to uphold this Code of Conduct and cooperate appropriately with investigations into reported violations."
        },
        {
            type: "p",
            text: "Participants who experience or witness harassment, discrimination, threats, or other serious misconduct are encouraged to report the conduct to a HackIllinois organizer or other designated event representative."
        },
        {
            type: "p",
            text: "HackIllinois strives to create a supportive and welcoming environment for all. If at any point during the event you feel unsafe, uncomfortable, or in need of assistance:"
        },
        {
            type: "ul",
            items: [
                "Reach out to a HackIllinois staff member or volunteer for support.",
                "Utilize CS Cares, a resource available to provide assistance and ensure attendees feel welcomed and supported."
            ]
        },
        {
            type: "p",
            text: [
                "Complaints can be submitted by emailing a report to ",
                CONDUCT_EMAIL,
                "."
            ]
        },
        {
            type: "p",
            text: "If you feel unwell or observe any concerning behavior, please notify event staff or contact on-site EMTs or police immediately."
        },
        {
            type: "p",
            text: [
                "For a full description of our process for handling complaints, please see the ",
                {
                    text: "HackIllinois Complaint Procedures",
                    tab: "complaint-procedures"
                },
                "."
            ]
        },

        { type: "h2", text: "7. Alignment with Other Codes of Conduct" },
        {
            type: "p",
            text: "HackIllinois fully complies with the broader Code of Conduct of the UIUC Siebel School of Computing and Data Science, and the ACM Code of Conduct."
        },
        {
            type: "p",
            text: [
                "Violations of this Code of Conduct will be taken seriously. Consequences will be determined on a case-by-case basis in accordance with the ",
                {
                    text: "HackIllinois Complaint Procedures",
                    tab: "complaint-procedures"
                },
                "."
            ]
        }
    ]
};

const complaintProcedures: LegalDoc = {
    id: "complaint-procedures",
    label: "Complaint Procedures",
    description:
        "Reporting, investigation, enforcement, consequences, appeals, and follow-up",
    title: "HackIllinois Complaint Procedures",
    blocks: [
        {
            type: "p",
            text: "This document outlines the procedures HackIllinois organizers will follow when a complaint or violation of the Code of Conduct is reported. Our goal is to ensure a fair, transparent, and respectful process for addressing concerns."
        },
        {
            type: "p",
            text: "HackIllinois organizers have a responsibility to respond appropriately to observations, reports, and allegations of harassment, discrimination, or other serious misconduct."
        },

        { type: "h2", text: "1. Submitting a Complaint" },
        {
            type: "p",
            text: [
                "Reports of misconduct or violations can be submitted confidentially via email directly to ",
                CONDUCT_EMAIL,
                "."
            ]
        },
        { type: "p", text: "Reports should include:" },
        {
            type: "ul",
            items: [
                "A description of the incident (including dates, times, and involved parties).",
                "Any supporting evidence (e.g., screenshots, witness statements).",
                "Whether the reporter wishes to remain anonymous."
            ]
        },

        { type: "h2", text: "2. Initial Review" },
        {
            type: "p",
            text: "Upon receiving a report, HackIllinois staff will:"
        },
        {
            type: "ul",
            items: [
                "Confirm receipt of the report within 2 hours (if contact information is provided).",
                "Notify the reporter of the next steps."
            ]
        },
        {
            type: "p",
            text: "The report will be forwarded to the HackIllinois Code of Conduct Committee, which consists of:"
        },
        {
            type: "ul",
            items: [
                "The HackIllinois co-directors",
                "The HackIllinois leadership team",
                "A minimum of two staff members"
            ]
        },
        {
            type: "p",
            text: "The Committee will review the report and assess whether immediate action is necessary to ensure the safety of participants."
        },

        { type: "h2", text: "3. Immediate Action" },
        {
            type: "p",
            text: "HackIllinois may require a participant to leave an Event immediately when reasonably necessary to protect the safety or well-being of participants or others, maintain Event operations, or address an actual or suspected violation of these Terms and Conditions, the Code of Conduct, applicable University policies, venue rules, or applicable law. Such immediate action may be taken before an investigation or review is completed."
        },

        { type: "h2", text: "4. Investigation" },
        { type: "p", text: "The Committee will:" },
        {
            type: "ul",
            items: [
                "Interview the reporter (if not anonymous) for additional context",
                "Speak with any witnesses identified in the report",
                "Notify the accused individual(s) of the report and provide an opportunity to respond"
            ]
        },
        {
            type: "p",
            text: "All information related to the investigation will be handled confidentially, shared only with Committee members and relevant university authorities if necessary."
        },

        { type: "h2", text: "5. Cooperation With Investigations" },
        {
            type: "p",
            text: "Individuals participating in HackIllinois are expected to cooperate in good faith with reasonable investigations into alleged harassment, discrimination, safety violations, or other serious misconduct. HackIllinois will handle reports and investigations with appropriate consideration for privacy, safety, fairness, and applicable University procedures."
        },
        {
            type: "p",
            text: "Nothing in this section prevents an individual from exercising rights provided by applicable law or University policy."
        },

        { type: "h2", text: "6. Consequences" },
        {
            type: "p",
            text: "Once the investigation is complete, the Committee will determine an appropriate course of action. Possible consequences include, but are not limited to:"
        },
        {
            type: "ul",
            items: [
                "Verbal or written warnings",
                "Removal of individuals from particular activities or areas",
                "Suspension of event privileges",
                "Removal from the event without a refund or reimbursement",
                "Revocation of participation",
                "Disqualification from awards or prizes",
                "Reporting the incident to the UIUC Office for Student Conflict Resolution (OSCR)",
                "Permanent ban from all future HackIllinois events",
                "Reporting the incident to the violator's home institution (if applicable)",
                "Referral to appropriate University officials",
                "Referral to law enforcement where appropriate",
                "Other action permitted under applicable rules or law"
            ]
        },

        { type: "h2", text: "7. Appeals Process" },
        {
            type: "p",
            text: [
                "If the accused party believes the resolution was unfair, they may submit a written appeal within 24 hours of being notified of the decision. Appeals should be sent to ",
                CONDUCT_EMAIL,
                ", where they will be reviewed by an external party (e.g., a university representative, or member of CS Cares)."
            ]
        },

        { type: "h2", text: "8. Follow Up" },
        { type: "p", text: "HackIllinois staff will:" },
        {
            type: "ul",
            items: [
                "Notify the reporter of the outcome (within confidentiality limits).",
                "Provide resources or additional support as necessary (e.g., referral to CS Cares or university counseling services).",
                "Record the incident in the event's incident log for future reference."
            ]
        },
        {
            type: "p",
            text: "The above processes will help HackIllinois Staff in maintaining a safe, inclusive event environment."
        }
    ]
};

const privacyPolicy: LegalDoc = {
    id: "privacy-policy",
    label: "Privacy Policy",
    description:
        "Personal data collection, usage, sharing, and third-party services",
    title: "HackIllinois Privacy Policy",
    blocks: [
        {
            type: "p",
            text: "HackIllinois respects the privacy, security, safety, and dignity of our participants and people who visit our website."
        },

        { type: "h2", text: "1. Scope" },
        {
            type: "p",
            text: [
                "This policy applies to websites and subdomains controlled by HackIllinois, including ",
                { text: "hackillinois.org", href: "http://hackillinois.org" },
                " and ",
                {
                    text: "info.hackillinois.org",
                    href: "http://info.hackillinois.org"
                },
                ", the HackIllinois mobile application, and other services related to marketing, sponsorship, distribution, event operations, and HackIllinois programming. This policy does not govern the privacy practices of sponsor or partner organization websites or services. Those services are governed by their own policies."
            ]
        },

        { type: "h2", text: "2. Information We Collect" },
        { type: "h3", text: "2.1. User General Demographics" },
        {
            type: "p",
            text: "Through voluntary written responses to HackIllinois Google Forms and other registration, application, survey, and event-related forms, we may collect the name, school, degree type, graduation year, location, email address, phone number, age, gender, GitHub username, race, ethnicity, resume data, emergency contact information, dietary restrictions, and other general user data."
        },
        {
            type: "p",
            text: "This information may be collected for purposes including event organization, participant communication, eligibility verification, opportunity sharing, recruiting, networking, sponsorship, marketing, and other HackIllinois operations."
        },
        { type: "h3", text: "2.2. Discord Tags" },
        {
            type: "p",
            text: "Personal data, such as Discord usernames or tags of users participating in HackIllinois-related Discord channels, may be saved to facilitate event communication, coordination, moderation, and community engagement."
        },
        { type: "h3", text: "2.3. Website Analytics" },
        {
            type: "p",
            text: "HackIllinois measures website traffic and collects website analytics through services such as Google Analytics. Analytics information may be used for purposes including understanding website usage, improving our services, marketing, and search engine optimization."
        },
        { type: "h3", text: "2.4. Authentication" },
        {
            type: "p",
            text: "HackIllinois utilizes GitHub and Google OAuth for authentication through our mobile application. Certain user data may be cached or stored on a user's device after authentication in order to maintain login sessions or provide application functionality."
        },
        { type: "h3", text: "2.5. Third-Party Services" },
        {
            type: "p",
            text: "HackIllinois uses third-party service providers and distributors as part of its systems infrastructure and event operations."
        },
        { type: "p", text: "These may include:" },
        {
            type: "ul",
            items: [
                "Websites: Netlify, Cloudflare",
                "API infrastructure: Vercel, Cloudflare",
                "Mobile applications: Apple App Store, Google Play Store"
            ]
        },
        {
            type: "p",
            text: "Users should review the privacy policies of these third-party providers for information about how those providers collect, process, and retain data."
        },
        { type: "h3", text: "2.6. Event Photography, Video, and Audio" },
        {
            type: "p",
            text: "HackIllinois may photograph, videotape, or otherwise record events, workshops, webinars, presentations, and other HackIllinois activities. These photographs and recordings may be used and shared publicly for HackIllinois promotional, educational, archival, marketing, recruiting, and organizational purposes. By attending a HackIllinois event, participants acknowledge that they may appear in photographs, videos, audio recordings, livestreams, or other event media."
        },

        { type: "h2", text: "3. How We Use and Share Personal Data" },
        { type: "h3", text: "3.1. University of Illinois Urbana-Champaign" },
        {
            type: "p",
            text: "As an organization under the University of Illinois Urbana-Champaign (UIUC), HackIllinois may work directly with UIUC staff for hackathon organization and execution. In this process, we may share information such as emergency contact information, dietary restrictions, accessibility information, or other information necessary for event administration and participant safety with appropriate UIUC hackathon staff."
        },
        { type: "h3", text: "3.2. Sponsors and Business Partners" },
        {
            type: "p",
            text: "HackIllinois may share personal information collected through our services, including information voluntarily provided through registration forms, applications, surveys, or other interactions with HackIllinois, with sponsors and business partners. Such sharing may be for purposes including event administration, recruiting, networking, career opportunities, sponsorship and business negotiations, financing, marketing, promotional activities, and other HackIllinois operations."
        },
        { type: "h3", text: "3.3. Public and User Access" },
        {
            type: "p",
            text: "Personal information shared with HackIllinois may, depending on the circumstances and the service involved, be distributed publicly or viewed by other users. Participants should exercise discretion when voluntarily sharing personal information through HackIllinois services, community platforms, project submissions, or other public-facing portions of HackIllinois events."
        },
        { type: "h3", text: "3.4. Legal Purposes" },
        {
            type: "p",
            text: "HackIllinois may disclose personal information when requested or required by a court of law, law enforcement agency, government authority, or other legal process, subject to applicable law."
        },

        { type: "h2", text: "4. Changes to This Policy" },
        ...CHANGES_TO_POLICY,

        { type: "h2", text: "5. Contact Us" },
        CONTACT_US_PARAGRAPH
    ]
};

const termsAndConditions: LegalDoc = {
    id: "terms-and-conditions",
    label: "Terms & Conditions",
    description:
        "Participation requirements, eligibility, liability, organizer authority, media release, and applicable policies",
    title: "HackIllinois Terms & Conditions",
    blocks: [
        {
            type: "p",
            text: "HackIllinois is the University of Illinois Urbana-Champaign’s premier college hackathon, as well as one of the largest hackathons in the Midwest. Our organization allows people to express their creativity, innovation, and skills through our services and platforms."
        },

        { type: "h2", text: "1. Definitions" },
        { type: "p", text: PARTICIPANT_DEFINITION },
        {
            type: "p",
            text: "Where a provision of these Terms applies only to a particular category of Participant, HackIllinois may specify that category separately."
        },

        { type: "h2", text: "2. Acceptance of Terms" },
        {
            type: "p",
            text: "Registration for, check-in at, attendance at, or participation in any component of a HackIllinois event, including workshops, activities, social events, digital platforms, project submission, judging, presentations, or other event activities, constitutes acceptance of these Terms and Conditions, the HackIllinois Privacy Policy, Code of Conduct, and Complaint Procedures. Participants are expected to read, understand, and comply with all applicable HackIllinois rules and requirements."
        },

        { type: "h2", text: "3. Participation Requirements" },
        { type: "h3", text: "3.1. Participants Under 18" },
        {
            type: "p",
            text: "HackIllinois reserves the right, in its sole discretion, to prohibit individuals under 18 from participating in an Event entirely and is not obligated to permit participation by individuals under 18. HackIllinois may restrict participation in any particular Event to individuals who are 18 years of age or older."
        },
        {
            type: "p",
            text: "If HackIllinois permits an individual under 18 to participate in an Event, HackIllinois may require the participant to obtain written consent from a parent or legal guardian and complete any waiver, release, consent form, or other documentation that HackIllinois determines is appropriate before participation. HackIllinois may establish additional requirements for participants under 18, including supervision, identification, documentation, or other conditions of participation. Failure to satisfy any applicable requirements may result in the individual being ineligible to participate."
        },
        { type: "h3", text: "3.2. Accurate Information" },
        {
            type: "p",
            text: "Participants must provide truthful and accurate information when registering for, applying to, or participating in HackIllinois. Providing false or misleading information, including information concerning identity, student status, eligibility, or other material application information, may result in:"
        },
        {
            type: "ul",
            items: [
                "Denial or revocation of participation;",
                "Removal from the event;",
                "Loss or forfeiture of prizes or benefits; and/or",
                "Other remedies available to HackIllinois under applicable law."
            ]
        },
        { type: "h3", text: "3.3. Identification" },
        {
            type: "p",
            text: "Participants may be required to wear or display HackIllinois identification badges or other event identification while participating in HackIllinois activities."
        },
        {
            type: "p",
            text: "Participants may be required to present identification when entering restricted event areas or when requested by authorized HackIllinois, University, venue, or security personnel. Failure or refusal to present identification when requested may result in denial of entry, removal from the Event, or disqualification from participation."
        },

        { type: "h2", text: "4. Event Rules and Safety" },
        {
            type: "p",
            text: "Participants must comply with all applicable facility, equipment, event, and safety rules during their participation in HackIllinois, including facility rules as outlined in the attendee guide."
        },
        {
            type: "p",
            text: "Participants must follow reasonable instructions from HackIllinois organizers, volunteers, UIUC staff, venue staff, security personnel, and other authorized representatives."
        },
        {
            type: "p",
            text: "Participants must not intentionally or recklessly create an unreasonable risk of harm to themselves or another person."
        },

        {
            type: "h2",
            text: "5. Assumption of Risk and Participant Responsibility"
        },
        { type: "h3", text: "5.1. Assumption of Risk" },
        {
            type: "p",
            text: "Participation in HackIllinois may involve risks associated with travel, Event facilities, equipment, food and beverages, physical activities, overnight participation, and interactions with other participants."
        },
        {
            type: "p",
            text: "By participating in an Event, participants acknowledge these ordinary risks and voluntarily choose to take part. Participants are responsible for exercising reasonable care for their own safety and for complying with applicable safety instructions and Event rules."
        },
        {
            type: "p",
            text: "To the fullest extent permitted by applicable law, participants agree to release and hold harmless HackIllinois, the University of Illinois Urbana-Champaign, Event sponsors, venues, volunteers, organizers, staff, and other authorized Event personnel from claims arising from risks that the participant knowingly and voluntarily assumes through participation. Nothing in this provision is intended to waive any right or protection that cannot lawfully be waived."
        },
        {
            type: "h3",
            text: "5.2. Participant Responsibility for Damage or Injury"
        },
        {
            type: "p",
            text: "A participant may be held responsible, to the extent permitted by applicable law, for damage to property or injury to another person resulting from the participant's intentional, reckless, or negligent conduct."
        },
        { type: "h3", text: "5.3. Health, Illness, and Personal Property" },
        {
            type: "p",
            text: "HackIllinois cannot guarantee that participation in an Event will be free from illness, communicable disease, food-related illness, injury, or other health or safety risks."
        },
        {
            type: "p",
            text: "Participants are responsible for making reasonable decisions regarding their own health and safety and should notify organizers of emergency information, allergies, dietary restrictions, accessibility requirements, or other information necessary to support reasonable accommodations or emergency response."
        },
        {
            type: "p",
            text: "Participants are also responsible for their personal belongings. Except where required by applicable law, HackIllinois, the University of Illinois Urbana-Champaign, sponsors, venues, and Event personnel are not responsible for personal property that is lost, damaged, or stolen during an Event."
        },

        { type: "h2", text: "6. Confidential Information and Project Ideas" },
        {
            type: "p",
            text: "Participants may voluntarily share ideas, project concepts, source code, business concepts, research, designs, and other information with other participants, sponsors, judges, organizers, or third parties during HackIllinois."
        },
        {
            type: "p",
            text: "Participants acknowledge that any information they voluntarily disclose is shared at their own discretion and risk. HackIllinois does not guarantee the confidentiality of information voluntarily disclosed to others. Participants who wish to protect information as confidential or proprietary are responsible for determining what they disclose and for taking appropriate confidentiality or security measures with the parties to whom the information is disclosed."
        },

        { type: "h2", text: "7. Media Release" },
        {
            type: "p",
            text: "By attending or participating in HackIllinois events, participants acknowledge that HackIllinois, the University of Illinois Urbana-Champaign, sponsors, partners, volunteers, and authorized representatives may photograph, record, livestream, or otherwise capture the participant's likeness, image, voice, appearance, statements, opinions, and participation in the event."
        },
        {
            type: "p",
            text: "Participants grant HackIllinois and authorized event partners the right to use such photographs, recordings, likenesses, and appearances for legitimate HackIllinois purposes, including:"
        },
        {
            type: "ul",
            items: [
                "Websites",
                "Social media",
                "Promotional materials",
                "Marketing",
                "Recruiting",
                "Publications",
                "Event documentation",
                "Educational materials",
                "News and announcements",
                "Other HackIllinois communications"
            ]
        },
        {
            type: "p",
            text: "This permission may include photographs or recordings in which a participant appears individually or as part of a group."
        },
        {
            type: "p",
            text: "Participants also acknowledge that images or recordings of projects, developments, materials, presentations, demonstrations, or other belongings brought to or created at HackIllinois may be captured as part of event photography or recording."
        },
        {
            type: "p",
            text: "To the extent permitted by applicable law, HackIllinois may edit, reproduce, publish, distribute, display, or otherwise use these materials in whole or in part and in any medium currently known or later developed."
        },
        {
            type: "p",
            text: "Participants understand that HackIllinois may continue to use event photographs and recordings after the conclusion of the event."
        },
        {
            type: "p",
            text: "Participants waive, to the extent permitted by applicable law, any right to inspect or approve the final materials before their publication or use."
        },

        { type: "h2", text: "8. Organizer Authority and Removal" },
        {
            type: "p",
            text: "HackIllinois organizers may take action when reasonably necessary to maintain participant safety, protect Event operations, or enforce these Terms and Conditions, the HackIllinois Code of Conduct, University policies, venue requirements, or applicable law."
        },
        {
            type: "p",
            text: "Depending on the circumstances, actions may include a warning, restriction from a particular activity or area, suspension of Event privileges, removal from the Event, disqualification from prizes, or referral to appropriate University or law-enforcement personnel."
        },
        {
            type: "p",
            text: "Where immediate action is reasonably necessary to protect participants, staff, volunteers, property, or the integrity of the Event, HackIllinois may require a participant to leave the Event without waiting for the completion of an investigation."
        },

        { type: "h2", text: "9. Applicable Policies" },
        {
            type: "h3",
            text: "9.1. University of Illinois and Other Applicable Policies"
        },
        {
            type: "p",
            text: "HackIllinois operates as an organization under the University of Illinois Urbana-Champaign."
        },
        {
            type: "p",
            text: "Participants may therefore also be subject to applicable University of Illinois policies, venue rules, and other rules governing conduct, safety, discrimination, harassment, alcohol, drugs, weapons, and use of University facilities."
        },
        {
            type: "p",
            text: "Where another applicable policy imposes additional requirements, participants are expected to comply with those requirements."
        },
        { type: "h3", text: "9.2. External Event Policies" },
        {
            type: "p",
            text: "HackIllinois may participate in or maintain partnerships with external organizations, networks, or governing bodies whose policies apply to HackIllinois events or participants."
        },
        {
            type: "p",
            text: "Where HackIllinois has expressly identified such requirements as applicable to an Event, participants are expected to comply with those requirements in addition to these Terms and Conditions and the HackIllinois Code of Conduct. Where an external policy conflicts with an applicable University of Illinois Urbana-Champaign policy or other mandatory requirement, the applicable University or legal requirement will govern to the extent required."
        },

        { type: "h2", text: "10. Taxes" },
        {
            type: "p",
            text: "All prizes awarded at HackIllinois are subject to applicable federal, state, and local taxes. Winners are solely responsible for reporting and paying any taxes associated with their prizes. HackIllinois and its organizers make no representations regarding the tax implications of any prize and recommend that winners consult a tax professional regarding their individual obligations."
        },

        { type: "h2", text: "11. Changes to This Policy" },
        ...CHANGES_TO_POLICY,

        { type: "h2", text: "12. Severability" },
        {
            type: "p",
            text: "If any provision of these Terms and Conditions is determined to be invalid, unlawful, or unenforceable, that provision will be enforced to the maximum extent permitted by applicable law, and the remaining provisions will continue in effect to the extent permitted by law."
        },

        { type: "h2", text: "13. Contact Us" },
        CONTACT_US_PARAGRAPH,
        {
            type: "p",
            text: [
                "Reports of misconduct or violations of the Code of Conduct may be directed to ",
                CONDUCT_EMAIL,
                "."
            ]
        },
        {
            type: "p",
            text: "For urgent safety concerns during an event, participants should contact an on-site HackIllinois organizer or appropriate emergency personnel."
        }
    ]
};

export const LEGAL_DOCS: LegalDoc[] = [
    codeOfConduct,
    complaintProcedures,
    privacyPolicy,
    termsAndConditions
];

export const DEFAULT_LEGAL_TAB: LegalTabId = "code-of-conduct";

export const isLegalTabId = (value: string | null): value is LegalTabId =>
    LEGAL_DOCS.some(doc => doc.id === value);

/** Link to /legal opened on a given tab. */
export const legalTabHref = (tab: LegalTabId) => `/legal?tab=${tab}`;
