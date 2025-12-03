"use client";

import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import type { SvgIconComponent } from "@mui/icons-material";

// General-purpose gradient button
type GradientSocialButtonProps = {
    href: string;
    label: string;
    Icon: SvgIconComponent;
    size?: number; // square size in px
};

export const GradientSocialButton: React.FC<GradientSocialButtonProps> = ({
    href,
    label,
    Icon,
    size = 50
}) => {
    return (
        <Link
            prefetch={false}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
        >
            <Box
                sx={{
                    p: "4px",
                    borderRadius: "999px",
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
                        borderRadius: "999px",
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
                    <Icon sx={{ fontSize: size * 0.6 }} />
                </Box>
            </Box>
        </Link>
    );
};

// Row of all social buttons
export const SocialIconsRow: React.FC = () => {
    const size = 60;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap"
            }}
        >
            <GradientSocialButton
                href="https://www.facebook.com/hackillinois/"
                label="HackIllinois Facebook"
                Icon={FacebookIcon}
                size={size}
            />
            <GradientSocialButton
                href="https://www.instagram.com/hackillinois/"
                label="HackIllinois Instagram"
                Icon={InstagramIcon}
                size={size}
            />
            <GradientSocialButton
                href="https://x.com/HackIllinois"
                label="HackIllinois X (Twitter)"
                Icon={TwitterIcon}
                size={size}
            />
            <GradientSocialButton
                href="https://www.linkedin.com/company/hackillinois/"
                label="HackIllinois LinkedIn"
                Icon={LinkedInIcon}
                size={size}
            />
            <GradientSocialButton
                href="https://github.com/HackIllinois"
                label="HackIllinois GitHub"
                Icon={GitHubIcon}
                size={size}
            />
            <GradientSocialButton
                href="mailto:contact@hackillinois.org"
                label="Email HackIllinois"
                Icon={EmailIcon}
                size={size}
            />
        </Box>
    );
};
