import { RegistrationData } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import TextInput from "@/components/TextInputMUI";
import SelectTextInput from "@/components/SelectTextInputMUI";
import { ageOptions } from "@/util/options";

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
                <Grid size={{ xs: 12, sm: 12, md: 5 }}>
                    <TextInput
                        name="firstName"
                        label="First Name"
                        accentColor={accentColor}
                        required
                        value={values.firstName}
                        onChange={handleChange}
                        error={!!touched.firstName && Boolean(errors.firstName)}
                        helperText={!!touched.firstName ? errors.firstName : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 5 }}>
                    <TextInput
                        name="lastName"
                        label="Last Name"
                        accentColor={accentColor}
                        required
                        value={values.lastName}
                        onChange={handleChange}
                        error={!!touched.lastName && Boolean(errors.lastName)}
                        helperText={!!touched.lastName ? errors.lastName : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 3, md: 2 }}>
                    <SelectTextInput
                        name="age"
                        label="Age"
                        accentColor={accentColor}
                        required
                        options={ageOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={values.age}
                        onChange={value => setFieldValue("age", value)}
                        error={!!touched.age && Boolean(errors.age)}
                        helperText={!!touched.age ? errors.age : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 9, md: 6 }}>
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
                            !!touched.preferredName ? errors.preferredName : ""
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <TextInput
                        name="emailAddress"
                        label="Email Address"
                        accentColor={accentColor}
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
            </Grid>
        </Container>
    );
};

export default PersonalInfo;
