import React, { useState } from "react";
import { RegistrationType } from "@/util/types";
import {
    AccordionDetails,
    Box,
    Link as MuiLink,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";
import {
    ReviewContainer,
    StyledAccordion,
    StyledAccordionDetails,
    AccordionHeader,
    ReviewInfoAccordionBox,
    UserInfoBox
} from "../components/Review";
import { Checkbox, FormControlLabel, ThemeProvider } from "@mui/material";
import { registrationTheme } from "../theme";

interface ReviewProps {
    formik: FormikProps<RegistrationType>;
    onEditStep: (step: number) => void;
}

const Review = ({ formik, onEditStep }: ReviewProps) => {
    const { values } = formik;
    const [expanded, setExpanded] = useState<string | false>("personal");

    const handleExpand =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            <ThemeProvider theme={registrationTheme}>
                <ReviewContainer>
                    <Typography variant="h1">REVIEW INFORMATION</Typography>

                    {/* Personal Details accordion */}
                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "personal"}
                        onChange={handleExpand("personal")}
                    >
                        <AccordionHeader
                            title="Personal Details"
                            isExpanded={expanded === "personal"}
                            onEdit={() => onEditStep(0)}
                        />
                        <StyledAccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="First Name"
                                    userResponse={"TODO"}
                                />
                                <UserInfoBox
                                    label="Last Name"
                                    userResponse={"TODO"}
                                />
                                <UserInfoBox
                                    label="Preferred Name"
                                    userResponse={values.preferredName || "N/A"}
                                />
                                <UserInfoBox
                                    label="Age"
                                    userResponse={"TODO"}
                                />
                                <UserInfoBox
                                    label="Email"
                                    userResponse={values.emailAddress || "N/A"}
                                />
                            </ReviewInfoAccordionBox>
                        </StyledAccordionDetails>
                    </StyledAccordion>

                    {/* Background Information accordion */}
                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "background"}
                        onChange={handleExpand("background")}
                    >
                        <AccordionHeader
                            title="Background Information"
                            isExpanded={expanded === "background"}
                            onEdit={() => onEditStep(1)}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="Gender"
                                    userResponse={values.gender || "N/A"}
                                />
                                <UserInfoBox
                                    label="Race/Ethnicity"
                                    userResponse={
                                        values.race.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Country of Residence"
                                    userResponse={"TODO"}
                                />
                                {/* {values.country === "(US label)" && (
                                    <UserInfoBox
                                        label="(State/Territory of Residence)"
                                        userResponse={"TODO"}
                                    />
                                )} */}
                                <UserInfoBox
                                    label="School"
                                    userResponse={values.university || "N/A"}
                                />
                                <UserInfoBox
                                    label="Level of Study"
                                    userResponse={values.degree || "N/A"}
                                />
                                <UserInfoBox
                                    label="Graduation Year"
                                    userResponse={
                                        values.gradYear.toString() || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Major/Field of Study"
                                    userResponse={values.major || "N/A"}
                                />
                                <UserInfoBox
                                    label="Do you identify as part of an underrepresented group in the technology industry?"
                                    userResponse={"TODO"}
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Hack-Specific accordion */}
                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "specific"}
                        onChange={handleExpand("specific")}
                    >
                        <AccordionHeader
                            title="Application Questions"
                            isExpanded={expanded === "specific"}
                            onEdit={() => onEditStep(2)}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="What opportunity, event, or feature of HackIllinois 2026 are you most excited to take part in, and why?"
                                    userResponse={values.hackEssay1 || "N/A"}
                                />
                                <UserInfoBox
                                    label="Describe a challenge you have faced in the field of CS, and how you overcame it. This challenge can be related to a project, work or volunteer experience, diversity/inclusion, etc."
                                    userResponse={values.hackEssay2 || "N/A"}
                                />
                                <UserInfoBox
                                    label="Optional: If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                                    userResponse={values.optionalEssay || "N/A"}
                                />
                                <UserInfoBox
                                    label="Would you like to be considered for (pro track)?"
                                    // TODO: rename to considerForPro
                                    userResponse={
                                        values.considerForGeneral === undefined
                                            ? "N/A"
                                            : values.considerForGeneral
                                              ? "Yes"
                                              : "No"
                                    }
                                />
                                {/* {values.considerForPro && (
                                    <UserInfoBox
                                        label="(Pro question)"
                                        userResponse={values.proEssay || "N/A"}
                                    />
                                )} */}
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Attendance accordion */}
                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "attendance"}
                        onChange={handleExpand("attendance")}
                    >
                        <AccordionHeader
                            title="Attending HackIllinois"
                            isExpanded={expanded === "attendance"}
                            onEdit={() => onEditStep(3)}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="How did you hear about HackIllinois?"
                                    userResponse={
                                        values.hackOutreach.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Which of these are you most interested in participating in during the hackathon?"
                                    userResponse={
                                        values.hackInterest.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Would you like to be considered for travel reimbursement?"
                                    userResponse={
                                        values.requestedTravelReimbursement ===
                                        undefined
                                            ? "N/A"
                                            : values.requestedTravelReimbursement
                                              ? "Yes"
                                              : "No"
                                    }
                                />
                                <UserInfoBox
                                    label="If you attend HackIllinois, you are responsible for your own transportation and accommodations."
                                    userResponse={"TODO"}
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Acknowledgements */}
                    <Box>
                        <Box
                            mt={2}
                            p={2}
                            borderRadius={4}
                            border="1px solid white"
                            bgcolor="#f6f6f67A"
                        >
                            <Box>
                                <Typography variant="body1" sx={{ mt: 0 }}>
                                    Please review the above information.
                                </Typography>
                                <Typography variant="body1">
                                    Once you submit you will not be able to
                                    change any information without contacting
                                    us.
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                formik.values
                                                    .reviewedInformationAcknowledge
                                                    .length > 0
                                            }
                                            onChange={e =>
                                                formik.setFieldValue(
                                                    "reviewedInformationAcknowledge",
                                                    e.target.checked
                                                        ? ["yes"]
                                                        : []
                                                )
                                            }
                                        />
                                    }
                                    label="I reviewed my information to ensure it is correct."
                                />
                            </Box>

                            <Box mt={3}>
                                <Typography variant="body1">
                                    To participate in HackIllinois, you must
                                    accept our{" "}
                                    <MuiLink
                                        href="/legal/code-of-conduct"
                                        target="_blank"
                                        underline="hover"
                                    >
                                        Code of Conduct
                                    </MuiLink>
                                    .
                                </Typography>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                formik.values
                                                    .codeOfConductAcknowledge
                                                    .length > 0
                                            }
                                            onChange={e =>
                                                formik.setFieldValue(
                                                    "codeOfConductAcknowledge",
                                                    e.target.checked
                                                        ? ["yes"]
                                                        : []
                                                )
                                            }
                                        />
                                    }
                                    label="I accept the Code of Conduct."
                                />
                            </Box>
                        </Box>
                    </Box>
                </ReviewContainer>
            </ThemeProvider>
        </>
    );
};

export default Review;
