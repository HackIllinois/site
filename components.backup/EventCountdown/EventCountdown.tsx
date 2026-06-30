"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

type CountdownProps = {
    /** Event start date/time. */
    startDateTime: string | Date;

    /** Event end date/time. */
    endDateTime: string | Date;

    /** Label shown before the event starts. */
    label?: string;

    /** Label shown while the event is live. */
    liveLabel?: string;

    /** Optional click handler for the rocket button. */
    onRocketClick?: () => void;
};

type TimeParts = {
    sign: -1 | 0 | 1;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function diffToParts(targetMs: number, nowMs: number): TimeParts {
    const diffMs = targetMs - nowMs;

    if (diffMs === 0) {
        return { sign: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const sign: -1 | 1 = diffMs < 0 ? -1 : 1;
    const totalSeconds = Math.floor(Math.abs(diffMs) / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { sign, days, hours, minutes, seconds };
}

type Phase = "before" | "during" | "after";

function getPhase(startMs: number, endMs: number, nowMs: number): Phase {
    if (nowMs < startMs) return "before";
    if (nowMs < endMs) return "during";
    return "after";
}

export const EventCountdownPill: React.FC<CountdownProps> = ({
    startDateTime,
    endDateTime,
    label = "Countdown to HackIllinois 2026",
    liveLabel = "HackIllinois is LIVE!",
    onRocketClick
}) => {
    const theme = useTheme();
    const isBetweenXsAndMd = useMediaQuery(
        theme.breakpoints.between("xs", "md")
    );

    const [mounted, setMounted] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const startMs = useMemo(
        () =>
            typeof startDateTime === "string"
                ? Date.parse(startDateTime)
                : startDateTime.getTime(),
        [startDateTime]
    );

    const endMs = useMemo(
        () =>
            typeof endDateTime === "string"
                ? Date.parse(endDateTime)
                : endDateTime.getTime(),
        [endDateTime]
    );

    const [phase, setPhase] = useState<Phase>(() =>
        getPhase(startMs, endMs, Date.now())
    );

    const targetMs = phase === "during" ? endMs : startMs;

    const [parts, setParts] = useState<TimeParts>(() =>
        diffToParts(targetMs, Date.now())
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const update = () => {
            const now = Date.now();
            setPhase(getPhase(startMs, endMs, now));
        };

        update();
        const id = window.setInterval(update, 1000);
        return () => window.clearInterval(id);
    }, [startMs, endMs]);

    useEffect(() => {
        const currentTarget = phase === "during" ? endMs : startMs;
        const update = () => setParts(diffToParts(currentTarget, Date.now()));

        update();
        const id = window.setInterval(update, 1000);

        return () => window.clearInterval(id);
    }, [phase, startMs, endMs]);

    // Observe footer visibility
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

    if (!mounted || phase === "after") {
        return null;
    }

    const isLive = phase === "during";
    const signChar = parts.sign < 0 ? "-" : "";

    const formatted = [
        parts.days,
        parts.hours,
        parts.minutes,
        parts.seconds
    ].map(v => (v < 10 ? `0${v}` : `${v}`));

    if (isBetweenXsAndMd) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                right: 24,
                bottom: 24,
                zIndex: 99,
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: "16px",
                background: isLive
                    ? "linear-gradient(135deg, #e05353, #e0a553)"
                    : "linear-gradient(135deg, #a68fc4, #8fa3d4)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.35)",
                width: "250px",
                opacity: isFooterVisible ? 0 : 1,
                transform: isFooterVisible
                    ? "translateY(20px)"
                    : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                pointerEvents: isFooterVisible ? "none" : "auto"
            }}
            aria-label={isLive ? liveLabel : label}
            role="status"
        >
            <Typography
                sx={{
                    fontFamily: "Montserrat",

                    fontWeight: 600,
                    fontSize: "20px",
                    letterSpacing: "0.05em",
                    color: "#ffffff",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    paddingLeft: "16px"
                }}
            >
                {`${formatted.map(chunk => `${signChar}${chunk}`).join(" : ")}`}
            </Typography>

            <Tooltip
                title={
                    <Typography
                        sx={{ fontFamily: "Montserrat", fontSize: "16px" }}
                    >
                        {isLive ? liveLabel : label}
                    </Typography>
                }
            >
                <IconButton
                    onClick={onRocketClick}
                    size="small"
                    sx={{
                        ml: "auto",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 8px 18px rgba(15, 23, 42, 0.25)",
                        "&:hover": {
                            backgroundColor: "#f3f4ff"
                        },
                        width: 45,
                        height: 45
                    }}
                >
                    <RocketLaunchIcon sx={{ color: "#2948D9" }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};
