import CheckboxGroup from "@/components/CheckboxGroupMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import {
    attributionOptions,
    eventInterestOptions,
    travelReimbursementOptions
} from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface TransportationProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const Transportation = ({ formik, accentColor }: TransportationProps) => {
    const { values, errors, touched, setFieldValue } = formik;
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
                <Grid size={12} id="attribution">
                    <CheckboxGroup
                        name="attribution"
                        label="How did you hear about HackIllinois?"
                        accentColor={accentColor}
                        required
                        options={attributionOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.attribution || []}
                        onChange={value => setFieldValue("attribution", value)}
                        error={
                            !!touched.attribution && Boolean(errors.attribution)
                        }
                        helperText={
                            !!touched.attribution
                                ? String(errors.attribution || "")
                                : ""
                        }
                    />
                </Grid>
                <Grid size={12} id="eventInterest">
                    <CheckboxGroup
                        name="eventInterest"
                        label="Which of these are you most interested in participating in during the hackathon?"
                        accentColor={accentColor}
                        required
                        options={eventInterestOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.eventInterest || []}
                        onChange={value =>
                            setFieldValue("eventInterest", value)
                        }
                        error={
                            !!touched.eventInterest &&
                            Boolean(errors.eventInterest)
                        }
                        helperText={
                            !!touched.eventInterest
                                ? String(errors.eventInterest || "")
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <RadioSelectGroup
                        name="requestTravelReimbursement"
                        label="Would you like to be considered for travel reimbursement?"
                        accentColor={accentColor}
                        row
                        required
                        options={travelReimbursementOptions.map(option => ({
                            label: option,
                            value: option === "Yes"
                        }))}
                        value={values.requestTravelReimbursement}
                        onChange={value => {
                            setFieldValue("requestTravelReimbursement", value);
                        }}
                        error={
                            !!touched.requestTravelReimbursement &&
                            Boolean(errors.requestTravelReimbursement)
                        }
                        helperText={
                            !!touched.requestTravelReimbursement
                                ? errors.requestTravelReimbursement
                                : ""
                        }
                        booleanOptions
                    />
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        name="travelAcknowledge"
                        label="If you attend HackIllinois, you are responsible for your own transportation and accommodations."
                        accentColor={accentColor}
                        row
                        required
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
