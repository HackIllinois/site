"use client";
import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";
import { initialValues, validationSchemas } from "@/util/validation";
import { Box, Paper, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";

import { saveDraft } from "@/util/api";
import { RegistrationApplicationDraftBody } from "@/util/types";
import RegistrationStepper from "./components/RegistrationStepper";
import { steps } from "./constants/steps";

const page_slugs = [
    "personal-information",
    "background-information",
    "application-questions",
    "attending-hackillinois",
    "review-and-submit",
    "confirmation"
] as const;

const slugToIndex = (slug?: string) => {
    const i = page_slugs.indexOf((slug as any) ?? "");
    return i >= 0 ? i : 0;
};
const indexToSlug = (i: number) =>
    page_slugs[Math.max(0, Math.min(i, page_slugs.length - 1))];

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const slug = indexToSlug(currentStep);
        if (window.location.hash === `#${slug}`) return;
        window.location.hash = slug;
    }, [currentStep]);

    useEffect(() => {
        const readHash = () => {
            const slug = window.location.hash.replace(/^#/, "");
            if (!slug) return;
            const idx = slugToIndex(slug);
            if (idx !== currentStep) setCurrentStep(idx);
        };

        readHash();

        window.addEventListener("hashchange", readHash);
        return () => window.removeEventListener("hashchange", readHash);
    }, [currentStep]);

    const handleNext = async (
        values: RegistrationApplicationDraftBody,
        setTouched: any
    ) => {
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });

            console.log("Validation for currentSchema passed");

            // await saveDraft(formik.values);
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.log(
                "Validation for currentSchema failed with error",
                error
            );
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
        window.scrollTo(0, 0);
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
                return <Confirmation />;
            default:
                return <div>Unknown step</div>;
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemas[currentStep],
        onSubmit: () => {}
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            // saveDraft(formik.values);
        }, 1_000);
        return () => clearTimeout(timeout);
    }, [formik.values]);

    return (
        <main className={"screen"}>
            <Box
                sx={{
                    minHeight: "100vh", // full viewport height
                    height: "100%",
                    width: "100%",
                    pb: "50px",
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
                        direction={{ xs: "column", sm: "row" }}
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
                                text={steps[currentStep - 1].name.toUpperCase()}
                                color={steps[currentStep].color}
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
                                          ].name.toUpperCase()
                                }
                                color={steps[currentStep].color}
                                pointRight={true}
                                onClick={() =>
                                    handleNext(formik.values, formik.setTouched)
                                }
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
