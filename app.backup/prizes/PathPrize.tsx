"use client";

import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";

type PathPrizeProps = {
    backgroundSrc: string;

    topText: string;
    bottomText?: string;
    topTextOffset?: number;
    bottomTextOffset?: number;

    height: number;

    centerOffsetY?: number;
    centerOffsetX?: number;

    radius: number;

    topGradientWord?: string;
    topGradient?: { from: string; mid?: string; to: string };

    helpTooltip?: string;
    showHelpIcon?: boolean;

    bottomBottomText?: string | React.ReactNode;
    bottomBottomTextSize?: number;
    topSecondRow?: string | React.ReactNode;
    bottomBottomTextOffset?: number;
    titleMinHeight?: number;
    bottomTextFontSize?: Record<string, string>;
};

const PathPrize: React.FC<PathPrizeProps> = ({
    backgroundSrc,
    topText,
    bottomText,
    topTextOffset,
    bottomTextOffset = -1,
    height,
    centerOffsetX = 0,
    centerOffsetY = 0,
    radius,
    topGradientWord,
    topGradient,
    helpTooltip,
    showHelpIcon,
    bottomBottomText,
    bottomBottomTextSize = 16,
    topSecondRow,
    bottomBottomTextOffset,
    titleMinHeight,
    bottomTextFontSize
}) => {
    const [hovered, setHovered] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

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
        sm: 0.4,
        md: 0.65,
        lg: 0.8,
        xl: 0.8
    };

    const smPx = Math.round(height * scaleFinal.sm);
    const mdPx = Math.round(height * scaleFinal.md);

    const size = {
        xs: `min(${Math.round(height * scaleFinal.xs)}px, calc(100vw - 40px))`,
        sm: `clamp(${smPx}px, calc(${smPx}px + (${mdPx - smPx}) * ((100vw - 600px) / 300)), ${mdPx}px)`,
        md: `${mdPx}px`,
        lg: `${Math.round(height * scaleFinal.lg)}px`,
        xl: `${Math.round(height * scaleFinal.xl)}px`
    };

    const fontSize = {
        xs: "clamp(18px, 6vw, 25px)",
        sm: "clamp(18px, 8vw, 25px)",
        md: "30px",
        lg: "32px",
        xl: "32px"
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: size,
                maxWidth: "100%",
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
                    flexDirection: "column",
                    ...(titleMinHeight ? { minHeight: titleMinHeight } : {})
                }}
            >
                {/* title block */}
                <Box sx={{ textAlign: "center", mb: topTextOffset }}>
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
                        open={tooltipOpen}
                        disableHoverListener
                        disableFocusListener
                        disableTouchListener
                    >
                        <Box
                            component="span"
                            role="button"
                            onClick={() => setTooltipOpen(prev => !prev)}
                            onMouseEnter={() => setTooltipOpen(true)}
                            onMouseLeave={() => setTooltipOpen(false)}
                            sx={{
                                cursor: "pointer",
                                fontWeight: 400,
                                fontSize: ".7em",
                                pointerEvents: "auto",
                                position: "relative",
                                zIndex: 10,
                                color: "#90D5FF",
                                padding: "8px 24px"
                            }}
                        >
                            More info
                        </Box>
                    </Tooltip>
                )}
            </Box>

            <Box
                sx={{
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
                    </svg>
                </Box>
            </Box>

            {bottomText && (
                <Box
                    sx={{
                        mt: bottomTextOffset,
                        width: "100%",
                        textAlign: "center",
                        fontWeight: 700,
                        color: "white",
                        fontSize: bottomTextFontSize ?? {
                            xs: "18px",
                            sm: "16px",
                            md: "22px",
                            lg: "24px",
                            xl: "24px"
                        }
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
