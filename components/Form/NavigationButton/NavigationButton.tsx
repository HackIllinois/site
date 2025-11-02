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
    [key: string]: unknown;
}

const NavigationButton: React.FC<NavButtonProps> = ({
    text,
    img,
    pointRight,
    onClick,
    href,
    ...props
}) => {
    const Content = (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: { sm: "39px", md: "60px" },
                "&:hover": {
                    opacity: 0.9
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

    return Content;
};

export default NavigationButton;
