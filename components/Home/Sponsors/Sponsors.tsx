"use client";
import { FC, useState, useEffect } from "react";
import styles from "./Sponsors.module.scss";

type Star = {
    left: string;
    top: string;
    animationDelay: string;
    width: string;
    height: string;
};

type Particle = {
    left: string;
    top: string;
    width: string;
    height: string;
    animationDelay: string;
};

const Sponsors: FC = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate stars
        const generatedStars: Star[] = Array.from({ length: 100 }, () => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`
        }));
        setStars(generatedStars);

        // Generate particles
        const generatedParticles: Particle[] = Array.from(
            { length: 30 },
            () => ({
                left: `${40 + Math.random() * 20}%`,
                top: `${50 + Math.random() * 30}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 2}s`
            })
        );
        setParticles(generatedParticles);
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.stars}>
                {stars.map((star, i) => (
                    <div
                        key={i}
                        className={styles.star}
                        style={{
                            left: star.left,
                            top: star.top,
                            animationDelay: star.animationDelay,
                            width: star.width,
                            height: star.height
                        }}
                    ></div>
                ))}
            </div>
            <div className={styles.particles}>
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: particle.left,
                            top: particle.top,
                            width: particle.width,
                            height: particle.height,
                            animationDelay: particle.animationDelay
                        }}
                    ></div>
                ))}
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>SPONSORS</h1>
                <div className={styles.sponsors}>
                    <div className={styles.sponsorPlaceholder}></div>
                    <div className={styles.sponsorPlaceholder}></div>
                    <div className={styles.sponsorPlaceholder}></div>
                    <div className={styles.sponsorPlaceholder}></div>
                    <div className={styles.sponsorPlaceholder}></div>
                    <div className={styles.sponsorPlaceholder}></div>
                </div>
            </div>
            <div className={styles.landscape}></div>
        </section>
    );
};

export default Sponsors;
