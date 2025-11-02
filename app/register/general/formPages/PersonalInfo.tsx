import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationType } from "@/util/types";
import { Box, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface PersonalInfoProps {
    formik: FormikProps<RegistrationType>;
}

const PersonalInfo = ({ formik }: PersonalInfoProps) => {
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
                fontFamily={"Montserrat"}
                color="white"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
            >
                Personal Information
            </Typography>

            {/* Legal Name */}
            <StyledTextField
                name="legalName"
                label="Legal Name"
                value={values.legalName}
                onChange={handleChange}
                error={touched.legalName && Boolean(errors.legalName)}
                helperText={touched.legalName && errors.legalName}
                required
            />

            {/* Preferred Name (optional) */}
            <StyledTextField
                name="preferredName"
                label="Preferred Name"
                value={values.preferredName}
                onChange={handleChange}
                error={touched.preferredName && Boolean(errors.preferredName)}
                helperText={touched.preferredName && errors.preferredName}
            />

            {/* Email Address */}
            <StyledTextField
                name="emailAddress"
                label="Email Address"
                type="email"
                value={values.emailAddress}
                onChange={handleChange}
                error={touched.emailAddress && Boolean(errors.emailAddress)}
                helperText={touched.emailAddress && errors.emailAddress}
                required
            />

            {/* City / Location */}
            <StyledTextField
                name="location"
                label="City / Location"
                value={values.location}
                onChange={handleChange}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                required
            />

            {/* Gender */}
            <StyledDropdown
                name="gender"
                label="Gender"
                options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Non-binary", value: "Non-binary" },
                    { label: "Prefer not to say", value: "Prefer not to say" },
                    { label: "Other", value: "Other" }
                ]}
                value={values.gender}
                onChange={value => setFieldValue("gender", value)}
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
            />

            {/* Race (multi-select) */}
            <StyledDropdown
                name="race"
                label="Race / Ethnicity"
                multiple
                options={[
                    {
                        label: "American Indian or Alaska Native",
                        value: "American Indian or Alaska Native"
                    },
                    { label: "Asian", value: "Asian" },
                    {
                        label: "Black or African American",
                        value: "Black or African American"
                    },
                    {
                        label: "Hispanic or Latino",
                        value: "Hispanic or Latino"
                    },
                    {
                        label: "Native Hawaiian or Other Pacific Islander",
                        value: "Native Hawaiian or Other Pacific Islander"
                    },
                    { label: "White", value: "White" },
                    { label: "Other", value: "Other" },
                    { label: "Prefer not to say", value: "Prefer not to say" }
                ]}
                value={values.race}
                onChange={value => setFieldValue("race", value)}
                error={touched.race && Boolean(errors.race)}
                helperText={touched.race && String(errors.race || "")}
            />
        </Box>
    );
};

export default PersonalInfo;
