import CheckboxSelect from "@/components/CheckboxSelectMUI";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import LaunchIcon from "@mui/icons-material/Launch";
import {
    AccordionDetails,
    Box,
    FormHelperText,
    Link as MuiLink,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import {
    AccordionHeader,
    AckErrorStyle,
    AckLinkStyle,
    AckOptionLabelStyle,
    AckTextStyle,
    ReviewContainer,
    ReviewInfoAccordionBox,
    StyledAccordion,
    StyledAccordionDetails,
    UserInfoBox
} from "../components/Review";

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
            <ReviewContainer>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        mt: 8,
                        mb: 4
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
                                userResponse={values?.race?.join(", ") || "N/A"}
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
                                    values.eventInterest?.join(", ") || "N/A"
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
                <Box
                    mt={2}
                    p={2}
                    pl={"18px"}
                    borderRadius={4}
                    border="1px solid white"
                    bgcolor="#f6f6f67A"
                >
                    <Box>
                        <Typography sx={[AckTextStyle, { paddingTop: "8px" }]}>
                            Please review the above information. Once you submit
                            you will not be able to change any information
                            without contacting us.*
                        </Typography>

                        <CheckboxSelect
                            name="reviewedAcknowledge"
                            accentColor="#983300"
                            optionLabel="I reviewed my information to ensure it is correct."
                            optionLabelSx={AckOptionLabelStyle}
                            value={values.reviewedAcknowledge}
                            sx={{ pl: "18px" }}
                            onChange={val =>
                                formik.setFieldValue("reviewedAcknowledge", val)
                            }
                            error={
                                !!touched.reviewedAcknowledge &&
                                Boolean(errors.reviewedAcknowledge)
                            }
                        />
                        {touched.reviewedAcknowledge &&
                        errors.reviewedAcknowledge ? (
                            <FormHelperText error sx={AckErrorStyle}>
                                {errors.reviewedAcknowledge as string}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </Box>

                    <Box mt={3}>
                        <Typography sx={AckTextStyle}>
                            To participate in HackIllinois, you must agree to
                            the following MLH policies.
                        </Typography>

                        {/* MLH code of conduct acknowledgement */}
                        <CheckboxSelect
                            name="codeOfConductAcknowledge"
                            accentColor="#983300"
                            optionLabel={
                                <span style={{ color: "#fff" }}>
                                    I have read and agree to the{" "}
                                    <MuiLink
                                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                                        target="_blank"
                                        color="#ADED4A"
                                        sx={AckLinkStyle}
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
                                    .*
                                </span>
                            }
                            optionLabelSx={AckOptionLabelStyle}
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
                            <FormHelperText error sx={AckErrorStyle}>
                                {errors.codeOfConductAcknowledge as string}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}

                        {/* MLH data sharing acknowledgement */}
                        <CheckboxSelect
                            name="mlhDataSharingAcknowledge"
                            accentColor="#983300"
                            optionLabel={
                                <span style={{ color: "#fff" }}>
                                    I authorize you to share my
                                    application/registration information with
                                    Major League Hacking for event
                                    administration, ranking, and MLH
                                    administration in-line with the{" "}
                                    <MuiLink
                                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                                        target="_blank"
                                        sx={AckLinkStyle}
                                    >
                                        MLH Privacy Policy
                                        <LaunchIcon
                                            sx={{
                                                fontSize: {
                                                    xs: "small",
                                                    sm: "medium"
                                                }
                                            }}
                                        />
                                    </MuiLink>
                                    . I further agree to the terms of both the{" "}
                                    <MuiLink
                                        href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                                        target="_blank"
                                        sx={AckLinkStyle}
                                    >
                                        MLH Contest Terms and Conditions
                                        <LaunchIcon
                                            sx={{
                                                fontSize: {
                                                    xs: "small",
                                                    sm: "medium"
                                                }
                                            }}
                                        />
                                    </MuiLink>{" "}
                                    and the MLH Privacy Policy.*
                                </span>
                            }
                            optionLabelSx={AckOptionLabelStyle}
                            value={values.mlhDataSharingAcknowledge}
                            onChange={val =>
                                formik.setFieldValue(
                                    "mlhDataSharingAcknowledge",
                                    val
                                )
                            }
                            error={
                                !!touched.mlhDataSharingAcknowledge &&
                                Boolean(errors.mlhDataSharingAcknowledge)
                            }
                        />
                        {touched.mlhDataSharingAcknowledge &&
                        errors.mlhDataSharingAcknowledge ? (
                            <FormHelperText error sx={AckErrorStyle}>
                                {errors.mlhDataSharingAcknowledge as string}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </Box>

                    <Box>
                        <Typography sx={AckTextStyle}>
                            Newsletter Opt-In
                        </Typography>

                        {/* MLH newsletter opt-in */}
                        <CheckboxSelect
                            name="mlhNewsAcknowledge"
                            accentColor="#983300"
                            optionLabel="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
                            optionLabelSx={AckOptionLabelStyle}
                            value={values.mlhNewsAcknowledge}
                            onChange={val =>
                                formik.setFieldValue("mlhNewsAcknowledge", val)
                            }
                            error={false}
                        />
                    </Box>
                </Box>
            </ReviewContainer>
        </>
    );
};

export default Review;
