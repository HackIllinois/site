"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect } from "react";
import styles from "./ShootingStars.module.scss";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    rotation: number;
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

export const ShootingStars = ({
    minDelay = 1000,
    maxDelay = 6000,
    duration = 2000,
    size = 500
}: ShootingStarsProps) => {
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

    useEffect(() => {
        const spawnShootingStar = () => {
            const id = Date.now();

            const maxX = 100 - (size / window.innerWidth) * 100;
            const maxY = 100 - (size / window.innerHeight) * 100;

            const x = Math.random() * Math.max(0, maxX - 10) + 5; // 5% to (100 - size)% of width
            const y = Math.random() * Math.max(0, maxY - 10) + 5; // 5% to (100 - size)% of height
            const rotation = Math.random() * -25; // 0 to -25 degrees

            const newStar: ShootingStar = { id, x, y, rotation };
            setShootingStars(prev => [...prev, newStar]);

            // Remove after animation completes
            setTimeout(() => {
                setShootingStars(prev => prev.filter(star => star.id !== id));
            }, duration);
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
        <div className={styles.shootingStarsContainer}>
            {shootingStars.map(star => (
                <div
                    key={star.id}
                    className={styles.shootingStar}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        transform: `rotate(${star.rotation}deg)`
                    }}
                >
                    <DotLottieReact
                        src="/assets/shooting_star.lottie"
                        loop={false}
                        autoplay
                        style={{ width: `${size}px`, height: `${size}px` }}
                    />
                </div>
            ))}
        </div>
    );
};
