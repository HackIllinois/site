"use client";
import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";
import {
    draftValidationSchemas,
    initialValues,
    validationSchemas,
    valuesToDraftContent
} from "@/util/validation";
import {
    Alert,
    Box,
    Paper,
    Snackbar,
    Stack,
    useMediaQuery
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";
import * as Yup from "yup";

import Loading from "@/components/Loading/Loading";
import {
    authenticate,
    isAuthenticated,
    loadDraft,
    loadSubmission,
    saveDraft,
    submitDraft,
    subscribe
} from "@/util/api";
import RegistrationStepper from "./components/RegistrationStepper";
import { steps } from "./constants/registration";
import { useRegistrationSteps } from "./hooks/use-registration-steps";
import theme from "@/theme";

const GeneralRegistration = () => {
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showClickOffAlert, setShowClickOffAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { currentStep, setCurrentStep, handleNext, handleBack, skipToStep } =
        useRegistrationSteps(validationSchemas, isSubmitted);

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
                    <BackgroundInfo
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 2:
                return (
                    <AppQuestions
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 3:
                return (
                    <AttendingHack
                        formik={formik}
                        accentColor={steps[currentStep].color}
                    />
                );
            case 4:
                return <Review formik={formik} onEditStep={setCurrentStep} />;
            case 5:
                return <Confirmation formik={formik} />;
            default:
                return <div>Unknown step</div>;
        }
    };

    const [loadedDraft, setLoadedDraft] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemas[currentStep],
        onSubmit: () => {}
    });

    const handleLoadDraft = useCallback(async () => {
        setIsLoading(true);
        setLoadedDraft(false);
        if (!isAuthenticated()) {
            authenticate();
            setIsLoading(false);
            return;
        }
        try {
            const submission = await loadSubmission();
            if (submission) {
                formik.setValues(submission);
                setIsSubmitted(true);
                skipToStep(steps.length - 1);
                setIsLoading(false);
                return;
            }
        } catch (error: any) {
            // Only show error if it's not a 404 (no submission exists yet)
            if (error.error !== "NotFound") {
                console.error("Failed to load submission:", error);
                setErrorMessage(
                    "Failed to load your submission: " + (error?.message || "")
                );
                setShowErrorAlert(true);
            }
        }
        try {
            const draft = await loadDraft();

            if (draft) {
                // Merge draft with initialValues to fill in any missing fields
                let mergedValues = { ...initialValues, ...draft };
                formik.setValues(mergedValues);
            }

            let furthestValidPage = 0;
            for (let i = 0; i < steps.length - 1; i++) {
                try {
                    await validationSchemas[i].validate(draft);
                    furthestValidPage = i + 1;
                } catch {
                    // Validation failed, stop here
                    console.log("Failed at", i);
                    break;
                }
            }

            skipToStep(furthestValidPage);

            // TODO: Send the user to the correct page.
            setLoadedDraft(true);
            setIsLoading(false);
        } catch (error: any) {
            // Only show error if it's not a 404 (no draft exists yet)
            if (error?.error !== "NotFound") {
                console.error("Failed to load draft:", error);
                setErrorMessage(
                    "Failed to load your draft: " + (error?.message || "")
                );
                setShowErrorAlert(true);
            }
            setLoadedDraft(true);
            setIsLoading(false);
        }
    }, [formik, skipToStep]);

    const handleSave = useCallback(async () => {
        // Already submitted
        if (isSubmitted) return;
        if (currentStep === steps.length - 1) return;
        if (!loadedDraft || isSaving) return;
        // Ensure that the data is correctly formatted before autosaving.

        const draftContent = valuesToDraftContent(formik.values);
        try {
            await draftValidationSchemas[currentStep].validate(draftContent, {
                abortEarly: false
            });
        } catch (error) {
            setShowClickOffAlert(true);
            return;
        }

        setShowClickOffAlert(false);

        try {
            if (!isAuthenticated()) {
                authenticate();
                return;
            }
            setIsSaving(true);
            await saveDraft(draftContent);
            setShowClickOffAlert(false);
            setShowSaveAlert(true);
            setIsSaving(false);
        } catch (error: any) {
            console.error("Failed to save draft:", error);
            setIsSaving(false);
            setErrorMessage(
                error?.message ||
                    "Failed to save your progress. Please try again."
            );
            setShowErrorAlert(true);
        }
    }, [loadedDraft, isSaving, formik.values, isSubmitted, currentStep]);

    const handleNextOrSubmit = async () => {
        try {
            await validationSchemas[currentStep].validate(formik.values, {
                abortEarly: false
            });
        } catch (error: unknown) {
            console.log("error", error);
            if (error instanceof Yup.ValidationError) {
                const touchedFields: any = {};
                error.inner.forEach(err => {
                    if (err.path) touchedFields[err.path] = true;
                });
                formik.setTouched(touchedFields);

                // NEW: scroll to the first field with an error
                const firstErrorPath = error.inner[0]?.path || error.path;

                console.log("firstErrorPath", firstErrorPath);

                if (firstErrorPath) {
                    const el = document.querySelector(
                        `[name="${firstErrorPath}"], [id="${firstErrorPath}"]`
                    ) as HTMLElement | null;

                    if (el) {
                        el.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                        (el as any).focus?.();
                    }
                }
            }
            return;
        }

        if (currentStep === steps.length - 2) {
            // Final step before submission
            setShowClickOffAlert(false);
            setIsLoading(true);

            if (formik.values.optInNewsletter) {
                try {
                    if (!formik.values.email) {
                        return; // This should not happen; email is a required field.
                    }
                    await subscribe(
                        "hackillinois2026_interest",
                        formik.values.email
                    );
                    await subscribe("2026_applicants", formik.values.email);
                } catch (error: any) {
                    console.error("Failed to save draft:", error);
                    setErrorMessage(
                        error?.message ||
                            "Failed to subscribe to HackIllinois newsletters. Please try again."
                    );
                    setShowErrorAlert(true);
                    setIsLoading(false);
                    return;
                }
            }
            try {
                await submitDraft(formik.values);
                setIsSubmitted(true);
            } catch (error: any) {
                console.error("Failed to submit draft:", error);
                setErrorMessage(
                    error?.message ||
                        "Failed to submit your application. Please try again."
                );
                setShowErrorAlert(true);
                return;
            } finally {
                setIsLoading(false);
            }
        }
        await handleNext(formik.values, formik.setTouched);
    };

    useEffect(() => {
        if (currentStep >= steps.length - 2) {
            setShowClickOffAlert(false);
            return;
        }
        setShowClickOffAlert(true);
        const timeout = setTimeout(() => {
            handleSave();
        }, 10_000);
        return () => clearTimeout(timeout);
    }, [formik.values]);

    useEffect(() => {
        // Don't autosave on the review info page and confirmation page.
        // This ensures that the user won't see an error when they submit.
        if (currentStep >= steps.length - 2) return;
        handleSave();
    }, [currentStep]);

    useEffect(() => {
        handleLoadDraft();
    }, []);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        (e as any).returnValue = "";
    };
    useEffect(() => {
        if (!showClickOffAlert) {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            return;
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [showClickOffAlert]);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    if (isLoading) {
        return <Loading />;
    }

    return (
        <main className={"screen"}>
            <Snackbar
                open={showSaveAlert}
                autoHideDuration={3000}
                onClose={() => setShowSaveAlert(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setShowSaveAlert(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Your progress has been saved!
                </Alert>
            </Snackbar>
            <Snackbar
                open={showErrorAlert}
                autoHideDuration={5000}
                onClose={() => setShowErrorAlert(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setShowErrorAlert(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    minHeight: "100vh", // Full viewport height
                    height: "100%",
                    width: "100%",
                    pb: "50px",
                    backgroundImage: {
                        xs: `url("/registration/backgrounds/mobile/${steps[currentStep].id}.png")`,
                        md: `url("/registration/backgrounds/${steps[currentStep].id}.png")`
                    },
                    backgroundSize: "cover", // Fill the screen
                    backgroundRepeat: "no-repeat", // Prevent tiling
                    backgroundPosition: "center" // Center the image
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255,0)",
                        height: "100%",
                        mx: "auto",
                        maxWidth: "1200px"
                    }}
                >
                    <RegistrationStepper currentStep={currentStep} />
                    <Box sx={{ mb: 4, fontFamily: "Montserrat" }}>
                        {renderStepContent(currentStep, formik)}
                    </Box>

                    <Stack
                        direction={"row"}
                        justifyContent={
                            currentStep === 0 ? "flex-end" : "space-between"
                        } // Personal info page has one arrow
                        alignItems="center"
                        gap={{ xs: "24px", md: "0px" }}
                        mt={10}
                        mb={2}
                        mr={4}
                        ml={4}
                    >
                        {/* Left arrow */}
                        {currentStep > 0 && currentStep < steps.length - 1 && (
                            <NavigationButton
                                text={
                                    isMobile
                                        ? "BACK"
                                        : steps[
                                              currentStep - 1
                                          ].name.toUpperCase()
                                }
                                color={steps[currentStep].color}
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                type="button"
                                isMobile={isMobile}
                            />
                        )}

                        {/* Right arrow */}
                        {currentStep < steps.length - 1 && (
                            <NavigationButton
                                text={
                                    isMobile
                                        ? currentStep === steps.length - 2
                                            ? "SUBMIT"
                                            : "NEXT"
                                        : currentStep === steps.length - 2
                                          ? "SUBMIT"
                                          : steps[
                                                currentStep + 1
                                            ].name.toUpperCase()
                                }
                                color={steps[currentStep].color}
                                pointRight={true}
                                isMobile={isMobile}
                                onClick={() => handleNextOrSubmit()}
                                type="button"
                            />
                        )}
                    </Stack>
                </Paper>
            </Box>
        </main>
    );
};

export default GeneralRegistration;
