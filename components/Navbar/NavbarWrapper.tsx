"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Image from "next/image";
import { Box } from "@mui/material";

export default function NavbarWrapper() {
    const pathname = usePathname();
    const showFullNav = !pathname?.startsWith("/register/general");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                px: 4,
                py: 2
            }}
        >
            <Image
                src="/logo.svg"
                alt="HackIllinois logo"
                width={120}
                height={40}
            />

            {/* hide full navbar on registration pages */}
            {showFullNav && <Navbar />}
        </Box>
    );
}
