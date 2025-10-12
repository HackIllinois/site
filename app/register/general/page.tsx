"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import {
    Button,
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Paper
} from "@mui/material";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import PersonalInfo from "./formPages/PersonalInfo";
import Education from "./formPages/Education";
import { FormData } from "@/util/types";

const GeneralRegistration = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = ["Personal Information", "Education"];

    const initialValues: FormData = {
        // Personal Info
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",

        // Education
        university: "",
        degree: "",
        major: "",
        graduationYear: "",
        gpa: "",
        expectedGraduation: ""
    };

    // Validation schemas for each step
    const personalInfoSchema = Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .required("First name is required"),
        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .required("Last name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number")
            .required("Phone number is required"),
        dateOfBirth: Yup.date()
            .max(new Date(), "Date of birth cannot be in the future")
            .required("Date of birth is required"),
        gender: Yup.string().required("Gender is required")
    });

    const educationSchema = Yup.object({
        university: Yup.string()
            .min(2, "University name must be at least 2 characters")
            .required("University is required"),
        degree: Yup.string().required("Degree level is required"),
        major: Yup.string()
            .min(2, "Major must be at least 2 characters")
            .required("Major is required"),
        graduationYear: Yup.string()
            .matches(/^(19|20)\d{2}$/, "Invalid graduation year")
            .required("Graduation year is required"),
        gpa: Yup.string()
            .matches(
                /^([0-3]\.\d{1,2}|4\.0{1,2})$/,
                "GPA must be between 0.0 and 4.0"
            )
            .optional(),
        expectedGraduation: Yup.date()
            .min(new Date(), "Expected graduation must be in the future")
            .required("Expected graduation date is required")
    });

    const validationSchemas = [personalInfoSchema, educationSchema];

    const handleNext = async (values: FormData, setTouched: any) => {
        const currentSchema = validationSchemas[currentStep];

        try {
            await currentSchema.validate(values, { abortEarly: false });
            setCurrentStep(prev => prev + 1);
        } catch (error) {
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

    const handleSubmit = (values: FormData) => {
        console.log("Form submitted with values:", values);
        alert("Form submitted successfully! Check console for data.");
    };

    const renderStepContent = (step: number, formik: any) => {
        switch (step) {
            case 0:
                return <PersonalInfo formik={formik} />;
            case 1:
                return <Education formik={formik} />;
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <main className={styles.screen}>
            <div className={styles.topSpacer}></div>

            <Paper
                elevation={3}
                sx={{ p: 4, maxWidth: 800, width: "90%", mx: "auto" }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{ textAlign: "center", mb: 4 }}
                >
                    General Registration
                </Typography>

                <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
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
                            <Box sx={{ mb: 4 }}>
                                {renderStepContent(currentStep, formik)}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 4
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    Back
                                </Button>

                                {currentStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            handleNext(
                                                formik.values,
                                                formik.setTouched
                                            )
                                        }
                                    >
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </main>
    );
};

export default GeneralRegistration;
