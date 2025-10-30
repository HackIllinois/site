import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SelectInput from "@/components/SelectInputMUI";
import TextInput from "@/components/TextInputMUI";
import CheckboxGroupMUI from "@/components/Form/CheckboxGroupMUI";

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
}

const Experience = ({ formik }: ExperienceProps) => {
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
                        label="Why do you want to attend?"
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
                        sx={{
                            "& .MuiInputBase-root": { borderRadius: "18px" }
                        }}
                        required
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
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <CheckboxGroupMUI
                        name="hackOutreach"
                        label="How did you hear about us?"
                        required
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
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <SelectInput
                        name="hackInterest"
                        label="What are you interested in?"
                        multiple
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
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Experience;
