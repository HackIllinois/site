"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";

const items = [
    {
        name: "Code of Conduct",
        link: "/legal/code-of-conduct"
    },
    {
        name: "Complaint Procedures",
        link: "/legal/complaint-procedures"
    }
];

export default function LegalLayout({ children }: { children?: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className={styles.page}>
            <nav className={styles.navbar}>
                <p>Legal</p>
                {items.map(({ name, link }) => (
                    <a
                        key={name}
                        className={link === pathname ? styles.current : ""}
                        href={link}
                    >
                        {name}
                    </a>
                ))}
            </nav>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
