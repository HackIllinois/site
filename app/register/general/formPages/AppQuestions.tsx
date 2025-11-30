import CheckboxSelect from "@/components/CheckboxSelectMUI";
import TextInput from "@/components/TextInputMUI";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
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
                    mb: 2
                }}
            >
                APPLICATION QUESTIONS
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    mb: 4,
                    lineHeight: 1.6,
                    fontFamily: "Montserrat",
                    color: "#e9e9e9ff",
                    fontSize: "16px"
                }}
            >
                Your application to HackIllinois will be evaluated solely based
                on your responses to these questions.
                <br />
                <br />
                No other registration information will be used.
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={12}>
                    <TextInput
                        name="application1"
                        label="Pick a product you like: what’s one thing you’d change to make it better and why?"
                        sublabel="max 50 words"
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
                        inputProps={{ maxLength: 700 }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="application2"
                        label="Describe a time you learned something for fun."
                        sublabel="max 50 words"
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
                        inputProps={{ maxLength: 700 }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="application3"
                        label="Describe a challenge you have faced in your field, and how you overcame it. This challenge can be related to a project, work or volunteer experience, diversity/inclusion, etc."
                        sublabel="max 100 words"
                        accentColor={accentColor}
                        multiline
                        required
                        minRows={4}
                        value={values.application3}
                        onChange={handleChange}
                        error={
                            !!touched.application3 &&
                            Boolean(errors.application3)
                        }
                        helperText={
                            !!touched.application3 ? errors.application3 : ""
                        }
                        inputProps={{ maxLength: 1400 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="applicationOptional"
                        label="If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                        sublabel="optional, max 100 words"
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
                        inputProps={{ maxLength: 1400 }}
                    />
                </Grid>
                <Grid size={12}>
                    <CheckboxSelect
                        name="pro"
                        label="Would you like to be considered for HackVoyagers Track?"
                        sublabelContent={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography
                                    component="p"
                                    variant="body2"
                                    sx={{ opacity: "0.8" }}
                                >
                                    {
                                        "You'll have to complete a short coding challenge about 1 hour long. Learn more about HackVoyagers"
                                    }
                                    <Link
                                        href="/challenge/landing-page"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            fontSize: "16px",
                                            alignItems: "center",
                                            padding: "2px 5px",
                                            borderRadius: "5px",
                                            color: "#ADED4A",
                                            fontWeight: "500",
                                            textDecorationColor: "#ADED4A",
                                            textDecorationThickness: "2px",
                                            "&:hover": {
                                                color: "#fff",
                                                textDecorationColor: "#fff",
                                                textDecoration: "underline"
                                            }
                                        }}
                                    >
                                        here
                                    </Link>
                                </Typography>
                            </Box>
                        }
                        optionLabel="Yes"
                        accentColor={accentColor}
                        value={values.pro}
                        onChange={val => {
                            setFieldValue("pro", val);
                        }}
                        error={!!touched.pro && Boolean(errors.pro)}
                        helperText={!!touched.pro ? errors.pro : ""}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AppQuestions;
