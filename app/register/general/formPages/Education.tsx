import { FormData } from "@/util/types";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";

interface EducationProps {
    formik: FormikProps<FormData>;
}

const Education = ({ formik }: EducationProps) => {
    const { values, errors, touched, handleChange } = formik;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 500,
                mx: "auto"
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{ textAlign: "center", mb: 2, fw: "bold", pt: 5 }}
            >
                Education Information
            </Typography>

            <TextField
                name="university"
                label="University/College"
                value={values.university}
                onChange={handleChange}
                error={touched.university && Boolean(errors.university)}
                helperText={touched.university && errors.university}
                fullWidth
            />

            <FormControl
                fullWidth
                error={touched.degree && Boolean(errors.degree)}
            >
                <InputLabel>Degree Level</InputLabel>
                <Select
                    name="degree"
                    value={values.degree}
                    onChange={handleChange}
                    label="Degree Level"
                >
                    <MenuItem value="associate">Associates Degree</MenuItem>
                    <MenuItem value="bachelor">Bachelors Degree</MenuItem>
                    <MenuItem value="master">Masters Degree</MenuItem>
                    <MenuItem value="phd">PhD</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.degree && errors.degree && (
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, ml: 2 }}
                    >
                        {errors.degree}
                    </Typography>
                )}
            </FormControl>

            <TextField
                name="major"
                label="Major/Field of Study"
                value={values.major}
                onChange={handleChange}
                error={touched.major && Boolean(errors.major)}
                helperText={touched.major && errors.major}
                fullWidth
            />

            <TextField
                name="graduationYear"
                label="Graduation Year"
                type="number"
                value={values.graduationYear}
                onChange={handleChange}
                error={touched.graduationYear && Boolean(errors.graduationYear)}
                helperText={touched.graduationYear && errors.graduationYear}
                fullWidth
            />

            <TextField
                name="gpa"
                label="GPA (Optional)"
                type="number"
                value={values.gpa}
                onChange={handleChange}
                error={touched.gpa && Boolean(errors.gpa)}
                helperText={touched.gpa && errors.gpa}
                fullWidth
            />

            <TextField
                name="expectedGraduation"
                label="Expected Graduation Date"
                type="date"
                value={values.expectedGraduation}
                onChange={handleChange}
                error={
                    touched.expectedGraduation &&
                    Boolean(errors.expectedGraduation)
                }
                helperText={
                    touched.expectedGraduation && errors.expectedGraduation
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
            />
        </Box>
    );
};

export default Education;
