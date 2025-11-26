"use client";
import { montserrat } from "@/theme/fonts";
import { Button } from "@mui/material";
import Link from "next/link";

interface OlympianButtonProps {
    text: string;
    link?: string;
    onClick?: () => void;
    bottomPadding?: boolean;
    blue?: boolean;
    gold?: boolean;
    medium?: boolean;
    small?: boolean;
}

const OlympianButton: React.FC<OlympianButtonProps> = ({
    text,
    link,
    onClick,
    bottomPadding
}) => {
    const buttonStyles = {
        background:
            "linear-gradient(135deg, #E8C4A0 0%, #D9A97A 50%, #C9935D 100%)",
        color: "#000",
        fontSize: { xs: "18px", sm: "24px", md: "28px" },
        fontWeight: 700,
        textTransform: "uppercase" as const,
        padding: { xs: "14px 40px", sm: "18px 50px", md: "20px 60px" },
        borderRadius: "16px",
        marginBottom: bottomPadding ? "40px" : 0,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
            background:
                "linear-gradient(135deg, #F0D1B3 0%, #E8C4A0 50%, #D9A97A 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.4)"
        },
        fontFamily: `${montserrat.style.fontFamily}, sans-serif`
    };

    if (link) {
        return (
            <Link href={link} passHref style={{ textDecoration: "none" }}>
                <Button sx={buttonStyles}>{text}</Button>
            </Link>
        );
    }

    return (
        <Button sx={buttonStyles} onClick={onClick}>
            {text}
        </Button>
    );
};

export default OlympianButton;
