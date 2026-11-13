import CheckboxSelect from "@/components/CheckboxSelectMUI";
import {
    FIRST_HACKATHON_OPTION,
    OTHER_MAJOR_OPTION,
    OTHER_PLEASE_SPECIFY,
    OTHER_VC_PLEASE_SPECIFY,
    US_COUNTRY_OPTION
} from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Grid, Link as MuiLink, Stack } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";
import {
    AckLinkStyle,
    ReviewField,
    ReviewFieldGrid,
    ReviewSectionCard
} from "../components/Review";
import SectionHeader from "../components/SectionHeader";
import {
    LEGAL_URL,
    MLH_CODE_OF_CONDUCT_URL,
    MLH_CONTEST_TERMS_URL,
    MLH_PRIVACY_POLICY_URL,
    OTHER_SCHOOL_OPTION,
    PRO_CHALLENGE_DEADLINE,
    PRO_TRACK_NAME
} from "../constants/registration";

type ReviewRow = {
    label: string;
    value?: string;
    hidden?: boolean;
    /** Long answers span both columns. */
    wide?: boolean;
    /** Uploaded file: shown with a paperclip. */
    attachment?: boolean;
};
type ReviewSection = { key: string; title: string; rows: ReviewRow[] };

const yesNo = (value?: boolean) =>
    value === undefined ? undefined : value ? "Yes" : "No";

const withOther = (
    values: string[] | undefined,
    otherOption: string,
    otherText: string | undefined
) =>
    values
        ?.map(value =>
            value === otherOption && otherText
                ? `${otherOption}: ${otherText}`
                : value
        )
        .join(", ");

const buildSections = (
    values: RegistrationApplicationDraftBodyForm
): ReviewSection[] => [
    {
        key: "personal",
        title: "Personal Details",
        rows: [
            { label: "First Name", value: values.firstName },
            { label: "Last Name", value: values.lastName },
            { label: "Preferred Name", value: values.preferredName },
            { label: "Phone Number", value: values.phoneNumber },
            { label: "Age", value: values.age },
            { label: "Email", value: values.email }
        ]
    },
    {
        key: "background",
        title: "Background Information",
        rows: [
            { label: "Gender", value: values.gender },
            { label: "Race / Ethnicity", value: values.race?.join(", ") },
            { label: "Country of Residence", value: values.country },
            {
                label: "State or Territory",
                value: values.state,
                hidden: values.country !== US_COUNTRY_OPTION
            },
            {
                label: "School",
                value:
                    values.school === OTHER_SCHOOL_OPTION
                        ? values.otherSchool
                        : values.school
            },
            { label: "Level of Study", value: values.education },
            { label: "Graduation", value: values.graduate },
            {
                label: "Major / Field of Study",
                value:
                    values.major === OTHER_MAJOR_OPTION && values.otherMajor
                        ? `${values.major}: ${values.otherMajor}`
                        : values.major
            },
            {
                label: "Underrepresented in tech",
                value: values.underrepresented
            },
            {
                label: "Hackathons participated in",
                value: values.hackathonsParticipated
            },
            {
                label: "Why HackIllinois as your first hackathon?",
                value: values.firstHackathonReason,
                wide: true,
                hidden: values.hackathonsParticipated !== FIRST_HACKATHON_OPTION
            }
        ]
    },
    {
        key: "application",
        title: "Application Questions",
        rows: [
            { label: "Software rank", value: values.interestSoftware },
            { label: "Hardware rank", value: values.interestHardware },
            {
                label: "Resume",
                value: values.hasResume
                    ? values.resumeFileName || "Uploaded"
                    : undefined,
                attachment: true
            },
            {
                label: "A project you enjoyed working on",
                value: values.application1,
                wide: true
            },
            {
                label: "A product you'd change",
                value: values.application2,
                wide: true
            },
            {
                label: "Why hackathons / HackIllinois",
                value: values.application3,
                wide: true
            },
            {
                label: "Anything else (optional)",
                value: values.applicationOptional,
                wide: true
            },
            {
                label: "Project portfolio (optional)",
                value: values.portfolioLink
            },
            {
                label: `Considered for ${PRO_TRACK_NAME}`,
                value: values.pro ? "Yes" : "No"
            }
        ]
    },
    {
        key: "attending",
        title: "Attending HackIllinois",
        rows: [
            {
                label: "How did you hear about HackIllinois?",
                value: withOther(
                    values.attribution,
                    OTHER_PLEASE_SPECIFY,
                    values.otherAttribution
                )
            },
            {
                label: "Most interested in",
                value: withOther(
                    values.eventInterest,
                    OTHER_PLEASE_SPECIFY,
                    values.otherEventInterest
                )
            },
            {
                label: "Travel reimbursement",
                value: yesNo(values.requestTravelReimbursement)
            },
            {
                label: "Transportation & accommodations",
                value: values.travelAcknowledge ? "I understand" : undefined
            },
            {
                label: "VC involvement",
                value: withOther(
                    values.vcInvolvement,
                    OTHER_VC_PLEASE_SPECIFY,
                    values.otherVcInvolvement
                )
            },
            {
                label: "Hardware interest",
                value: values.hardwareInterest,
                wide: true
            },
            {
                label: "Event suggestions",
                value: values.eventSuggestions,
                wide: true
            }
        ]
    }
];

interface ReviewProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    onEditStep: (step: number) => void;
    accentColor?: string;
}

const Review = ({ formik, onEditStep, accentColor }: ReviewProps) => {
    const { values, errors, touched, setFieldValue } = formik;
    const [expanded, setExpanded] = useState<string | false>("personal");
    const sections = buildSections(values);

    type AckField =
        | "reviewedAcknowledge"
        | "codeOfConductAcknowledge"
        | "mlhDataSharingAcknowledge"
        | "proChallengeAcknowledge"
        | "legalAcknowledge"
        | "mlhNewsletter"
        | "optInHackNewsletter";

    // Shared props so every checkbox matches the earlier steps.
    const ack = (field: AckField) => ({
        name: field,
        accentColor,
        value: values[field],
        onChange: (val: boolean) => setFieldValue(field, val),
        error: !!touched[field] && Boolean(errors[field]),
        helperText: touched[field] ? (errors[field] as string) : ""
    });

    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="REVIEW & SUBMIT"
                description="Check that your responses look correct. You won't be able to make changes once you submit."
            />

            <Stack spacing={{ xs: 2, md: 2.5 }}>
                {sections.map((section, index) => (
                    <ReviewSectionCard
                        key={section.key}
                        title={section.title}
                        expanded={expanded === section.key}
                        onToggle={() =>
                            setExpanded(
                                expanded === section.key ? false : section.key
                            )
                        }
                        onEdit={() => onEditStep(index)}
                    >
                        <ReviewFieldGrid>
                            {section.rows
                                .filter(row => !row.hidden)
                                .map(row => (
                                    <ReviewField
                                        key={row.label}
                                        label={row.label}
                                        value={row.value || "N/A"}
                                        wide={row.wide}
                                        attachment={
                                            row.attachment && !!row.value
                                        }
                                    />
                                ))}
                        </ReviewFieldGrid>
                    </ReviewSectionCard>
                ))}
            </Stack>

            <Grid
                container
                rowSpacing={{ xs: 3, md: 4 }}
                sx={{ mt: { xs: 4, md: 5 } }}
            >
                <Grid size={12}>
                    <CheckboxSelect
                        {...ack("reviewedAcknowledge")}
                        label="Please review the above information. Once you submit you will not be able to make changes."
                        optionLabel="I reviewed my information to ensure it is correct."
                        required
                    />
                </Grid>

                {values.pro && (
                    <Grid size={12}>
                        <CheckboxSelect
                            {...ack("proChallengeAcknowledge")}
                            label={`I understand that in order to be considered for ${PRO_TRACK_NAME}, I must complete the challenge I receive after submitting this form by ${PRO_CHALLENGE_DEADLINE}.`}
                            optionLabel="I understand"
                            required
                        />
                    </Grid>
                )}

                {/* MLH's 3 checkboxes. Each sits in its own Box because
                    CheckboxSelect fills its parent's height, so siblings
                    in one cell would overlap. */}
                <Grid size={12}>
                    <Box>
                        <CheckboxSelect
                            {...ack("codeOfConductAcknowledge")}
                            label="To participate in HackIllinois, you must agree to the following MLH policies."
                            optionLabel={
                                <>
                                    I have read and agree to the{" "}
                                    <MuiLink
                                        href={MLH_CODE_OF_CONDUCT_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={AckLinkStyle}
                                    >
                                        MLH Code of Conduct
                                    </MuiLink>
                                    .
                                </>
                            }
                            required
                        />
                    </Box>
                    <Box>
                        <CheckboxSelect
                            {...ack("mlhDataSharingAcknowledge")}
                            optionLabel={
                                <>
                                    I authorize you to share my
                                    application/registration information with
                                    Major League Hacking for event
                                    administration, ranking, and MLH
                                    administration in-line with the{" "}
                                    <MuiLink
                                        href={MLH_PRIVACY_POLICY_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={AckLinkStyle}
                                    >
                                        MLH Privacy Policy
                                    </MuiLink>
                                    . I further agree to the terms of both the{" "}
                                    <MuiLink
                                        href={MLH_CONTEST_TERMS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={AckLinkStyle}
                                    >
                                        MLH Contest Terms and Conditions
                                    </MuiLink>{" "}
                                    and the MLH Privacy Policy.
                                </>
                            }
                            required
                        />
                    </Box>
                    <Box>
                        <CheckboxSelect
                            {...ack("mlhNewsletter")}
                            optionLabel="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
                        />
                    </Box>
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        {...ack("legalAcknowledge")}
                        label="Legal Acknowledgement"
                        optionLabel={
                            <>
                                I have read and agree to the{" "}
                                <MuiLink
                                    href={LEGAL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={AckLinkStyle}
                                >
                                    HackIllinois legal terms
                                </MuiLink>
                                .
                            </>
                        }
                        required
                    />
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        {...ack("optInHackNewsletter")}
                        label="Newsletter Opt-In"
                        optionLabel="Opt-in to the HackIllinois newsletter."
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Review;
