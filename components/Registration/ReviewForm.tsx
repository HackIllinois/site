"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RegistrationData, registrationFieldGroups } from "@/util/types";
import { Form, Formik } from "formik";
import { reviewSchema } from "./validation";
import { registerSubmit } from "@/util/api";
import { handleError, registrationToAPI } from "@/util/helpers";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import {
    ReviewContainer,
    StyledAccordion,
    AccordionHeader,
    ReviewInfoAccordionBox,
    UserInfoBox,
    FormikCheckbox
} from "./ReviewForm.styles";
import {
    AccordionDetails,
    Box,
    Link as MuiLink,
    Stack,
    Typography
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

type ReviewFormProps = {
    registration: RegistrationData;
    isProApplicant: boolean;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
    registration,
    isProApplicant
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [expanded, setExpanded] = useState<string | false>("personal");

    const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleSubmit = async () => {
        setIsLoading(true);
        // await registerSubmit(registrationToAPI(registration)).catch(err =>
        //     handleError(err)
        // );
        router.push("/register/confirmation");
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                {isLoading && <Loading />}
                <ReviewContainer>
                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "personal"}
                        onChange={handleChange("personal")}
                    >
                        <AccordionHeader
                            title="Personal Information"
                            editRoute="/register/personal-info"
                            isExpanded={expanded === "personal"}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                {/* TODO: get labels from registrationFieldGroups */}
                                {/* TODO: use updated fields of "registration" */}
                                <UserInfoBox
                                    label="Name"
                                    userResponse={
                                        registration?.legalName || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Gender"
                                    userResponse={registration?.gender || "N/A"}
                                />
                                <UserInfoBox label="Age" userResponse={"20"} />
                                <UserInfoBox
                                    label="Race/Ethnicity"
                                    userResponse={
                                        registration?.race.join(", ") || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Email Address"
                                    userResponse={
                                        registration?.emailAddress || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Phone #"
                                    userResponse="111-222-3333"
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "education"}
                        onChange={handleChange("education")}
                    >
                        <AccordionHeader
                            title="Education"
                            editRoute="/register/education"
                            isExpanded={expanded === "education"}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="College/University"
                                    userResponse={
                                        registration?.university || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Graduation Year"
                                    userResponse={
                                        registration?.gradYear || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Major"
                                    userResponse={registration?.major || "N/A"}
                                />
                                <UserInfoBox
                                    label="Minor"
                                    userResponse={registration?.minor || "N/A"}
                                />
                                {/* TODO: resume path */}
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "specific"}
                        onChange={handleChange("specific")}
                    >
                        <AccordionHeader
                            title="Hack-Specific"
                            editRoute="/register/hack-specific"
                            isExpanded={expanded === "specific"}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="In a couple of sentences, please explain why you are interested in participating in HackIllinois 2024."
                                    userResponse={
                                        registration?.hackEssay1 || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="How did you hear about HackIllinois?"
                                    userResponse={
                                        registration?.hackOutreach.join(", ") ||
                                        "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="What are you looking forward to at HackIllinois?"
                                    userResponse={
                                        registration?.hackInterest.join(", ") ||
                                        "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Do you have any allergies or restrictions?"
                                    userResponse={
                                        registration?.dietaryRestrictions.join(
                                            ", "
                                        ) || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="Would you like to be considered for travel reimbursement?"
                                    userResponse={
                                        registration?.requestedTravelReimbursement.join(
                                            ", "
                                        ) || "N/A"
                                    }
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    <StyledAccordion
                        defaultExpanded
                        expanded={expanded === "transport"}
                        onChange={handleChange("transport")}
                    >
                        <AccordionHeader
                            title="Transportation"
                            editRoute="/register/transportation"
                            isExpanded={expanded === "transport"}
                        />
                        <AccordionDetails>
                            <ReviewInfoAccordionBox>
                                <UserInfoBox
                                    label="Are you aware that you are responsible for your own transportation to the site?"
                                    userResponse={
                                        registration?.travelAcknowledge.join(
                                            ", "
                                        ) || "N/A"
                                    }
                                />
                                <UserInfoBox
                                    label="How will you be getting to HackIllinois?"
                                    userResponse={"TODO"}
                                />
                            </ReviewInfoAccordionBox>
                        </AccordionDetails>
                    </StyledAccordion>

                    {/* TODO: update form */}
                    <Formik
                        initialValues={{
                            reviewedInformationAcknowledge: [],
                            codeOfConductAcknowledge: []
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={reviewSchema}
                    >
                        <Form>
                            <Box mt={4}>
                                <Typography variant="body1">
                                    Please review the above information.
                                </Typography>
                                <Typography variant="body1">
                                    Once you submit you will not be able to
                                    change any information without contacting
                                    us.
                                </Typography>
                                <FormikCheckbox
                                    name="reviewedInformationAcknowledge"
                                    label={
                                        <Box>
                                            <Typography variant="body1">
                                                I reviewed my information to
                                                ensure it is correct.
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>

                            <Box mt={2}>
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

                                <FormikCheckbox
                                    name="codeOfConductAcknowledge"
                                    label={
                                        <Box>
                                            <Typography variant="body1">
                                                I accept the Code of Conduct.
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>

                            <Stack
                                direction={{ xs: "column", md: "row" }}
                                justifyContent="space-between"
                                alignItems="center"
                                gap={{ xs: "24px", md: "0px" }}
                                mt={4}
                            >
                                <NavigationButton
                                    text={"TRANSPORATION"}
                                    img="/registration/left_arrow_review.svg"
                                    href="/register/transportation"
                                    type="button"
                                />
                                <NavigationButton
                                    text={"SUBMIT"}
                                    img="/registration/right_arrow_review.svg"
                                    href="/register/confirmation"
                                    pointRight
                                    type="submit"
                                />
                            </Stack>
                        </Form>
                    </Formik>
                </ReviewContainer>
            </ThemeProvider>
        </>
    );
};

export default ReviewForm;
