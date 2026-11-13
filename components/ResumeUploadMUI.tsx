"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Typography
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { uploadFile } from "@/util/api";
import { BOX_SHADOW, BOX_SHADOW_HOVER } from "@/theme/shadows";

interface ResumeUploadProps {
    name: string;
    label: string;
    required?: boolean;
    accentColor?: string;
    value?: boolean;
    onUploadSuccess?: (fileName: string) => void;
    error?: boolean;
    helperText?: string;
    /** Accept the file locally without calling the upload API (local testing). */
    skipUpload?: boolean;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB (S3 limit)

const ResumeUpload: React.FC<ResumeUploadProps> = ({
    name,
    label,
    required = false,
    accentColor = "#2c2540",
    value = false,
    onUploadSuccess,
    error: formikError = false,
    helperText = "",
    skipUpload = false
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(value);

    useEffect(() => {
        setSuccess(value);
    }, [value]);

    const hasError = !!localError || formikError;

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            setLocalError("Please upload a PDF file.");
            setSuccess(false);
            setFileName(null);
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setLocalError("File must be under 2 MB.");
            setSuccess(false);
            setFileName(null);
            return;
        }

        setLocalError(null);
        setFileName(file.name);
        setUploading(true);
        setSuccess(false);

        try {
            if (!skipUpload) {
                await uploadFile(file);
            }
            setSuccess(true);
            onUploadSuccess?.(file.name);
        } catch {
            setLocalError("Upload failed. Please try again.");
            setSuccess(false);
        } finally {
            setUploading(false);
        }
    };

    return (
        <FormControl fullWidth error={hasError}>
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 1,
                    fontWeight: 400
                }}
            >
                <span style={{ marginRight: required ? "14px" : "8px" }}>
                    {label}
                </span>
                {required && (
                    <span
                        style={{
                            color: "#ffffff",
                            position: "absolute",
                            marginLeft: "-13px",
                            fontWeight: 500
                        }}
                    >
                        *
                    </span>
                )}
            </FormLabel>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                name={name}
            />

            <Box
                onClick={handleClick}
                sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "12px",
                    boxShadow: BOX_SHADOW,
                    border: hasError
                        ? "2px dashed #d32f2f"
                        : success
                          ? `2px dashed ${accentColor}`
                          : "2px dashed #c4c4c4",
                    px: 3,
                    py: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: BOX_SHADOW_HOVER
                    }
                }}
            >
                {success ? (
                    <CheckCircleIcon
                        sx={{ fontSize: 40, color: accentColor, mb: 1 }}
                    />
                ) : (
                    <CloudUploadIcon
                        sx={{ fontSize: 40, color: "#999", mb: 1 }}
                    />
                )}

                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "center"
                    }}
                >
                    {uploading
                        ? "Uploading..."
                        : success && !fileName
                          ? "Resume uploaded"
                          : fileName
                            ? fileName
                            : "Click to upload your resume (PDF, max 2 MB)"}
                </Typography>

                {success && (
                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "12px",
                            color: accentColor,
                            mt: 0.5
                        }}
                    >
                        Uploaded successfully!
                    </Typography>
                )}
            </Box>

            {(localError || helperText) && (
                <FormHelperText sx={{ mt: 0.5, color: "#ffffff" }}>
                    {localError || helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default ResumeUpload;
