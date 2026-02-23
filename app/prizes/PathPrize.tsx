"use client";

import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";

type PathPrizeProps = {
    backgroundSrc: string;

    topText: string;
    bottomText?: string;
    topTextOffset?: number;
    bottomTextOffset?: number;

    // bottomTextSize: number;
    // topTextSize?: number;

    // width: number;
    height: number;

    centerOffsetY?: number;
    centerOffsetX?: number;
    // bottomLetterSpacing?: number;

    radius: number;

    topGradientWord?: string;
    topGradient?: { from: string; mid?: string; to: string };
    // secondText?: string;

    helpTooltip?: string;
    showHelpIcon?: boolean;
    // helpAngleDeg?: number;
    // helpSize?: number;
    // helpRotationDeg?: number;

    bottomBottomText?: string | React.ReactNode;
    bottomBottomTextSize?: number;
    topSecondRow?: string;
    bottomBottomTextOffset?: number;
};

const PathPrize: React.FC<PathPrizeProps> = ({
    backgroundSrc,
    topText,
    bottomText,
    topTextOffset,
    bottomTextOffset = -1,
    // bottomTextSize,
    // width,
    height,
    centerOffsetX = 0,
    centerOffsetY = 0,
    // topTextSize = 20,
    // bottomLetterSpacing = 0,
    radius,
    topGradientWord,
    topGradient,
    // secondText,
    helpTooltip,
    showHelpIcon,
    // helpAngleDeg = 0,
    // helpSize = 0,
    // helpRotationDeg = 0,
    bottomBottomText,
    bottomBottomTextSize = 16,
    topSecondRow,
    bottomBottomTextOffset
}) => {
    const [hovered, setHovered] = useState(false);
    // const uid = useId();
    // const topArcId = `topArc-${uid}`;
    // const bottomArcId = `bottomArc-${uid}`;
    // const topGradId = `topGrad-${uid}`;
    // const secondId = `secondArc-${uid}`;

    const shouldGradient =
        !!topGradientWord && topText.includes(topGradientWord) && !!topGradient;

    let topBefore = topText;
    let topMid = "";
    let topAfter = "";

    if (shouldGradient) {
        const idx = topText.indexOf(topGradientWord!);
        topBefore = topText.slice(0, idx);
        topMid = topGradientWord!;
        topAfter = topText.slice(idx + topGradientWord!.length);
    }

    const scaleFinal = {
        xs: 0.6,
        sm: 0.51,
        md: 0.75,
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

    const fontSize = {
        xs: "25px",
        sm: "21px",
        md: "30px",
        lg: "32px",
        xl: "32px"
    };

    //     const titleRef = useRef<HTMLHeadingElement>(null);
    // const [titleLines, setTitleLines] = useState(1);

    // useEffect(() => {
    //   const el = titleRef.current;
    //   if (!el) return;

    //   const style = window.getComputedStyle(el);
    //   let lineHeight = parseFloat(style.lineHeight);
    //   if (isNaN(lineHeight)) {
    //     lineHeight = parseFloat(style.fontSize) * 1.2;
    //   }

    //   const lines = Math.round(el.scrollHeight / lineHeight);
    //   setTitleLines(lines);
    // }, []);

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
            {/* 1. VISUAL CONTAINER (The Path/SVG) */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize,
                    flexDirection: "column"
                }}
            >
                {/* title block */}
                <Box
                    // ref={titleRef}
                    sx={{ textAlign: "center", mb: topTextOffset }}
                >
                    {shouldGradient ? (
                        <>
                            <span style={{ color: "#fff" }}>{topBefore}</span>
                            <span
                                style={{
                                    background: topGradient!.mid
                                        ? `linear-gradient(90deg, ${topGradient!.from}, ${topGradient!.mid}, ${topGradient!.to})`
                                        : `linear-gradient(90deg, ${topGradient!.from}, ${topGradient!.to})`,
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent"
                                }}
                            >
                                {topMid}
                            </span>
                            <span style={{ color: "#fff" }}>{topAfter}</span>
                        </>
                    ) : (
                        <span style={{ color: "#fff" }}>{topText}</span>
                    )}

                    {topSecondRow ? <br /> : null}
                    {topSecondRow}
                </Box>

                {/* CHANGE: Tooltip trigger is now valid HTML (no <g>) */}
                {showHelpIcon && helpTooltip && (
                    <Tooltip
                        title={
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px"
                                }}
                            >
                                {helpTooltip}
                            </Typography>
                        }
                    >
                        <Box
                            component="span"
                            role="button"
                            sx={{
                                cursor: "pointer",
                                fontWeight: 400,
                                fontSize: ".7em",
                                pointerEvents: "auto",
                                zIndex: 999,
                                color: "#90D5FF"
                            }}
                        >
                            Show more
                        </Box>
                    </Tooltip>
                )}
            </Box>

            <Box
                sx={{
                    // marginTop: titleLines >= 2 ? "40px" : "0px",
                    mt: -1,
                    width: size,
                    height: size,
                    backgroundImage: `url("${backgroundSrc}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    position: "relative",
                    flexShrink: 0,

                    transition: "transform 200ms ease",
                    willChange: "transform",
                    transform: hovered ? "scale(1.04)" : "scale(1)",
                    transformOrigin: "center",
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        inset: 0
                        // display:"flex",
                        // justifyContent:"center",
                        // alignItems:"center"
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 400 400"
                        style={{
                            marginTop: `${centerOffsetY}px`,
                            marginLeft: `${centerOffsetX}px`,
                            pointerEvents: "none"
                        }}
                    >
                        <circle
                            cx="200"
                            cy="200"
                            r={radius * 1.2}
                            fill="transparent"
                            stroke="transparent"
                            style={{ pointerEvents: "all" }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        />
                        {/* <defs>
                            {shouldGradient && (
                                <linearGradient
                                    id={topGradId}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={topGradient!.from}
                                    />
                                    <stop
                                        offset="50%"
                                        stopColor={
                                            topGradient!.mid ?? topGradient!.to
                                        }
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={topGradient!.to}
                                    />
                                </linearGradient>
                            )}

                            <path
                                id={topArcId}
                                d={`
              M 200,200
              m -${radius},0
              a ${radius},${radius} 0 0 1 ${radius * 2},0
            `}
                            />

                            <path
                                id={bottomArcId}
                                d={`
              M 200,200
              m -${radius},0
              a ${radius},${radius} 0 0 0 ${radius * 2},0
            `}
                            />
                            {secondText && (
                                <path
                                    id={secondId}
                                    d={`
              M 200,200
              m -${radius - 25},0
              a ${radius - 25},${radius - 25} 0 0 0 ${radius * 2 - 50},0
            `}
                                />
                            )}
                        </defs> */}

                        {/* top text */}
                        {/* <text
                            fontFamily="Tsukimi Rounded"
                            fontSize={topTextSize}
                            fontWeight="700"
                            textAnchor="middle"
                        >
                            <textPath
                                href={`#${topArcId}`}
                                startOffset={`${topTextOffset}%`}
                            >
                                {shouldGradient ? (
                                    <>
                                        <tspan fill="#fff">{topBefore}</tspan>
                                        <tspan fill={`url(#${topGradId})`}>
                                            {topMid}
                                        </tspan>
                                        <tspan fill="#fff">{topAfter}</tspan>
                                    </>
                                ) : (
                                    <tspan fill="#fff">{topText}</tspan>
                                )}
                            </textPath>
                        </text>

                        {showHelpIcon && helpTooltip && (
                            <Tooltip
                                title={
                                    <Typography
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px"
                                        }}
                                    >
                                        {helpTooltip}
                                    </Typography>
                                }
                            >
                                <g
                                    style={{ pointerEvents: "all" }}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    transform={`
        translate(${200 + radius * 1.06 * Math.cos((helpAngleDeg * Math.PI) / 180)},
                    ${200 + radius * 1.06 * Math.sin((helpAngleDeg * Math.PI) / 180)})
        rotate(${helpRotationDeg})
        translate(${-helpSize / 2}, ${-helpSize / 2})
        `}
                                >
                                    <title>{helpTooltip}</title>

                                    <image
                                        href="/prizes/path_prizes/question.svg"
                                        width={helpSize}
                                        height={helpSize}
                                        preserveAspectRatio="xMidYMid meet"
                                    />
                                </g>
                            </Tooltip>
                        )} */}

                        {/* bottom text */}
                        {/* <text
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

                        {secondText && (
                            <text
                                fill="#fff"
                                fontFamily="Montserrat"
                                fontSize={bottomTextSize}
                                fontWeight="600"
                                textAnchor="middle"
                                style={{ letterSpacing: bottomLetterSpacing }}
                            >
                                <textPath
                                    href={`#${secondId}`}
                                    startOffset={`${bottomTextOffset}%`}
                                >
                                    {secondText}
                                </textPath>
                            </text> */}
                        {/* )} */}
                    </svg>
                </Box>
            </Box>
            {/* <Box
                      sx={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%",
                      textAlign: "center",
                      fontWeight: 700,
                      pointerEvents: "none",
                      color: "white",
                      fontSize,
                    //   mt:"-40px"
                    top:"95%"
                      }}
                  >
                      {bottomText}
                  </Box> */}

            {bottomText && (
                <Box
                    sx={{
                        mt: bottomTextOffset,
                        width: "100%",
                        textAlign: "center",
                        fontWeight: 700,
                        color: "white",
                        fontSize
                    }}
                >
                    {bottomText}
                </Box>
            )}
            {/* 2. TEXT CONTAINER (Dynamic Height) */}
            {bottomBottomText && (
                <Box
                    sx={{
                        mt: bottomBottomTextOffset,
                        textAlign: "left",
                        width: "100%",
                        zIndex: 1,
                        // mt: 3,
                        fontSize: bottomBottomTextSize,
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
                    {typeof bottomBottomText === "string" ? (
                        <Typography
                            variant="body1"
                            color="white"
                            sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.5,
                                fontSize: bottomBottomTextSize,
                                textAlign: "center"
                            }}
                        >
                            {bottomBottomText}
                        </Typography>
                    ) : (
                        bottomBottomText
                    )}
                </Box>
            )}
        </Box>
    );
};

export default PathPrize;
