import CheckboxGroup from "@/components/CheckboxGroupMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import { RegistrationData } from "@/util/types";
import { Box, Typography, Divider, Chip, Grid } from "@mui/material";
import { FormikProps } from "formik";

interface ReviewProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Line = () => <Divider sx={{ my: 2, borderColor: "#3d3558" }} />;

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap"
        }}
    >
        <Typography
            sx={{ color: "rgba(255,255,255,0.8)", fontFamily: "Montserrat" }}
        >
            {label}
        </Typography>
        <Box
            sx={{
                color: "white",
                fontFamily: "Montserrat",
                textAlign: "right"
            }}
        >
            {value}
        </Box>
    </Box>
);

const ChipList = ({ items }: { items: string[] }) => (
    <Box
        sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "flex-end"
        }}
    >
        {items.length === 0 ? (
            <Typography sx={{ color: "white" }}>—</Typography>
        ) : (
            items.map(i => <Chip key={i} label={i} sx={{ color: "white" }} />)
        )}
    </Box>
);

const Review = ({ formik, accentColor }: ReviewProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", pt: 5 }}>
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    mt: 8,
                    mb: 4
                }}
            >
                REVIEW & SUBMIT
            </Typography>
            <Typography
                variant="h4"
                component="h2"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
            >
                Review your information
            </Typography>

            {/* DISPLAY INFORMATION TO REVIEW HERE */}
            {/*  */}
            {/*  */}

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxSelect
                        name="reviewedAcknowledge"
                        label="Please review the above information. Once you submit you will not be able to make changes."
                        accentColor={accentColor}
                        row
                        optionLabel="I reviewed my information to ensure it is correct."
                        value={values.reviewedAcknowledge}
                        onChange={value =>
                            setFieldValue("reviewedAcknowledge", value)
                        }
                        error={
                            !!touched.reviewedAcknowledge &&
                            Boolean(errors.reviewedAcknowledge)
                        }
                        helperText={
                            !!touched.reviewedAcknowledge
                                ? errors.reviewedAcknowledge
                                : ""
                        }
                    />
                </Grid>
                {values.considerForPro && (
                    <Grid size={{ xs: 12, md: 12 }}>
                        <CheckboxSelect
                            name="proChallengeAcknowledge"
                            label="I understand that in order to be considered for pro track, I must complete the challenge I receive after submitting this form by <cutoff date before we start reviewing admissions>"
                            accentColor={accentColor}
                            row
                            optionLabel="I understand"
                            value={values.proChallengeAcknowledge}
                            onChange={value =>
                                setFieldValue("proChallengeAcknowledge", value)
                            }
                            error={
                                !!touched.proChallengeAcknowledge &&
                                Boolean(errors.proChallengeAcknowledge)
                            }
                            helperText={
                                !!touched.proChallengeAcknowledge
                                    ? errors.proChallengeAcknowledge
                                    : ""
                            }
                        />
                    </Grid>
                )}
                <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxSelect
                        name="codeOfConductAcknowledge"
                        label="I have read and agree to the HackIllinois Code of Conduct (https://2025.hackillinois.org/legal/code-of-conduct)"
                        accentColor={accentColor}
                        row
                        optionLabel="I accept the Code of Conduct"
                        value={values.codeOfConductAcknowledge}
                        onChange={value =>
                            setFieldValue("codeOfConductAcknowledge", value)
                        }
                        error={
                            !!touched.codeOfConductAcknowledge &&
                            Boolean(errors.codeOfConductAcknowledge)
                        }
                        helperText={
                            !!touched.codeOfConductAcknowledge
                                ? errors.codeOfConductAcknowledge
                                : ""
                        }
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Review;
