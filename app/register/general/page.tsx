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
    Step,
    StepLabel,
    Stepper,
    useMediaQuery,
    Snackbar,
    Alert
} from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
    useEffect
} from "react";
import * as Yup from "yup";
import AppQuestions from "./formPages/AppQuestions";
import AttendingHack from "./formPages/AttendingHack";
import BackgroundInfo from "./formPages/BackgroundInfo";
import Confirmation from "./formPages/Confirmation";
import PersonalInfo from "./formPages/PersonalInfo";
import Review from "./formPages/Review";

import { useParams } from "next/navigation";
import RocketOverlay from "./rocket";

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [planetCenters, setPlanetCenters] = useState<
        { x: number; y: number }[]
    >([]);
    const [savedData, setSavedData] = useState<RegistrationData>(
        initialValues as RegistrationData
    );
    const [showAutoSaveDialog, setShowAutoSaveDialog] = useState(false);
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
        if (autoSaveTimeoutRef.current) {
            clearTimeout(autoSaveTimeoutRef.current);
        }

        autoSaveTimeoutRef.current = setTimeout(() => {
            console.log(
                `[${new Date().toLocaleTimeString()}] Autosaved Data:`,
                savedData
            );
            setShowAutoSaveDialog(true);
            setTimeout(() => {
                setShowAutoSaveDialog(false);
            }, 3000);
        }, 3000);

        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [savedData]);

    const steps = [
        { id: "personal_info", name: "Personal Information", color: "#3A2541" },
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

    const logSavedData = (data: RegistrationData) => {
        console.log(`[${new Date().toLocaleTimeString()}] Saved Data:`, data);
    };

    const handleNext = async (values: RegistrationData, setTouched: any) => {
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });

            console.log("Validation for currentSchema passed");
            logSavedData(values);

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
        logSavedData(savedData);
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
                            <Form
                                onChange={() =>
                                    setSavedData(
                                        formik.values as RegistrationData
                                    )
                                }
                            >
                                <Box sx={{ mb: 4, fontFamily: "Montserrat" }}>
                                    {renderStepContent(currentStep, formik)}
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        position: "static",
                                        width: "90%",
                                        height: "fit-content",
                                        bottom: 0,
                                        mt: 6,
                                        mb: 8,
                                        mx: "auto",
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
                                            fontSize: {
                                                xs: "1rem",
                                                md: "1.4rem"
                                            },
                                            border: `1px solid ${steps[currentStep].color}`,
                                            backgroundColor:
                                                steps[currentStep].color,
                                            fontFamily: "Tsukimi Rounded",
                                            "&:hover": {
                                                borderColor: "white"
                                            },
                                            "&.Mui-disabled": {
                                                borderColor:
                                                    "rgba(255,255,255,0.3)",
                                                color: "rgba(255,255,255,0.3)"
                                            }
                                        }}
                                    >
                                        {smallMode
                                            ? "<"
                                            : currentStep !== 0 &&
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
                                            fontSize: {
                                                xs: "1rem",
                                                md: "1.4rem"
                                            },
                                            border: `1px solid ${steps[currentStep].color}`,
                                            backgroundColor:
                                                steps[currentStep].color,
                                            fontFamily: "Tsukimi Rounded",
                                            "&:hover": {
                                                borderColor: "white"
                                            },
                                            "&.Mui-disabled": {
                                                borderColor:
                                                    "rgba(255,255,255,0.3)",
                                                color: "rgba(255,255,255,0.3)"
                                            }
                                        }}
                                    >
                                        {smallMode
                                            ? ">"
                                            : currentStep === steps.length - 1
                                              ? "Submit"
                                              : steps[currentStep + 1].name}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Box>

            <Snackbar
                open={showAutoSaveDialog}
                autoHideDuration={3000}
                onClose={() => setShowAutoSaveDialog(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setShowAutoSaveDialog(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Changes saved.
                </Alert>
            </Snackbar>
        </main>
    );
};

export default GeneralRegistration;
