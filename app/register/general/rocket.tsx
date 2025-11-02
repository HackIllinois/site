"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

type RocketOverlayProps = {
    activeStep: number;
    planetCenters: { x: number; y: number }[];
};

const RocketOverlay: React.FC<RocketOverlayProps> = ({
    activeStep,
    planetCenters
}) => {
    const [orbitSize, setOrbitSize] = useState(100);
    const [rocketSize, setRocketSize] = useState(30);

    const move = useAnimation();
    const stepRef = useRef(activeStep);

    useEffect(() => {
        const compute = () => {
            const w = window.innerWidth;

            const planet = Math.min(Math.max(w * 0.1, 40), 100);

            const orbit = Math.min(Math.max(planet * 1.2, 62), 110); // 62-110 px
            const rocket = Math.min(Math.max(planet * 0.4, 5), 30); // 5-30 px

            setOrbitSize(orbit);
            setRocketSize(rocket);
        };

        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    useEffect(() => {
        stepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        const target = planetCenters[activeStep];
        if (!target) return;

        const fly = async () => {
            await move.start({
                x: target.x,
                y: target.y,
                transition: { duration: 0.75, ease: "easeInOut" }
            });
        };

        fly();
    }, [activeStep, planetCenters, move]);

    useEffect(() => {
        const current = stepRef.current;
        const target = planetCenters[current];
        if (!target) return;
        move.set({ x: target.x, y: target.y });
    }, [planetCenters, move]);

    if (!planetCenters[activeStep]) return null;

    const radius = orbitSize / 2;

    return (
        <motion.div
            animate={move}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                pointerEvents: "none",
                zIndex: 5
            }}
        >
            <motion.div
                style={{
                    x: -radius,
                    y: -radius,
                    width: orbitSize,
                    height: orbitSize,
                    position: "relative"
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "100%",
                        transform: "translate(-50%, -50%) rotate(180deg)",
                        transformOrigin: "center"
                    }}
                >
                    <Image
                        src="/registration/progress_bar/rocket.svg"
                        alt="rocket"
                        width={rocketSize}
                        height={rocketSize}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RocketOverlay;
