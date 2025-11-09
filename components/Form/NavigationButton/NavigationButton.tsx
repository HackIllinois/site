"use client";

import { Box, darken, Typography } from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface NavButtonProps {
    text: string;
    color: string;
    pointRight?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    color,
    pointRight,
    onClick,
    href,
    disabled,
    ...props
}) => {
    const Content = (
        <Box
            sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                pl: pointRight ? { xs: 3, md: 4 } : { xs: 4, md: 6 },
                pr: pointRight ? { xs: 4, md: 6 } : { xs: 3, md: 4 },
                height: { xs: "50px", md: "60px" },
                minWidth: 160,
                cursor: "pointer",
                backgroundColor: color,
                transition: "0.2s ease",
                "&:hover": {
                    opacity: 0.9
                },
                clipPath: pointRight
                    ? "polygon(0% 0%, calc(100% - 40px) 0%, 100% 50%, calc(100% - 40px) 100%, 0% 100%)"
                    : "polygon(40px 0%, 100% 0%, 100% 100%, 40px 100%, 0% 50%)",
                borderRadius: pointRight ? "40px 0 0 40px" : "0 40px 40px 0"
            }}
            {...props}
        >
            <Typography
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "white",
                    textAlign: "center",
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "14px", md: "20px" }
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
