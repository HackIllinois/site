import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import schools from "@/modules/schools.json";
import majors from "@/modules/majors.json";
import SelectInput from "@/components/SelectInputMUI";
import TextInput from "@/components/TextInputMUI";
import {
    genderOptions,
    majorOptions,
    raceOptions,
    schoolOptions,
    studyLevelOptions
} from "@/util/options";

interface EducationProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Education = ({ formik, accentColor }: EducationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

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
                EDUCATION
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
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
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <SelectInput
                        name="race"
                        label="Race/Ethnicity"
                        accentColor={accentColor}
                        required
                        options={raceOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.race}
                        onChange={value => setFieldValue("race", value)}
                        error={!!touched.race && Boolean(errors.race)}
                        helperText={!!touched.race ? errors.race : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
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
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <TextInput
                        name="gradYear"
                        label="Graduation Year"
                        required
                        placeholder="(YYYY)"
                        value={values.gradYear}
                        onChange={handleChange}
                        error={!!touched.gradYear && Boolean(errors.gradYear)}
                        helperText={!!touched.gradYear ? errors.gradYear : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <SelectInput
                        name="degree"
                        label="Degree"
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
                <Grid size={{ xs: 6, md: 6, lg: 6 }}>
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
            </Grid>
        </Container>
    );
};

export default Education;
