"use client";
import React from "react";
import Background from "@/components/Registration/Background";
import { Box, Stepper, Step, StepLabel, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";

const steps = [
    "Personal Info",
    "Education",
    "Hack-Specific",
    "Transportation",
    "Review",
    "Confirmation"
];

const pageMap = {
    "/register/personal-info": 0,
    "/register/education": 1,
    "/register/hack-specific": 2,
    "/register/transportation": 3,
    "/register/review": 4,
    "/register/confirmation": 5
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname() as keyof typeof pageMap;
    const activeStep = pageMap[pathname] ?? 0;
    const theme = useTheme();

    return (
        <Box
            component="main"
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100vw",
                minHeight: "100vh",
                height: "fit-content",
                pb:
                    pathname === "/register/confirmation"
                        ? "2rem"
                        : { xs: "25rem", md: "2rem" }, // bottom padding is for mobile keyboard
                gap: "3rem",
                [theme.breakpoints.down("md")]: {
                    backgroundSize: "400px",
                    gap: "2rem"
                }
            }}
        >
            <Background />
            <Box
                sx={{
                    mt: "126px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "3rem",
                    width: "80%",
                    position: "relative",
                    [theme.breakpoints.down("md")]: {
                        mt: "100px"
                    }
                }}
            >
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ width: "100%" }}
                >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        color: "white !important"
                                    }
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
