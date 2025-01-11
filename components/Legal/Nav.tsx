"use client";

import { usePathname } from "next/navigation";
import styles from "./Nav.module.scss";

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

export default function LegalNav() {
    const pathname = usePathname();

    return (
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
    );
}
