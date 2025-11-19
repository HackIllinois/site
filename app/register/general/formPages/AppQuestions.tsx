import CheckboxSelect from "@/components/CheckboxSelectMUI";
import TextInput from "@/components/TextInputMUI";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect } from "react";
interface AppQuestionsProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const AppQuestions = ({ formik, accentColor }: AppQuestionsProps) => {
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
                        name="application1"
                        label="Pick a product you use often. What’s one thing you’d change to make it better, and what motivated that change?"
                        sublabel="max. 50 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={4}
                        value={values.application1}
                        onChange={handleChange}
                        error={
                            !!touched.application1 &&
                            Boolean(errors.application1)
                        }
                        helperText={
                            !!touched.application1 ? errors.application1 : ""
                        }
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="application2"
                        label="Describe a challenge you have faced in the field of CS, and how you overcame it. This challenge can be related to a project, work or volunteer experience, diversity/inclusion, etc."
                        sublabel="max. 100 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={4}
                        value={values.application2}
                        onChange={handleChange}
                        error={
                            !!touched.application2 &&
                            Boolean(errors.application2)
                        }
                        helperText={
                            !!touched.application2 ? errors.application2 : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="applicationOptional"
                        label="If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                        sublabel="optional, max. 100 words"
                        accentColor={accentColor}
                        multiline
                        // not required
                        minRows={4}
                        value={values.applicationOptional}
                        onChange={handleChange}
                        error={
                            !!touched.applicationOptional &&
                            Boolean(errors.applicationOptional)
                        }
                        helperText={
                            !!touched.applicationOptional
                                ? errors.applicationOptional
                                : ""
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
                            name="applicationPro"
                            label="<PRO ESSAY PROMPT>"
                            sublabel="max. 50 words"
                            accentColor={accentColor}
                            multiline
                            required
                            minRows={4}
                            value={values.applicationPro}
                            onChange={handleChange}
                            error={
                                !!touched.applicationPro &&
                                Boolean(errors.applicationPro)
                            }
                            helperText={
                                !!touched.applicationPro
                                    ? errors.applicationPro
                                    : ""
                            }
                        />
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default AppQuestions;
