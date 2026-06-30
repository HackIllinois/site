import { ReactNode } from "react";
import { Metadata } from "next";
import { Box } from "@mui/material";

export const metadata: Metadata = {
    title: "HackIllinois | Voyagers Challenge"
};

export default function ChallengeLayout({
    children
}: {
    children?: ReactNode;
}) {
    return (
        <Box>
            <main>{children}</main>
        </Box>
    );
}
