import { Box, Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { useMemo } from "react";
import { steps } from "../constants/registration";
import HorseIcon from "./HorseIcon";
import { STEP_HORSE_POSE } from "./horsePaths";

type RegistrationStepperProps = {
    currentStep: number;
    maxStep: number;
    onGoToStep: (step: number) => void;
};

const RegistrationStepper = ({
    currentStep,
    maxStep,
    onGoToStep
}: RegistrationStepperProps) => {
    const atEnd = currentStep === steps.length - 1;

    const stepper = useMemo(() => {
        return (
            <Stepper
                alternativeLabel
                activeStep={currentStep}
                connector={
                    <StepConnector
                        sx={{
                            [`&.${stepConnectorClasses.alternativeLabel}`]: {
                                top: 34,
                                left: "calc(-50% + 36px)",
                                right: "calc(50% + 36px)"
                            },
                            [`& .${stepConnectorClasses.line}`]: {
                                borderColor: "white",
                                borderTopStyle: "dashed",
                                borderTopWidth: 2,
                                borderRadius: 0,
                                opacity: 0.45,
                                transition: "opacity 0.3s ease"
                            },
                            // Connector sits on the step to its right: active/completed
                            // means both endpoints are reached (white) → full opacity.
                            [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]:
                                {
                                    opacity: 1
                                },
                            [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]:
                                {
                                    opacity: 1
                                }
                        }}
                    />
                }
                sx={{
                    pt: { xs: 20, lg: 24 },
                    width: "100%",
                    "& .MuiStepLabel-root": {
                        zIndex: 1,
                        position: "relative"
                    },
                    "& .MuiStepLabel-iconContainer": {
                        paddingRight: 0
                    }
                }}
            >
                {steps.map((step, i) => {
                    const filled = i <= currentStep;
                    const clickable = i <= maxStep && !atEnd;
                    const pose = STEP_HORSE_POSE[i] ?? "gallop";

                    return (
                        <Step key={step.id} completed={i < currentStep}>
                            <StepLabel
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        marginTop: "6px !important",
                                        paddingTop: 0,
                                        fontSize: {
                                            xs: "8.5px",
                                            sm: "12px",
                                            md: "14px"
                                        },
                                        color: "white",
                                        fontFamily: "Tsukimi Rounded",
                                        "&.Mui-active": { color: "white" },
                                        "&.Mui-completed": {
                                            color: "white"
                                        }
                                    }
                                }}
                                slots={{
                                    stepIcon: () => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: 72,
                                                height: 68,
                                                margin: "0 auto",
                                                boxSizing: "border-box",
                                                opacity:
                                                    i <= maxStep ? 1 : 0.45,
                                                cursor: clickable
                                                    ? "pointer"
                                                    : "default",
                                                transition: "opacity 0.3s ease",
                                                "&:hover": {
                                                    opacity: clickable ? 1 : 0.4
                                                }
                                            }}
                                            onClick={() => {
                                                if (clickable) {
                                                    onGoToStep(i);
                                                }
                                            }}
                                            role={
                                                clickable ? "button" : undefined
                                            }
                                            aria-label={`${step.name}${
                                                filled ? " (reached)" : ""
                                            }`}
                                        >
                                            <HorseIcon
                                                pose={pose}
                                                filled={filled}
                                                instanceId={`${step.id}-${i}`}
                                            />
                                        </Box>
                                    )
                                }}
                            >
                                {step.name}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        );
    }, [currentStep, maxStep, onGoToStep, atEnd]);

    return stepper;
};

export default RegistrationStepper;
