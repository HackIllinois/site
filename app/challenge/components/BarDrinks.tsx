"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "../track.module.scss";

// Positions are measured on the bar artwork (1440 × 1002 on desktop, 402 × 693
// on phones). Each sprite is a glass cut out of the desktop artwork, so the
// shadow baked into the bar stays put while the glass turns above it. The
// phone artwork has plain grey circles where the glasses go; the sprites are
// sized to cover them.
const DIR = "/challenge/saloon/drinks/";

type Drink = { src: string; x: number; y: number; size: number };

const desktopDrinks: Drink[] = [
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
const desktopPatches = [
    { src: "green1-patch", left: 595, top: 104, width: 110, height: 91 },
    { src: "green2-patch", left: 1288, top: 28, width: 98, height: 92 }
];

const layouts = {
    desktop: {
        width: 1440,
        height: 1002,
        drinks: desktopDrinks,
        patches: desktopPatches
    },
    phone: {
        width: 402,
        height: 693,
        drinks: [
            { src: "beer1", x: 50.5, y: 54.5, size: 55.2 },
            { src: "beer2", x: 124.5, y: 54.5, size: 55.2 },
            { src: "gray1", x: 196, y: 75, size: 39.8 },
            { src: "green1", x: 342, y: 60, size: 132.9 }
        ] as Drink[],
        patches: [] as typeof desktopPatches
    }
};

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

type Motion = { start: number; period: number };

export default function BarDrinks({
    layout: layoutName
}: {
    layout: keyof typeof layouts;
}) {
    const {
        width: ART_WIDTH,
        height: ART_HEIGHT,
        drinks,
        patches
    } = layouts[layoutName];
    const [motion, setMotion] = useState<Motion[] | null>(null);

    useEffect(() => {
        setMotion(
            drinks.map(() => ({
                start: Math.random() * 360,
                period: 45 + Math.random() * 55
            }))
        );
    }, [drinks]);

    return (
        <div
            className={`${styles.drinks} ${layoutName === "phone" ? styles.phoneOnly : styles.desktopOnly}`}
            aria-hidden="true"
        >
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
                        width={Math.round(drink.size)}
                        height={Math.round(drink.size)}
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
