import clsx from "clsx";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { uploadFile } from "@/utils/api";
import { FileType } from "@/utils/types";

import styles from "./styles.module.scss";

type PropTypes = {
    name: string;
    type: FileType;
    text: string;
    accept: string;
    className?: string;
    [key: string]: unknown;
};

const FileUpload = ({
    name,
    type,
    text,
    accept,
    className,
    ...props
}: PropTypes): JSX.Element => {
    const { control } = useFormContext();
    const { field } = useController({ name, control });

    const [isUploading, setIsUploading] = useState(false);

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true);
        const { files } = event.target;
        const file = (files as FileList)[0];
        uploadFile(file, type)
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

    return (
        <div className={clsx(styles.fileUpload, className)} {...props}>
            {text && <p>{text}</p>}

            <label>
                {isUploading ? "UPLOADING..." : "CHOOSE FILE"}
                <input type="file" accept={accept} onChange={onFileUpload} />
            </label>

            <span className={styles.filename}>
                {field.value || "No file chosen"}
            </span>
        </div>
    );
};

export default FileUpload;
