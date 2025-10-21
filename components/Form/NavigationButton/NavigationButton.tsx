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
        <Box sx={{ position: "relative", width: 299, height: "auto" }}>
            <CardMedia
                component="img"
                image={img}
                alt={pointRight ? "right arrow" : "left arrow"}
                sx={{ width: 299, height: "auto", display: "block" }}
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
                    fontSize: "22px"
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
