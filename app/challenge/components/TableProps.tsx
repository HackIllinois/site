"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "../track.module.scss";

// Cards and chips cut out of the table artwork. Each one sits over a patch of
// plain felt so it can be dealt onto the table and lifted on hover.
// Boxes are [left, top, width, height] in pixels of the scene's artwork.
type Box = [number, number, number, number];
type Prop = {
    // Sprite file in /challenge/saloon/table/.
    src: string;
    kind: "card" | "chip";
    sprite: Box;
    // Where a card is dealt from, as an offset in artwork pixels and a turn.
    from?: [number, number, number];
};
type Scene = {
    width: number;
    height: number;
    phone?: boolean;
    patches: { src: string; box: Box }[];
    props: Prop[];
};

const card = (src: string, sprite: Box, from: [number, number, number]) =>
    ({ src, kind: "card", sprite, from }) as Prop;
const chip = (src: string, sprite: Box) =>
    ({ src, kind: "chip", sprite }) as Prop;

const scenes = {
    entrance: {
        width: 1440,
        height: 1024,
        patches: [
            { src: "e-cards-tr", box: [970, 272, 178, 161] },
            { src: "e-cards-bl", box: [211, 663, 137, 162] },
            { src: "e-chips-1", box: [532, 316, 107, 75] },
            { src: "e-chips-2", box: [856, 314, 102, 111] },
            { src: "e-chips-3", box: [420, 750, 80, 95] },
            { src: "e-chips-4", box: [523, 792, 60, 60] },
            { src: "e-chips-5", box: [1104, 680, 151, 100] }
        ],
        props: [
            card("e-cards-tr", [976, 278, 166, 149], [220, -160, 24]),
            card("e-cards-bl", [217, 669, 125, 150], [-200, 170, -22]),
            chip("e-chips-1", [538, 322, 95, 63]),
            chip("e-chips-2", [862, 320, 90, 99]),
            chip("e-chips-3", [426, 756, 68, 83]),
            chip("e-chips-4", [529, 798, 48, 48]),
            chip("e-chips-5", [1110, 686, 139, 88])
        ]
    },
    roulette: {
        width: 1440,
        height: 816,
        patches: [],
        props: [
            card("r-cards-t", [935, 45, 221, 182], [160, -190, 20]),
            card("r-cards-bl", [63, 607, 196, 150], [-190, 160, -18]),
            chip("r-chips-t", [1189, 82, 86, 100]),
            chip("r-chips-b1", [910, 635, 48, 48]),
            chip("r-chips-b2", [969, 695, 44, 46])
        ]
    },
    "entrance-phone": {
        width: 402,
        height: 780,
        phone: true,
        patches: [
            { src: "ep-cards-t", box: [277, 170, 76, 70] },
            { src: "ep-cards-br", box: [301, 497, 64, 78] },
            { src: "ep-chips-t", box: [232, 178, 44, 32] },
            { src: "ep-chips-l", box: [60, 448, 42, 46] },
            { src: "ep-chips-b", box: [237, 554, 72, 48] }
        ],
        props: [
            card("ep-cards-t", [279, 172, 72, 66], [70, -60, 22]),
            card("ep-cards-br", [303, 499, 60, 74], [70, 60, -20]),
            chip("ep-chips-t", [234, 180, 40, 28]),
            chip("ep-chips-l", [62, 450, 38, 42]),
            chip("ep-chips-b", [239, 556, 68, 44])
        ]
    },
    "roulette-phone": {
        width: 402,
        height: 370,
        phone: true,
        patches: [],
        props: [
            card("r-cards-t", [256, 56, 84, 69.2], [70, -60, 20]),
            chip("chip-red", [348, 80, 18, 18]),
            chip("chip-blue", [367, 104, 18, 18]),
            chip("chip-white", [349, 128, 18, 18])
        ]
    }
} satisfies Record<string, Scene>;

const DIR = "/challenge/saloon/table/";

function place([left, top, width]: Box, scene: Scene): CSSProperties {
    return {
        left: `${(left / scene.width) * 100}%`,
        top: `${(top / scene.height) * 100}%`,
        width: `${(width / scene.width) * 100}%`
    };
}

export default function TableProps({
    scene: sceneName,
    play
}: {
    scene: keyof typeof scenes;
    // "load" deals as soon as the page paints; "view" waits for the table to
    // scroll into view.
    play: "load" | "view";
}) {
    const scene: Scene = scenes[sceneName];
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
    const classes = [
        styles.tableProps,
        scene.phone ? styles.phoneOnly : styles.desktopOnly,
        state === "armed" ? styles.armed : "",
        state === "dealt" ? styles.dealt : ""
    ];

    return (
        <div ref={ref} className={classes.join(" ")} aria-hidden="true">
            {scene.patches.map(patch => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={`${patch.src}-patch`}
                    src={`${DIR}${patch.src}-patch.webp`}
                    alt=""
                    width={patch.box[2]}
                    height={patch.box[3]}
                    decoding="async"
                    style={place(patch.box, scene)}
                />
            ))}
            {scene.props.map(prop => {
                const order = prop.kind === "card" ? cardIndex++ : chipIndex++;
                const [dx, dy, turn] = prop.from ?? [0, 0, 0];
                return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={prop.src}
                        className={
                            prop.kind === "card" ? styles.card : styles.chip
                        }
                        src={`${DIR}${prop.src}.webp`}
                        alt=""
                        width={Math.round(prop.sprite[2])}
                        height={Math.round(prop.sprite[3])}
                        decoding="async"
                        draggable={false}
                        style={
                            {
                                ...place(prop.sprite, scene),
                                "--from-x": `${(dx / scene.width) * 100}cqw`,
                                "--from-y": `${(dy / scene.width) * 100}cqw`,
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
