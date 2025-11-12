"use client";
import theme from "@/theme";
import { RegistrationData } from "@/util/types";
import {
    initialValues,
    initialValuesPopulated,
    validationSchemas
} from "@/util/validation";
import {
    Box,
    Button,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    useMediaQuery
} from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import * as Yup from "yup";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";
import NavigationButton from "@/components/Form/NavigationButton/NavigationButton";

import { useParams } from "next/navigation";
import RocketOverlay from "./rocket";

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [planetCenters, setPlanetCenters] = useState<
        { x: number; y: number }[]
    >([]);

    const smallMode = useMediaQuery(theme.breakpoints.down("sm"));
    const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
    const params = useParams();

    const measurePlanets = useCallback(() => {
        const centers = planetRefs.current.map(el => {
            if (!el) return { x: 0, y: 0 };
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        });
        setPlanetCenters(centers);
    }, []);

    useLayoutEffect(() => {
        measurePlanets();

        const onResize = () => {
            measurePlanets();
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [measurePlanets]);

    const steps = [
        {
            id: "personal_info",
            name: "Personal Information",
            color: "#3A2541"
        },
        {
            id: "background_info",
            name: "Background Information",
            color: "#01023B"
        },
        {
            id: "app_questions",
            name: "Application Questions",
            color: "#01313B"
        },
        {
            id: "attending_hack",
            name: "Attending HackIllinois",
            color: "#87304E"
        },
        { id: "review", name: "Review & Submit", color: "#983300" },
        { id: "confirmation", name: "Confirmation", color: "#480021" }
    ];

    const handleNext = async (values: RegistrationData, setTouched: any) => {
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });

            console.log("Validation for currentSchema passed");

            // If on the final step, submit the form
            if (currentStep === steps.length - 1) {
                handleSubmit(values);
            } else {
                // Otherwise, just move to the next step
                setCurrentStep(prev => prev + 1);
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
    };

    const handleSubmit = (values: RegistrationData) => {
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
                        height: "100%"
                    }}
                >
                    <RocketOverlay
                        activeStep={currentStep}
                        planetCenters={planetCenters}
                    />
                    <Stepper
                        alternativeLabel
                        activeStep={currentStep}
                        sx={{
                            pt: { xs: 20, lg: 22 },
                            px: { xs: 1, md: 10 },
                            width: "100%",
                            "& .MuiStepLabel-root": {
                                zIndex: 1,
                                position: "relative"
                            }
                        }}
                    >
                        {steps.map((step, i) => (
                            <Step key={step.id}>
                                <StepLabel
                                    sx={{
                                        "& .MuiStepLabel-label": {
                                            pt: {
                                                xs: 0.5,
                                                sm: 2.5,
                                                md: 3,
                                                lg: 3.5
                                            },
                                            fontSize: {
                                                xs: "8.5px",
                                                sm: "12px",
                                                md: "14px"
                                            },
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
                                            <Box
                                                ref={(
                                                    el: HTMLDivElement | null
                                                ) => {
                                                    planetRefs.current[i] = el;
                                                }}
                                                sx={{
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
                                                    style={{
                                                        width: "clamp(40px, 10vw,100px)",
                                                        height: "auto"
                                                    }}
                                                />
                                            </Box>
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

                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    justifyContent={
                                        currentStep === 0
                                            ? "flex-end"
                                            : "space-between"
                                    } // Personal info page has one arrow
                                    alignItems="center"
                                    gap={{ xs: "24px", md: "0px" }}
                                    mt={10}
                                    mb={2}
                                    mr={4}
                                    ml={4}
                                >
                                    {/* Left arrow */}
                                    {currentStep > 0 &&
                                        currentStep < steps.length - 1 && (
                                            <NavigationButton
                                                text={steps[
                                                    currentStep - 1
                                                ].name.toUpperCase()}
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
                </Paper>
            </Box>
        </main>
    );
};

export default GeneralRegistration;
