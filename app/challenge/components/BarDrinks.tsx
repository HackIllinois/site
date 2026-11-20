"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "../track.module.scss";

// Positions are measured on the 1440 × 1002 bar artwork. Each sprite is the
// glass cut out of that artwork, so the shadow baked into the bar stays put
// while the glass turns above it.
const ART_WIDTH = 1440;
const ART_HEIGHT = 1002;
const DIR = "/challenge/saloon/drinks/";

type Drink = { src: string; x: number; y: number; size: number };

const drinks: Drink[] = [
    { src: "gray1", x: 87.5, y: 134.5, size: 76 },
    { src: "beer1", x: 211.4, y: 90.6, size: 108 },
    { src: "beer2", x: 326.4, y: 122.6, size: 108 },
    { src: "beer3", x: 538.7, y: 124.6, size: 108 },
    { src: "green1", x: 659.5, y: 149.6, size: 148 },
    { src: "gray2", x: 730.5, y: 80.5, size: 76 },
    { src: "gray3", x: 1271.5, y: 148.5, size: 76 },
    { src: "green2", x: 1334, y: 74, size: 110 },
    // The row of five overlapping glasses, outermost first so the middle one
    // sits on top.
    { src: "stack", x: 907.2, y: 126, size: 106 },
    { src: "stack", x: 1099.8, y: 123.3, size: 106 },
    { src: "stack", x: 953.3, y: 125.1, size: 106 },
    { src: "stack", x: 1052.5, y: 124, size: 106 },
    { src: "stack", x: 1001.4, y: 124.8, size: 106 }
];

// Wood painted over the parts of each olive pick that stick out past the
// glass, so the pick can swing around without leaving a copy behind.
const patches = [
    { src: "green1-patch", left: 595, top: 104, width: 110, height: 91 },
    { src: "green2-patch", left: 1288, top: 28, width: 98, height: 92 }
];

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

type Motion = { start: number; period: number };

export default function BarDrinks() {
    const [motion, setMotion] = useState<Motion[] | null>(null);

    useEffect(() => {
        setMotion(
            drinks.map(() => ({
                start: Math.random() * 360,
                period: 45 + Math.random() * 55
            }))
        );
    }, []);

    return (
        <div className={styles.drinks} aria-hidden="true">
            {patches.map(patch => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={patch.src}
                    src={`${DIR}${patch.src}.webp`}
                    alt=""
                    width={patch.width}
                    height={patch.height}
                    loading="lazy"
                    decoding="async"
                    style={{
                        left: pct(patch.left, ART_WIDTH),
                        top: pct(patch.top, ART_HEIGHT),
                        width: pct(patch.width, ART_WIDTH)
                    }}
                />
            ))}
            {drinks.map((drink, index) => {
                const m = motion?.[index];
                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={index}
                        className={m ? styles.drinkSpin : undefined}
                        src={`${DIR}${drink.src}.webp`}
                        alt=""
                        width={drink.size}
                        height={drink.size}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        style={
                            {
                                left: pct(drink.x - drink.size / 2, ART_WIDTH),
                                top: pct(drink.y - drink.size / 2, ART_HEIGHT),
                                width: pct(drink.size, ART_WIDTH),
                                "--start": m ? `${m.start}deg` : undefined,
                                "--period": m ? `${m.period}s` : undefined
                            } as CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
}
