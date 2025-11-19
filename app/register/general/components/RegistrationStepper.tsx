import { Box, Step, StepLabel, Stepper } from "@mui/material";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { steps } from "../constants/steps";
import RocketOverlay from "../rocket";

type RegistrationStepperProps = {
    currentStep: number;
};

const RegistrationStepper = ({ currentStep }: RegistrationStepperProps) => {
    const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [planetCenters, setPlanetCenters] = useState<
        { x: number; y: number }[]
    >([]);

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

    return (
        <>
            <RocketOverlay
                activeStep={currentStep}
                planetCenters={planetCenters}
            />
            <Stepper
                alternativeLabel
                activeStep={currentStep}
                sx={{
                    pt: { xs: 20, lg: 24 },
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
                                        ref={(el: HTMLDivElement | null) => {
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
                        />
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

export default RegistrationStepper;
