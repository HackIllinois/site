import { RegistrationData } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import TextInput from "@/components/TextInputMUI";
import SelectTextInput from "@/components/SelectTextInputMUI";
import { ageOptions } from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect } from "react";

interface PersonalInfoProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const PersonalInfo = ({ formik, accentColor }: PersonalInfoProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    useEffect(() => {
        if (!formik.dirty || formik.isSubmitting) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            (e as any).returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formik.dirty, formik.isSubmitting]);

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
                        name="email"
                        label="Email Address"
                        accentColor={accentColor}
                        required
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!touched.email && Boolean(errors.email)}
                        helperText={!!touched.email ? errors.email : ""}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default PersonalInfo;
