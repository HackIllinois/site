import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationType } from "@/util/types";
import { Box, Typography } from "@mui/material";
import { FormikProps } from "formik";
import schools from "@/modules/schools.json";
import majors from "@/modules/majors.json";

const DEGREE_OPTIONS = [
    "High School",
    "Associate",
    "Bachelor's",
    "Master's",
    "PhD",
    "Bootcamp/Other"
];

interface EducationProps {
    formik: FormikProps<RegistrationType>;
}

const Education = ({ formik }: EducationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 500,
                mx: "auto",
                pt: 5
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
            >
                Education
            </Typography>

            {/* Degree (select) */}
            <StyledDropdown
                name="degree"
                label="Degree"
                options={DEGREE_OPTIONS.map(d => ({ label: d, value: d }))}
                value={values.degree}
                onChange={value => setFieldValue("degree", value)}
                error={touched.degree && Boolean(errors.degree)}
                helperText={touched.degree && errors.degree}
            />

            <StyledDropdown
                name="university"
                label="University"
                options={schools.map(school => ({
                    label: school,
                    value: school
                }))}
                value={values.university}
                onChange={value => setFieldValue("university", value)}
                error={touched.university && Boolean(errors.university)}
                helperText={touched.university && errors.university}
            />

            <StyledDropdown
                name="major"
                label="Major"
                options={majors.map(major => ({ label: major, value: major }))}
                value={values.major}
                onChange={value => setFieldValue("major", value)}
                error={touched.major && Boolean(errors.major)}
                helperText={touched.major && errors.major}
            />

            <StyledDropdown
                name="minor"
                label="Minor (optional)"
                options={majors.map(major => ({ label: major, value: major }))}
                value={values.minor}
                onChange={value => setFieldValue("minor", value)}
                error={touched.minor && Boolean(errors.minor)}
                helperText={touched.minor && errors.minor}
            />

            <StyledTextField
                name="gradYear"
                label="Graduation Year (YYYY)"
                value={String(values.gradYear || "")}
                onChange={e =>
                    setFieldValue("gradYear", Number((e as any).target.value))
                }
                error={touched.gradYear && Boolean(errors.gradYear)}
                helperText={touched.gradYear && errors.gradYear}
                required
            />
        </Box>
    );
};

export default Education;
