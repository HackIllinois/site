import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    gradient?: string;
    fontSize?: string | number;
    fontWeight?: number;
    fontFamily?: string;
    sx?: SxProps<Theme>;
}

export default function GradientText({
    children,
    gradient = "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
    fontSize = "1.1rem",
    fontWeight = 700,
    fontFamily = "Tsukimi Rounded",
    sx = {}
}: GradientTextProps) {
    return (
        <Box
            component="span"
            sx={{
                background: gradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
                fontFamily,
                fontSize,
                fontWeight,
                ...sx
            }}
        >
            {children}
        </Box>
    );
}
