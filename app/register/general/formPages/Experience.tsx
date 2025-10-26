import StyledTextField from "@/components/StyledTextfield/StyledTextfield";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationType } from "@/util/types";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { FormikProps } from "formik";

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
    formik: FormikProps<RegistrationType>;
}

const Experience = ({ formik }: ExperienceProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 700,
                mx: "auto",
                pt: 5
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
            >
                Experience
            </Typography>

            {/* Essays */}
            <StyledTextField
                name="hackEssay1"
                label="Why do you want to attend?"
                value={values.hackEssay1}
                onChange={handleChange}
                error={touched.hackEssay1 && Boolean(errors.hackEssay1)}
                helperText={touched.hackEssay1 && errors.hackEssay1}
                multiline
                minRows={4}
                sx={{ "& .MuiInputBase-root": { borderRadius: "18px" } }}
                required
            />

            <StyledTextField
                name="hackEssay2"
                label="Tell us about a project you built or want to build"
                value={values.hackEssay2}
                onChange={handleChange}
                error={touched.hackEssay2 && Boolean(errors.hackEssay2)}
                helperText={touched.hackEssay2 && errors.hackEssay2}
                multiline
                minRows={4}
                sx={{ "& .MuiInputBase-root": { borderRadius: "18px" } }}
                required
            />

            <StyledTextField
                name="proEssay"
                label="Professional/Technical Experience"
                value={values.proEssay}
                onChange={handleChange}
                error={touched.proEssay && Boolean(errors.proEssay)}
                helperText={touched.proEssay && errors.proEssay}
                multiline
                minRows={4}
                sx={{ "& .MuiInputBase-root": { borderRadius: "18px" } }}
                required
            />

            <StyledTextField
                name="optionalEssay"
                label="Optional: Anything else you'd like us to know"
                value={values.optionalEssay}
                onChange={handleChange}
                error={touched.optionalEssay && Boolean(errors.optionalEssay)}
                helperText={touched.optionalEssay && errors.optionalEssay}
                multiline
                minRows={3}
                sx={{ "& .MuiInputBase-root": { borderRadius: "18px" } }}
            />

            {/* Consider for general hack (now a boolean) */}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={Boolean(values.considerForGeneral)}
                        onChange={e =>
                            setFieldValue(
                                "considerForGeneral",
                                e.target.checked
                            )
                        }
                        sx={{ color: "white" }}
                    />
                }
                label="Consider me for the General Hack"
                sx={{ color: "white", fontFamily: "Montserrat" }}
            />

            <StyledDropdown
                name="hackOutreach"
                label="How did you hear about us?"
                multiple
                options={OUTREACH_OPTIONS.map(opt => ({
                    label: opt,
                    value: opt
                }))}
                value={values.hackOutreach}
                onChange={value => setFieldValue("hackOutreach", value)}
                error={touched.hackOutreach && Boolean(errors.hackOutreach)}
                helperText={
                    touched.hackOutreach && String(errors.hackOutreach || "")
                }
            />

            <StyledDropdown
                name="hackInterest"
                label="What are you interested in?"
                multiple
                options={INTEREST_OPTIONS.map(opt => ({
                    label: opt,
                    value: opt
                }))}
                value={values.hackInterest}
                onChange={value => setFieldValue("hackInterest", value)}
                error={touched.hackInterest && Boolean(errors.hackInterest)}
                helperText={
                    touched.hackInterest && String(errors.hackInterest || "")
                }
            />
        </Box>
    );
};

export default Experience;
