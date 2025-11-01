import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SelectInput from "@/components/SelectInputMUI";
import TextInput from "@/components/TextInputMUI";
import CheckboxGroup from "@/components/CheckboxGroupMUI";

const CONSIDER_OPTIONS = ["General Admission", "Mentor", "Volunteer"];
const OUTREACH_OPTIONS = [
    "Friend",
    "Class/Professor",
    "Email",
    "Twitter/X",
    "LinkedIn",
    "Discord",
    "Flyer",
    "Other"
];
const INTEREST_OPTIONS = [
    "Web",
    "Mobile",
    "AI/ML",
    "Systems",
    "Security",
    "AR/VR",
    "Hardware",
    "Product/Design",
    "Other"
];

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
                EXPERIENCE
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, md: 12 }}>
                    {/* Essays */}
                    <TextInput
                        name="hackEssay1"
                        label="In a couple of sentences, please explain why you are interested in participating in HackIllinois 2024."
                        value={values.hackEssay1}
                        onChange={handleChange}
                        error={
                            !!touched.hackEssay1 && Boolean(errors.hackEssay1)
                        }
                        helperText={
                            !!touched.hackEssay1 ? errors.hackEssay1 : ""
                        }
                        multiline
                        minRows={4}
                        required
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxGroup
                        name="hackOutreach"
                        label="How did you hear about us?"
                        options={OUTREACH_OPTIONS.map(opt => ({
                            label: opt,
                            value: opt
                        }))}
                        value={values.hackOutreach}
                        onChange={value => setFieldValue("hackOutreach", value)}
                        error={
                            !!touched.hackOutreach &&
                            Boolean(errors.hackOutreach)
                        }
                        helperText={
                            !!touched.hackOutreach
                                ? String(errors.hackOutreach || "")
                                : ""
                        }
                        required
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxGroup
                        name="hackInterest"
                        label="What are you interested in?"
                        options={INTEREST_OPTIONS.map(opt => ({
                            label: opt,
                            value: opt
                        }))}
                        value={values.hackInterest}
                        onChange={value => setFieldValue("hackInterest", value)}
                        error={
                            !!touched.hackInterest &&
                            Boolean(errors.hackInterest)
                        }
                        helperText={
                            !!touched.hackInterest
                                ? String(errors.hackInterest || "")
                                : ""
                        }
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <TextInput
                        name="hackEssay2"
                        label="Tell us about a project you built or want to build"
                        value={values.hackEssay2}
                        onChange={handleChange}
                        error={
                            !!touched.hackEssay2 && Boolean(errors.hackEssay2)
                        }
                        helperText={
                            !!touched.hackEssay2 ? errors.hackEssay2 : ""
                        }
                        multiline
                        minRows={4}
                        sx={{
                            "& .MuiInputBase-root": { borderRadius: "18px" }
                        }}
                        required
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <TextInput
                        name="proEssay"
                        label="Professional/Technical Experience"
                        value={values.proEssay}
                        onChange={handleChange}
                        error={!!touched.proEssay && Boolean(errors.proEssay)}
                        helperText={!!touched.proEssay ? errors.proEssay : ""}
                        multiline
                        minRows={4}
                        sx={{
                            "& .MuiInputBase-root": { borderRadius: "18px" }
                        }}
                        required
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <TextInput
                        name="optionalEssay"
                        label="Optional: Anything else you'd like us to know"
                        value={values.optionalEssay}
                        onChange={handleChange}
                        error={
                            !!touched.optionalEssay &&
                            Boolean(errors.optionalEssay)
                        }
                        helperText={
                            !!touched.optionalEssay ? errors.optionalEssay : ""
                        }
                        multiline
                        minRows={3}
                        sx={{
                            "& .MuiInputBase-root": { borderRadius: "18px" }
                        }}
                        accentColor={accentColor}
                    />
                </Grid>

                {/* Multi-selects */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <SelectInput
                        name="considerForGeneral"
                        label="Consider me for"
                        multiple
                        options={CONSIDER_OPTIONS.map(opt => ({
                            label: opt,
                            value: opt
                        }))}
                        value={values.considerForGeneral}
                        onChange={value =>
                            setFieldValue("considerForGeneral", value)
                        }
                        error={
                            !!touched.considerForGeneral &&
                            Boolean(errors.considerForGeneral)
                        }
                        helperText={
                            !!touched.considerForGeneral
                                ? String(errors.considerForGeneral || "")
                                : ""
                        }
                        accentColor={accentColor}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Experience;
