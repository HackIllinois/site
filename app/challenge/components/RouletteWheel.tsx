"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "../track.module.scss";

// Measured on the 1440px roulette artwork. The rotor sprite is the number ring,
// cone and hub cut out of that artwork; pockets are 10° wide, starting at 0°.
const POCKET_COUNT = 36;
const POCKET_DEGREES = 360 / POCKET_COUNT;
// Ball travel from the hub to the inner pocket band, as a multiple of the
// ball's own width (pocket band radius 137px, ball 12px).
const POCKET_DISTANCE = 137 / 12;

const RETURN_MS = 650;
const DROP_MS = 1500;
const SPIN_MS = 4600;

type Pose = {
    wheel: number;
    ballAngle: number;
    ballDistance: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function randomPocketAngle() {
    const pocket = Math.floor(Math.random() * POCKET_COUNT);
    return pocket * POCKET_DEGREES + POCKET_DEGREES / 2;
}

export default function RouletteWheel() {
    const wheelRef = useRef<HTMLButtonElement>(null);
    const rotorRef = useRef<HTMLDivElement>(null);
    const ballRef = useRef<HTMLSpanElement>(null);
    const poseRef = useRef<Pose>({ wheel: 0, ballAngle: 0, ballDistance: 0 });
    const frameRef = useRef<number | undefined>(undefined);
    const spinningRef = useRef(false);
    const reducedMotionRef = useRef(false);

    const render = useCallback(() => {
        const { wheel, ballAngle, ballDistance } = poseRef.current;
        if (rotorRef.current) {
            rotorRef.current.style.transform = `rotate(${wheel}deg)`;
        }
        if (ballRef.current) {
            // The ball rides on the rotor, but its highlight and shadow stay
            // lit from the same side of the room.
            ballRef.current.style.transform =
                `translate(-50%, -50%) rotate(${ballAngle}deg) ` +
                `translateX(${ballDistance * POCKET_DISTANCE * 100}%) ` +
                `rotate(${-ballAngle - wheel}deg)`;
        }
    }, []);

    const animate = useCallback(
        (duration: number, step: (progress: number) => void) =>
            new Promise<void>(resolve => {
                const start = performance.now();
                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    step(progress);
                    render();
                    if (progress < 1) {
                        frameRef.current = requestAnimationFrame(tick);
                    } else {
                        resolve();
                    }
                };
                frameRef.current = requestAnimationFrame(tick);
            }),
        [render]
    );

    const spin = useCallback(async () => {
        if (spinningRef.current) {
            return;
        }
        const pose = poseRef.current;

        if (reducedMotionRef.current) {
            pose.ballAngle = randomPocketAngle();
            pose.ballDistance = 1;
            render();
            return;
        }

        spinningRef.current = true;

        // Bring the ball back to the hub before the next run.
        if (pose.ballDistance > 0) {
            const from = pose.ballDistance;
            await animate(RETURN_MS, t => {
                pose.ballDistance = from * (1 - easeInOutCubic(t));
            });
        }

        // Roll out from the hub, curving against the wheel, into a pocket.
        const target = randomPocketAngle();
        const sweep = 300 + Math.random() * 120;
        await animate(DROP_MS, t => {
            pose.ballAngle = target + sweep * (1 - easeOutCubic(t));
            pose.ballDistance = easeInOutCubic(t);
        });

        // Spin the wheel with the ball seated in it.
        const from = pose.wheel;
        const turn = 720 + Math.random() * 360;
        await animate(SPIN_MS, t => {
            pose.wheel = from + turn * easeOutCubic(t);
        });
        pose.wheel %= 360;

        spinningRef.current = false;
    }, [animate, render]);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        reducedMotionRef.current = reducedMotion.matches;
        render();

        if (reducedMotion.matches) {
            void spin();
            return;
        }

        const wheel = wheelRef.current;
        if (!wheel) {
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    observer.disconnect();
                    void spin();
                }
            },
            { rootMargin: "0px 0px -35% 0px", threshold: 0.4 }
        );
        observer.observe(wheel);

        return () => {
            observer.disconnect();
            if (frameRef.current !== undefined) {
                cancelAnimationFrame(frameRef.current);
            }
            spinningRef.current = false;
        };
    }, [render, spin]);

    return (
        <button
            ref={wheelRef}
            type="button"
            className={styles.wheel}
            onClick={() => void spin()}
            aria-label="Spin the roulette wheel"
        >
            <div ref={rotorRef} className={styles.rotor}>
                <span ref={ballRef} className={styles.ball} />
            </div>
            <svg
                className={styles.hubShadow}
                viewBox="0 0 412 412"
                aria-hidden="true"
            >
                <defs>
                    <filter id="roulette-hub-blur">
                        <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                    <mask id="roulette-hub-mask">
                        <rect width="412" height="412" fill="#fff" />
                        <circle cx="206" cy="206" r="17" fill="#000" />
                    </mask>
                </defs>
                <g mask="url(#roulette-hub-mask)">
                    <circle
                        cx="216"
                        cy="219"
                        r="18"
                        fill="#1b0a00"
                        opacity="0.55"
                        filter="url(#roulette-hub-blur)"
                    />
                </g>
            </svg>
        </button>
    );
}
