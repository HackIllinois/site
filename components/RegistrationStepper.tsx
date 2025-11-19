"use client";

import { Box, Typography, styled } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";
import Image from "next/image";
import RocketOverlay from "@/components/RocketOverlay";
import { RegistrationSteps as steps } from "@/util/types";

// Custom connector aligned to icon center
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 30 // aligns the line with the center of 60px icon
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 2,
        borderColor: theme.palette.grey[300]
    }
}));

interface RegistrationStepperProps {
    currentStep: number;
    planetCenters: { x: number; y: number }[];
}

const RegistrationStepper: React.FC<RegistrationStepperProps> = ({
    currentStep,
    planetCenters
}) => {
    return (
        <Box sx={{ position: "relative" }}>
            <RocketOverlay
                activeStep={currentStep}
                planetCenters={planetCenters}
            />

            <Stepper
                alternativeLabel
                activeStep={currentStep}
                connector={<CustomConnector />}
                sx={{
                    display: { xs: "none", sm: "flex" },
                    width: "auto",
                    "& .MuiStepLabel-root": {
                        zIndex: 1,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }
                }}
            >
                {steps.map(step => (
                    <Step key={step.id}>
                        <StepLabel
                            sx={{ mt: 2 }}
                            slots={{
                                stepIcon: () => (
                                    <Image
                                        src={`/registration/progress_bar/${step.id}.svg`}
                                        alt={step.name}
                                        width={60}
                                        height={60}
                                    />
                                )
                            }}
                        >
                            <Typography
                                sx={{
                                    mt: 1,
                                    color: "white",
                                    fontFamily: "'Tsukimi Rounded', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                    textAlign: "center"
                                }}
                            >
                                {step.name}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default RegistrationStepper;
