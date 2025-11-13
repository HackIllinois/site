import CheckboxGroup from "@/components/CheckboxGroupMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import {
    hackInterestOptions,
    hackOutreachOptions,
    travelReimbursementOptions
} from "@/util/options";
import { RegistrationData } from "@/util/types";
import { Box, Typography, Container, Grid } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect } from "react";

interface TransportationProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Transportation = ({ formik, accentColor }: TransportationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    // helper to toggle a value inside an array field
    const toggleInArray = (field: keyof RegistrationData, val: string) => {
        const arr = new Set<string>((values[field] as string[]) || []);
        arr.has(val) ? arr.delete(val) : arr.add(val);
        setFieldValue(field, Array.from(arr));
    };

    useEffect(() => {
        if (!formik.dirty || formik.isSubmitting) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            (e as any).returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formik.dirty, formik.isSubmitting]);

    return (
        <Container>
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    mt: 8,
                    mb: 4
                }}
            >
                ATTENDING HACKILLINOIS
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={12}>
                    <CheckboxGroup
                        name="hackOutreach"
                        label="How did you hear about HackIllinois?"
                        accentColor={accentColor}
                        required
                        options={hackOutreachOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.hackOutreach}
                        onChange={value => setFieldValue("hackOutreach", value)}
                        error={
                            !!touched.hackOutreach &&
                            Boolean(errors.hackOutreach)
                        }
                        helperText={
                            !!touched.hackOutreach
                                ? String(errors.hackOutreach || "")
                                : ""
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <CheckboxGroup
                        name="hackInterest"
                        label="Which of these are you most interested in participating in during the hackathon?"
                        accentColor={accentColor}
                        required
                        options={hackInterestOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.hackInterest}
                        onChange={value => setFieldValue("hackInterest", value)}
                        error={
                            !!touched.hackInterest &&
                            Boolean(errors.hackInterest)
                        }
                        helperText={
                            !!touched.hackInterest
                                ? String(errors.hackInterest || "")
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <RadioSelectGroup
                        name="requestedTravelReimbursement"
                        label="Would you like to be considered for travel reimbursement?"
                        accentColor={accentColor}
                        row
                        options={travelReimbursementOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.requestedTravelReimbursement}
                        onChange={value =>
                            setFieldValue("requestedTravelReimbursement", value)
                        }
                        error={
                            !!touched.requestedTravelReimbursement &&
                            Boolean(errors.requestedTravelReimbursement)
                        }
                        helperText={
                            !!touched.requestedTravelReimbursement
                                ? errors.requestedTravelReimbursement
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        name="travelAcknowledge"
                        label="If you attend HackIllinois, you are responsible for your own transportation and accommodations."
                        accentColor={accentColor}
                        row
                        optionLabel="I understand"
                        value={values.travelAcknowledge}
                        onChange={value =>
                            setFieldValue("travelAcknowledge", value)
                        }
                        error={
                            !!touched.travelAcknowledge &&
                            Boolean(errors.travelAcknowledge)
                        }
                        helperText={
                            !!touched.travelAcknowledge
                                ? errors.travelAcknowledge
                                : ""
                        }
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transportation;
