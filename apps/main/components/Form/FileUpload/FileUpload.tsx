"use client";
import clsx from "clsx";
import React, { useState } from "react";

// import { uploadFile } from "@/utils/api";
// import { FileType } from "@/utils/types";

import styles from "./FileUpload.module.scss";
import { useField } from "formik";
import { uploadFile } from "@/util/api";

type FileType = "resume" | "photo" | "blobstore";

type PropTypes = {
    name: string;
    label: string;
    type: FileType;
    text: string;
    accept: string;
    className?: string;
    required?: boolean;
    [key: string]: unknown;
};

const FileUpload: React.FC<PropTypes> = ({
    name,
    label,
    text,
    accept,
    className,
    required,
    ...props
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { value } = field;

    const showFeedback = meta.error && meta.touched;

    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const onFileUpload = (file: File) => {
        setIsUploading(true);
        setValue(file.name);
        uploadFile(file)
            .then(() => {
                field.onChange(file.name);
            })
            .catch(() => {
                alert("Failed to upload file.");
            })
            .finally(() => {
                setIsUploading(false);
            });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        if (event.dataTransfer.files.length > 0) {
            onFileUpload(event.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    return (
        <div className={styles.container}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            <div
                className={clsx(styles.fileUpload, className, {
                    [styles.dragOver]: isDragOver
                })}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                {...props}
            >
                {text && <p className={styles.text}>{text}</p>}
                <label>
                    {isUploading ? "UPLOADING..." : "Upload"}
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        required={required}
                    />
                </label>

                <span className={styles.filename}>{value}</span>
            </div>
            <h4>{showFeedback && meta.error}</h4>
        </div>
    );
};

export default FileUpload;
