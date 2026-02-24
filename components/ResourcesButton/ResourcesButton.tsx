"use client";
import { useEffect, useState } from "react";
import { Box, Link } from "@mui/material";

type ResourcesButtonProps = {};

export const ResourcesButton: React.FC<ResourcesButtonProps> = () => {
    const [mounted, setMounted] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    // popup
    const [isClickedOpen, setIsClickedOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isOpen = isClickedOpen || isHovered;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const footer = document.getElementById("site-footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1
            }
        );

        observer.observe(footer);

        return () => {
            observer.disconnect();
        };
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {/* Button */}
            <Box
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    position: "fixed",
                    justifyContent: "center",
                    left: 24,
                    bottom: 24,
                    zIndex: 99,
                    opacity: isFooterVisible ? 0 : 1,
                    transform: isFooterVisible
                        ? "translateY(20px)"
                        : "translateY(0)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    pointerEvents: isFooterVisible ? "none" : "auto"
                }}
            >
                {/* Button */}
                <Box
                    onClick={() => setIsClickedOpen(prev => !prev)}
                    sx={{ cursor: "pointer" }}
                >
                    <Box
                        component="img"
                        src="/resources/resource_button_closed.svg"
                        alt="Resources"
                        sx={{
                            width: { md: "200px", lg: "300px" },
                            height: "auto",
                            display: "block"
                        }}
                    />
                </Box>

                {/* Popup */}
                {isOpen && <ResourcesPopup />}
            </Box>
        </>
    );
};

type ResourcesPopupProps = {};

export const ResourcesPopup: React.FC<ResourcesPopupProps> = () => {
    const [activeCategory, setActiveCategory] = useState<
        "guides" | "platforms" | "workshops"
    >("guides");

    const guidesItems = [
        { title: "Guide 1", link: "https://google.com" },
        { title: "Guide 2", link: "https://google.com" },
        { title: "Guide 3", link: "https://google.com" },
        { title: "Guide 4", link: "https://google.com" }
    ];

    const platformsItems = [
        { title: "Platform 1", link: "https://google.com" },
        { title: "Platform 2", link: "https://google.com" },
        { title: "Platform 3", link: "https://google.com" }
    ];

    const workshopsItems = [
        { title: "Workshop 1", link: "https://google.com" },
        { title: "Workshop 2", link: "https://google.com" }
    ];

    const getItems = () => {
        switch (activeCategory) {
            case "guides":
                return guidesItems;
            case "platforms":
                return platformsItems;
            case "workshops":
                return workshopsItems;
        }
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 90,
                left: 0,
                width: 300,
                borderRadius: "26px",
                padding: "2px",
                overflow: "visible"
            }}
        >
            {/* Gradient border */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(
                            to right,
                            rgba(0, 255, 43, 0.5) 18%,
                            rgba(0, 255, 43, 0.1) 49%,
                            rgba(0, 255, 43, 0.5) 82%
                        )`,
                    borderRadius: "26px"
                }}
            />

            {/* Popup background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.7
                }}
            >
                {/* Left rectangle */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 80,
                        height: "100%",
                        borderRadius: "26px 0 0 26px",
                        background:
                            "linear-gradient(to right, rgba(55, 255, 0, 0.5) 0%, rgba(55, 255, 0, 0) 100%)"
                    }}
                />

                {/* Right rectangle */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 80,
                        height: "100%",
                        borderRadius: "0 26px 26px 0",
                        background:
                            "linear-gradient(to left, rgba(55, 255, 0, 0.5) 0%, rgba(55, 255, 0, 0) 100%)"
                    }}
                />
            </Box>

            {/* Content box */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "14px",
                    backgroundImage: `
                        url("/resources/grid_pattern.svg"),
                        linear-gradient(
                        to right,
                        rgba(0, 83, 1, 0.5) 0%,
                        rgba(0, 65, 1, 0.45) 2%,
                        rgba(1, 86, 2, 0.4) 4%,
                        rgba(1, 113, 3, 0.25) 33%,
                        rgba(1, 113, 3, 0.25) 71%,
                        rgba(1, 86, 2, 0.4) 96%,
                        rgba(0, 65, 1, 0.4) 99%
                        )
                    `,
                    backgroundRepeat: "repeat, no-repeat",
                    backgroundSize: "300px auto, 100% 100%",
                    padding: "8px 8px",
                    boxSizing: "border-box"
                }}
            >
                {/* Top left corner */}
                <Box
                    component="img"
                    src="/resources/corner.svg"
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "15%",
                        zIndex: 10,
                        transform: "translate(-12%, -12%)",
                        pointerEvents: "none"
                    }}
                />

                {/* Top right corner */}
                <Box
                    component="img"
                    src="/resources/corner.svg"
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "15%",
                        zIndex: 10,
                        transform: "translate(12%, -12%) scaleX(-1)",
                        pointerEvents: "none"
                    }}
                />

                {/* Bottom left corner */}
                <Box
                    component="img"
                    src="/resources/corner.svg"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "15%",
                        zIndex: 10,
                        transform: "translate(-12%, 12%) scaleY(-1)",
                        pointerEvents: "none"
                    }}
                />

                {/* Bottom right corner */}
                <Box
                    component="img"
                    src="/resources/corner.svg"
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "15%",
                        zIndex: 10,
                        transform: "translate(12%, 12%) scaleX(-1) scaleY(-1)",
                        pointerEvents: "none"
                    }}
                />

                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "top",
                        gap: 1
                    }}
                >
                    {/* Guides button */}
                    <Box
                        onClick={() => setActiveCategory("guides")}
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Box
                            component="img"
                            src="/resources/guides_unselected.svg"
                            alt="Guides"
                            sx={{ width: "80%", height: "auto" }}
                        />
                    </Box>

                    {/* Platforms button */}
                    <Box
                        onClick={() => setActiveCategory("platforms")}
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Box
                            component="img"
                            src="/resources/platforms_unselected.svg"
                            alt="Platforms"
                            sx={{ width: "80%", height: "auto" }}
                        />
                    </Box>

                    {/* Workshops button */}
                    <Box
                        onClick={() => setActiveCategory("workshops")}
                        sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Box
                            component="img"
                            src="/resources/workshops_unselected.svg"
                            alt="Workshops"
                            sx={{ width: "80%", height: "auto" }}
                        />
                    </Box>
                </Box>

                {/* Links */}
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {getItems().map(item => (
                        <Link
                            key={item.link}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                padding: "8px 12px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "#fff",
                                textDecoration: "none",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.2)"
                                }
                            }}
                        >
                            {item.title}
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
