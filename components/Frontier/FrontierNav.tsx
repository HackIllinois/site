"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Frontier.module.scss";

const destinations = [
    ["Schedule", "/schedule"],
    ["Job Board", "/job-board"],
    ["Travel", "/travel"],
    ["Prizes", "/prizes"],
    ["HackOutlaws", "/challenge"]
];

export default function FrontierNav() {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const header = useRef<HTMLElement>(null);
    const toggle = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const closeOutside = (e: PointerEvent) => {
            if (!header.current?.contains(e.target as Node)) setOpen(false);
        };
        const escape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                toggle.current?.focus();
            }
        };
        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", escape);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", escape);
        };
    }, [open]);

    return (
        <header ref={header} className={styles.header} data-home={path === "/"}>
            <Link href="/" aria-label="HackIllinois home" prefetch={false}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={styles.logo}
                    src="/logo.svg"
                    alt=""
                    width="144"
                    height="47"
                />
            </Link>
            <button
                ref={toggle}
                type="button"
                className={styles.toggle}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-controls="frontier-nav"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <span />
                <span />
                <span />
            </button>
            <nav
                id="frontier-nav"
                aria-label="Main navigation"
                data-open={open}
                className={styles.links}
            >
                {destinations.map(([label, href]) => (
                    <Link
                        key={href}
                        href={href}
                        prefetch={false}
                        aria-current={path === href ? "page" : undefined}
                        onClick={() => setOpen(false)}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
