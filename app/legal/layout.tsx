import { Metadata } from "next";
import { ReactNode } from "react";
import { Box } from "@mui/material";
import styles from "./legal.module.scss";

export const metadata: Metadata = {
    title: "HackIllinois | Legal"
};

export default function LegalLayout({ children }: { children?: ReactNode }) {
    return (
        <Box
            className={styles.page}
            sx={{
                color: "white",
                minWidth: "100vw",
                minHeight: "100vh",
                px: { xs: 1.5, md: 4 },
                pt: "max(96px, var(--navbar-clearance))",
                pb: { xs: 4, md: 8 }
            }}
        >
            {children}
        </Box>
    );
}
