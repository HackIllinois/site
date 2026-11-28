"use client";

import { prizesEnabled } from "@/app/prizes/availability";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";

const destinations = [
    ["Job Board", "/job-board"],
    ["Travel", "/travel"],
    ["Prizes", "/prizes"],
    ["Sponsors", "/#sponsors"],
    ["FAQ", "/#faq"],
    ["HackOutlaws", "/challenge"]
].filter(([, href]) => href !== "/prizes" || prizesEnabled);

const landingSections = ["sponsors", "faq"];

export default function Navbar() {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>();
    const header = useRef<HTMLElement>(null);
    const toggle = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setOpen(false);
    }, [path]);

    useEffect(() => {
        const navbar = header.current;
        if (path !== "/" || !navbar) {
            setActiveSection(undefined);
            return;
        }

        const sections = landingSections
            .map(id => document.getElementById(id))
            .filter(section => section !== null);
        let observer: IntersectionObserver;
        const resize = new ResizeObserver(() => {
            observer?.disconnect();
            const visible = new Set<Element>();
            observer = new IntersectionObserver(
                entries => {
                    for (const { target, isIntersecting } of entries) {
                        if (isIntersecting) visible.add(target);
                        else visible.delete(target);
                    }
                    setActiveSection(
                        sections.find(section => visible.has(section))?.id
                    );
                },
                {
                    rootMargin: `-${Math.ceil(navbar.getBoundingClientRect().bottom)}px 0px 0px`
                }
            );
            sections.forEach(section => observer.observe(section));
        });
        resize.observe(navbar);
        return () => {
            resize.disconnect();
            observer?.disconnect();
        };
    }, [path]);

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
            <div className={styles.bar}>
                <Link
                    href="/"
                    aria-label="HackIllinois home"
                    prefetch={false}
                    onClick={() => setOpen(false)}
                >
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
                            aria-current={
                                path === href
                                    ? "page"
                                    : path === "/" &&
                                        href === `/#${activeSection}`
                                      ? "location"
                                      : undefined
                            }
                            onClick={() => setOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
