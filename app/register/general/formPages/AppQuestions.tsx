import CheckboxGroup from "@/components/CheckboxGroupMUI";
import CheckboxSelect from "@/components/CheckboxSelectMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import ResumeUpload from "@/components/ResumeUploadMUI";
import TextInput from "@/components/TextInputMUI";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Grid, Link, Typography } from "@mui/material";
import { FormikProps } from "formik";
import SectionHeader from "../components/SectionHeader";
import {
    PRO_LEVEL_NAME,
    PRO_LEVEL_URL,
    RESPONSE_LIMITS
} from "../constants/registration";

interface AppQuestionsProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const AppQuestions = ({ formik, accentColor }: AppQuestionsProps) => {
    const { values, errors, touched, handleChange, setValues } = formik;

    // Stored as the same two rank fields adonix already takes:
    //   one area picked:            picked = "1", other = ""
    //   both, preference picked:    preferred = "1", other = "2"
    //   both, no preference yet:    both "1" (draft only; validation blocks submit)
    const areaFields = {
        Software: "interestSoftware",
        Hardware: "interestHardware"
    } as const;
    type Area = keyof typeof areaFields;
    const areas = Object.keys(areaFields) as Area[];
    const selectedAreas = areas.filter(area => !!values[areaFields[area]]);
    const bothSelected = selectedAreas.length === 2;
    const preferredArea = bothSelected
        ? areas.find(
              area =>
                  values[areaFields[area]] === "1" &&
                  values[areaFields[areas.find(a => a !== area)!]] === "2"
          )
        : undefined;

    const handleAreas = (picked: string[]) => {
        const has = (area: Area) => picked.includes(area);
        // Picking a second area never picks a preference for the applicant.
        setValues({
            ...values,
            interestSoftware: has("Software") ? "1" : "",
            interestHardware: has("Hardware") ? "1" : ""
        });
    };

    const handlePreference = (preferred: string | boolean) => {
        setValues({
            ...values,
            interestSoftware: preferred === "Software" ? "1" : "2",
            interestHardware: preferred === "Hardware" ? "1" : "2"
        });
    };

    const areaError =
        (touched.interestSoftware && errors.interestSoftware) || "";
    const preferenceError =
        (touched.interestHardware && errors.interestHardware) || "";

    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="APPLICATION QUESTIONS"
                description="Your responses in this section will help us decide who will be accepted to HackIllinois. We do not consider any other section of this form when making admissions decisions."
            />

            <Grid container columnSpacing={3} rowSpacing={{ xs: 3, md: 4 }}>
                <Grid size={12}>
                    <TextInput
                        name="application3"
                        label="Why are you interested in attending hackathons, and what do you hope to gain out of HackIllinois?"
                        sublabel={`max ${RESPONSE_LIMITS.application3} characters`}
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
                        inputProps={{ maxLength: RESPONSE_LIMITS.application3 }}
                    />
                </Grid>

                <Grid size={12}>
                    {/* Own box: CheckboxGroup fills its parent's height. */}
                    <Box>
                        <CheckboxGroup
                            name="interestAreas"
                            label="Which area of the hackathon are you interested in? Select one or both."
                            required
                            accentColor={accentColor}
                            options={areas.map(area => ({
                                label: area,
                                value: area
                            }))}
                            value={selectedAreas}
                            onChange={handleAreas}
                            error={!!areaError}
                            helperText={areaError}
                        />
                        {bothSelected && (
                            <Box sx={{ mt: 3 }}>
                                <RadioSelectGroup
                                    name="interestPreference"
                                    label="Which one are you more interested in?"
                                    required
                                    row
                                    accentColor={accentColor}
                                    options={areas.map(area => ({
                                        label: area,
                                        value: area
                                    }))}
                                    value={preferredArea}
                                    onChange={handlePreference}
                                    error={!!preferenceError}
                                    helperText={preferenceError}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>

                <Grid size={12}>
                    <ResumeUpload
                        name="hasResume"
                        label="Upload your Resume"
                        required
                        accentColor={accentColor}
                        value={values.hasResume || false}
                        fileName={values.resumeFileName}
                        onUploadSuccess={fileName =>
                            setValues(current => ({
                                ...current,
                                hasResume: true,
                                resumeFileName: fileName
                            }))
                        }
                        error={!!touched.hasResume && Boolean(errors.hasResume)}
                        helperText={
                            touched.hasResume
                                ? (errors.hasResume as string)
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application1"
                        label="Tell us about a project you have enjoyed working on, technical or non-technical."
                        sublabel={`max ${RESPONSE_LIMITS.application1} characters`}
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
                        inputProps={{ maxLength: RESPONSE_LIMITS.application1 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application2"
                        label="Pick a product you like: what's one thing you'd change to make it better and why?"
                        sublabel={`max ${RESPONSE_LIMITS.application2} characters`}
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
                        inputProps={{ maxLength: RESPONSE_LIMITS.application2 }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="applicationOptional"
                        label="If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to elaborate on it. Your application will not be negatively impacted if you choose not to answer this question."
                        sublabel={`Optional, max ${RESPONSE_LIMITS.applicationOptional} characters`}
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
                        inputProps={{
                            maxLength: RESPONSE_LIMITS.applicationOptional
                        }}
                    />
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="portfolioLink"
                        label="Upload any supplemental materials that you think might provide more context for your application, such as a project portfolio, etc."
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
                        label={`Would you like to be considered for ${PRO_LEVEL_NAME}?`}
                        sublabelContent={
                            <Typography
                                component="p"
                                variant="body2"
                                sx={{ opacity: 0.85, color: "#ffffff" }}
                            >
                                You will have to complete a coding challenge to
                                be eligible. Learn more about {PRO_LEVEL_NAME}{" "}
                                <Link
                                    href={PRO_LEVEL_URL}
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
