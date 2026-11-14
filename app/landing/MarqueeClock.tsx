"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.scss";

// The public event countdown points to noon on opening day in Champaign.
const opening = Date.parse("2027-02-26T12:00:00-06:00");

function remaining() {
    const seconds = Math.max(0, Math.floor((opening - Date.now()) / 1000));
    return [
        Math.floor(seconds / 86400),
        Math.floor(seconds / 3600) % 24,
        Math.floor(seconds / 60) % 60,
        seconds % 60
    ]
        .map(value => String(value).padStart(2, "0"))
        .join(":");
}

export default function MarqueeClock() {
    const [time, setTime] = useState("DD:HH:MM:SS");
    useEffect(() => {
        const tick = () => setTime(remaining());
        tick();
        const interval = window.setInterval(tick, 1000);
        return () => window.clearInterval(interval);
    }, []);
    return (
        <time
            className={styles.clock}
            role="timer"
            aria-label={`Time until HackIllinois in days, hours, minutes and seconds: ${time}`}
            dateTime="2027-02-26T12:00:00-06:00"
        >
            {time}
        </time>
    );
}
