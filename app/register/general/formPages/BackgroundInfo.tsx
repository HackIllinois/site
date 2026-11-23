import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import SelectTextInput from "@/components/SelectTextInputMUI";
import TextInput from "@/components/TextInputMUI";
import {
    countryOptions,
    FIRST_HACKATHON_OPTION,
    genderOptions,
    graduationYearOptions,
    majorOptions,
    numHackathonOptions,
    OTHER_MAJOR_OPTION,
    raceOptions,
    schoolOptions,
    stateOptions,
    studyLevelOptions,
    underrepresentedOptions,
    US_COUNTRY_OPTION
} from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import { Box, Grid } from "@mui/material";
import { FormikProps } from "formik";
import SectionHeader from "../components/SectionHeader";
import { OTHER_SCHOOL_OPTION } from "../constants/registration";

interface BackgroundInfoProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const toOptions = (arr: string[]) => arr.map(s => ({ label: s, value: s }));

const BackgroundInfo = ({ formik, accentColor }: BackgroundInfoProps) => {
    const { values, errors, touched, setFieldValue, setValues, handleChange } =
        formik;
    const isUS = values.country === US_COUNTRY_OPTION;

    return (
        <Box sx={{ px: { xs: 3, md: 6 }, width: "100%" }}>
            <SectionHeader
                title="BACKGROUND INFO"
                description="Information about your identity and education."
            />

            <Grid container columnSpacing={3} rowSpacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SelectTextInput
                        name="gender"
                        label="Gender"
                        accentColor={accentColor}
                        required
                        options={toOptions(genderOptions)}
                        value={values.gender || ""}
                        onChange={value => setFieldValue("gender", value)}
                        error={!!touched.gender && Boolean(errors.gender)}
                        helperText={touched.gender ? errors.gender : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <SelectTextInput
                        name="race"
                        label="Race / Ethnicity"
                        accentColor={accentColor}
                        required
                        options={toOptions(raceOptions)}
                        value={values.race?.[0] || ""}
                        onChange={value =>
                            setFieldValue("race", value ? [value] : [])
                        }
                        error={!!touched.race && Boolean(errors.race)}
                        helperText={
                            touched.race && errors.race
                                ? String(errors.race)
                                : ""
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: isUS ? 6 : 12 }}>
                    <SelectTextInput
                        name="country"
                        label="Country of Residence"
                        accentColor={accentColor}
                        required
                        options={toOptions(countryOptions)}
                        value={values.country || ""}
                        onChange={value => {
                            setValues({
                                ...values,
                                country: value as string,
                                state: ""
                            });
                        }}
                        error={!!touched.country && Boolean(errors.country)}
                        helperText={touched.country ? errors.country : ""}
                    />
                </Grid>
                {isUS && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <SelectTextInput
                            name="state"
                            label="State or Territory of Residence"
                            accentColor={accentColor}
                            required
                            options={toOptions(stateOptions)}
                            value={values.state || ""}
                            onChange={value => setFieldValue("state", value)}
                            error={!!touched.state && Boolean(errors.state)}
                            helperText={touched.state ? errors.state : ""}
                        />
                    </Grid>
                )}

                <Grid
                    size={{
                        xs: 12,
                        md: values.school === OTHER_SCHOOL_OPTION ? 7 : 12
                    }}
                >
                    <SelectTextInput
                        name="school"
                        label="School"
                        sublabel={`School not listed? Select '${OTHER_SCHOOL_OPTION}'`}
                        accentColor={accentColor}
                        required
                        options={toOptions(schoolOptions)}
                        value={values.school || ""}
                        onChange={value => {
                            setValues({
                                ...values,
                                school: value as string,
                                ...(value !== OTHER_SCHOOL_OPTION && {
                                    otherSchool: ""
                                })
                            });
                        }}
                        error={!!touched.school && Boolean(errors.school)}
                        helperText={touched.school ? errors.school : ""}
                    />
                </Grid>
                {values.school === OTHER_SCHOOL_OPTION && (
                    <Grid size={{ xs: 12, md: 5 }}>
                        <TextInput
                            name="otherSchool"
                            label="Other School"
                            accentColor={accentColor}
                            required
                            value={values.otherSchool || ""}
                            onChange={handleChange}
                            error={
                                !!touched.otherSchool &&
                                Boolean(errors.otherSchool)
                            }
                            helperText={
                                touched.otherSchool ? errors.otherSchool : ""
                            }
                            inputProps={{ maxLength: 200 }}
                        />
                    </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                    <SelectTextInput
                        name="education"
                        label="Level of Study"
                        accentColor={accentColor}
                        required
                        options={toOptions(studyLevelOptions)}
                        value={values.education || ""}
                        onChange={value => setFieldValue("education", value)}
                        error={!!touched.education && Boolean(errors.education)}
                        helperText={touched.education ? errors.education : ""}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <SelectTextInput
                        name="graduate"
                        label="When do you plan to graduate?"
                        accentColor={accentColor}
                        required
                        options={toOptions(graduationYearOptions)}
                        value={values.graduate || ""}
                        onChange={value => setFieldValue("graduate", value)}
                        error={!!touched.graduate && Boolean(errors.graduate)}
                        helperText={touched.graduate ? errors.graduate : ""}
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: values.major === OTHER_MAJOR_OPTION ? 7 : 12
                    }}
                >
                    <SelectTextInput
                        name="major"
                        label="Major / Field of Study"
                        accentColor={accentColor}
                        required
                        options={toOptions(majorOptions)}
                        value={values.major || ""}
                        onChange={value => {
                            setValues({
                                ...values,
                                major: value as string,
                                ...(value !== OTHER_MAJOR_OPTION && {
                                    otherMajor: ""
                                })
                            });
                        }}
                        error={!!touched.major && Boolean(errors.major)}
                        helperText={touched.major ? errors.major : ""}
                    />
                </Grid>
                {values.major === OTHER_MAJOR_OPTION && (
                    <Grid size={{ xs: 12, md: 5 }}>
                        <TextInput
                            name="otherMajor"
                            label="Please specify your major"
                            accentColor={accentColor}
                            required
                            value={values.otherMajor || ""}
                            onChange={handleChange}
                            error={
                                !!touched.otherMajor &&
                                Boolean(errors.otherMajor)
                            }
                            helperText={
                                touched.otherMajor ? errors.otherMajor : ""
                            }
                            inputProps={{ maxLength: 200 }}
                        />
                    </Grid>
                )}

                <Grid size={12}>
                    <RadioSelectGroup
                        name="underrepresented"
                        label="Do you identify as part of an underrepresented group in the technology industry?"
                        accentColor={accentColor}
                        row
                        required
                        options={toOptions(underrepresentedOptions)}
                        value={values.underrepresented}
                        onChange={value =>
                            setFieldValue("underrepresented", value)
                        }
                        error={
                            !!touched.underrepresented &&
                            Boolean(errors.underrepresented)
                        }
                        helperText={
                            touched.underrepresented
                                ? errors.underrepresented
                                : ""
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <SelectTextInput
                        name="hackathonsParticipated"
                        label="How many hackathons have you participated in?"
                        accentColor={accentColor}
                        required
                        options={toOptions(numHackathonOptions)}
                        value={values.hackathonsParticipated || ""}
                        onChange={value => {
                            setValues({
                                ...values,
                                hackathonsParticipated: value as string,
                                ...(value !== FIRST_HACKATHON_OPTION && {
                                    firstHackathonReason: ""
                                })
                            });
                        }}
                        error={
                            !!touched.hackathonsParticipated &&
                            Boolean(errors.hackathonsParticipated)
                        }
                        helperText={
                            touched.hackathonsParticipated
                                ? errors.hackathonsParticipated
                                : ""
                        }
                        maxInputWidth="300px"
                    />
                </Grid>
                {values.hackathonsParticipated === FIRST_HACKATHON_OPTION && (
                    <Grid size={12}>
                        <TextInput
                            name="firstHackathonReason"
                            label="Why would you like to participate in HackIllinois as your first hackathon?"
                            sublabel="max 150 words"
                            accentColor={accentColor}
                            multiline
                            required
                            minRows={3}
                            value={values.firstHackathonReason || ""}
                            onChange={handleChange}
                            error={
                                !!touched.firstHackathonReason &&
                                Boolean(errors.firstHackathonReason)
                            }
                            helperText={
                                touched.firstHackathonReason
                                    ? errors.firstHackathonReason
                                    : ""
                            }
                            inputProps={{ maxLength: 2000 }}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default BackgroundInfo;
