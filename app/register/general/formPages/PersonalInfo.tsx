import SelectTextInput from "@/components/SelectTextInputMUI";
import TextInput from "@/components/TextInputMUI";
import { ageOptions } from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { raceOptions, genderOptions } from "@/util/options";

interface PersonalInfoProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
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
                    mb: 4,
                    fontFamily: "Ultra",
                    color: "#ffffff"
                }}
            >
                PERSONAL INFO
            </Typography>
            <Grid container columnSpacing={2} rowSpacing={{ xs: 3, md: 6 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <TextInput
                        name="firstName"
                        label="First Name"
                        accentColor={accentColor}
                        required
                        value={values.firstName}
                        onChange={handleChange}
                        error={!!touched.firstName && Boolean(errors.firstName)}
                        helperText={!!touched.firstName ? errors.firstName : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <TextInput
                        name="lastName"
                        label="Last Name"
                        accentColor={accentColor}
                        required
                        value={values.lastName}
                        onChange={handleChange}
                        error={!!touched.lastName && Boolean(errors.lastName)}
                        helperText={!!touched.lastName ? errors.lastName : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <TextInput
                        name="email"
                        label="Email Address"
                        accentColor={accentColor}
                        required
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!touched.email && Boolean(errors.email)}
                        helperText={!!touched.email ? errors.email : ""}
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
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
                            !!touched.phoneNumber ? errors.phoneNumber : ""
                        }
                        inputProps={{ maxLength: 20 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 5, md: 2.5 }}>
                    <SelectTextInput
                        name="age"
                        label="Age"
                        sublabel="You must be 18 or older to register."
                        accentColor={accentColor}
                        required
                        options={ageOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.age || ""}
                        onChange={value => setFieldValue("age", value)}
                        error={!!touched.age && Boolean(errors.age)}
                        helperText={!!touched.age ? errors.age : ""}
                    />
                </Grid>
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
                        error={!!touched.race ? Boolean(errors.race) : false}
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
                        helperText={!!touched.gender ? errors.gender : ""}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default PersonalInfo;
