"use client";

import { ReactNode, useState } from "react";
import styles from "./Saloon.module.scss";

export default function CodeBlock({
    filename,
    code,
    copyable = false,
    caption
}: {
    filename: string;
    code: string;
    copyable?: boolean;
    caption?: ReactNode;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked; the code is still selectable.
        }
    };

    return (
        <figure className={styles.codeBlock} style={{ margin: 0 }}>
            <div className={styles.codeHeader}>
                <span>{filename}</span>
                {copyable && (
                    <button
                        type="button"
                        className={styles.copyBtn}
                        onClick={handleCopy}
                    >
                        {copied ? "Copied" : "Copy"}
                    </button>
                )}
            </div>
            <pre className={styles.codeBody}>
                <code>{code}</code>
            </pre>
            {caption && (
                <figcaption className={styles.codeCaption}>
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
