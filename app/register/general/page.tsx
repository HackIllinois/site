"use client";
import { RegistrationData } from "@/util/types";
import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Education from "./formPages/Education";
import PersonalInfo from "./formPages/PersonalInfo";
import Experience from "./formPages/Experience";
import Transportation from "./formPages/Transportation";
import Review from "./formPages/Review";
import Confirmation from "./formPages/Confirmation";
import Image from "next/image";

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(3); // todo() change back to 0

    const steps = [
        { id: "personal_info", name: "Personal Information", color: "#3A2541" },
        { id: "education", name: "Education", color: "#01023B" },
        { id: "experience", name: "Experience", color: "#01313B" },
        { id: "transportation", name: "Transportation", color: "#87304E" },
        { id: "review", name: "Review", color: "#983300" },
        { id: "confirmation", name: "Confirmation", color: "#480021" }
    ];

    const initialValues: RegistrationData = {
        // Personal Info
        legalName: "",
        preferredName: "",
        gender: "",
        race: [], // multiple races can be selected
        emailAddress: "",
        location: "",

        // Education
        degree: "",
        university: "",
        gradYear: "",
        major: "",
        minor: "",

        // Essays
        hackEssay1: "",
        hackEssay2: "",
        optionalEssay: "",
        proEssay: "",

        // Preferences / Considerations
        considerForGeneral: [],
        hackOutreach: [],
        hackInterest: [],
        dietaryRestrictions: [],
        requestedTravelReimbursement: [],

        // Acknowledgements
        travelAcknowledge: [],
        codeOfConductAcknowledge: [],
        reviewedInformationAcknowledge: []
    };

    const currentYear = new Date().getFullYear();

    const validationSchemas = [
        // 0. Personal Information
        Yup.object({
            legalName: Yup.string()
                .min(2, "Legal name must be at least 2 characters")
                .required("Legal name is required"),
            preferredName: Yup.string().nullable(),
            gender: Yup.string().required("Gender is required"),
            race: Yup.array()
                .of(Yup.string())
                .min(1, "Select at least one option"),
            emailAddress: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            location: Yup.string().required("City/Location is required")
        }),

        // 1. Education
        Yup.object({
            degree: Yup.string().required("Degree is required"),
            university: Yup.string().required("University is required"),
            gradYear: Yup.string()
                .matches(/^\d{4}$/, "Use a 4-digit year")
                .test(
                    "reasonable-year",
                    `Year should be between 2000 and ${currentYear + 6}`,
                    v => {
                        if (!v) return false;
                        const n = Number(v);
                        return n >= 2000 && n <= currentYear + 6;
                    }
                )
                .required("Graduation year is required"),
            major: Yup.string().required("Major is required"),
            minor: Yup.string().nullable()
        }),

        // 2. Experience (essays, interests, outreach)
        Yup.object({
            hackEssay1: Yup.string()
                .min(50, "Please write at least 50 characters")
                .required("This essay is required"),
            hackEssay2: Yup.string()
                .min(50, "Please write at least 50 characters")
                .required("This essay is required"),
            optionalEssay: Yup.string().nullable(),
            proEssay: Yup.string()
                .min(50, "Please write at least 50 characters")
                .required("Professional/experience essay is required"),
            considerForGeneral: Yup.array()
                .of(Yup.string())
                .min(1, "Select at least one"),
            hackOutreach: Yup.array()
                .of(Yup.string())
                .min(1, "Tell us how you heard about us"),
            hackInterest: Yup.array()
                .of(Yup.string())
                .min(1, "Pick at least one interest")
        }),

        // 3. Transportation (travel + dietary)
        Yup.object({
            dietaryRestrictions: Yup.array().of(Yup.string()),
            requestedTravelReimbursement: Yup.array().of(Yup.string()),
            travelAcknowledge: Yup.array()
                .of(Yup.string())
                .min(1, "You must acknowledge the travel policy")
                // Example conditional: require acknowledgement if reimbursement requested
                .when("requestedTravelReimbursement", {
                    is: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
                    then: schema =>
                        schema.min(
                            1,
                            "Acknowledge required when requesting travel aid"
                        )
                })
        }),

        // 4. Review (usually no new inputs; keep empty object)
        Yup.object({}),

        // 5. Confirmation (final acknowledgements)
        Yup.object({
            codeOfConductAcknowledge: Yup.array()
                .of(Yup.string())
                .min(1, "You must accept the Code of Conduct"),
            reviewedInformationAcknowledge: Yup.array()
                .of(Yup.string())
                .min(1, "Please confirm you reviewed your information")
        })
    ];

    const handleNext = async (values: RegistrationData, setTouched: any) => {
        console.log("Values", values, "Current Step", currentStep);
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });

            // If on the final step, submit the form
            if (currentStep === steps.length - 1) {
                handleSubmit(values);
            } else {
                // Otherwise, just move to the next step
                setCurrentStep(prev => prev + 1);
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const touchedFields: any = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        touchedFields[err.path] = true;
                    }
                });
                setTouched(touchedFields);
            }
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (values: RegistrationData) => {
        console.log("Form submitted with values:", values);
        alert("Form submitted successfully! Check console for data.");
    };

    const renderStepContent = (step: number, formik: any) => {
        switch (step) {
            case 0:
                return (
                    <PersonalInfo
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 1:
                return (
                    <Education
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 2:
                return (
                    <Experience
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 3:
                return (
                    <Transportation
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 4:
                return (
                    <Review
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 5:
                return (
                    <Confirmation
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <main className={"screen"}>
            <Box
                sx={{
                    minHeight: "100vh", // full viewport height
                    height: "100%",
                    width: "100%",
                    backgroundImage: {
                        xs: `url("/registration/backgrounds/mobile/${steps[currentStep].id}.svg")`,
                        md: `url("/registration/backgrounds/${steps[currentStep].id}.svg")`
                    },
                    backgroundSize: "cover", // fill the screen
                    backgroundRepeat: "no-repeat", // prevent tiling
                    backgroundPosition: "center" // center the image
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255,0)",
                        height: "100%"
                    }}
                >
                    <Stepper
                        alternativeLabel
                        activeStep={currentStep}
                        sx={{
                            pt: 20,
                            px: 20,
                            "& .MuiStepConnector-line": {
                                width: "60%",
                                margin: "0 auto" // centered between icons
                            }
                        }}
                    >
                        {steps.map(step => (
                            <Step key={step.id}>
                                <StepLabel
                                    sx={{
                                        "& .MuiStepLabel-label": {
                                            color: "white", // default text color
                                            fontFamily: "Tsukimi Rounded",
                                            "&.Mui-active": { color: "white" }, // active step stays white
                                            "&.Mui-completed": {
                                                color: "white"
                                            } // completed step stays white
                                        }
                                    }}
                                    slots={{
                                        stepIcon: props => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: 32, // matches MUI's default StepIcon size
                                                    height: 32,
                                                    margin: "0 auto"
                                                }}
                                            >
                                                <Image
                                                    src={`/registration/progress_bar/${step.id}.svg`}
                                                    alt="Transportation"
                                                    width={80}
                                                    height={80}
                                                />
                                            </div>
                                        )
                                    }}
                                >
                                    {step.name}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchemas[currentStep]}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                            <Form>
                                <Box sx={{ mb: 4, fontFamily: "Montserrat" }}>
                                    {renderStepContent(currentStep, formik)}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        position: "static",
                                        width: "100%",
                                        height: "fit-content",
                                        bottom: 0,
                                        mt: 6,
                                        mb: 8,
                                        // mx: 2,
                                        px: 10,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Button
                                        onClick={handleBack}
                                        disabled={currentStep === 0} // noninteractable
                                        aria-hidden={currentStep === 0} // hidden (accesibility)
                                        sx={{
                                            visibility: `${currentStep === 0 ? "hidden" : "visible"}`, // hidden
                                            color: "white",
                                            fontSize: "1.4rem",
                                            border: `1px solid ${steps[currentStep].color}`,
                                            backgroundColor:
                                                steps[currentStep].color,
                                            fontFamily: "Tsukimi Rounded",
                                            "&:hover": {
                                                borderColor: "white"
                                                // color: `${steps[currentStep].color}`,
                                                // backgroundColor:
                                                //     "rgba(255, 255, 255, 0.08)"
                                            },
                                            "&.Mui-disabled": {
                                                borderColor:
                                                    "rgba(255,255,255,0.3)",
                                                color: "rgba(255,255,255,0.3)"
                                            }
                                        }}
                                    >
                                        {currentStep !== 0 &&
                                            steps[currentStep - 1].name}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleNext(
                                                formik.values,
                                                formik.setTouched
                                            )
                                        }
                                        sx={{
                                            color: "white",
                                            fontSize: "1.4rem",
                                            border: `1px solid ${steps[currentStep].color}`,
                                            backgroundColor:
                                                steps[currentStep].color,
                                            fontFamily: "Tsukimi Rounded",
                                            "&:hover": {
                                                borderColor: "white"
                                                //color: `${steps[currentStep].color}`,
                                                // backgroundColor:
                                                //     "rgba(255, 255, 255, 0.08)"
                                            },
                                            "&.Mui-disabled": {
                                                borderColor:
                                                    "rgba(255,255,255,0.3)",
                                                color: "rgba(255,255,255,0.3)"
                                            }
                                        }}
                                    >
                                        {currentStep === steps.length - 1
                                            ? "Submit"
                                            : steps[currentStep + 1].name}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>
        </main>
    );
};

export default GeneralRegistration;
