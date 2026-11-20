"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "../track.module.scss";

// Cards and chips cut out of the table artwork. Each one sits over a patch of
// plain felt (or wood) so it can be dealt onto the table and lifted on hover.
// [left, top, width, height] in pixels of the 1440px-wide artwork.
type Box = [number, number, number, number];
type Prop = {
    name: string;
    kind: "card" | "chip";
    sprite: Box;
    patch: Box;
    // Where a card is dealt from, as an offset in artwork pixels and a turn.
    from?: [number, number, number];
};

const scenes: Record<
    "entrance" | "roulette",
    { height: number; props: Prop[] }
> = {
    entrance: {
        height: 1024,
        props: [
            {
                name: "e-cards-tr",
                kind: "card",
                sprite: [976, 278, 166, 149],
                patch: [970, 272, 178, 161],
                from: [220, -160, 24]
            },
            {
                name: "e-cards-bl",
                kind: "card",
                sprite: [217, 669, 125, 150],
                patch: [211, 663, 137, 162],
                from: [-200, 170, -22]
            },
            {
                name: "e-chips-1",
                kind: "chip",
                sprite: [538, 322, 95, 63],
                patch: [532, 316, 107, 75]
            },
            {
                name: "e-chips-2",
                kind: "chip",
                sprite: [862, 320, 90, 99],
                patch: [856, 314, 102, 111]
            },
            {
                name: "e-chips-3",
                kind: "chip",
                sprite: [426, 756, 68, 83],
                patch: [420, 750, 80, 95]
            },
            {
                name: "e-chips-4",
                kind: "chip",
                sprite: [529, 798, 48, 48],
                patch: [523, 792, 60, 60]
            },
            {
                name: "e-chips-5",
                kind: "chip",
                sprite: [1110, 686, 139, 88],
                patch: [1104, 680, 151, 100]
            }
        ]
    },
    roulette: {
        height: 816,
        props: [
            {
                name: "r-cards-t",
                kind: "card",
                sprite: [935, 45, 221, 182],
                patch: [929, 39, 233, 194],
                from: [160, -190, 20]
            },
            {
                name: "r-cards-bl",
                kind: "card",
                sprite: [63, 607, 196, 150],
                patch: [57, 601, 208, 162],
                from: [-190, 160, -18]
            },
            {
                name: "r-chips-t",
                kind: "chip",
                sprite: [1189, 82, 86, 100],
                patch: [1183, 76, 98, 112]
            },
            {
                name: "r-chips-b1",
                kind: "chip",
                sprite: [910, 635, 48, 48],
                patch: [904, 629, 60, 60]
            },
            {
                name: "r-chips-b2",
                kind: "chip",
                sprite: [969, 695, 44, 46],
                patch: [963, 689, 56, 58]
            }
        ]
    }
};

const ART_WIDTH = 1440;
const DIR = "/challenge/saloon/table/";

function place([left, top, width]: Box, height: number): CSSProperties {
    return {
        left: `${(left / ART_WIDTH) * 100}%`,
        top: `${(top / height) * 100}%`,
        width: `${(width / ART_WIDTH) * 100}%`
    };
}

export default function TableProps({
    scene,
    play
}: {
    scene: keyof typeof scenes;
    // "load" deals as soon as the page paints; "view" waits for the table to
    // scroll into view.
    play: "load" | "view";
}) {
    const { height, props } = scenes[scene];
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<"static" | "armed" | "dealt">(
        play === "load" ? "dealt" : "static"
    );

    useEffect(() => {
        if (play !== "view" || !ref.current) {
            return;
        }
        setState("armed");
        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    setState("dealt");
                    observer.disconnect();
                }
            },
            { rootMargin: "0px 0px -25% 0px", threshold: 0.2 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [play]);

    let cardIndex = 0;
    let chipIndex = 0;

    return (
        <div
            ref={ref}
            className={`${styles.tableProps} ${state === "armed" ? styles.armed : ""} ${state === "dealt" ? styles.dealt : ""}`}
            aria-hidden="true"
        >
            {props.map(prop => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={`${prop.name}-patch`}
                    className={styles.propPatch}
                    src={`${DIR}${prop.name}-patch.webp`}
                    alt=""
                    width={prop.patch[2]}
                    height={prop.patch[3]}
                    decoding="async"
                    style={place(prop.patch, height)}
                />
            ))}
            {props.map(prop => {
                const order = prop.kind === "card" ? cardIndex++ : chipIndex++;
                const [dx, dy, turn] = prop.from ?? [0, 0, 0];
                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={prop.name}
                        className={
                            prop.kind === "card" ? styles.card : styles.chip
                        }
                        src={`${DIR}${prop.name}.webp`}
                        alt=""
                        width={prop.sprite[2]}
                        height={prop.sprite[3]}
                        decoding="async"
                        draggable={false}
                        style={
                            {
                                ...place(prop.sprite, height),
                                "--from-x": `${(dx / ART_WIDTH) * 100}cqw`,
                                "--from-y": `${(dy / ART_WIDTH) * 100}cqw`,
                                "--from-turn": `${turn}deg`,
                                "--delay": `${
                                    prop.kind === "card"
                                        ? 250 + order * 160
                                        : 650 + order * 90
                                }ms`
                            } as CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
}
