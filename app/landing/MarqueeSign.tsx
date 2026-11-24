"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import styles from "../page.module.scss";

const sequence = "/landing/frontier/sequence/";
// How long each bulb pattern stays lit.
const SWAP_MS = 1000;

/**
 * The marquee sign, alternating between its two bulb patterns. Both images
 * stay mounted (so a swap never waits on a load) and only the top one is
 * toggled. The timer runs only while the sign is on screen and the tab is
 * visible, and only this component re-renders on each swap.
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
            <Image
                src={sequence + "SIGN.png"}
                alt=""
                aria-hidden="true"
                width={1216}
                height={1451}
                priority
                unoptimized
            />
            <Image
                src={sequence + "SIGN2.png"}
                alt=""
                aria-hidden="true"
                width={1216}
                height={1451}
                className={styles.signAlternate}
                style={{ visibility: alternate ? "visible" : "hidden" }}
                priority
                unoptimized
            />
            {children}
        </div>
    );
}
