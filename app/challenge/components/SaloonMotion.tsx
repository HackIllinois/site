"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import styles from "../track.module.scss";

// Smooth scrolling for the saloon page, plus a gentle fade-up for each block
// of copy marked with data-reveal as it scrolls into view.
export default function SaloonMotion() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });

        const root = document.querySelector<HTMLElement>(`.${styles.saloon}`);
        const targets = root
            ? Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
            : [];
        root?.classList.add(styles.revealArmed);
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.revealed);
                        observer.unobserve(entry.target);
                    }
                }
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
        );
        targets.forEach(target => observer.observe(target));

        return () => {
            lenis.destroy();
            observer.disconnect();
            root?.classList.remove(styles.revealArmed);
            targets.forEach(target => target.classList.remove(styles.revealed));
        };
    }, []);

    return null;
}
