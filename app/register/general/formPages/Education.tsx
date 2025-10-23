import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import schools from "@/modules/schools.json";
import majors from "@/modules/majors.json";
import SelectInput from "@/components/SelectInputMUI";
import TextInput from "@/components/TextInputMUI";

const DEGREE_OPTIONS = [
    "High School",
    "Associate",
    "Bachelor's",
    "Master's",
    "PhD",
    "Bootcamp/Other"
];

interface EducationProps {
    formik: FormikProps<RegistrationData>;
}

const Education = ({ formik }: EducationProps) => {
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
                <Grid size={{ xs: 6, md: 6 }}>
                    <SelectInput
                        name="university"
                        label="University"
                        options={schools.map(school => ({
                            label: school,
                            value: school
                        }))}
                        value={values.university}
                        onChange={value => setFieldValue("university", value)}
                        error={
                            !!touched.university && Boolean(errors.university)
                        }
                        helperText={
                            !!touched.university ? errors.university : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 3, md: 3 }}>
                    <TextInput
                        name="gradYear"
                        label="Graduation Year (YYYY)"
                        value={values.gradYear}
                        onChange={handleChange}
                        error={!!touched.gradYear && Boolean(errors.gradYear)}
                        helperText={!!touched.gradYear ? errors.gradYear : ""}
                        required
                    />
                </Grid>
                {/* Degree (select) */}
                <Grid size={{ xs: 3, md: 3 }}>
                    <SelectInput
                        name="degree"
                        label="Degree"
                        options={DEGREE_OPTIONS.map(d => ({
                            label: d,
                            value: d
                        }))}
                        value={values.degree}
                        onChange={value => setFieldValue("degree", value)}
                        error={!!touched.degree && Boolean(errors.degree)}
                        helperText={!!touched.degree ? errors.degree : ""}
                    />{" "}
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                    <SelectInput
                        name="major"
                        label="Major"
                        options={majors.map(major => ({
                            label: major,
                            value: major
                        }))}
                        value={values.major}
                        onChange={value => setFieldValue("major", value)}
                        error={!!touched.major && Boolean(errors.major)}
                        helperText={!!touched.major ? errors.major : ""}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 6 }}>
                    <SelectInput
                        name="minor"
                        label="Minor (optional)"
                        options={majors.map(major => ({
                            label: major,
                            value: major
                        }))}
                        value={values.minor}
                        onChange={value => setFieldValue("minor", value)}
                        error={!!touched.minor && Boolean(errors.minor)}
                        helperText={!!touched.minor ? errors.minor : ""}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Education;
