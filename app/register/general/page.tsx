"use client";
import { authenticate, getAuthToken, registerUpdate } from "@/util/api";
import { RegistrationType } from "@/util/types";
import {
    Alert,
    Box,
    Button,
    Paper,
    Snackbar,
    Stack,
    Step,
    StepLabel,
    Stepper
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import Confirmation from "./formPages/Confirmation";
import Education from "./formPages/Education";
import Experience from "./formPages/Experience";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";
import Transportation from "./formPages/Transportation";
import styles from "./styles.module.scss";
import Background from "@/components/Registration/Background";
import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0);

    // ref to access formik values from outside the render (for autosave)
    const formikRef = useRef<any>(null);
    const isSavingRef = useRef(false);

    // snackbar state for save notifications
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "info" | "success" | "warning" | "error"
    >("info");

    const steps = [
        "Personal Info",
        "Education",
        "Experience",
        "Transportation",
        "Review",
        "Confirmation"
    ];

    const leftArrowImages = [
        "", // step 0 has no left arrow
        "/registration/arrows/left_education.svg",
        "/registration/arrows/left_specific.svg",
        "/registration/arrows/left_transportation.svg",
        "/registration/arrows/left_review.svg"
    ];

    const rightArrowImages = [
        "/registration/arrows/right_personal.svg",
        "/registration/arrows/right_education.svg",
        "/registration/arrows/right_specific.svg",
        "/registration/arrows/right_transportation.svg",
        "/registration/arrows/right_review.svg"
    ];

    // slugify helper to create browser-friendly, lowercased step names
    const slugify = (s: string) =>
        s
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const stepSlugs = steps.map(s => slugify(s));

    const initialValues: RegistrationType = {
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
        gradYear: 2025,
        major: "",
        minor: "",

        // Essays
        hackEssay1: "",
        hackEssay2: "",
        optionalEssay: "",
        proEssay: "",

        // Preferences / Considerations
        considerForGeneral: undefined,
        hackOutreach: [],
        hackInterest: [],
        dietaryRestrictions: [],
        requestedTravelReimbursement: false,

        // Acknowledgements
        reviewedInformationAcknowledge: [],
        codeOfConductAcknowledge: []
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
            considerForGeneral: Yup.boolean(),
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
            requestedTravelReimbursement: Yup.boolean(),
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

    // performSave: placeholder location to call the autosave API
    const performSave = async (values: RegistrationType) => {
        if (!values) return;
        if (isSavingRef.current) return; // don't overlap saves
        isSavingRef.current = true;
        try {
            // TODO: Replace the following simulated save with a real API call.
            // Example:
            // await api.saveDraft(values);
            // await registerUpdate(values);

            // simulate a small delay
            await new Promise(res => setTimeout(res, 250));

            setSnackbarMessage("Autosaved");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (err) {
            setSnackbarMessage("Autosave failed");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
        } finally {
            isSavingRef.current = false;
        }
    };

    const handleNext = async (values: RegistrationType, setTouched: any) => {
        console.log("Values", values, "Current Step", currentStep);
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });

            // perform a save (draft) before moving forward or submitting
            await performSave(values);

            // If on the final step, submit the form
            if (currentStep === steps.length - 1) {
                handleSubmit(values);
            } else {
                // Otherwise, just move to the next step
                setCurrentStep(prev => prev + 1);
            }
        } catch (error) {
            console.error(error);
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

    const handleSubmit = (values: RegistrationType) => {
        console.log("Form submitted with values:", values);
        alert("Form submitted successfully! Check console for data.");
    };

    const renderStepContent = (step: number, formik: any) => {
        switch (step) {
            case 0:
                return <PersonalInfo formik={formik} />;
            case 1:
                return <Education formik={formik} />;
            case 2:
                return <Experience formik={formik} />;
            case 3:
                return <Transportation formik={formik} />;
            case 4:
                return (
                    <Review
                        formik={formik}
                        onEditStep={(step: number) => setCurrentStep(step)}
                    />
                );
            case 5:
                return <Confirmation formik={formik} />;
            default:
                return <div>Unknown step</div>;
        }
    };

    const handleAuthenticate = async () => {
        const authToken = await getAuthToken();
        if (!authToken) {
            authenticate();
        }
    };

    useEffect(() => {
        handleAuthenticate();
    }, []);

    // autosave interval - runs every 10 seconds and saves the current form values (if available)
    useEffect(() => {
        const interval = setInterval(() => {
            const current = formikRef.current;
            if (current && current.values) {
                // fire-and-forget
                performSave(current.values as RegistrationType);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // --- sync current step with URL query param (?step=N) ---
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <main className={"screen"}>
            <Background step={currentStep} />

            <div className={styles.topSpacer}></div>

            <Paper sx={{ backgroundColor: "rgba(255, 255, 255,0)" }}>
                <Stepper activeStep={currentStep} sx={{ pt: 20, px: 20 }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        color: "white", // default text color
                                        fontFamily: "Montserrat",
                                        "&.Mui-active": { color: "white" }, // active step stays white
                                        "&.Mui-completed": { color: "white" } // completed step stays white
                                    }
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemas[currentStep]}
                    onSubmit={handleSubmit}
                    innerRef={formikRef}
                >
                    {formik => (
                        <Form>
                            <Box sx={{ mb: 4, fontFamily: "Montserrat" }}>
                                {renderStepContent(currentStep, formik)}
                            </Box>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                justifyContent={
                                    currentStep === 0
                                        ? "flex-end"
                                        : "space-between"
                                } // Personal info page has one arrow
                                alignItems="center"
                                gap={{ xs: "24px", md: "0px" }}
                                m={4}
                            >
                                {/* Left arrow */}
                                {currentStep > 0 &&
                                    currentStep < steps.length - 1 && (
                                        <NavigationButton
                                            text={steps[
                                                currentStep - 1
                                            ].toUpperCase()}
                                            img={leftArrowImages[currentStep]}
                                            onClick={handleBack}
                                            disabled={currentStep === 0}
                                            type="button"
                                        />
                                    )}

                                {/* Right arrow */}
                                {currentStep < steps.length - 1 && (
                                    <NavigationButton
                                        text={
                                            currentStep === steps.length - 2
                                                ? "SUBMIT"
                                                : steps[
                                                      currentStep + 1
                                                  ].toUpperCase()
                                        }
                                        img={rightArrowImages[currentStep]}
                                        onClick={() =>
                                            handleNext(
                                                formik.values,
                                                formik.setTouched
                                            )
                                        }
                                        type="button"
                                    />
                                )}
                            </Stack>
                        </Form>
                    )}
                </Formik>

                {/* Snackbar for autosave notifications */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </main>
    );
};

export default GeneralRegistration;
