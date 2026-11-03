"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";
import {
    NAV_BUTTON_THEMES,
    navButtonAsset,
    type NavButtonThemeId
} from "./navButtonThemes";

interface NavButtonProps {
    text: string;
    /** @deprecated Prefer `theme` — kept for callers that still pass solid colors. */
    color?: string;
    theme?: NavButtonThemeId;
    pointRight?: boolean;
    /** No arrow plaque (uses default SVG). Prefer for mobile. */
    noDirection?: boolean;
    isMobile?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    color,
    theme = "sunset1",
    pointRight,
    noDirection,
    isMobile,
    onClick,
    href,
    disabled,
    ...props
}) => {
    const themeConfig = NAV_BUTTON_THEMES[theme] ?? NAV_BUTTON_THEMES.sunset1;
    // Plaque SVGs are authored pointing RIGHT. Mirror for back; use default on mobile.
    const direction = noDirection || isMobile ? "default" : "right";
    const bg = navButtonAsset(themeConfig.id, direction);
    const mirror = !noDirection && !isMobile && !pointRight;
    const shadowAlpha = Math.round(themeConfig.shadowOpacity * 255)
        .toString(16)
        .padStart(2, "0");
    const shadowColor = `${themeConfig.shadow}${shadowAlpha}`;

    const Content = (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                // Extra inset toward the tip so long labels stay inside the plaque
                pl: isMobile
                    ? 3
                    : pointRight
                      ? { xs: 2.5, md: 3 }
                      : { xs: 4, md: 5 },
                pr: isMobile
                    ? 3
                    : pointRight
                      ? { xs: 4, md: 5 }
                      : { xs: 2.5, md: 3 },
                height: { xs: "50px", md: "66px" },
                width: isMobile ? "auto" : { xs: "210px", md: "260px" },
                minWidth: isMobile ? 120 : 210,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.55 : 1,
                backgroundColor: "transparent",
                filter: `drop-shadow(0px ${themeConfig.shadowY}px 0px ${shadowColor})`,
                transition: "0.2s ease, filter 0.2s ease",
                "&:hover": {
                    opacity: disabled ? 0.55 : 0.92
                },
                borderRadius: 0
            }}
            {...props}
        >
            <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("${bg}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    transform: mirror ? "scaleX(-1)" : "none",
                    pointerEvents: "none",
                    // Fallback solid if SVG fails — unused when image loads
                    backgroundColor: color ?? "transparent"
                }}
            />
            <Typography
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "clip",
                    maxWidth: "100%",
                    color: "white",
                    textAlign: "center",
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: 700,
                    fontSize: {
                        xs: "13px",
                        md: text.length > 12 ? "16px" : "18px"
                    },
                    letterSpacing: text.length > 12 ? "0.02em" : "0.04em",
                    textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                    position: "relative",
                    zIndex: 1,
                    lineHeight: 1.1
                }}
            >
                {text}
            </Typography>
        </Box>
    );

    if (href) {
        return (
            <Link prefetch={false} href={href}>
                {Content}
            </Link>
        );
    }

    return (
        <Box
            component="button"
            onClick={onClick}
            disabled={disabled}
            sx={{
                border: "none",
                background: "none",
                padding: 0,
                margin: 0,
                display: "inline-block"
            }}
        >
            {Content}
        </Box>
    );
};

export default NavigationButton;
