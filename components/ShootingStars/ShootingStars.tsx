"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect, useRef } from "react";
import styles from "./ShootingStars.module.scss";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    rotation: number;
    size: number;
    flipped: boolean;
}

interface ShootingStarsProps {
    /** Minimum delay between shooting stars in milliseconds (default: 1000) */
    minDelay?: number;
    /** Maximum delay between shooting stars in milliseconds (default: 6000) */
    maxDelay?: number;
    /** Duration of each shooting star animation in milliseconds (default: 2000) */
    duration?: number;
    /** Width of each shooting star in pixels (default: 500) */
    size?: number;
}

// Cache the lottie data at module level to avoid re-fetching
let cachedLottieData: ArrayBuffer | null = null;
let fetchPromise: Promise<ArrayBuffer> | null = null;

const fetchLottieData = async (): Promise<ArrayBuffer> => {
    if (cachedLottieData) {
        return cachedLottieData;
    }
    if (fetchPromise) {
        return fetchPromise;
    }
    fetchPromise = fetch("/assets/shooting_star.lottie")
        .then(res => res.arrayBuffer())
        .then(data => {
            cachedLottieData = data;
            return data;
        });
    return fetchPromise;
};

export const ShootingStars = ({
    minDelay = 2000,
    maxDelay = 4000,
    duration = 2000,
    size = 600
}: ShootingStarsProps) => {
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
    const [lottieData, setLottieData] = useState<ArrayBuffer | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Preload lottie data once
    useEffect(() => {
        fetchLottieData().then(setLottieData);
    }, []);

    useEffect(() => {
        const spawnShootingStar = () => {
            const id = Date.now();

            // Calculate the visible portion of the container
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const containerWidth = container.offsetWidth;

            // Scale down star size on smaller screens (max 70% of container width)
            const effectiveSize = Math.min(size, containerWidth * 0.7);

            // Calculate visible area within the container
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(
                containerHeight,
                window.innerHeight - rect.top
            );
            const visibleHeight = visibleBottom - visibleTop;

            // Don't spawn if container isn't visible
            if (visibleHeight <= 0) return;

            // Calculate spawn position as percentage of container
            const starHeightPercent = (effectiveSize / containerHeight) * 100;
            const starWidthPercent = (effectiveSize / containerWidth) * 100;

            // X position: across the full width (with padding)
            const maxX = 100 - starWidthPercent;
            const x = Math.random() * Math.max(0, maxX - 10) + 5;

            // Y position: only within the visible area
            const visibleTopPercent = (visibleTop / containerHeight) * 100;
            const visibleHeightPercent =
                (visibleHeight / containerHeight) * 100;
            const maxYInVisible = visibleHeightPercent - starHeightPercent;

            if (maxYInVisible <= 0) return;

            const y =
                visibleTopPercent +
                Math.random() * Math.max(0, maxYInVisible - 5) +
                2.5;

            const rotation = Math.random() * -25; // 0 to -25 degrees
            const flipped = Math.random() < 0.5; // 50% chance to flip

            const newStar: ShootingStar = {
                id,
                x,
                y,
                rotation,
                size: effectiveSize,
                flipped
            };
            setShootingStars(prev => [...prev, newStar]);

            // Remove after animation completes
            const actualDuration = duration + (Math.random() - 0.5) * 500;
            setTimeout(() => {
                setShootingStars(prev => prev.filter(star => star.id !== id));
            }, actualDuration);
        };

        // Spawn a shooting star at random intervals
        const scheduleNext = () => {
            const delay = Math.random() * (maxDelay - minDelay) + minDelay;
            return setTimeout(() => {
                spawnShootingStar();
                scheduleNext();
            }, delay);
        };

        const timeoutId = scheduleNext();

        return () => clearTimeout(timeoutId);
    }, [minDelay, maxDelay, duration, size]);

    return (
        <div ref={containerRef} className={styles.shootingStarsContainer}>
            {lottieData &&
                shootingStars.map(star => (
                    <div
                        key={star.id}
                        className={styles.shootingStar}
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            transform: `rotate(${star.rotation}deg) scaleX(${star.flipped ? -1 : 1})`
                        }}
                    >
                        {/* Size is adjusted to account for large padding in the asset */}
                        <DotLottieReact
                            data={lottieData}
                            loop={false}
                            autoplay
                            style={{
                                transform: star.flipped
                                    ? `translateY(-${star.size / 2}px)`
                                    : `translate(-${star.size}px, -${star.size / 2}px)`,
                                width: `${star.size * 2}px`,
                                height: `${star.size * 2}px`
                            }}
                        />
                    </div>
                ))}
        </div>
    );
};
