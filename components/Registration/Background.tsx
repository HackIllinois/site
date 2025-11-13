"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useWindowSize from "@/hooks/use-window-size";
import { Box } from "@mui/material";

interface BackgroundProps {
    step: number;
}

const Background = ({ step }: BackgroundProps) => {
    const windowSizeHook = useWindowSize();

    const backgrounds = [
        "personal_info",
        "background_info",
        "attending_hack",
        "transportation",
        "review",
        "confirmation"
    ];

    const folder =
        !windowSizeHook?.width || windowSizeHook?.width > 768
            ? "backgrounds"
            : "backgrounds/mobile";

    const imgSrc = `/registration/${folder}/${backgrounds[step]}.svg`;

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                zIndex: -100
            }}
        >
            <Image
                src={imgSrc}
                alt="Background"
                style={{ objectFit: "cover" }}
                fill
                priority
            />
        </Box>
    );
};

export default Background;
