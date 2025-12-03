"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

type CountdownProps = {
    /** Target event date/time.
     * Prefer an ISO string with timezone offset, e.g. "2025-03-15T18:00:00-05:00",
     * or pass a Date constructed in the correct timezone.
     */
    targetDateTime: string | Date;

    /** Optional label for tooltip / accessibility. */
    label?: string;

    /** If true, hide the pill once the countdown hits exactly 0. */
    hideWhenZero?: boolean;

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
    let remaining = Math.abs(diffMs);

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { sign, days, hours, minutes, seconds };
}

export const EventCountdownPill: React.FC<CountdownProps> = ({
    targetDateTime,
    label = "Time until launch",
    hideWhenZero = false,
    onRocketClick
}) => {
    const targetMs = useMemo(
        () =>
            typeof targetDateTime === "string"
                ? Date.parse(targetDateTime)
                : targetDateTime.getTime(),
        [targetDateTime]
    );

    const [parts, setParts] = useState<TimeParts>(() =>
        diffToParts(targetMs, Date.now())
    );

    useEffect(() => {
        const update = () => setParts(diffToParts(targetMs, Date.now()));

        update(); // initial sync
        const id = window.setInterval(update, 1000);

        return () => window.clearInterval(id);
    }, [targetMs]);

    if (hideWhenZero && parts.sign === 0) {
        return null;
    }

    const signChar = parts.sign < 0 ? "-" : "";

    const formatted = [
        parts.days,
        parts.hours,
        parts.minutes,
        parts.seconds
    ].map(v => (v < 10 ? `0${v}` : `${v}`));

    const unitLabels = ["days", "hours", "minutes", "seconds"];
    const unitShort = ["d", "h", "m", "s"]; // optional, if you prefer shorter

    return (
        <Box
            sx={{
                position: "fixed",
                right: 24,
                bottom: 24,
                zIndex: theme => theme.zIndex.snackbar + 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.24)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.35)"
            }}
            aria-label={label}
            role="status"
        >
            <Typography
                sx={{
                    fontFamily: "Montserrat",

                    fontWeight: 600,
                    fontSize: "20px",
                    letterSpacing: "0.05em",
                    color: "#ffffffff", // tweak as needed
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
                        {label}
                    </Typography>
                }
            >
                <IconButton
                    onClick={onRocketClick}
                    size="small"
                    sx={{
                        ml: 1,
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
