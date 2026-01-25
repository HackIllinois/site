"use client";

import React, { useId, useState } from "react";
import { Box, Typography } from "@mui/material";

type TrackPrizeProps = {
    backgroundSrc: string;

    topText: string;
    bottomText: string | React.ReactNode;
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

    // Optional: Pass children if you want to inject the text dynamically from the parent
    children?: React.ReactNode;
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
    radiusY,
    children
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: size,
                height: "auto",
                position: "relative"
            }}
        >
            {/* 1. VISUAL CONTAINER (The Galaxy/SVG) */}
            <Box
                sx={{
                    width: size,
                    height: size, // Keeps the visual square/circular aspect ratio
                    backgroundImage: `url("${backgroundSrc}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    position: "relative",
                    flexShrink: 0, // Prevents image from squishing if flex gets weird

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
                </svg>
            </Box>

            {/* 2. TEXT CONTAINER (Dynamic Height) */}
            <Box
                sx={{
                    textAlign: "left",
                    width: "100%",
                    zIndex: 1,
                    mt: -6,
                    fontSize: bottomTextSize,
                    color: "white",
                    lineHeight: 1.5,
                    "& ul": {
                        margin: 0,
                        paddingLeft: "20px",
                        listStyleType: "disc"
                    },
                    "& li": {
                        marginBottom: "8px"
                    }
                }}
            >
                {typeof bottomText === "string" ? (
                    <Typography
                        variant="body1"
                        color="white"
                        sx={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.5,
                            fontSize: bottomTextSize,
                            textAlign: "center"
                        }}
                    >
                        {bottomText}
                    </Typography>
                ) : (
                    bottomText
                )}
            </Box>
        </Box>
    );
};

export default TrackPrize;
