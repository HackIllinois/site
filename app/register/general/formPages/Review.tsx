import CheckboxSelect from "@/components/CheckboxSelectMUI";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import LaunchIcon from "@mui/icons-material/Launch";
import {
    AccordionDetails,
    Box,
    FormHelperText,
    Link as MuiLink,
    ThemeProvider,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import {
    AccordionHeader,
    ReviewContainer,
    ReviewInfoAccordionBox,
    StyledAccordion,
    StyledAccordionDetails,
    UserInfoBox
} from "../components/Review";
import { registrationTheme } from "../theme";

interface ReviewProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
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

    useEffect(() => {
        if (!formik.dirty || formik.isSubmitting) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            (e as any).returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formik.dirty, formik.isSubmitting]);

    return (
        <>
            <ThemeProvider theme={registrationTheme}>
                <ReviewContainer>
                    <Typography
                        variant="h1"
                        sx={{
                            mt: 8,
                            mb: "7px"
                        }}
                    >
                        REVIEW INFORMATION
                    </Typography>

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
                                    userResponse={values.firstName || ""}
                                />
                                <UserInfoBox
                                    label="Last Name"
                                    userResponse={values.lastName || ""}
                                />
                                <UserInfoBox
                                    label="Preferred Name"
                                    userResponse={values.preferredName || "N/A"}
                                />
                                <UserInfoBox
                                    label="Age"
                                    userResponse={values.age || ""}
                                />
                                <UserInfoBox
                                    label="Email"
                                    userResponse={values.email || "N/A"}
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
                                    userResponse={values.education || "N/A"}
                                />
                                <UserInfoBox
                                    label="School"
                                    userResponse={values.school || "N/A"}
                                />
                                <UserInfoBox
                                    label="Graduation Year"
                                    userResponse={values.graduate || "N/A"}
                                />
                                <UserInfoBox
                                    label="Major/Field of Study"
                                    userResponse={values.major || "N/A"}
                                />
                                <UserInfoBox
                                    label="Country of Residence"
                                    userResponse={values.country || "N/A"}
                                />
                                {values.country === "United States" && (
                                    <UserInfoBox
                                        label="State/Territory"
                                        userResponse={values.state || "N/A"}
                                    />
                                )}
                                <UserInfoBox
                                    label="Race/Ethnicity"
                                    userResponse={
                                        values?.race?.join(", ") || "N/A"
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
                                    userResponse={values.application1 || "N/A"}
                                />
                                <UserInfoBox
                                    label="Describe a challenge you have faced in the field of CS, and how you overcame it. This challenge can be related to a project, work or volunteer experience, diversity/inclusion, etc."
                                    userResponse={values.application2 || "N/A"}
                                />
                                <UserInfoBox
                                    label="Optional: If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                                    userResponse={
                                        values.applicationOptional || "N/A"
                                    }
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
                                        userResponse={
                                            values.applicationPro || "N/A"
                                        }
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
                                        values.attribution?.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Which of these are you most interested in participating in during the hackathon?"
                                    userResponse={
                                        values.eventInterest?.join(", ") ||
                                        "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Would you like to be considered for travel reimbursement?"
                                    userResponse={
                                        values.requestTravelReimbursement ===
                                        undefined
                                            ? "N/A"
                                            : values.requestTravelReimbursement
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
                                    accept the
                                    <MuiLink
                                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                                        target="_blank"
                                        color="#ADED4A"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            padding: "2px 5px",
                                            borderRadius: "5px",
                                            color: "#ADED4A",
                                            fontWeight: "500",
                                            textDecoration: "underline",
                                            textDecorationColor: "#ADED4A",
                                            textDecorationThickness: "2px",
                                            "&:hover": {
                                                color: "#fff",
                                                textDecorationColor: "#fff"
                                            }
                                        }}
                                    >
                                        MLH Code of Conduct
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
