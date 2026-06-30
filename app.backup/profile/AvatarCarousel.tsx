"use client";

import { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export type AvatarItem = { id: string; src: string };

function wrapIndex(i: number, n: number) {
    return ((i % n) + n) % n;
}

function AvatarTile({
    item,
    selected,
    onClick
}: {
    item: AvatarItem;
    selected?: boolean;
    onClick: () => void;
}) {
    return (
        <Box
            component="button"
            onClick={onClick}
            sx={{
                all: "unset",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                transition:
                    "transform 180ms ease, opacity 180ms ease, filter 180ms ease",
                transform: selected
                    ? { xs: "scale(1.25)", md: "scale(1.15)" }
                    : "scale(0.92)",
                opacity: !selected ? 0.75 : 1,
                filter: !selected ? "saturate(0.9)" : "none",
                "&:hover": {
                    transform: selected ? "scale(1.18)" : "scale(0.96)"
                }
            }}
        >
            <Box
                component="img"
                src={item.src}
                sx={{
                    height: { xs: 140, sm: 180, md: 220 }
                }}
            />
        </Box>
    );
}

export function AvatarCarousel({
    items,
    value,
    onChange
}: {
    items: AvatarItem[];
    value: string;
    onChange: (id: string) => void;
}) {
    const idx = Math.max(
        0,
        items.findIndex(x => x.id === value)
    );
    const n = items.length;

    const left = items[wrapIndex(idx - 1, n)];
    const center = items[wrapIndex(idx, n)];
    const right = items[wrapIndex(idx + 1, n)];

    const go = (dir: -1 | 1) => {
        onChange(items[wrapIndex(idx + dir, n)].id);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [idx, n]);

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 240, sm: 300, md: 340 },
                    display: "grid",
                    alignItems: "center"
                }}
            >
                <IconButton
                    onClick={() => go(-1)}
                    sx={{
                        position: "absolute",
                        left: { xs: 4, sm: 8 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        zIndex: 3
                    }}
                >
                    <ChevronLeftIcon fontSize="large" />
                </IconButton>

                <IconButton
                    onClick={() => go(1)}
                    sx={{
                        position: "absolute",
                        right: { xs: 4, sm: 8 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        zIndex: 3
                    }}
                >
                    <ChevronRightIcon fontSize="large" />
                </IconButton>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.2fr 1fr",
                        alignItems: "end",
                        justifyItems: "center",
                        mx: { xs: 6, sm: 6 },
                        gap: { xs: 2, sm: 1 }
                    }}
                >
                    <AvatarTile item={left} onClick={() => onChange(left.id)} />
                    <AvatarTile
                        item={center}
                        selected
                        onClick={() => onChange(center.id)}
                    />
                    <AvatarTile
                        item={right}
                        onClick={() => onChange(right.id)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
