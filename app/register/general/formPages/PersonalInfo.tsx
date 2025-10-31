import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import TextInput from "@/components/TextInputMUI";
import SelectInput from "@/components/SelectInputMUI";

interface PersonalInfoProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const PersonalInfo = ({ formik, accentColor }: PersonalInfoProps) => {
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
                PERSONAL INFO
            </Typography>
            <Grid container columnSpacing={2} rowSpacing={{ xs: 3, md: 6 }}>
                <Grid size={{ xs: 12, md: 12, lg: 6 }}>
                    {/* Legal Name */}
                    <TextInput
                        name="legalName"
                        label="Legal Name"
                        required
                        value={values.legalName}
                        onChange={handleChange}
                        error={!!touched.legalName && Boolean(errors.legalName)}
                        helperText={!!touched.legalName ? errors.legalName : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    {/* Preferred Name (optional) */}
                    <TextInput
                        name="preferredName"
                        label="Preferred Name"
                        value={values.preferredName}
                        onChange={handleChange}
                        error={
                            !!touched.preferredName &&
                            Boolean(errors.preferredName)
                        }
                        helperText={
                            !!touched.preferredName ? errors.preferredName : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    {/* Gender */}
                    <SelectInput
                        name="gender"
                        label="Gender"
                        required
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                            { label: "Non-binary", value: "Non-binary" },
                            {
                                label: "Prefer not to say",
                                value: "Prefer not to say"
                            },
                            { label: "Other", value: "Other" }
                        ]}
                        value={values.gender}
                        onChange={value => setFieldValue("gender", value)}
                        error={!!touched.gender && Boolean(errors.gender)}
                        helperText={!!touched.gender ? errors.gender : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    {/* Race (multi-select) */}
                    <SelectInput
                        name="race"
                        label="Race / Ethnicity"
                        required
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
                            {
                                label: "Prefer not to say",
                                value: "Prefer not to say"
                            }
                        ]}
                        value={values.race}
                        onChange={value => setFieldValue("race", value)}
                        error={!!touched.race && Boolean(errors.race)}
                        helperText={
                            !!touched.race ? String(errors.race || "") : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                    {/* Email Address */}
                    <TextInput
                        name="emailAddress"
                        label="Email Address"
                        required
                        type="email"
                        value={values.emailAddress}
                        onChange={handleChange}
                        error={
                            !!touched.emailAddress &&
                            Boolean(errors.emailAddress)
                        }
                        helperText={
                            !!touched.emailAddress ? errors.emailAddress : ""
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 3 }}>
                    {/* City / Location */}
                    <TextInput
                        name="location"
                        label="City / Location"
                        required
                        value={values.location}
                        onChange={handleChange}
                        error={!!touched.location && Boolean(errors.location)}
                        helperText={!!touched.location ? errors.location : ""}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default PersonalInfo;
