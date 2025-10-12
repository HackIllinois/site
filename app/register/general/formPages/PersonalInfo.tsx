import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { FormikProps } from "formik";
import { FormData } from "@/util/types";

interface PersonalInfoProps {
    formik: FormikProps<FormData>;
}

const PersonalInfo = ({ formik }: PersonalInfoProps) => {
    const { values, errors, touched, handleChange, handleBlur } = formik;

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
                sx={{ textAlign: "center", mb: 2 }}
            >
                Personal Information
            </Typography>

            <TextField
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
            />

            <TextField
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
            />

            <TextField
                name="email"
                label="Email Address"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
            />

            <TextField
                name="phone"
                label="Phone Number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                fullWidth
            />

            <TextField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                InputLabelProps={{ shrink: true }}
                fullWidth
            />

            <FormControl
                fullWidth
                error={touched.gender && Boolean(errors.gender)}
            >
                <InputLabel>Gender</InputLabel>
                <Select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Gender"
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="non-binary">Non-binary</MenuItem>
                    <MenuItem value="prefer-not-to-say">
                        Prefer not to say
                    </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                    <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, ml: 2 }}
                    >
                        {errors.gender}
                    </Typography>
                )}
            </FormControl>
        </Box>
    );
};

export default PersonalInfo;
