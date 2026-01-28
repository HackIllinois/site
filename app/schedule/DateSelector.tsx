"use client";
import { Box, Typography } from "@mui/material";

interface DateSelectorProps {
    label: string;
    day: string;
    active?: boolean;
    rotation?: number; // degrees
    offsetY?: number;
    onClick: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
    label,
    day,
    active = false,
    rotation = 0,
    offsetY = 0,
    onClick
}) => {
    return (
        <Box
            component="button"
            type="button"
            onClick={onClick}
            sx={{
                all: "unset",
                cursor: "pointer",

                minWidth: 96,
                px: 2.5,
                py: 1.5,

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "10px",
                background:
                    "linear-gradient(90deg, #A315D6 0%, #FDAB60 50%, #A315D6 100%)",

                color: "#fff",
                textAlign: "center",

                transform: `
            translateY(${offsetY}px)
            rotate(${rotation}deg)
            scale(${active ? 1.05 : 1})
            `,

                opacity: active ? 1 : 0.7,
                transition: "transform 0.2s ease, opacity 0.2s ease",

                "&:hover": {
                    opacity: 1
                }
            }}
        >
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em"
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    opacity: 0.9
                }}
            >
                {day}
            </Typography>
        </Box>
    );
};

export default DateSelector;
