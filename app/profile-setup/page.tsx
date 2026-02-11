"use client";

import CheckboxGroup from "@/components/CheckboxGroupMUI";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import TextInput from "@/components/TextInputMUI";
import { dietaryRestrictionsOptions } from "@/util/options";
import {
    profileInitialValues,
    profileValidationSchema
} from "@/util/validation";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import Loading from "@/components/Loading/Loading";
import {
    acceptAdmissionRSVP,
    loadAdmissionRSVP,
    loadProfile,
    postAuthRefresh,
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
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeError, setResumeError] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);

    const mode = useMemo(() => {
        // edit: Editing the profile, accept: Accepting the RSVP and creating the profile.
        return rsvpData?.response === "ACCEPTED" ? "edit" : "accept";
    }, [rsvpData]);
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

    const handleFileSelect = useCallback(
        (file: File | null) => {
            if (!file) return;

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!allowedTypes.includes(file.type)) {
                setResumeFile(null);
                setResumeError(true);
                setErrorMessage("Please upload a PDF or DOCX file.");
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                setResumeFile(null);
                setResumeError(true);
                setErrorMessage("File must be 4MB or smaller.");
                return;
            }

            setResumeFile(file);
            setResumeError(false);
        },
        [MAX_FILE_SIZE]
    );

    const handleFileInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] ?? null;
        handleFileSelect(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0] ?? null;
        handleFileSelect(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDropzoneClick = () => {
        fileInputRef.current?.click();
    };

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

                const body = {
                    displayName: values.displayName,
                    discordTag: values.discordTag,
                    avatarId: values.avatarId,
                    dietaryRestrictions: [
                        ...values.dietaryRestrictions,
                        ...(values.otherDietaryRestrictions
                            ? [values.otherDietaryRestrictions]
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
                    // Update the user's auth token
                    await postAuthRefresh();
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

        // No errors, check reimbursement amount
        const reimbursementAmount = rsvpData?.reimbursementValue ?? 0;

        // If user has reimbursement > $0, show confirmation modal
        if (mode === "accept" && reimbursementAmount > 0) {
            setShowConfirmDialog(true);
        } else {
            // If no reimbursement, submit directly
            formik.handleSubmit();
        }
    };

    const handleConfirmConfirm = async () => {
        if (submitting) return;
        setShowConfirmDialog(false);
        formik.handleSubmit();
    };

    const handleConfirmCancel = () => {
        setShowConfirmDialog(false);
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
                router.push("/rsvp-unavailable");
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
                router.push("/rsvp-unavailable");
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
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    height: "fit-content",
                    background: `url("/profile/background.svg") center / cover no-repeat`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: { xs: 14, sm: 20 }
                }}
            >
                <ErrorSnackbar
                    open={showErrorAlert}
                    onClose={() => setShowErrorAlert(false)}
                    message={errorMessage}
                />
                <Box
                    sx={{
                        maxWidth: "800px",
                        width: "100%",
                        position: "relative"
                    }}
                >
                    {/* Top bar graphic overlay */}
                    <Box
                        component="img"
                        src="/profile/top-bar.svg"
                        alt=""
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            marginLeft: "5px",
                            maxWidth: "800px",
                            height: "auto",
                            pointerEvents: "none",
                            zIndex: 4,
                            transform: "scale(1.202)",
                            display: {
                                xs: "none",
                                md: "block"
                            }
                        }}
                    />
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "fit-content",
                            // tablet coloring
                            border: { xs: "none", sm: "2px solid #00FF2B" },
                            borderTop: {
                                xs: "2px solid #00ff2b",
                                md: "none"
                            },
                            background: {
                                xs: "linear-gradient(0deg, rgba(0, 204, 3, .4) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)",
                                sm: "linear-gradient(0deg, rgba(0, 204, 3, .00) 0%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)"
                            },
                            backdropFilter: "blur(5px)",
                            overflow: "hidden",
                            py: 5,
                            px: {
                                xs: 3,
                                md: 4
                            },
                            pb: {
                                xs: 5,
                                md: 20
                            },
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            zIndex: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                pt: 0
                            }}
                        >
                            <Box
                                sx={{
                                    mb: {
                                        xs: 2,
                                        md: 12
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    fontFamily={"Tsukimi Rounded, sans-serif"}
                                    sx={{
                                        color: "white", // Bright mint/green base
                                        fontWeight: 600,
                                        textShadow:
                                            "0 0 5px rgba(153, 255, 136, 0.8), 0 0 5px rgba(153, 255, 136, 0.4)",
                                        letterSpacing: "0.02em"
                                    }}
                                >
                                    {
                                        "We're excited to have you at HackIllinois!"
                                    }
                                </Typography>

                                <Typography
                                    fontFamily={"Montserrat"}
                                    sx={{
                                        color: "#CCFFCC", // Softer light green
                                        fontWeight: 400,
                                        fontSize: "1.1rem",
                                        opacity: 0.9,
                                        mt: 1
                                    }}
                                >
                                    Please complete the following information to
                                    confirm your attendance:
                                </Typography>
                            </Box>

                            {/* tablet panel */}
                            <TextInput
                                name="displayName"
                                label="Display Name"
                                accentColor="#fff"
                                sublabel="(This will be shown to other hackers, on the leaderboard, and in our mobile apps)"
                                inputSx={tabletFormInputSx.text}
                                placeholderColor="rgba(255, 255, 255, 0.7)"
                                required
                                value={values.displayName}
                                onChange={handleChange}
                                error={
                                    !!touched.displayName &&
                                    Boolean(errors.displayName)
                                }
                                helperText={
                                    !!touched.displayName
                                        ? errors.displayName
                                        : ""
                                }
                                inputProps={{ maxLength: 200 }}
                            />
                            <TextInput
                                name="discordTag"
                                label="Discord Tag"
                                accentColor="#f0f0f0"
                                inputSx={tabletFormInputSx.text}
                                placeholderColor="rgba(255, 255, 255, 0.7)"
                                required
                                value={values.discordTag}
                                onChange={handleChange}
                                error={
                                    !!touched.discordTag &&
                                    Boolean(errors.discordTag)
                                }
                                helperText={
                                    !!touched.discordTag
                                        ? errors.discordTag
                                        : ""
                                }
                                inputProps={{ maxLength: 200 }}
                            />
                            <Box sx={{ mb: 3, name: "resume-upload" }}>
                                <FormLabel
                                    sx={{
                                        color: "#ffffff"
                                    }}
                                >
                                    {rsvpData?.response === "ACCEPTED"
                                        ? "Upload Updated Resume"
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
                                </FormLabel>
                                <Box
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onClick={handleDropzoneClick}
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
                                        Drag and drop PDF or DOCX file here, or
                                        click to browse.
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
                                    {resumeFile && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#04ff00",
                                                mt: 2,
                                                fontFamily: "Montserrat",
                                                fontWeight: 500
                                            }}
                                        >
                                            Selected: {resumeFile.name}
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
                                        {rsvpData?.response !== "ACCEPTED"
                                            ? "Resume is required"
                                            : errorMessage || "Invalid file"}
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
                                    setFieldValue("shirtSize", value);
                                }}
                                error={
                                    !!touched.shirtSize &&
                                    Boolean(errors.shirtSize)
                                }
                                helperText={
                                    !!touched.shirtSize ? errors.shirtSize : ""
                                }
                            />
                            <Box
                                sx={{
                                    opacity: mode === "edit" ? 0.5 : 1,
                                    disabled:
                                        mode === "edit" ? "true" : "false",
                                    pointerEvents:
                                        mode === "edit" ? "none" : undefined
                                }}
                            >
                                <CheckboxGroup
                                    name="dietaryRestrictions"
                                    label="Food Allergies/Dietary Restrictions"
                                    accentColor={"#f0f0f0"}
                                    inputSx={tabletFormInputSx.select}
                                    options={dietaryRestrictionsOptions.map(
                                        option => ({
                                            label: option,
                                            value: option
                                        })
                                    )}
                                    value={
                                        Array.from(
                                            values.dietaryRestrictions
                                        ) || []
                                    }
                                    onChange={value =>
                                        setFieldValue(
                                            "dietaryRestrictions",
                                            value
                                        )
                                    }
                                    error={
                                        !!touched.dietaryRestrictions &&
                                        Boolean(errors.dietaryRestrictions)
                                    }
                                    helperText={
                                        !!touched.dietaryRestrictions
                                            ? String(
                                                  errors.dietaryRestrictions ||
                                                      ""
                                              )
                                            : ""
                                    }
                                />
                                <Box sx={{ mt: 2 }}>
                                    <TextInput
                                        name="otherDietaryRestriction"
                                        label=""
                                        placeholderColor="rgba(255, 255, 255, 0.7)"
                                        placeholder='If you selected "other" or need to provide more info about your selection, please specify here...'
                                        accentColor="#f0f0f0"
                                        inputSx={tabletFormInputSx.text}
                                        multiline
                                        minRows={3}
                                        error={false}
                                        value={values.otherDietaryRestrictions}
                                        onChange={e =>
                                            setFieldValue(
                                                "otherDietaryRestrictions",
                                                e.target.value
                                            )
                                        }
                                        inputProps={{ maxLength: 500 }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <AvatarCarousel
                                items={avatarItems}
                                value={values.avatarId}
                                onChange={value =>
                                    setFieldValue("avatarId", value)
                                }
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column-reverse",
                                    sm: "row"
                                },
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                                mt: 4
                            }}
                        >
                            <Button
                                onClick={() =>
                                    router.push(
                                        rsvpData?.response === "ACCEPTED"
                                            ? "/profile"
                                            : "/rsvp"
                                    )
                                }
                                sx={{
                                    padding: "16px 48px",
                                    background: "transparent",
                                    border: "2px solid #ffffff",
                                    borderRadius: "50px",
                                    color: "#ffffff",
                                    fontFamily: '"Tsukimi Rounded", sans-serif',
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    "&:hover": {
                                        transform: "scale(1.03)",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.1)",
                                        boxShadow:
                                            "0 4px 15px rgba(255, 255, 255, 0.3)"
                                    },
                                    "&:active": {
                                        transform: "translateY(0)"
                                    }
                                }}
                            >
                                Back
                            </Button>
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
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    boxShadow:
                                        "0 4px 15px rgba(42, 255, 0, 0.4)",
                                    transition: "all 0.3s ease",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    "&:hover:not(:disabled)": {
                                        transform: "scale(1.03)",
                                        boxShadow:
                                            "0 6px 25px rgba(42, 255, 0, 0.6)"
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
                                {submitting
                                    ? "Submitting..."
                                    : mode === "edit"
                                      ? "Update"
                                      : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                    {/* Bottom bar graphic overlay */}
                    <Box
                        component="img"
                        src="/profile/bottom-bar.svg"
                        alt=""
                        sx={{
                            position: "absolute",
                            bottom: "-100px",
                            left: 0,
                            width: "100%",
                            marginLeft: "5px",
                            maxWidth: "800px",
                            height: "auto",
                            pointerEvents: "none",
                            zIndex: 4,
                            transform: "scale(1.202)",
                            display: {
                                xs: "none",
                                md: "block"
                            }
                        }}
                    />
                </Box>
            </Box>
            <Dialog
                open={showConfirmDialog}
                onClose={handleConfirmCancel}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "#111115", // Dark background
                        border: "1px solid #2AFF00", // Neon Green border
                        borderRadius: "24px",
                        boxShadow: "0 0 40px rgba(42, 255, 0, 0.15)", // Green glow
                        color: "white",
                        overflow: "hidden"
                    }
                }}
            >
                {/* System Confirmation Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        pt: 3,
                        pb: 1,
                        color: "#2AFF00",
                        fontFamily: '"Tsukimi Rounded", sans-serif',
                        fontWeight: 700,
                        fontSize: "18px",
                        letterSpacing: "1px",
                        textAlign: "center"
                    }}
                >
                    MISSION CONTROL
                </Box>

                <DialogTitle
                    sx={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontSize: { xs: "20px", md: "24px" },
                        fontWeight: 600,
                        color: "white",
                        textAlign: "center",
                        padding: "0.5rem 2rem"
                    }}
                >
                    Are you sure you would like to confirm?
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", sans-serif',
                            fontSize: "14px",
                            color: "#E0E0E0",
                            textAlign: "center",
                            lineHeight: 1.7,
                            mt: 1
                        }}
                    >
                        Because capacity and reimbursements are limited,
                        confirming your spot reserves space and funding that
                        cannot be reassigned later.
                        <br />
                        <br />
                        Please only confirm if you genuinely believe you can
                        attend.
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column-reverse", md: "row" },
                        justifyContent: "center",
                        gap: 2,
                        padding: "0 2rem 3rem",
                        paddingBottom: 3,
                        mt: 2
                    }}
                >
                    <Button
                        onClick={handleConfirmCancel}
                        sx={{
                            padding: "10px 24px",
                            background: "transparent",
                            border: "1px solid #FF6B6B",
                            borderRadius: "50px",
                            color: "#FF6B6B",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "13px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            width: { xs: "100%", md: "auto" },
                            whiteSpace: "nowrap",
                            "&:hover": {
                                background: "rgba(255, 107, 107, 0.1)",
                                borderColor: "#FF6B6B",
                                boxShadow: "0 0 15px rgba(255, 107, 107, 0.2)"
                            }
                        }}
                    >
                        LET ME THINK AGAIN
                    </Button>
                    <Button
                        onClick={handleConfirmConfirm}
                        disabled={submitting}
                        sx={{
                            padding: "10px 24px",
                            background: "transparent",
                            border: "1px solid #2AFF00",
                            borderRadius: "50px",
                            color: "#2AFF00",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontSize: "13px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            width: { xs: "100%", md: "auto" },
                            whiteSpace: "nowrap",
                            "&:hover": {
                                background: "rgba(42, 255, 0, 0.1)",
                                borderColor: "#2AFF00",
                                boxShadow: "0 0 15px rgba(42, 255, 0, 0.2)"
                            },
                            "&:disabled": {
                                opacity: 0.5,
                                borderColor: "#555",
                                color: "#777"
                            }
                        }}
                    >
                        I CONFIRM I CAN ATTEND
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Rsvp;
