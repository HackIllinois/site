import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SelectInput from "@/components/SelectInputMUI";
import TextInput from "@/components/TextInputMUI";
import {
    countryOptions,
    genderOptions,
    graduationYearOptions,
    majorOptions,
    raceOptions,
    schoolOptions,
    stateOptions,
    studyLevelOptions,
    underrepresentedOptions
} from "@/util/options";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import { useEffect } from "react";

interface EducationProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Education = ({ formik, accentColor }: EducationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

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
                BACKGROUND INFO
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <SelectInput
                        name="studyLevel"
                        label="Level of Study"
                        required
                        options={studyLevelOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.studyLevel}
                        onChange={value => setFieldValue("studyLevel", value)}
                        error={
                            !!touched.studyLevel && Boolean(errors.studyLevel)
                        }
                        helperText={
                            !!touched.studyLevel ? errors.studyLevel : ""
                        }
                    />{" "}
                </Grid>
                <Grid size={{ xs: 12, sm: 8, md: 5 }}>
                    <SelectInput
                        name="school"
                        label="School"
                        accentColor={accentColor}
                        required
                        options={schoolOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.school}
                        onChange={value => setFieldValue("school", value)}
                        error={!!touched.school && Boolean(errors.school)}
                        helperText={!!touched.school ? errors.school : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                    <SelectInput
                        name="gradYear"
                        label="Graduation Year"
                        accentColor={accentColor}
                        required
                        options={graduationYearOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.gradYear}
                        onChange={value => setFieldValue("gradYear", value)}
                        error={!!touched.gradYear && Boolean(errors.gradYear)}
                        helperText={!!touched.gradYear ? errors.gradYear : ""}
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        sm: 12,
                        md: values.country === "United States" ? 5 : 6
                    }}
                >
                    <SelectInput
                        name="major"
                        label="Major/Field of Study"
                        accentColor={accentColor}
                        required
                        options={majorOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.major}
                        onChange={value => setFieldValue("major", value)}
                        error={!!touched.major && Boolean(errors.major)}
                        helperText={!!touched.major ? errors.major : ""}
                    />
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        sm: values.country === "United States" ? 6 : 12,
                        md: values.country === "United States" ? 4 : 6
                    }}
                >
                    <SelectInput
                        name="country"
                        label="Country of Residence"
                        accentColor={accentColor}
                        required
                        options={countryOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.country}
                        onChange={value => {
                            setFieldValue("country", value);
                            setFieldValue("state", ""); // empty state of residence field
                            // (prevents submitting a state after changing country to non-US)
                        }}
                        error={!!touched.country && Boolean(errors.country)}
                        helperText={!!touched.country ? errors.country : ""}
                    />
                </Grid>
                {values.country === "United States" ? (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <SelectInput
                            name="state"
                            label="State/Territory"
                            accentColor={accentColor}
                            required
                            options={stateOptions.map(option => ({
                                label: option,
                                value: option
                            }))}
                            value={values.state}
                            onChange={value => setFieldValue("state", value)}
                            error={!!touched.state && Boolean(errors.state)}
                            helperText={!!touched.state ? errors.state : ""}
                        />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid size={{ xs: 12, sm: 7, md: 8 }}>
                    <SelectInput
                        name="race"
                        label="Race/Ethnicity"
                        accentColor={accentColor}
                        multiple
                        required
                        options={raceOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.race}
                        onChange={value => setFieldValue("race", value)}
                        error={!!touched.race ? Boolean(errors.race) : false}
                        helperText={
                            !!touched.race && errors.race
                                ? String(errors.race)
                                : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 5, md: 4 }}>
                    <SelectInput
                        name="gender"
                        label="Gender"
                        accentColor={accentColor}
                        required
                        options={genderOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.gender}
                        onChange={value => setFieldValue("gender", value)}
                        error={!!touched.gender && Boolean(errors.gender)}
                        helperText={!!touched.gender ? errors.gender : ""}
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
                            !!touched.underrepresented
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
