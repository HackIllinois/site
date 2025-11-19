"use client";
import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";
import { initialValues, validationSchemas } from "@/util/validation";
import { Box, Paper, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";

import RegistrationStepper from "./components/RegistrationStepper";
import { steps } from "./constants/registration";
import { useRegistrationSteps } from "./hooks/use-registration-steps";

const GeneralRegistration = () => {
    const { currentStep, setCurrentStep, handleNext, handleBack } =
        useRegistrationSteps(validationSchemas);

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
                    minHeight: "100vh", // Full viewport height
                    height: "100%",
                    width: "100%",
                    pb: "50px",
                    backgroundImage: {
                        xs: `url("/registration/backgrounds/mobile/${steps[currentStep].id}.svg")`,
                        md: `url("/registration/backgrounds/${steps[currentStep].id}.svg")`
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
