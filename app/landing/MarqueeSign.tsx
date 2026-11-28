"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import SequenceImage from "./SequenceImage";
import styles from "../page.module.scss";

// How long each bulb pattern stays lit.
const SWAP_MS = 1000;

/**
 * The marquee sign, alternating between its two bulb patterns. The second
 * pattern is an overlay holding only the bulbs that differ (mostly
 * transparent, so it is small), and only its visibility is toggled. The
 * timer runs only while the sign is on screen and the tab is visible, and
 * only this component re-renders on each swap.
 */
export default function MarqueeSign({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [alternate, setAlternate] = useState(false);

    useEffect(() => {
        if (!onScreen || reduceMotion) return;
        const interval = window.setInterval(() => {
            if (!document.hidden) setAlternate(current => !current);
        }, SWAP_MS);
        return () => window.clearInterval(interval);
    }, [onScreen, reduceMotion]);

    return (
        <div ref={ref} className={styles.signLayer}>
            <SequenceImage name="marquee-sign" sizes="70vw" priority />
            <SequenceImage
                name="marquee-sign-bulbs"
                className={styles.signAlternate}
                style={{ visibility: alternate ? "visible" : "hidden" }}
            />
            {children}
        </div>
    );
}
