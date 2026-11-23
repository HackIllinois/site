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
import { Box, Grid, Link, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SectionHeader from "../components/SectionHeader";
import { HARDWARE_INTEREST_FORM_URL } from "../constants/registration";

interface AttendingHackProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const toOptions = (arr: string[]) => arr.map(s => ({ label: s, value: s }));

const AttendingHack = ({ formik, accentColor }: AttendingHackProps) => {
    const { values, errors, touched, setFieldValue, setValues, handleChange } =
        formik;

    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="ATTENDING HACKILLINOIS"
                description="Information to help us plan the HackIllinois experience."
            />

            <Grid container columnSpacing={3} rowSpacing={{ xs: 3, md: 4 }}>
                <Grid size={12} id="attribution">
                    <CheckboxGroup
                        name="attribution"
                        label="How did you hear about HackIllinois?"
                        accentColor={accentColor}
                        required
                        options={toOptions(attributionOptions)}
                        value={values.attribution || []}
                        onChange={value => {
                            setValues({
                                ...values,
                                attribution: value,
                                ...(!value.includes(OTHER_PLEASE_SPECIFY) && {
                                    otherAttribution: ""
                                })
                            });
                        }}
                        error={
                            !!touched.attribution && Boolean(errors.attribution)
                        }
                        helperText={
                            touched.attribution
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
                                touched.otherAttribution
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
                        options={toOptions(eventInterestOptions)}
                        value={values.eventInterest || []}
                        onChange={value => {
                            setValues({
                                ...values,
                                eventInterest: value,
                                ...(!value.includes(OTHER_PLEASE_SPECIFY) && {
                                    otherEventInterest: ""
                                })
                            });
                        }}
                        error={
                            !!touched.eventInterest &&
                            Boolean(errors.eventInterest)
                        }
                        helperText={
                            touched.eventInterest
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
                                touched.otherEventInterest
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
                        booleanOptions
                        options={travelReimbursementOptions.map(option => ({
                            label: option,
                            value: option === "Yes"
                        }))}
                        value={values.requestTravelReimbursement}
                        onChange={value =>
                            setFieldValue("requestTravelReimbursement", value)
                        }
                        error={
                            !!touched.requestTravelReimbursement &&
                            Boolean(errors.requestTravelReimbursement)
                        }
                        helperText={
                            touched.requestTravelReimbursement
                                ? errors.requestTravelReimbursement
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        name="travelAcknowledge"
                        label="If you attend HackIllinois, you are responsible for your own transportation and accommodations."
                        accentColor={accentColor}
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
                            touched.travelAcknowledge
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
                        options={toOptions(vcInvolvementOptions)}
                        value={values.vcInvolvement || []}
                        onChange={value => {
                            setValues({
                                ...values,
                                vcInvolvement: value,
                                ...(!value.includes(
                                    OTHER_VC_PLEASE_SPECIFY
                                ) && { otherVcInvolvement: "" })
                            });
                        }}
                        error={
                            !!touched.vcInvolvement &&
                            Boolean(errors.vcInvolvement)
                        }
                        helperText={
                            touched.vcInvolvement
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
                                touched.otherVcInvolvement
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
                            touched.hardwareInterest
                                ? errors.hardwareInterest
                                : ""
                        }
                        inputProps={{ maxLength: 1000 }}
                    />
                    {HARDWARE_INTEREST_FORM_URL && (
                        <Typography
                            sx={{
                                mt: 1,
                                color: "#ffffff",
                                fontFamily: "Montserrat",
                                fontSize: "14px"
                            }}
                        >
                            Please fill out this{" "}
                            <Link
                                href={HARDWARE_INTEREST_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: "#ffffff",
                                    fontWeight: 600,
                                    textDecorationColor: "#ffffff"
                                }}
                            >
                                interest form
                            </Link>
                            !
                        </Typography>
                    )}
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="eventSuggestions"
                        label="What would you like to see at our event (e.g. new entertainment events, workshops, etc.)? Anything that would improve your experience."
                        sublabel="New ideas or suggestions that we can consider implementing"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={3}
                        value={values.eventSuggestions || ""}
                        onChange={handleChange}
                        error={
                            !!touched.eventSuggestions &&
                            Boolean(errors.eventSuggestions)
                        }
                        helperText={
                            touched.eventSuggestions
                                ? errors.eventSuggestions
                                : ""
                        }
                        inputProps={{ maxLength: 1500 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AttendingHack;
