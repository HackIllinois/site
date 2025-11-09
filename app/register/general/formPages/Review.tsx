import React, { useState } from "react";
import { RegistrationType } from "@/util/types";
import {
    AccordionDetails,
    Box,
    FormHelperText,
    Link as MuiLink,
    ThemeProvider,
    Typography
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import { FormikProps } from "formik";
import {
    ReviewContainer,
    StyledAccordion,
    StyledAccordionDetails,
    AccordionHeader,
    ReviewInfoAccordionBox,
    UserInfoBox
} from "../components/Review";
import { registrationTheme } from "../theme";

interface ReviewProps {
    formik: FormikProps<RegistrationType>;
    onEditStep: (step: number) => void;
}

const Review = ({ formik, onEditStep }: ReviewProps) => {
    const { values, errors, touched, handleChange } = formik;
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
                                    userResponse={values.firstName}
                                />
                                <UserInfoBox
                                    label="Last Name"
                                    userResponse={values.lastName}
                                />
                                <UserInfoBox
                                    label="Preferred Name"
                                    userResponse={values.preferredName || "N/A"}
                                />
                                <UserInfoBox
                                    label="Age"
                                    userResponse={values.age}
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
                                    label="Level of Study"
                                    userResponse={values.studyLevel || "N/A"}
                                />
                                <UserInfoBox
                                    label="School"
                                    userResponse={values.school || "N/A"}
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
                                    label="Country of Residence"
                                    userResponse={values.country}
                                />
                                {values.country === "United States" && (
                                    <UserInfoBox
                                        label="State/Territory"
                                        userResponse={values.state}
                                    />
                                )}
                                <UserInfoBox
                                    label="Race/Ethnicity"
                                    userResponse={
                                        values.race.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Gender"
                                    userResponse={values.gender || "N/A"}
                                />
                                <UserInfoBox
                                    label="Do you identify as part of an underrepresented group in the technology industry?"
                                    userResponse={
                                        values.underrepresented ? "Yes" : "No"
                                    }
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Application Questions accordion */}
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
                                    userResponse={
                                        values.considerForPro === undefined
                                            ? "N/A"
                                            : values.considerForPro
                                              ? "Yes"
                                              : "No"
                                    }
                                />
                                {values.considerForPro && (
                                    <UserInfoBox
                                        label="TODO: PRO ESSAY PROMPT"
                                        userResponse={values.proEssay}
                                    />
                                )}
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* Attendaning HackIllinois accordion */}
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
                                    userResponse={
                                        values.travelAcknowledge
                                            ? "Acknowledged"
                                            : "N/A"
                                    }
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
                                <Typography variant="body1" sx={{ mt: "4px" }}>
                                    Once you submit you will not be able to
                                    change any information without contacting
                                    us.
                                </Typography>

                                <CheckboxSelect
                                    name="reviewedAcknowledge"
                                    accentColor="#983300"
                                    optionLabel="I reviewed my information to ensure it is correct."
                                    optionLabelSx={{
                                        fontFamily: `Montserrat, sans-serif`,
                                        fontSize: "22px",
                                        color: "#fff",
                                        fontWeight: 400,
                                        "@media (max-width:560px)": {
                                            fontSize: "18px"
                                        }
                                    }}
                                    value={values.reviewedAcknowledge}
                                    onChange={val =>
                                        formik.setFieldValue(
                                            "reviewedAcknowledge",
                                            val
                                        )
                                    }
                                    error={
                                        !!touched.reviewedAcknowledge &&
                                        Boolean(errors.reviewedAcknowledge)
                                    }
                                />
                                {touched.reviewedAcknowledge &&
                                errors.reviewedAcknowledge ? (
                                    <FormHelperText
                                        error
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            "&.Mui-error": {
                                                color: "white"
                                            },
                                            border: "1px solid rgba(255, 0, 0, 0.5)",
                                            borderRadius: "6px",
                                            backgroundColor:
                                                "rgba(255, 0, 0, 0.5)",
                                            width: "fit-content",
                                            padding: "4px",
                                            boxShadow:
                                                "0 0 8px rgba(255, 0, 0, 0.3)"
                                        }}
                                    >
                                        {errors.reviewedAcknowledge as string}
                                    </FormHelperText>
                                ) : (
                                    <></>
                                )}
                            </Box>

                            <Box mt={3}>
                                <Typography variant="body1">
                                    To participate in HackIllinois, you must
                                    accept our{" "}
                                    <MuiLink
                                        href="/legal/code-of-conduct"
                                        target="_blank"
                                        underline="always"
                                        color="#08065C"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            padding: "2px 5px",
                                            borderRadius: "5px",
                                            textDecorationColor: "#08065C",
                                            "&:hover": {
                                                color: "#fff",
                                                textDecorationColor: "#fff"
                                            }
                                        }}
                                    >
                                        <Box component="span">
                                            Code of Conduct
                                        </Box>
                                        <LaunchIcon
                                            sx={{
                                                fontSize: {
                                                    xs: "small",
                                                    sm: "medium"
                                                }
                                            }}
                                        />
                                    </MuiLink>
                                    .
                                </Typography>

                                <CheckboxSelect
                                    name="codeOfConductAcknowledge"
                                    // label="I accept the Code of Conduct."
                                    accentColor="#983300"
                                    optionLabel="I accept the Code of Conduct."
                                    optionLabelSx={{
                                        fontFamily: `Montserrat, sans-serif`,
                                        fontSize: "22px",
                                        color: "#fff",
                                        fontWeight: 400,
                                        "@media (max-width:560px)": {
                                            fontSize: "18px"
                                        }
                                    }}
                                    value={values.codeOfConductAcknowledge}
                                    onChange={val =>
                                        formik.setFieldValue(
                                            "codeOfConductAcknowledge",
                                            val
                                        )
                                    }
                                    error={
                                        !!touched.codeOfConductAcknowledge &&
                                        Boolean(errors.codeOfConductAcknowledge)
                                    }
                                />
                                {touched.codeOfConductAcknowledge &&
                                errors.codeOfConductAcknowledge ? (
                                    <FormHelperText
                                        error
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            "&.Mui-error": {
                                                color: "white"
                                            },
                                            border: "1px solid rgba(255, 0, 0, 0.5)",
                                            borderRadius: "6px",
                                            backgroundColor:
                                                "rgba(255, 0, 0, 0.5)",
                                            width: "fit-content",
                                            padding: "4px",
                                            boxShadow:
                                                "0 0 8px rgba(255, 0, 0, 0.3)"
                                        }}
                                    >
                                        {
                                            errors.codeOfConductAcknowledge as string
                                        }
                                    </FormHelperText>
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </ReviewContainer>
            </ThemeProvider>
        </>
    );
};

export default Review;
