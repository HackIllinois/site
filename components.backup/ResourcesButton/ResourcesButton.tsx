"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Link, Typography } from "@mui/material";

type ResourcesButtonProps = {};

export const ResourcesButton: React.FC<ResourcesButtonProps> = () => {
    const [isMobileLandscape, setIsMobileLandscape] = useState(false);

    useEffect(() => {
        setMounted(true);

        const updateOrientation = () => {
            if (typeof window === "undefined") return;

            const isLandscape =
                window.innerWidth > window.innerHeight &&
                window.innerWidth < 1000;
            setIsMobileLandscape(isLandscape);
        };

        updateOrientation();
        window.addEventListener("resize", updateOrientation);

        return () => window.removeEventListener("resize", updateOrientation);
    }, []);

    const [mounted, setMounted] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    // popup
    const [isClickedOpen, setIsClickedOpen] = useState(false);
    const isOpen = isClickedOpen;
    const wrapperRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsClickedOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Box
            sx={{
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                left: { xs: "50%", sm: 24 },
                right: "auto",
                bottom: {
                    xs: "calc(24px + env(safe-area-inset-bottom))",
                    sm: 24
                },
                zIndex: 99,
                opacity: isFooterVisible ? 0 : 1,

                transform: {
                    xs: `translateX(-50%) ${
                        isFooterVisible ? "translateY(20px)" : "translateY(0)"
                    }`,
                    sm: isFooterVisible ? "translateY(20px)" : "translateY(0)"
                },
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isFooterVisible ? "none" : "auto"
            }}
        >
            <Box
                ref={wrapperRef}
                sx={{ position: "relative", justifyContent: "center" }}
            >
                {/* Popup */}
                <ResourcesPopup
                    isOpen={isOpen}
                    onInteract={() => setIsClickedOpen(true)}
                />

                {/* Button */}
                <Box
                    sx={{
                        cursor: "pointer",
                        display: "block",
                        width: {
                            xs: "75dvw",
                            sm: isMobileLandscape ? 200 : 240,
                            md: 220,
                            lg: 280,
                            xl: 300
                        },
                        "@media (max-width: 250px)": {
                            width: "85dvw"
                        },
                        position: "relative",
                        zIndex: 2,
                        transition: "transform 0.2s ease, filter 0.2s ease",
                        transform: isClickedOpen ? "scale(1.06)" : "scale(1)",
                        filter: isClickedOpen
                            ? "brightness(1.2)"
                            : "brightness(1)",
                        "&:hover": {
                            transform: "scale(1.06)",
                            filter: "brightness(1.2)"
                        }
                    }}
                    onClick={() => setIsClickedOpen(prev => !prev)}
                >
                    <Typography
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            fontFamily: '"Tsukimi Rounded", sans-serif',
                            fontWeight: 700,
                            letterSpacing: "2px",
                            fontSize: "clamp(0.9rem, 1dvw, 1.2rem)",
                            pointerEvents: "none",
                            zIndex: 3
                        }}
                    >
                        RESOURCES
                    </Typography>

                    <picture>
                        <source
                            media="(max-width:599px)"
                            srcSet="/resources/resource_button_mobile.svg"
                        />
                        <img
                            src="/resources/resource_button.svg"
                            alt="Resources"
                            style={{
                                width: "100%",
                                maxHeight: "100px",
                                transform: "scale(110%)"
                            }}
                        />
                    </picture>
                </Box>
            </Box>
        </Box>
    );
};

type ResourcesPopupProps = { isOpen: boolean; onInteract: () => void };

export const ResourcesPopup: React.FC<ResourcesPopupProps> = ({
    isOpen,
    onInteract
}) => {
    const [isMobileLandscape, setIsMobileLandscape] = useState(false);

    useEffect(() => {
        const updateOrientation = () => {
            if (typeof window === "undefined") return;

            const isLandscape =
                window.innerWidth > window.innerHeight &&
                window.innerWidth < 900;

            setIsMobileLandscape(isLandscape);
        };

        updateOrientation();
        window.addEventListener("resize", updateOrientation);

        return () => window.removeEventListener("resize", updateOrientation);
    }, []);

    const [activeCategory, setActiveCategory] = useState<
        "guides" | "platforms" | "events"
    >("guides");

    useEffect(() => {
        const srcs = [
            "/resources/guides_selected.svg",
            "/resources/guides_unselected.svg",
            "/resources/platforms_selected.svg",
            "/resources/platforms_unselected.svg",
            "/resources/events_selected.svg",
            "/resources/events_unselected.svg"
        ];
        srcs.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const guidesItems = [
        {
            title: "ATTENDEE GUIDE",
            link: "https://hackillinois.org/attendee_guide.pdf"
        },
        {
            title: "PRIZE INFO GUIDE",
            link: "https://go.hackillinois.org/prizes"
        },
        {
            title: "HOW TO HACK (BEGINNER)",
            link: "https://hackillinois.org/how_to_hack.pdf"
        }
        // { title: "BUS SCHEDULE", link: "https://hackillinois.org" }
    ];

    const platformsItems = [
        { title: "DISCORD", link: "https://go.hackillinois.org/discord" },
        { title: "DEVPOST", link: "https://hackillinois-2026.devpost.com" },
        {
            title: "IOS APP",
            link: "https://apps.apple.com/us/app/hackillinois/id1451755268"
        },
        {
            title: "ANDROID APP",
            link: "https://play.google.com/store/apps/details?id=org.hackillinois.android.release"
        }
    ];

    const eventsItems = [
        // { title: "OPENING CEREMONY", link: "https://hackillinois.org" },
        {
            title: "Stay tuned for Hack 2027 :)",
            link: "https://docs.google.com/forms/d/e/1FAIpQLSeco5rnd7eqrH0OBf7K5PgNfpGUfCpH8EpjJTSoiKKvO_6X5g/viewform"
        }
    ];

    const strokeColors = ["#FFCCF3", "#A3F2FF", "#FFC0B9", "#DDFFE4"];
    const shadowColors = ["#FF0AC6", "#00CDFF", "#FF4B37", "#124514"];
    const barColors = ["#FF0AC6", "#53DDFF", "#FF4B37", "#00FF3B"];

    const getItems = () => {
        switch (activeCategory) {
            case "guides":
                return guidesItems;
            case "platforms":
                return platformsItems;
            case "events":
                return eventsItems;
        }
    };

    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const cap = {
        xs: { w: 3, h: 14 },
        sm: { w: 4, h: 16 },
        md: { w: 5, h: 18 }
    };

    const [maxPopupHeight, setMaxPopupHeight] = useState("95dvh");

    useEffect(() => {
        const updateHeight = () => {
            if (typeof window === "undefined") return;

            const isMobileLandscape =
                window.innerWidth > window.innerHeight &&
                window.innerWidth < 900;

            if (isMobileLandscape) {
                setMaxPopupHeight(`${window.innerHeight - 60}px`); // navbar buffer
            } else {
                setMaxPopupHeight("95dvh");
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);

        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    left: { xs: "50%", sm: 0 },
                    width: {
                        xs: "80dvw",
                        sm: isMobileLandscape ? 300 : 340,
                        md: 300,
                        lg: 340
                    },
                    bottom: { xs: "23dvw", sm: 80, md: 70, lg: 80, xl: 100 },
                    maxWidth: "75dvw",
                    maxHeight: maxPopupHeight,
                    overflowY: "auto",

                    borderRadius: "26px",
                    padding: "3px",
                    overflow: "visible",

                    background: `linear-gradient(
                        90deg,
                        rgba(0, 255, 43, 0.8) 0%,
                        rgba(0, 255, 43, 0.2) 50%,
                        rgba(0, 255, 43, 0.8) 100%
                    )`,

                    // popup open/close animation
                    transform: {
                        xs: isVisible
                            ? "translateX(-50%) scaleY(1)"
                            : "translateX(-50%) scaleY(0)",
                        sm: isVisible ? "scaleY(1)" : "scaleY(0)"
                    },

                    transformOrigin: "bottom",
                    opacity: isVisible ? 1 : 0,
                    transition:
                        "transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease",

                    pointerEvents: isOpen ? "auto" : "none"
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
                        width: "12%",
                        zIndex: 10,
                        opacity: isVisible ? 1 : 0,
                        transition: isVisible
                            ? "opacity 150ms ease 120ms"
                            : "opacity 100ms ease",
                        transform: "translate(-8%, -8%)",
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
                        width: "12%",
                        zIndex: 10,
                        opacity: isVisible ? 1 : 0,
                        transition: isVisible
                            ? "opacity 150ms ease 120ms"
                            : "opacity 100ms ease",
                        transform: "translate(8%, -8%) scaleX(-1)",
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
                        width: "12%",
                        zIndex: 10,
                        opacity: isVisible ? 1 : 0,
                        transition: isVisible
                            ? "opacity 150ms ease 120ms"
                            : "opacity 100ms ease",
                        transform: "translate(-8%, 8%) scaleY(-1)",
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
                        width: "12%",
                        zIndex: 10,
                        opacity: isVisible ? 1 : 0,
                        transition: isVisible
                            ? "opacity 150ms ease 120ms"
                            : "opacity 100ms ease",
                        transform: "translate(8%, 8%) scaleX(-1) scaleY(-1)",
                        pointerEvents: "none"
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1
                    }}
                >
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
                                width: {
                                    xs: 50,
                                    sm: 60,
                                    md: 80
                                },
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
                                width: {
                                    xs: 50,
                                    sm: 60,
                                    md: 80
                                },
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
                            backgroundImage: {
                                xs: `
                                /* vertical grid lines */
                                repeating-linear-gradient(
                                    to right,
                                    rgba(84, 172, 72, 0.15),
                                    rgba(84, 172, 72, 0.15) 1px,
                                    transparent 1px,
                                    transparent 26px
                                ),
                                /* horizontal grid lines */
                                repeating-linear-gradient(
                                    to bottom,
                                    rgba(84, 172, 72, 0.15),
                                    rgba(84, 172, 72, 0.15) 1px,
                                    transparent 1px,
                                    transparent 26px
                                ),
                                /* gradient background */
                                linear-gradient(
                                    to right,
                                    rgba(0, 40, 0, 0.95) 0%,
                                    rgba(0, 55, 0, 0.95) 100%
                                )
                            `,
                                md: `
                                repeating-linear-gradient(
                                    to right,
                                    rgba(84, 172, 72, 0.2),
                                    rgba(84, 172, 72, 0.2) 1px,
                                    transparent 1px,
                                    transparent 26px
                                ),
                                repeating-linear-gradient(
                                    to bottom,
                                    rgba(84, 172, 72, 0.2),
                                    rgba(84, 172, 72, 0.2) 1px,
                                    transparent 1px,
                                    transparent 26px
                                ),
                                linear-gradient(
                                    to right,
                                    rgba(0, 83, 1, 1) 0%,
                                    rgba(0, 65, 1, 0.9) 2%,
                                    rgba(1, 86, 2, 0.8) 4%,
                                    rgba(1, 113, 3, 0.5) 33%,
                                    rgba(1, 113, 3, 0.5) 71%,
                                    rgba(1, 86, 2, 0.8) 96%,
                                    rgba(0, 65, 1, 0.8) 99%
                                )
                            `
                            },
                            backgroundRepeat: "repeat, repeat, no-repeat",
                            backgroundSize: "auto, auto, 100% 100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                    >
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
                                onClick={() => {
                                    onInteract();
                                    setActiveCategory("guides");
                                }}
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease",
                                    transformOrigin: "center",

                                    "&:hover": {
                                        transform: "scale(1.08)"
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={
                                        activeCategory == "guides"
                                            ? "/resources/guides_selected.svg"
                                            : "/resources/guides_unselected.svg"
                                    }
                                    alt="Guides"
                                    sx={{
                                        width: "90%",
                                        height: "auto"
                                    }}
                                />
                            </Box>

                            {/* Platforms button */}
                            <Box
                                onClick={() => {
                                    onInteract();
                                    setActiveCategory("platforms");
                                }}
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease",
                                    transformOrigin: "center",

                                    "&:hover": {
                                        transform: "scale(1.08)"
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={
                                        activeCategory == "platforms"
                                            ? "/resources/platforms_selected.svg"
                                            : "/resources/platforms_unselected.svg"
                                    }
                                    alt="Platforms"
                                    sx={{
                                        width: "90%",
                                        height: "auto"
                                    }}
                                />
                            </Box>

                            {/* Events button */}
                            <Box
                                onClick={() => {
                                    onInteract();
                                    setActiveCategory("events");
                                }}
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease",
                                    transformOrigin: "center",

                                    "&:hover": {
                                        transform: "scale(1.08)"
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={
                                        activeCategory == "events"
                                            ? "/resources/events_selected.svg"
                                            : "/resources/events_unselected.svg"
                                    }
                                    alt="Events"
                                    sx={{
                                        width: "90%",
                                        height: "auto"
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Links */}
                        <Box
                            sx={{
                                mt: 1,
                                mb: 2,
                                mx: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1
                            }}
                        >
                            {getItems().map((item, index) => {
                                const strokeColor =
                                    strokeColors[index % strokeColors.length];

                                const shadowColor =
                                    shadowColors[index % shadowColors.length];

                                const barColor =
                                    barColors[index % barColors.length];

                                const isLast = index === getItems().length - 1;

                                return (
                                    <Link
                                        key={item.title}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            onInteract();
                                        }}
                                        sx={{
                                            position: "relative",
                                            pl: "14px",
                                            py: "8px",
                                            pr: "4px",

                                            color: "#fff",
                                            fontFamily:
                                                '"Tsukimi Rounded", sans-serif',
                                            fontSize: {
                                                xs: "0.85rem",
                                                sm: isMobileLandscape
                                                    ? "0.8rem"
                                                    : "0.9rem",
                                                md: isMobileLandscape
                                                    ? "1rem"
                                                    : "1rem"
                                            },
                                            fontWeight: 600,
                                            lineHeight: 1.3,

                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "10px",

                                            transformOrigin: "left center",
                                            transition:
                                                "transform 0.2s ease, text-shadow 0.2s ease",

                                            WebkitTextStroke: `0.23px ${strokeColor}`,
                                            textShadow: `0px 1.8px 6.76px ${hexToRgba(shadowColor, 0.5)}`,
                                            textDecoration: "none",

                                            overflow: "visible",

                                            // top cap
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",

                                                width: {
                                                    xs: `${cap.xs.w}px`,
                                                    sm: `${cap.sm.w}px`,
                                                    md: `${cap.md.w}px`
                                                },
                                                height: {
                                                    xs: `${cap.xs.h}px`,
                                                    sm: `${cap.sm.h}px`,
                                                    md: `${cap.md.h}px`
                                                },
                                                left: {
                                                    xs: "-3px",
                                                    sm: "-4px"
                                                },
                                                top: "-12px",

                                                backgroundColor: "#DFFFE4",
                                                zIndex: 2,
                                                pointerEvents: "none"
                                            },

                                            // bottom cap
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",

                                                width: {
                                                    xs: `${cap.xs.w}px`,
                                                    sm: `${cap.sm.w}px`,
                                                    md: `${cap.md.w}px`
                                                },
                                                height: {
                                                    xs: `${cap.xs.h}px`,
                                                    sm: `${cap.sm.h}px`,
                                                    md: `${cap.md.h}px`
                                                },
                                                left: {
                                                    xs: "-3px",
                                                    sm: "-4px"
                                                },
                                                bottom: "-12px",

                                                backgroundColor: "#DFFFE4",
                                                zIndex: 2,
                                                pointerEvents: "none",

                                                display: isLast
                                                    ? "block"
                                                    : "none"
                                            },

                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                textShadow: `0px 3px 10px ${hexToRgba(shadowColor, 0.6)}`
                                            }
                                        }}
                                    >
                                        {/* Colored bars */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: "-3px",
                                                width: "3px",
                                                height: "100%",
                                                backgroundColor: barColor,
                                                boxShadow: `
                                                    0 0 6px ${hexToRgba(barColor, 0.5)},
                                                    0 0 12px ${hexToRgba(barColor, 0.4)}
                                                `,
                                                borderRadius: "2px",
                                                pointerEvents: "none"
                                            }}
                                        />

                                        {item.title}
                                    </Link>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
