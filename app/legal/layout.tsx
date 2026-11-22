import { Metadata } from "next";
import { ReactNode } from "react";
import { Box } from "@mui/material";

export const metadata: Metadata = {
    title: "HackIllinois | Legal"
};

export default function LegalLayout({ children }: { children?: ReactNode }) {
    return (
        <Box
            sx={{
                backgroundColor: "#1a142b",
                color: "white",
                minWidth: "100vw",
                minHeight: "100vh",
                px: { xs: 2, md: 4 },
                pt: "max(96px, var(--navbar-clearance))",
                pb: 4
            }}
        >
            {children}
        </Box>
    );
}
