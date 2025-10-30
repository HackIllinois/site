"use client";
import styles from "./Background.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";
import useWindowSize from "@/hooks/use-window-size";
import { Box } from "@mui/material";

const Background = () => {
    const pathname = usePathname();
    const windowSizeHook = useWindowSize();

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden"
            }}
        >
            <Image
                src={`/registration/${
                    !windowSizeHook?.width || windowSizeHook?.width > 768
                        ? "backgrounds"
                        : "mobile_backgrounds"
                }/${pathname.split("/").at(-1)}.svg`}
                alt="Background"
                style={{ objectFit: "cover" }}
                fill
                priority
            />
        </Box>
    );
};

export default Background;
