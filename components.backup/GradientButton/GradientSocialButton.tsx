"use client";

import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion"; // Import motion
import Link from "next/link";
import React from "react";

import type { SvgIconComponent } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 // Staggers the insertion of each button
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};

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
        // Wrap the individual button in a motion.div to receive the staggered state
        <motion.div variants={itemVariants}>
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
        </motion.div>
    );
};

// Row of all social buttons
export const SocialIconsRow: React.FC = () => {
    const size = 60;

    return (
        <Box
            component={motion.div} // Turn the container into a motion component
            initial="hidden"
            whileInView="visible" // Triggers when scrolled into view
            viewport={{ once: true }}
            variants={containerVariants}
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
