"use client";

import CheckboxGroup from "@/components/CheckboxGroupMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import TextInput from "@/components/TextInputMUI";
import { dietaryRestrictionsOptions } from "@/util/options";
import {
    profileInitialValues,
    profileValidationSchema
} from "@/util/validation";
import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";

import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import Loading from "@/components/Loading/Loading";
import {
    acceptAdmissionRSVP,
    loadAdmissionRSVP,
    loadProfile,
    updateProfile,
    uploadFile
} from "@/util/api";
import { AcceptAdmissionRSVPRequest, RSVPInfo } from "@/util/types";
import { useRouter } from "next/navigation";
import { AvatarCarousel, type AvatarItem } from "../profile/AvatarCarousel";

// different styling for registration form inputs
const tabletFormInputSx = {
    text: {
        // override normal styling
        backgroundColor: "#00ff0015",
        border: "2px solid #04ff00",
        boxShadow: "inset 0 0 16px 0px #04ff00",
        "&.Mui-focused": {
            // Mui props needed because of the MUI component structure... the focus is on the input _inside_ this div
            backgroundColor: "#00ff0025", // lighter on focus
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        }
    },
    select: {
        // override normal styling
        backgroundColor: "#00ff0015",
        border: "2px solid #04ff00",
        boxShadow: "inset 0 0 16px 0px #04ff00",
        "&:hover": {
            backgroundColor: "#00ff0025", // lighter on hover
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        },
        "&.Mui-checked": {
            color: "transparent", // this affects the animation
            background: "transparent"
        },
        "&.Mui-checked:hover": {
            background: "transparent",
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        }
    }
};

const Rsvp = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeError, setResumeError] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [otherDietaryRestriction, setOtherDietaryRestriction] = useState("");

    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);

    // get initial values from profile endpoint, if they exist
    const formik = useFormik({
        initialValues: profileInitialValues,
        validationSchema: profileValidationSchema,
        onSubmit: async values => {
            if (submitting) return;

            setSubmitting(true);
            try {
                // Upload resume file if provided (required for new RSVP, optional when editing)
                if (resumeFile) {
                    await uploadFile(resumeFile);
                } else if (rsvpData?.response !== "ACCEPTED") {
                    // Only require resume for new RSVP, not when editing
                    setResumeError(true);

                    const firstErrorElement = document.querySelector(
                        '[name="resume-upload"]'
                    );
                    // Go to the resume upload
                    if (firstErrorElement) {
                        firstErrorElement.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                        (firstErrorElement as any).focus?.();
                    }
                    setSubmitting(false);
                    return;
                }

                console.log(
                    "Dietary restrictions",
                    values.dietaryRestrictions,
                    otherDietaryRestriction
                );

                const body = {
                    displayName: values.displayName,
                    discordTag: values.discordTag,
                    avatarId: values.avatarId,
                    dietaryRestrictions: [
                        ...values.dietaryRestrictions,
                        ...(otherDietaryRestriction
                            ? [otherDietaryRestriction]
                            : [])
                    ],
                    shirtSize: values.shirtSize
                } satisfies AcceptAdmissionRSVPRequest;

                if (rsvpData?.response === "ACCEPTED") {
                    // Update the profile
                    await updateProfile(body);
                } else {
                    // Accept the RSVP with the profile data
                    await acceptAdmissionRSVP(body);
                }

                // Redirect to profile page after successful submission
                router.push("/profile");
            } catch (error: unknown) {
                console.error("Error submitting profile:", error);
                setErrorMessage(
                    error instanceof Error
                        ? error?.message
                        : "Failed to submit profile. Please try again."
                );
                setShowErrorAlert(true);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleSubmitWithValidation = async () => {
        let hasError = false;
        let firstErrorElement: HTMLElement | null = null;

        // Check resume validation (only required for new RSVP, optional when editing)
        if (!resumeFile && rsvpData?.response !== "ACCEPTED") {
            setResumeError(true);
            hasError = true;
            firstErrorElement = document.querySelector(
                '[name="resume-upload"]'
            );
        }

        // Validate other fields
        try {
            await profileValidationSchema.validate(formik.values, {
                abortEarly: false
            });
        } catch (error: any) {
            if (error.name === "ValidationError") {
                hasError = true;
                const touchedFields: any = {};
                error.inner.forEach((err: any) => {
                    if (err.path) touchedFields[err.path] = true;
                });
                formik.setTouched(touchedFields);

                // Get the first error field if we don't already have one from resume
                if (!firstErrorElement) {
                    const firstErrorPath = error.inner[0]?.path || error.path;
                    if (firstErrorPath) {
                        firstErrorElement = document.querySelector(
                            `[name="${firstErrorPath}"], [id="${firstErrorPath}"]`
                        ) as HTMLElement | null;
                    }
                }
            }
        }

        // If there are any errors, scroll to the first one
        if (hasError && firstErrorElement) {
            firstErrorElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            (firstErrorElement as any).focus?.();
            return;
        }

        // No errors, submit the form
        formik.handleSubmit();
    };

    const { values, errors, touched, handleChange, setFieldValue } = formik;

    const base =
        "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/avatars";

    const avatarItems: AvatarItem[] = useMemo(
        () => [
            { id: "character1", src: `${base}/character1.png` },
            { id: "character2", src: `${base}/character2.png` },
            { id: "character3", src: `${base}/character3.png` },
            { id: "character4", src: `${base}/character4.png` },
            { id: "character5", src: `${base}/character5.png` }
        ],
        [base]
    );

    const loadRSVPData = async () => {
        try {
            const rsvpData = await loadAdmissionRSVP();

            setRsvpData(rsvpData);

            if (!rsvpData.emailSent || rsvpData.status !== "ACCEPTED") {
                router.push("/register/general");
                return;
            }

            if (rsvpData.response === "ACCEPTED") {
                const profile = await loadProfile();

                const allSelectedDietaryRestrictions =
                    profile.dietaryRestrictions;

                const checkboxSelectedDietaryRestrictions =
                    allSelectedDietaryRestrictions.filter(restriction =>
                        dietaryRestrictionsOptions.includes(restriction)
                    );
                const otherDietaryRestrictions =
                    allSelectedDietaryRestrictions.filter(
                        restriction =>
                            !dietaryRestrictionsOptions.includes(restriction)
                    );

                const fileName = profile.avatarUrl.split("/").pop();
                const avatarId = fileName?.replace(".png", "") ?? "character1";

                formik.setValues({
                    displayName: profile.displayName,
                    discordTag: profile.discordTag,
                    shirtSize: profile.shirtSize,
                    dietaryRestrictions: checkboxSelectedDietaryRestrictions,
                    otherDietaryRestrictions:
                        otherDietaryRestrictions.length > 0
                            ? otherDietaryRestrictions[0]
                            : "",
                    avatarId
                });
            } else if (rsvpData.response === "DECLINED") {
                router.push("/rsvp");
                return;
            }

            setLoading(false);
        } catch (error: any) {
            if (
                error?.status === 404 ||
                error?.statusCode === 404 ||
                error.error === "NotFound"
            ) {
                router.push("/register/general");
            } else {
                console.error("Error loading RSVP data:", error);
                setErrorMessage(
                    error?.message ||
                        "Failed to load RSVP data. Please try again."
                );
                setShowErrorAlert(true);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadRSVPData();
    }, [router]);

    if (loading) return <Loading />;

    if (rsvpData?.status !== "ACCEPTED" || rsvpData.response === "DECLINED") {
        return <></>;
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                height: "fit-content",
                background: `url("/profile/background.jpg") center / cover no-repeat`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 0, sm: 12 }
            }}
        >
            <ErrorSnackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                message={errorMessage}
            />
            <Box
                sx={{
                    maxWidth: "90vw",
                    width: "80vw",
                    height: "fit-content",
                    // tablet coloring
                    border: { xs: "none", sm: "2px solid #00FF2B" },
                    background: {
                        xs: "linear-gradient(0deg, rgba(0, 204, 3, .4) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)",
                        sm: "linear-gradient(0deg, rgba(0, 204, 3, .01) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)"
                    },
                    backdropFilter: "blur(7.5px)",
                    overflow: "hidden",
                    py: 8,
                    px: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6
                }}
            >
                <Box>
                    {/* tablet panel */}
                    <TextInput
                        name="displayName"
                        label="Display Name"
                        accentColor="#f0f0f0"
                        sublabel="(This will be shown to other hackers, on the leaderboard, and in our mobile apps)"
                        inputSx={tabletFormInputSx.text}
                        required
                        value={values.displayName}
                        onChange={handleChange}
                        error={
                            !!touched.displayName && Boolean(errors.displayName)
                        }
                        helperText={
                            !!touched.displayName ? errors.displayName : ""
                        }
                        inputProps={{ maxLength: 200 }}
                    />
                    <TextInput
                        name="discordTag"
                        label="Discord Tag"
                        accentColor="#f0f0f0"
                        inputSx={tabletFormInputSx.text}
                        required
                        value={values.discordTag}
                        onChange={handleChange}
                        error={
                            !!touched.discordTag && Boolean(errors.discordTag)
                        }
                        helperText={
                            !!touched.discordTag ? errors.discordTag : ""
                        }
                        inputProps={{ maxLength: 200 }}
                    />
                    <Box sx={{ mb: 3 }} name="resume-upload">
                        <Typography
                            sx={{
                                color: "#ffffff",
                                mb: 1,
                                fontWeight: 500
                            }}
                        >
                            {rsvpData?.response === "ACCEPTED"
                                ? "Upload Updated Resume (your previous one is saved)"
                                : "Resume"}
                            {rsvpData?.response !== "ACCEPTED" && (
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
                            )}
                        </Typography>
                        <Button
                            component="label"
                            sx={{
                                padding: "12px 24px",
                                backgroundColor: "#00ff0015",
                                border: resumeError
                                    ? "2px solid #d32f2f"
                                    : "2px solid #04ff00",
                                boxShadow: resumeError
                                    ? "inset 0 0 16px 0px #d32f2f"
                                    : "inset 0 0 16px 0px #04ff00",
                                borderRadius: "50px",
                                color: "white",
                                fontFamily: '"Montserrat", sans-serif',
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                textTransform: "none",
                                width: "100%",
                                justifyContent: "flex-start",
                                "&:hover": {
                                    backgroundColor: "#00ff0025",
                                    boxShadow: resumeError
                                        ? "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #d32f2f"
                                        : "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00"
                                }
                            }}
                        >
                            {resumeFile
                                ? resumeFile.name
                                : "Choose Resume File"}
                            <input
                                type="file"
                                hidden
                                accept=".pdf,.doc,.docx"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setResumeFile(file);
                                        setResumeError(false);
                                    }
                                }}
                            />
                        </Button>
                        {resumeFile && (
                            <Typography
                                sx={{
                                    color: "#04ff00",
                                    mt: 1,
                                    fontSize: "12px"
                                }}
                            >
                                Selected: {resumeFile.name}
                            </Typography>
                        )}
                        {resumeError && !resumeFile && (
                            <Typography
                                sx={{
                                    color: "#d32f2f",
                                    mt: 1,
                                    fontSize: "12px",
                                    marginLeft: "14px"
                                }}
                            >
                                Resume is required
                            </Typography>
                        )}
                    </Box>
                    <RadioSelectGroup
                        name="shirtSize"
                        label="Shirt Size"
                        accentColor="#26ed65"
                        inputSx={tabletFormInputSx.select}
                        row
                        required
                        options={["XS", "S", "M", "L", "XL", "2XL"].map(
                            option => ({
                                label: option,
                                value: option
                            })
                        )}
                        value={values.shirtSize}
                        onChange={value => {
                            console.log("Value", value);
                            setFieldValue("shirtSize", value);
                        }}
                        error={!!touched.shirtSize && Boolean(errors.shirtSize)}
                        helperText={!!touched.shirtSize ? errors.shirtSize : ""}
                    />
                    <CheckboxGroup
                        name="dietaryRestrictions"
                        label="Food Allergies/Dietary Restrictions"
                        accentColor={"#f0f0f0"}
                        inputSx={tabletFormInputSx.select}
                        disabled={rsvpData.response === "ACCEPTED"}
                        options={dietaryRestrictionsOptions.map(option => ({
                            label: option,
                            value: option
                        }))}
                        value={Array.from(values.dietaryRestrictions) || []}
                        onChange={value =>
                            setFieldValue("dietaryRestrictions", value)
                        }
                        error={
                            !!touched.dietaryRestrictions &&
                            Boolean(errors.dietaryRestrictions)
                        }
                        helperText={
                            !!touched.dietaryRestrictions
                                ? String(errors.dietaryRestrictions || "")
                                : ""
                        }
                    />
                    <Box sx={{ mt: 2 }}>
                        <TextInput
                            name="otherDietaryRestriction"
                            label=""
                            disabled={rsvpData.response === "ACCEPTED"}
                            placeholder='If you selected "other" or need to provide more info about your selection, please specify here...'
                            accentColor="#f0f0f0"
                            inputSx={tabletFormInputSx.text}
                            multiline
                            minRows={3}
                            error={false}
                            value={otherDietaryRestriction}
                            onChange={e =>
                                setOtherDietaryRestriction(e.target.value)
                            }
                            inputProps={{ maxLength: 500 }}
                        />
                    </Box>
                </Box>
                <Box>
                    <AvatarCarousel
                        items={avatarItems}
                        value={values.avatarId}
                        onChange={value => setFieldValue("avatarId", value)}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        onClick={handleSubmitWithValidation}
                        disabled={submitting}
                        sx={{
                            padding: "16px 48px",
                            background:
                                "linear-gradient(135deg, #8EDB91 0%, #2AFF00 100%)",
                            border: "2px solid #2AFF00",
                            borderRadius: "50px",
                            color: "#0a1a0a",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "20px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(42, 255, 0, 0.4)",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            "&:hover:not(:disabled)": {
                                transform: "scale(1.03)",
                                boxShadow: "0 6px 25px rgba(42, 255, 0, 0.6)"
                            },
                            "&:active:not(:disabled)": {
                                transform: "translateY(0)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                cursor: "not-allowed"
                            }
                        }}
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Rsvp;
