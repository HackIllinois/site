import CheckboxGroup from "@/components/CheckboxGroupMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import TextInput from "@/components/TextInputMUI";
import {
    attributionOptions,
    eventInterestOptions,
    OTHER_PLEASE_SPECIFY,
    OTHER_VC_PLEASE_SPECIFY,
    travelReimbursementOptions,
    vcInvolvementOptions
} from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface TransportationProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const Transportation = ({ formik, accentColor }: TransportationProps) => {
    const { values, errors, touched, setFieldValue, handleChange } = formik;
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
                        onChange={value => {
                            setFieldValue("attribution", value);
                            if (!value.includes(OTHER_PLEASE_SPECIFY)) {
                                setFieldValue("otherAttribution", "");
                            }
                        }}
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
                {values.attribution?.includes(OTHER_PLEASE_SPECIFY) && (
                    <Grid size={12}>
                        <TextInput
                            name="otherAttribution"
                            label="Please specify how you heard about HackIllinois"
                            accentColor={accentColor}
                            required
                            value={values.otherAttribution || ""}
                            onChange={handleChange}
                            error={
                                !!touched.otherAttribution &&
                                Boolean(errors.otherAttribution)
                            }
                            helperText={
                                !!touched.otherAttribution
                                    ? errors.otherAttribution
                                    : ""
                            }
                            inputProps={{ maxLength: 200 }}
                        />
                    </Grid>
                )}
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
                        onChange={value => {
                            setFieldValue("eventInterest", value);
                            if (!value.includes(OTHER_PLEASE_SPECIFY)) {
                                setFieldValue("otherEventInterest", "");
                            }
                        }}
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
                {values.eventInterest?.includes(OTHER_PLEASE_SPECIFY) && (
                    <Grid size={12}>
                        <TextInput
                            name="otherEventInterest"
                            label="Please specify what else you are interested in"
                            accentColor={accentColor}
                            required
                            value={values.otherEventInterest || ""}
                            onChange={handleChange}
                            error={
                                !!touched.otherEventInterest &&
                                Boolean(errors.otherEventInterest)
                            }
                            helperText={
                                !!touched.otherEventInterest
                                    ? errors.otherEventInterest
                                    : ""
                            }
                            inputProps={{ maxLength: 200 }}
                        />
                    </Grid>
                )}

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

                <Grid size={12} id="vcInvolvement">
                    <CheckboxGroup
                        name="vcInvolvement"
                        label="How would you like to get involved with VCs?"
                        accentColor={accentColor}
                        required
                        options={vcInvolvementOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.vcInvolvement || []}
                        onChange={value => {
                            setFieldValue("vcInvolvement", value);
                            if (!value.includes(OTHER_VC_PLEASE_SPECIFY)) {
                                setFieldValue("otherVcInvolvement", "");
                            }
                        }}
                        error={
                            !!touched.vcInvolvement &&
                            Boolean(errors.vcInvolvement)
                        }
                        helperText={
                            !!touched.vcInvolvement
                                ? String(errors.vcInvolvement || "")
                                : ""
                        }
                    />
                </Grid>
                {values.vcInvolvement?.includes(OTHER_VC_PLEASE_SPECIFY) && (
                    <Grid size={12}>
                        <TextInput
                            name="otherVcInvolvement"
                            label="Please specify how else you would like to get involved with VCs"
                            accentColor={accentColor}
                            required
                            value={values.otherVcInvolvement || ""}
                            onChange={handleChange}
                            error={
                                !!touched.otherVcInvolvement &&
                                Boolean(errors.otherVcInvolvement)
                            }
                            helperText={
                                !!touched.otherVcInvolvement
                                    ? errors.otherVcInvolvement
                                    : ""
                            }
                            inputProps={{ maxLength: 200 }}
                        />
                    </Grid>
                )}

                <Grid size={12}>
                    <TextInput
                        name="hardwareInterest"
                        label="What kind of hardware would you like to see at the event?"
                        sublabel="max 100 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={3}
                        value={values.hardwareInterest || ""}
                        onChange={handleChange}
                        error={
                            !!touched.hardwareInterest &&
                            Boolean(errors.hardwareInterest)
                        }
                        helperText={
                            !!touched.hardwareInterest
                                ? errors.hardwareInterest
                                : ""
                        }
                        inputProps={{ maxLength: 1000 }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transportation;
