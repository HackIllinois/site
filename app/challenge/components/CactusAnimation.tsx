"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../track.module.scss";

const FRAME_DURATION_MS = 111;

const frames = [
    {
        src: "/challenge/saloon/cactus/frame-0.webp",
        width: 730,
        height: 777,
        drinkAnchor: { x: 70, y: 98 }
    },
    {
        src: "/challenge/saloon/cactus/frame-1.webp",
        width: 691,
        height: 756,
        drinkAnchor: { x: 70, y: 88 }
    },
    {
        src: "/challenge/saloon/cactus/frame-2.webp",
        width: 541,
        height: 642,
        drinkAnchor: { x: 95, y: 69 }
    },
    {
        src: "/challenge/saloon/cactus/frame-3.webp",
        width: 572,
        height: 655,
        drinkAnchor: { x: 89, y: 81 }
    },
    {
        src: "/challenge/saloon/cactus/frame-4.webp",
        width: 679,
        height: 719,
        drinkAnchor: { x: 195, y: 145 }
    },
    {
        src: "/challenge/saloon/cactus/frame-5.webp",
        width: 774,
        height: 718,
        drinkAnchor: { x: 290, y: 144 }
    },
    {
        src: "/challenge/saloon/cactus/frame-6.webp",
        width: 778,
        height: 793,
        drinkAnchor: { x: 294, y: 219 }
    },
    {
        src: "/challenge/saloon/cactus/frame-7.webp",
        width: 778,
        height: 797,
        drinkAnchor: { x: 294, y: 223 }
    }
] as const;

const LAST_FRAME_INDEX = frames.length - 1;
const STAGE_WIDTH = frames[LAST_FRAME_INDEX].width;
const STAGE_HEIGHT = frames[LAST_FRAME_INDEX].height;
const FINAL_DRINK_ANCHOR = frames[LAST_FRAME_INDEX].drinkAnchor;

export default function CactusAnimation() {
    const stageRef = useRef<HTMLDivElement>(null);
    const hasPlayedRef = useRef(false);
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        let cancelled = false;
        let intervalId: number | undefined;
        let observer: IntersectionObserver | undefined;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        if (reducedMotion.matches) {
            setFrameIndex(LAST_FRAME_INDEX);
            return;
        }

        const preloadFrames = frames.map(
            frame =>
                new Promise<void>(resolve => {
                    const image = new window.Image();
                    image.onload = () => resolve();
                    image.onerror = () => resolve();
                    image.src = frame.src;
                })
        );

        const play = () => {
            if (hasPlayedRef.current) {
                return;
            }

            hasPlayedRef.current = true;
            let nextFrame = 0;
            setFrameIndex(nextFrame);

            intervalId = window.setInterval(() => {
                nextFrame += 1;
                setFrameIndex(nextFrame);

                if (nextFrame === LAST_FRAME_INDEX) {
                    window.clearInterval(intervalId);
                }
            }, FRAME_DURATION_MS);
        };

        void Promise.all(preloadFrames).then(() => {
            if (cancelled || !stageRef.current) {
                return;
            }

            observer = new IntersectionObserver(
                entries => {
                    if (entries.some(entry => entry.isIntersecting)) {
                        play();
                        observer?.disconnect();
                    }
                },
                {
                    rootMargin: "0px 0px -50% 0px",
                    threshold: 0.1
                }
            );
            observer.observe(stageRef.current);
        });

        return () => {
            cancelled = true;
            observer?.disconnect();
            if (intervalId !== undefined) {
                window.clearInterval(intervalId);
            }
        };
    }, []);

    const frame = frames[frameIndex];

    return (
        <div
            ref={stageRef}
            className={styles.cactusAnimation}
            aria-hidden="true"
        >
            {/* These frames are pre-encoded and preloaded before playback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                className={styles.cactusFrame}
                src={frame.src}
                width={frame.width}
                height={frame.height}
                alt=""
                draggable={false}
                decoding="sync"
                style={{
                    width: `${(frame.width / STAGE_WIDTH) * 100}%`,
                    left: `${(FINAL_DRINK_ANCHOR.x / STAGE_WIDTH) * 100}%`,
                    top: `${(FINAL_DRINK_ANCHOR.y / STAGE_HEIGHT) * 100}%`,
                    transform: `translate(-${(frame.drinkAnchor.x / frame.width) * 100}%, -${(frame.drinkAnchor.y / frame.height) * 100}%)`
                }}
            />
        </div>
    );
}
