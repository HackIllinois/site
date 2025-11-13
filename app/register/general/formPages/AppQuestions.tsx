import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import TextInput from "@/components/TextInputMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";

interface ExperienceProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Experience = ({ formik, accentColor }: ExperienceProps) => {
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
                APPLICATION QUESTIONS
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={12}>
                    <TextInput
                        name="hackEssay1"
                        label="What opportunity, event, or feature of HackIllinois 2026 are you most excited to take part in and why?"
                        sublabel="max. 50 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={4}
                        value={values.hackEssay1}
                        onChange={handleChange}
                        error={
                            !!touched.hackEssay1 && Boolean(errors.hackEssay1)
                        }
                        helperText={
                            !!touched.hackEssay1 ? errors.hackEssay1 : ""
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="hackEssay2"
                        label="Describe a challenge you have faced in the field of CS, and how you overcame it. This challenge can be related to a project, work or volunteer experience, diversity/inclusion, etc."
                        sublabel="max. 50 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={4}
                        value={values.hackEssay2}
                        onChange={handleChange}
                        error={
                            !!touched.hackEssay2 && Boolean(errors.hackEssay2)
                        }
                        helperText={
                            !!touched.hackEssay2 ? errors.hackEssay2 : ""
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="optionalEssay"
                        label="If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                        sublabel="optional, max. 100 words"
                        accentColor={accentColor}
                        multiline
                        // not required
                        minRows={4}
                        value={values.optionalEssay}
                        onChange={handleChange}
                        error={
                            !!touched.optionalEssay &&
                            Boolean(errors.optionalEssay)
                        }
                        helperText={
                            !!touched.optionalEssay ? errors.optionalEssay : ""
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <CheckboxSelect
                        name="considerForPro"
                        label="Would you like to be considered for pro track?"
                        sublabel="You'll have to complete a short coding challenge."
                        optionLabel="Yes"
                        accentColor={accentColor}
                        value={values.considerForPro}
                        onChange={value =>
                            setFieldValue("considerForPro", value)
                        }
                        error={
                            !!touched.considerForPro &&
                            Boolean(errors.considerForPro)
                        }
                        helperText={
                            !!touched.considerForPro
                                ? errors.considerForPro
                                : ""
                        }
                    />
                </Grid>
                {values.considerForPro && (
                    <Grid size={12}>
                        <TextInput
                            name="proEssay"
                            label="<PRO ESSAY PROMPT>"
                            sublabel="max. 50 words"
                            accentColor={accentColor}
                            multiline
                            required
                            minRows={4}
                            value={values.proEssay}
                            onChange={handleChange}
                            error={
                                !!touched.proEssay && Boolean(errors.proEssay)
                            }
                            helperText={
                                !!touched.proEssay ? errors.proEssay : ""
                            }
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Experience;
