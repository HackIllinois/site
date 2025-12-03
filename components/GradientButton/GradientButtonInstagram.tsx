"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";

type InstagramButtonProps = {
    link?: string;
    size?: number; // square size in px
};

export const GradientButtonInstagram = ({
    link = "https://www.instagram.com/hackillinois/",
    size = 90
}: InstagramButtonProps) => {
    return (
        <Link
            prefetch={false}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HackIllinois Instagram"
        >
            <Box
                sx={{
                    p: "4px",
                    borderRadius: "24px",
                    background:
                        "linear-gradient(135deg, #A315D6, #FDAB60, #A315D6)",
                    display: "inline-block",
                    cursor: "pointer"
                }}
            >
                <Box
                    sx={{
                        width: size,
                        height: size,
                        borderRadius: "20px",
                        backgroundImage:
                            "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)",
                        backgroundSize: "150% 100%",
                        backgroundPosition: "50% 0%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        transition: "background-position 0.5s ease",
                        "&:hover": {
                            backgroundPosition: "-20% 0%"
                        }
                    }}
                >
                    <InstagramIcon
                        sx={{
                            fontSize: size * 0.6
                        }}
                    />
                </Box>
            </Box>
        </Link>
    );
};
