import CheckboxSelect from "@/components/CheckboxSelectMUI";
import SelectTextInput from "@/components/SelectTextInputMUI";
import TextInput from "@/components/TextInputMUI";
import { uploadFile } from "@/util/api";
import { areaInterestRankOptions } from "@/util/options";
import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import {
    Box,
    Container,
    FormLabel,
    Grid,
    Link,
    Typography
} from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { FORCE_REGISTRATION_CLOSED } from "../../constants";

interface AppQuestionsProps {
    formik: FormikProps<RegistrationApplicationDraftBodyForm>;
    accentColor?: string;
}

const RESUME_MAX_BYTES = 4 * 1024 * 1024;
const RESUME_SESSION_KEY = "hackillinois_registration_resume";

const AppQuestions = ({ formik, accentColor }: AppQuestionsProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [resumeFileName, setResumeFileName] = useState<string>("");
    const [resumeUploading, setResumeUploading] = useState(false);
    const [resumeUploadError, setResumeUploadError] = useState("");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedName = sessionStorage.getItem(RESUME_SESSION_KEY);
        if (savedName) {
            setResumeFileName(savedName);
            setFieldValue("hasResume", true);
        }
    }, [setFieldValue]);

    const complementRank = (rank: string) => (rank === "1" ? "2" : "1");

    const handleSoftwareRank = (value: string | string[]) => {
        const rank = Array.isArray(value) ? value[0] || "" : value;
        setFieldValue("softwareInterestRank", rank);
        if (rank === "1" || rank === "2") {
            setFieldValue("hardwareInterestRank", complementRank(rank));
        }
    };

    const handleHardwareRank = (value: string | string[]) => {
        const rank = Array.isArray(value) ? value[0] || "" : value;
        setFieldValue("hardwareInterestRank", rank);
        if (rank === "1" || rank === "2") {
            setFieldValue("softwareInterestRank", complementRank(rank));
        }
    };

    const processResumeFile = async (file: File | undefined) => {
        if (!file) return;

        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];
        const hasAllowedExtension = /\.(pdf|doc|docx)$/i.test(file.name);
        if (!allowed.includes(file.type) && !hasAllowedExtension) {
            setResumeUploadError("Please upload a PDF or DOCX file.");
            setFieldValue("hasResume", false);
            return;
        }
        if (file.size > RESUME_MAX_BYTES) {
            setResumeUploadError("File must be 4MB or smaller.");
            setFieldValue("hasResume", false);
            return;
        }

        setResumeUploading(true);
        setResumeUploadError("");
        try {
            await uploadFile(file);
            setResumeFileName(file.name);
            setFieldValue("hasResume", true);
            sessionStorage.setItem(RESUME_SESSION_KEY, file.name);
        } catch (error: any) {
            setResumeUploadError(
                error?.message || "Failed to upload resume. Please try again."
            );
            setFieldValue("hasResume", false);
            sessionStorage.removeItem(RESUME_SESSION_KEY);
        } finally {
            setResumeUploading(false);
        }
    };

    const handleFileInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        void processResumeFile(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        void processResumeFile(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const resumeError =
        (!!touched.hasResume && Boolean(errors.hasResume)) ||
        Boolean(resumeUploadError);

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
                Your responses in this section will help us decide who will be
                accepted to HackIllinois. We do not consider any other section
                of this form when making admissions decisions.
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={12}>
                    <Typography
                        variant="h3"
                        sx={{ color: "#ffffff", mb: 2, fontSize: "18px" }}
                    >
                        Which area of the hackathon are you most interested in?
                        Please rank Software and Hardware from 1 (most
                        interested) to 2 (least interested).
                        <span
                            style={{
                                color: "#d32f2f",
                                fontWeight: 500,
                                marginLeft: "4px"
                            }}
                        >
                            *
                        </span>
                    </Typography>
                    <Grid container columnSpacing={2} rowSpacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SelectTextInput
                                name="softwareInterestRank"
                                label="Software"
                                accentColor={accentColor}
                                required
                                options={areaInterestRankOptions.map(
                                    option => ({
                                        label: option,
                                        value: option
                                    })
                                )}
                                value={values.softwareInterestRank || ""}
                                onChange={handleSoftwareRank}
                                error={
                                    !!touched.softwareInterestRank &&
                                    Boolean(errors.softwareInterestRank)
                                }
                                helperText={
                                    !!touched.softwareInterestRank
                                        ? errors.softwareInterestRank
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SelectTextInput
                                name="hardwareInterestRank"
                                label="Hardware"
                                accentColor={accentColor}
                                required
                                options={areaInterestRankOptions.map(
                                    option => ({
                                        label: option,
                                        value: option
                                    })
                                )}
                                value={values.hardwareInterestRank || ""}
                                onChange={handleHardwareRank}
                                error={
                                    !!touched.hardwareInterestRank &&
                                    Boolean(errors.hardwareInterestRank)
                                }
                                helperText={
                                    !!touched.hardwareInterestRank
                                        ? errors.hardwareInterestRank
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={12}>
                    <Box sx={{ name: "hasResume" }}>
                        <FormLabel sx={{ color: "#ffffff" }}>
                            Resume Upload
                            <span
                                style={{
                                    color: "#d32f2f",
                                    position: "absolute",
                                    fontWeight: 500,
                                    marginLeft: "4px"
                                }}
                            >
                                *
                            </span>
                        </FormLabel>
                        <Box
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                border: resumeError
                                    ? "2px dashed #d32f2f"
                                    : "2px dashed #04ff00",
                                borderRadius: "32px",
                                padding: "2rem",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor: "#00ff0015",
                                boxShadow: resumeError
                                    ? "inset 0 0 16px 0px #d32f2f"
                                    : "inset 0 0 16px 0px #04ff00",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#00ff0025",
                                    boxShadow: resumeError
                                        ? "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #d32f2f"
                                        : "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00"
                                },
                                mt: 1
                            }}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    fontFamily: "Montserrat",
                                    mb: 1
                                }}
                            >
                                {resumeUploading
                                    ? "Uploading…"
                                    : "Drag and drop PDF or DOCX file here, or click to browse."}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.7)",
                                    fontFamily: "Montserrat"
                                }}
                            >
                                Max file size: 4MB
                            </Typography>
                            {(resumeFileName || values.hasResume) && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#04ff00",
                                        mt: 2,
                                        fontFamily: "Montserrat",
                                        fontWeight: 500
                                    }}
                                >
                                    {resumeFileName
                                        ? `Selected: ${resumeFileName}`
                                        : "Resume uploaded"}
                                </Typography>
                            )}
                        </Box>
                        {resumeError && (
                            <Typography
                                sx={{
                                    color: "#d32f2f",
                                    mt: 1,
                                    fontSize: "12px",
                                    marginLeft: "14px"
                                }}
                            >
                                {resumeUploadError ||
                                    (errors.hasResume as string) ||
                                    "Resume is required"}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid size={12}>
                    <TextInput
                        name="application1"
                        label="Tell us a project you have enjoyed working on, technical or non-technical."
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
                            !!touched.application1 ? errors.application1 : ""
                        }
                        inputProps={{ maxLength: 2000 }}
                    />
                </Grid>
                <Grid size={12}>
                    <TextInput
                        name="application2"
                        label="Pick a product you like: what’s one thing you’d change to make it better and why?"
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
                            !!touched.application2 ? errors.application2 : ""
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
                            !!touched.applicationOptional
                                ? errors.applicationOptional
                                : ""
                        }
                        inputProps={{ maxLength: 2000 }}
                    />
                </Grid>

                <Grid size={12}>
                    {FORCE_REGISTRATION_CLOSED ? (
                        <></>
                    ) : (
                        <CheckboxSelect
                            name="pro"
                            label="Would you like to be considered for HackVoyagers Path?"
                            sublabelContent={
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        sx={{ opacity: "0.8" }}
                                    >
                                        {
                                            "You will have to complete a coding challenge to be eligible for the Path. Learn more about HackVoyagers"
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
                                if (!val) {
                                    setFieldValue(
                                        "proChallengeAcknowledge",
                                        false
                                    );
                                }
                            }}
                            error={!!touched.pro && Boolean(errors.pro)}
                            helperText={!!touched.pro ? errors.pro : ""}
                        />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AppQuestions;
