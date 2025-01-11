import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import LegalNav from "@/components/Legal/Nav";

export const metadata: Metadata = {
    title: "HackIllinois | Legal"
};

export default function LegalLayout({ children }: { children?: ReactNode }) {
    return (
        <div className={styles.page}>
            <LegalNav />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
