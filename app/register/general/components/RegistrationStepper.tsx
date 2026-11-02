import { Box, Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { steps } from "../constants/registration";
import HorseIcon from "./HorseIcon";
import { STEP_HORSE_POSE } from "./horsePaths";

type RegistrationStepperProps = {
    currentStep: number;
    maxStep: number;
    onGoToStep: (step: number) => void;
};

const DashedConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 18,
        left: "calc(-50% + 28px)",
        right: "calc(50% + 28px)"
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: "rgba(255, 255, 255, 0.85)",
        borderTopStyle: "dashed",
        borderTopWidth: 2,
        borderRadius: 0
    }
}));

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
                connector={<DashedConnector />}
                sx={{
                    pt: { xs: 20, lg: 24 },
                    width: "100%",
                    "& .MuiStepLabel-root": {
                        zIndex: 1,
                        position: "relative"
                    }
                }}
            >
                {steps.map((step, i) => {
                    const filled = i <= currentStep;
                    const clickable = i <= maxStep && !atEnd;
                    const isConfirmation = step.id === "confirmation";
                    const pose = STEP_HORSE_POSE[i] ?? "trot";

                    return (
                        <Step key={step.id} completed={i < currentStep}>
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
                                                width: isConfirmation ? 52 : 40,
                                                height: isConfirmation
                                                    ? 52
                                                    : 40,
                                                margin: "0 auto",
                                                border: isConfirmation
                                                    ? "1.5px solid white"
                                                    : "none",
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
                                                if (i <= maxStep) {
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
