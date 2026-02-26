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
import { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";

import Loading from "@/components/Loading/Loading";
import { useRegistrationAuth } from "@/hooks/use-registration-auth";
import theme from "@/theme";
import {
    loadDraft,
    loadSubmission,
    saveDraft,
    submitDraft,
    subscribe
} from "@/util/api";
import { schoolOptions } from "@/util/options";
import { useRouter } from "next/navigation";
import RegistrationStepper from "./components/RegistrationStepper";
import { OTHER_SCHOOL_OPTION, steps } from "./constants/registration";
import GithubAuthPage from "./formPages/GithubAuthPage";
import { useRegistrationSteps } from "./hooks/use-registration-steps";

export const GeneralRegistration = () => {
    const router = useRouter();
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showClickOffAlert, setShowClickOffAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout>(null); // stores ten-second-delay autosave
    const [isLoadingComponent, setIsLoadingComponent] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const registrationAuth = useRegistrationAuth({
        shouldLoadSubmission: false
    });

    const {
        maxStep,
        currentStep,
        setCurrentStep,
        handleNext,
        handleGoToStep,
        handleBack,
        skipToStep
    } = useRegistrationSteps(validationSchemas, isSubmitted);

    const RIGHT_ALIGNED_STEPS = [0, 3];

    // const [isPasswordAuthenticated, setIsPasswordAuthenticated] =
    //     useState(false);

    // useEffect(() => {
    //     // if (!FORCE_REGISTRATION_CLOSED) {
    //     //     router.push("/");
    //     // }

    //     // Check localStorage for authentication
    //     // const authenticated = localStorage.getItem(
    //     //     "lateRegistrationAuthenticated"
    //     // );
    //     // if (authenticated === "true") {
    //     //     setIsPasswordAuthenticated(true);
    //     // }
    // }, [router]);

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
                return (
                    <Confirmation
                        formik={formik}
                        onSetErrorMessage={setErrorMessage}
                        onShowErrorAlert={setShowErrorAlert}
                    />
                );
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
        setIsLoadingComponent(true);
        setLoadedDraft(false);

        if (!registrationAuth.authenticated) {
            setIsLoadingComponent(false);
            return;
        }

        try {
            const submission = await loadSubmission();
            if (submission) {
                formik.setValues(submission);
                setIsSubmitted(true);
                skipToStep(steps.length - 1);
                setIsLoadingComponent(false);
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

                // Checking if school saved is among the options listed in dropdown
                const savedSchool = (draft.school ?? "").trim();
                const isListedSchool =
                    savedSchool === "" || schoolOptions.includes(savedSchool);
                if (!isListedSchool) {
                    mergedValues.school = OTHER_SCHOOL_OPTION;
                    mergedValues.otherSchool = savedSchool;
                } else {
                    mergedValues.otherSchool = "";
                }

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
            setIsLoadingComponent(false);
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
            setIsLoadingComponent(false);
        }
    }, [formik, skipToStep, registrationAuth.authenticated]);

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
        } catch {
            setShowClickOffAlert(true);
            return;
        }

        setShowClickOffAlert(false);

        try {
            if (!registrationAuth.authenticated) {
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
    }, [
        loadedDraft,
        isSaving,
        formik.values,
        isSubmitted,
        currentStep,
        registrationAuth.authenticated
    ]);

    const handleNextOrSubmit = async () => {
        try {
            await validationSchemas[currentStep].validate(formik.values, {
                abortEarly: false
            });
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                const touchedFields: any = {};
                error.inner.forEach(err => {
                    if (err.path) touchedFields[err.path] = true;
                });
                formik.setTouched(touchedFields);

                // Scroll to the first error field
                const firstErrorPath = error.inner[0]?.path || error.path;
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
            if (isSaving) {
                // This shouldn't happen. The submit button is disabled while saving.
                return;
            }
            // Final step before submission
            setShowClickOffAlert(false);
            setIsLoadingComponent(true);

            if (formik.values.optInHackNewsletter) {
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
                    setIsLoadingComponent(false);
                    return;
                }
            }
            try {
                const body: any = { ...formik.values };
                if (body.school === OTHER_SCHOOL_OPTION) {
                    body.school = (body.otherSchool || "").trim();
                }
                delete body.otherSchool;
                await submitDraft(body);
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
                setIsLoadingComponent(false);
            }
        }
        await handleNext(formik.values, formik.setTouched);
    };

    useEffect(() => {
        if (currentStep >= steps.length - 1) {
            setShowClickOffAlert(false);
            return;
        }
        setShowClickOffAlert(true);
        // save modified values after a delay
        const timeout = setTimeout(() => {
            handleSave();
        }, 10_000);
        saveTimeoutRef.current = timeout;
        return () => clearTimeout(timeout);
        // changing currentStep (i.e. changing section/subpage)
        // triggers a different useEffect (below)
    }, [formik.values, registrationAuth.authenticated]);

    useEffect(() => {
        // Don't autosave on the confirmation page.
        // This ensures that the user won't see an error when they submit.
        if (currentStep >= steps.length - 1) return;
        // we've just changed currentStep (section) -- autosave the values
        // immediately, then clear the 10-second-delay autosave so the user
        // doesn't see the popup twice
        if (saveTimeoutRef.current != null) {
            clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = null;
        }
        handleSave();
    }, [currentStep]);

    useEffect(() => {
        handleLoadDraft();
    }, [registrationAuth.authenticated]);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        (e as any).returnValue = "";
    };

    useEffect(() => {
        if (!registrationAuth.authenticated) return;
        if (!showClickOffAlert) {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            return;
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [showClickOffAlert, registrationAuth.authenticated]);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleGoToStepViaStepper = async (step: number) => {
        try {
            const result = await handleGoToStep(
                formik.values,
                step,
                formik.setTouched
            );
            if (result) {
                setCurrentStep(step);
            }
        } catch {
            setShowErrorAlert(true);
            setErrorMessage(
                "Please complete and correct all required fields before proceeding."
            );
        }
    };

    useEffect(() => {
        console.log("Authenticated", registrationAuth.authenticated);
    }, [registrationAuth.authenticated]);

    const isLoading = isLoadingComponent || registrationAuth.isLoading;

    if (isLoading) {
        return <Loading />;
    }

    if (!registrationAuth.authenticated) {
        return <GithubAuthPage />;
    }

    // if (!isPasswordAuthenticated) {
    //     return (
    //         <PasswordAuthPage
    //             onAuthenticated={() => {
    //                 localStorage.setItem(
    //                     "lateRegistrationAuthenticated",
    //                     "true"
    //                 );
    //                 setIsPasswordAuthenticated(true);
    //             }}
    //         />
    //     );
    // }

    return (
        <main className={"screen"}>
            <Snackbar
                open={showSaveAlert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={(event, reason) => {
                    if (reason === "clickaway") return;
                    // ^ ignore clicking outside -- this setting is necessary on small web
                    // as the snackbar unmounting when it closes on clickaway interrupts (?)
                    // the click event and prevents it from affecting inputs
                    setShowSaveAlert(false);
                }}
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
                    minHeight: "100dvh", // Full viewport height
                    height: "100%",
                    width: "100%",
                    pb: "50px",
                    backgroundImage: {
                        xs: `url("/registration/backgrounds/mobile/${steps[currentStep].id}${steps[currentStep].use_svg ? ".svg" : ".png"}")`,
                        md: `url("/registration/backgrounds/${steps[currentStep].id}${steps[currentStep].use_svg ? ".svg" : ".png"}")`
                    },
                    backgroundSize: "cover", // Fill the screen
                    backgroundRepeat: "no-repeat", // Prevent tiling
                    backgroundPosition: RIGHT_ALIGNED_STEPS.includes(
                        currentStep
                    )
                        ? "right"
                        : "center"
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
                    <RegistrationStepper
                        currentStep={currentStep}
                        maxStep={maxStep}
                        onGoToStep={handleGoToStepViaStepper}
                    />
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
                        mb={8}
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
                                disabled={isSaving}
                                type="button"
                            />
                        )}
                    </Stack>
                </Paper>
            </Box>
        </main>
    );
};
