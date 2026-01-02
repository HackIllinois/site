"use client";

import React, { useId, useState } from "react";
import { Box } from "@mui/material";

type TrackPrizeProps = {
    backgroundSrc: string;

    topText: string;
    bottomText: string;
    topTextOffset: number;
    bottomTextOffset: number;

    bottomTextSize: number;
    topTextSize?: number;

    width: number;
    height: number;

    centerOffsetY?: number;
    centerOffsetX?: number;
    bottomLetterSpacing?: number;

    radiusX: number;
    radiusY: number;
};

const TrackPrize: React.FC<TrackPrizeProps> = ({
    backgroundSrc,
    topText,
    bottomText,
    topTextOffset,
    bottomTextOffset,
    bottomTextSize,
    width,
    height,
    centerOffsetX = 0,
    centerOffsetY = 0,
    topTextSize = 20,
    bottomLetterSpacing = 0,
    radiusX,
    radiusY
}) => {
    const [hovered, setHovered] = useState(false);
    const uid = useId();
    const topArcId = `topArc-${uid}`;
    const bottomArcId = `bottomArc-${uid}`;

    const scaleFinal = {
        xs: 0.6,
        sm: 0.53,
        md: 0.76,
        lg: 0.8,
        xl: 0.8
    };

    const size = {
        xs: Math.round(height * scaleFinal.xs),
        sm: Math.round(height * scaleFinal.sm),
        md: Math.round(height * scaleFinal.md),
        lg: Math.round(height * scaleFinal.lg),
        xl: Math.round(height * scaleFinal.xl)
    };

    return (
        <Box
            sx={{
                width: size,
                height: size,
                backgroundImage: `url("${backgroundSrc}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                position: "relative",

                transition: "transform 200ms ease",
                willChange: "transform",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transformOrigin: "center"
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                style={{
                    position: "absolute",
                    inset: 0,
                    marginTop: `${centerOffsetY}px`,
                    marginLeft: `${centerOffsetX}px`,
                    pointerEvents: "none"
                }}
            >
                <ellipse
                    cx="200"
                    cy="200"
                    rx={radiusX}
                    ry={radiusY}
                    fill="transparent"
                    stroke="transparent"
                    style={{ pointerEvents: "all", cursor: "pointer" }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
                <defs>
                    <path
                        id={topArcId}
                        d={`
                    M 200,200
                    m -${radiusX},0
                    a ${radiusX},${radiusY} 0 0 1 ${radiusX * 2},0
                `}
                    />

                    <path
                        id={bottomArcId}
                        d={`
                M 200,200
                m -${radiusX},0
                a ${radiusX},${radiusY} 0 0 0 ${radiusX * 2},0
            `}
                    />
                </defs>

                {/* top text */}
                <text
                    fill="#fff"
                    fontFamily="Tsukimi Rounded"
                    fontSize={topTextSize}
                    fontWeight="700"
                    textAnchor="middle"
                >
                    <textPath
                        href={`#${topArcId}`}
                        startOffset={`${topTextOffset}%`}
                    >
                        {topText}
                    </textPath>
                </text>
                {/* bottom text */}
                <text
                    fill="#fff"
                    fontFamily="Montserrat"
                    fontSize={bottomTextSize}
                    fontWeight="600"
                    textAnchor="middle"
                    style={{ letterSpacing: bottomLetterSpacing }}
                >
                    <textPath
                        href={`#${bottomArcId}`}
                        startOffset={`${bottomTextOffset}%`}
                    >
                        {bottomText}
                    </textPath>
                </text>
            </svg>
        </Box>
    );
};

export default TrackPrize;
