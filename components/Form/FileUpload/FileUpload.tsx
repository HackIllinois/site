import clsx from "clsx";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

// import { uploadFile } from "@/utils/api";
// import { FileType } from "@/utils/types";

import styles from "./FileUpload.module.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type FileType = "resume" | "photo" | "blobstore";

type PropTypes = {
    name: string;
    type: FileType;
    text: string;
    accept: string;
    className?: string;
    required?: boolean;
    [key: string]: unknown;
};

const FileUpload = ({
    name,
    type,
    text,
    accept,
    className,
    required,
    ...props
}: PropTypes): JSX.Element => {
    const { control } = useFormContext();
    const { field } = useController({ name, control });

    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const onFileUpload = (file: File) => {
        setIsUploading(true);
        field.onChange(file.name);
        // uploadFile(file, type)
        //     .then(() => {
        //         field.onChange(file.name);
        //     })
        //     .catch(() => {
        //         alert("Failed to upload file.");
        //     })
        //     .finally(() => {
        //         setIsUploading(false);
        //     });
        setIsUploading(false);
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
        <>
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

                <span className={styles.filename}>{field.value}</span>
            </div>

            <ErrorMessage name={name} />
        </>
    );
};

export default FileUpload;
