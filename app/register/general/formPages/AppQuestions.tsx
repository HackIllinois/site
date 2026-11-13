import CheckboxSelect from "@/components/CheckboxSelectMUI";
import ResumeUpload from "@/components/ResumeUploadMUI";
import RankSelect from "@/components/RankSelectMUI";
import TextInput from "@/components/TextInputMUI";
import { areaInterestRankOptions } from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Grid, Link, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SectionHeader from "../components/SectionHeader";
import { PRO_TRACK_NAME, PRO_TRACK_URL } from "../constants/registration";

interface AppQuestionsProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
    /** Skip the real resume upload (used while testing without login). */
    localPreview?: boolean;
}

const AppQuestions = ({
    formik,
    accentColor,
    localPreview = false
}: AppQuestionsProps) => {
    const { values, errors, touched, handleChange, setValues } = formik;

    // Software and Hardware must get different ranks, so picking one fills the other.
    const complementRank = (rank: string) => (rank === "1" ? "2" : "1");
    const handleRank =
        (field: "interestSoftware" | "interestHardware") => (rank: string) => {
            const other =
                field === "interestSoftware"
                    ? "interestHardware"
                    : "interestSoftware";
            // One setValues so both ranks validate together.
            setValues({
                ...values,
                [field]: rank,
                ...((rank === "1" || rank === "2") && {
                    [other]: complementRank(rank)
                })
            });
        };

    // One message for the ranking question (either field's error).
    const rankError =
        (touched.interestSoftware && errors.interestSoftware) ||
        (touched.interestHardware && errors.interestHardware) ||
        "";

    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="APPLICATION QUESTIONS"
                description="Your responses in this section will help us decide who will be accepted to HackIllinois. We do not consider any other section of this form when making admissions decisions."
            />

            <Grid container columnSpacing={3} rowSpacing={{ xs: 3, md: 4 }}>
                <Grid size={12}>
                    <RankSelect
                        name="interestRank"
                        label="Which area of the hackathon are you most interested in? Please rank Software and Hardware from 1 (most interested) to 2 (least interested)."
                        required
                        ranks={areaInterestRankOptions}
                        items={[
                            {
                                name: "interestSoftware",
                                label: "Software",
                                value: values.interestSoftware,
                                onChange: handleRank("interestSoftware")
                            },
                            {
                                name: "interestHardware",
                                label: "Hardware",
                                value: values.interestHardware,
                                onChange: handleRank("interestHardware")
                            }
                        ]}
                        error={!!rankError}
                        helperText={rankError}
                    />
                </Grid>

                <Grid size={12}>
                    <ResumeUpload
                        name="hasResume"
                        label="Upload your Resume"
                        required
                        accentColor={accentColor}
                        value={values.hasResume || false}
                        onUploadSuccess={fileName =>
                            setValues({
                                ...values,
                                hasResume: true,
                                resumeFileName: fileName
                            })
                        }
                        error={!!touched.hasResume && Boolean(errors.hasResume)}
                        helperText={
                            touched.hasResume
                                ? (errors.hasResume as string)
                                : ""
                        }
                        skipUpload={localPreview}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application1"
                        label="Tell us about a project you have enjoyed working on, technical or non-technical."
                        sublabel="max 150 words"
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
                            touched.application1 ? errors.application1 : ""
                        }
                        inputProps={{ maxLength: 2000 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application2"
                        label="Pick a product you like: what's one thing you'd change to make it better and why?"
                        sublabel="max 150 words"
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
                            touched.application2 ? errors.application2 : ""
                        }
                        inputProps={{ maxLength: 2000 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application3"
                        label="Why are you interested in attending hackathons, and what do you hope to gain out of HackIllinois?"
                        sublabel="max 150 words"
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
                            touched.application3 ? errors.application3 : ""
                        }
                        inputProps={{ maxLength: 2000 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="applicationOptional"
                        label="If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                        sublabel="Optional, max 200 words"
                        accentColor={accentColor}
                        multiline
                        minRows={4}
                        value={values.applicationOptional}
                        onChange={handleChange}
                        error={
                            !!touched.applicationOptional &&
                            Boolean(errors.applicationOptional)
                        }
                        helperText={
                            touched.applicationOptional
                                ? errors.applicationOptional
                                : ""
                        }
                        inputProps={{ maxLength: 2500 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="portfolioLink"
                        label="Supplemental Materials - Project Portfolio"
                        sublabel="Optional. Link to a portfolio, GitHub, personal site, or a shared file (Google Drive, Dropbox, etc.)"
                        placeholder="https://"
                        accentColor={accentColor}
                        type="url"
                        value={values.portfolioLink || ""}
                        onChange={handleChange}
                        error={
                            !!touched.portfolioLink &&
                            Boolean(errors.portfolioLink)
                        }
                        helperText={
                            touched.portfolioLink ? errors.portfolioLink : ""
                        }
                        inputProps={{ maxLength: 500 }}
                    />
                </Grid>

                <Grid size={12}>
                    <CheckboxSelect
                        name="pro"
                        label={`Would you like to be considered for ${PRO_TRACK_NAME}?`}
                        sublabelContent={
                            <Typography
                                component="p"
                                variant="body2"
                                sx={{ opacity: 0.85, color: "#ffffff" }}
                            >
                                You will have to complete a coding challenge to
                                be eligible. Learn more about {PRO_TRACK_NAME}{" "}
                                <Link
                                    href={PRO_TRACK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: "#ffffff",
                                        fontWeight: 600,
                                        textDecorationColor: "#ffffff"
                                    }}
                                >
                                    here
                                </Link>
                                .
                            </Typography>
                        }
                        optionLabel="Yes"
                        accentColor={accentColor}
                        value={values.pro}
                        onChange={val => {
                            setValues({
                                ...values,
                                pro: val,
                                ...(!val && { proChallengeAcknowledge: false })
                            });
                        }}
                        error={!!touched.pro && Boolean(errors.pro)}
                        helperText={touched.pro ? errors.pro : ""}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppQuestions;
