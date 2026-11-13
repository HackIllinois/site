import SelectTextInput from "@/components/SelectTextInputMUI";
import TextInput from "@/components/TextInputMUI";
import { ageOptions } from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Grid } from "@mui/material";
import { FormikProps } from "formik";
import SectionHeader from "../components/SectionHeader";
import { AGE_ELIGIBILITY_NOTE } from "../constants/registration";

interface PersonalInfoProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const PersonalInfo = ({ formik, accentColor }: PersonalInfoProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;
    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="PERSONAL DETAILS"
                description="Basic information so we can confirm your registration."
            />
            <Grid container columnSpacing={3} rowSpacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextInput
                        name="firstName"
                        label="First Name"
                        accentColor={accentColor}
                        required
                        value={values.firstName}
                        onChange={handleChange}
                        error={!!touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName ? errors.firstName : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextInput
                        name="lastName"
                        label="Last Name"
                        accentColor={accentColor}
                        required
                        value={values.lastName}
                        onChange={handleChange}
                        error={!!touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName ? errors.lastName : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextInput
                        name="preferredName"
                        label="Preferred Name"
                        accentColor={accentColor}
                        value={values.preferredName}
                        onChange={handleChange}
                        error={
                            !!touched.preferredName &&
                            Boolean(errors.preferredName)
                        }
                        helperText={
                            touched.preferredName ? errors.preferredName : ""
                        }
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextInput
                        name="phoneNumber"
                        label="Phone Number"
                        accentColor={accentColor}
                        required
                        type="tel"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        error={
                            !!touched.phoneNumber && Boolean(errors.phoneNumber)
                        }
                        helperText={
                            touched.phoneNumber ? errors.phoneNumber : ""
                        }
                        inputProps={{ maxLength: 20 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SelectTextInput
                        name="age"
                        label="Age"
                        sublabel={AGE_ELIGIBILITY_NOTE}
                        accentColor={accentColor}
                        required
                        options={ageOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.age || ""}
                        onChange={value => setFieldValue("age", value)}
                        error={!!touched.age && Boolean(errors.age)}
                        helperText={touched.age ? errors.age : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextInput
                        name="email"
                        label="Email"
                        accentColor={accentColor}
                        required
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!touched.email && Boolean(errors.email)}
                        helperText={touched.email ? errors.email : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PersonalInfo;
