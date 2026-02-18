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

                width: { xs: "15dvw", sm: "100px", md: "120px", xl: "160px" },
                px: 3,
                py: { xs: 8, md: 2 },

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
                    fontSize: {
                        xs: "18px",
                        sm: "20px",
                        md: "30px",
                        xl: "35px"
                    },
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
                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                    fontWeight: 700,
                    mt: { xs: 3.5, sm: 5, md: 6 }
                }}
            >
                {day}
            </Typography>
        </Box>
    );
};
