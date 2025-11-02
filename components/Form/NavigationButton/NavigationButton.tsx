"use client";

import { Box, Button, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface NavButtonProps {
    text: string;
    img: string;
    pointRight?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    img,
    pointRight,
    onClick,
    href,
    disabled,
    ...props
}) => {
    const Content = (
        <Box
            // sx={{
            //     position: "relative",
            //     width: "100%",
            //     height: { sm: "39px", md: "60px" },
            //     "&:hover": {
            //         opacity: 0.9
            //     }
            // }}
            sx={{
                position: "relative",
                display: "inline-block",
                // width: "100%",
                height: { sm: "39px", md: "60px" },
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
                "&:hover": {
                    opacity: disabled ? 0.5 : 0.9
                }
            }}
        >
            <CardMedia
                component="img"
                image={img}
                alt={pointRight ? "right arrow" : "left arrow"}
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            />
            <Typography
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    padding: 1,
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "14px", md: "22px" },
                    whiteSpace: "nowrap"
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
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                border: "none",
                padding: 0,
                background: "none",
                display: "inline-block",
                cursor: disabled ? "not-allowed" : "pointer"
            }}
            {...props}
        >
            {Content}
        </button>
    );
};

export default NavigationButton;
