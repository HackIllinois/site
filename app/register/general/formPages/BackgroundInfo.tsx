import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import SelectTextInput from "@/components/SelectTextInputMUI";
import {
    countryOptions,
    genderOptions,
    graduationYearOptions,
    majorOptions,
    numHackathonOptions,
    raceOptions,
    schoolOptions,
    stateOptions,
    studyLevelOptions,
    underrepresentedOptions
} from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface EducationProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const Education = ({ formik, accentColor }: EducationProps) => {
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
                BACKGROUND INFO
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <SelectTextInput
                        name="education"
                        label="Level of Study"
                        required
                        options={studyLevelOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.education || ""}
                        onChange={value => setFieldValue("education", value)}
                        error={!!touched.education && Boolean(errors.education)}
                        helperText={touched.education ? errors.education : ""}
                    />{" "}
                </Grid>
                <Grid size={{ xs: 12, sm: 8, md: 5 }}>
                    <SelectTextInput
                        name="school"
                        label="School"
                        accentColor={accentColor}
                        required
                        options={schoolOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.school || ""}
                        onChange={value => setFieldValue("school", value)}
                        error={!!touched.school && Boolean(errors.school)}
                        helperText={touched.school ? errors.school : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <SelectTextInput
                        name="graduate"
                        label="Graduation Year"
                        accentColor={accentColor}
                        required
                        options={graduationYearOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.graduate || ""}
                        onChange={value => setFieldValue("graduate", value)}
                        error={!!touched.graduate && Boolean(errors.graduate)}
                        helperText={touched.graduate ? errors.graduate : ""}
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 12,
                        md: values.country === "United States" ? 5 : 6
                    }}
                >
                    <SelectTextInput
                        name="major"
                        label="Major/Field of Study"
                        accentColor={accentColor}
                        required
                        options={majorOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.major || ""}
                        onChange={value => setFieldValue("major", value)}
                        error={!!touched.major && Boolean(errors.major)}
                        helperText={touched.major ? errors.major : ""}
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: values.country === "United States" ? 6 : 12,
                        md: values.country === "United States" ? 4 : 6
                    }}
                >
                    <SelectTextInput
                        name="country"
                        label="Country of Residence"
                        accentColor={accentColor}
                        required
                        options={countryOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.country || ""}
                        onChange={value => {
                            setFieldValue("country", value);
                            setFieldValue("state", ""); // empty state of residence field
                            // (prevents submitting a state after changing country to non-US)
                        }}
                        error={!!touched.country && Boolean(errors.country)}
                        helperText={touched.country ? errors.country : ""}
                    />
                </Grid>
                {values.country === "United States" ? (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SelectTextInput
                            name="state"
                            label="State/Territory"
                            accentColor={accentColor}
                            required
                            options={stateOptions.map(option => ({
                                label: option,
                                value: option
                            }))}
                            value={values.state || ""}
                            onChange={value => setFieldValue("state", value)}
                            error={!!touched.state && Boolean(errors.state)}
                            helperText={touched.state ? errors.state : ""}
                        />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid size={{ xs: 12, sm: 7, md: 8 }}>
                    <SelectTextInput
                        name="race"
                        label="Race/Ethnicity"
                        accentColor={accentColor}
                        multiple
                        required
                        options={raceOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.race || []}
                        onChange={value => setFieldValue("race", value)}
                        error={touched.race ? Boolean(errors.race) : false}
                        helperText={
                            !!touched.race && errors.race
                                ? String(errors.race)
                                : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                    <SelectTextInput
                        name="gender"
                        label="Gender"
                        accentColor={accentColor}
                        required
                        options={genderOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.gender || ""}
                        onChange={value => setFieldValue("gender", value)}
                        error={!!touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender ? errors.gender : ""}
                    />
                </Grid>

                <Grid size={12}>
                    <SelectTextInput
                        name="hackathonsParticipated"
                        label="How many hackathons have you participated in?"
                        accentColor={accentColor}
                        required
                        options={numHackathonOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.hackathonsParticipated || ""}
                        onChange={value =>
                            setFieldValue("hackathonsParticipated", value)
                        }
                        error={
                            !!touched.hackathonsParticipated &&
                            Boolean(errors.hackathonsParticipated)
                        }
                        helperText={
                            touched.hackathonsParticipated
                                ? errors.hackathonsParticipated
                                : ""
                        }
                        maxInputWidth={"300px"}
                    />
                </Grid>

                <Grid size={12}>
                    <RadioSelectGroup
                        name="underrepresented"
                        label="Do you identify as part of an underrepresented group in the technology industry?"
                        accentColor={accentColor}
                        row
                        required
                        options={underrepresentedOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.underrepresented}
                        onChange={value =>
                            setFieldValue("underrepresented", value)
                        }
                        error={
                            !!touched.underrepresented &&
                            Boolean(errors.underrepresented)
                        }
                        helperText={
                            touched.underrepresented
                                ? errors.underrepresented
                                : ""
                        }
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Education;
