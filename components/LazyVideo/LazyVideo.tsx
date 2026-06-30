"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./LazyVideo.module.scss";

export default function LazyVideo({ src, ...props }) {
    const container = useRef(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        if (!container.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { rootMargin: "200px" } // start loading when 200px within viewport
        );
        obs.observe(container.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={container} className={styles.videoContainer}>
            {isVisible ? (
                <video
                    className={styles.video}
                    controls
                    preload="metadata" // metadata only, defer full download
                    autoPlay
                    muted
                    {...props}
                >
                    <source src={src} type="video/mp4" />
                </video>
            ) : (
                // placeholder while off-screen
                <div
                    style={{
                        background: "#000",
                        width: "100%",
                        height: "100%"
                    }}
                />
            )}
        </div>
    );
}
