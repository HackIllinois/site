"use client";
import { Box, Typography } from "@mui/material";

interface DateSelectorProps {
    label: string;
    day: string;
    active?: boolean;
    rotation?: number; // degrees
    offsetX?: number;
    onClick: () => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
    label,
    day,
    active = false,
    rotation = 0,
    offsetX = 0,
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

                position: "relative",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                width: "140px",
                px: 3,
                py: 2,

                color: "#000",
                textAlign: "center",

                transform: `
                    translateX(${offsetX}px)
                    rotate(${rotation}deg)
                    scale(${active ? 1.05 : 1})`,
                transformOrigin: "center",

                opacity: active ? 1 : 0.7,
                transition: "transform 0.2s ease, opacity 0.2s ease",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "6px 10px",
                    backgroundImage: "url(/schedule/date_selector.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    filter: active
                        ? "drop-shadow(0px 4px 4px rgba(0,0,0,0.25)) drop-shadow(0px 4px 4px rgba(248,157,78,0.4))"
                        : "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))",
                    zIndex: -1,
                    pointerEvents: "none"
                },

                "&:hover": {
                    opacity: 1
                }
            }}
        >
            <Typography
                sx={{
                    fontFamily: "Montserrat",
                    fontSize: "30px",
                    fontWeight: 700,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    fontWeight: 700,
                    mt: 7
                }}
            >
                {day}
            </Typography>
        </Box>
    );
};

export const DateSelectorMobile: React.FC<DateSelectorProps> = ({
    label,
    day,
    active = false,
    onClick
}) => {
    return (
        <Box
            component="button"
            type="button"
            onClick={onClick}
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 1,
                minWidth: "60px",
                borderRadius: "20px",
                cursor: "pointer",
                border: active ? "none" : "0.5px solid #FFFFFF",
                backgroundColor: active ? "#7551D1" : "transparent",
                transition: "all 0.2s ease",
                textAlign: "center",
                "&:hover": {
                    opacity: 0.8
                }
            }}
        >
            <Typography
                sx={{
                    color: "#FFFFFF",
                    fontFamily: "'SF Pro Text', sans-serif",
                    fontWeight: "bold",
                    fontSize: 12,
                    userSelect: "none"
                }}
            >
                {day.split("/")[1].padStart(2, "0")} - {label}
            </Typography>
        </Box>
    );
};
