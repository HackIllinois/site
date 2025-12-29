"use client";

import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import { Typography, Box, Paper } from "@mui/material";
import styles from "./styles.module.scss";

// Reimbursement tiers based on the correct mapping - using state names
const STATE_REIMBURSEMENT: Record<string, number> = {
    // $100 - Purple (Wisconsin, Illinois, Indiana)
    Wisconsin: 100,
    Illinois: 100,
    Indiana: 100,

    // $200 - Violet (Ohio)
    Ohio: 200,

    // $250 - Red (New York, Pennsylvania, New Jersey, Massachusetts, Virginia, Georgia, Florida)
    "New York": 250,
    Pennsylvania: 250,
    "New Jersey": 250,
    Massachusetts: 250,
    Virginia: 250,
    Georgia: 250,
    Florida: 250,

    // $275 - Yellow (Washington)
    Washington: 275,

    // $300 - Green (Texas)
    Texas: 300,

    // $350 - Sky Blue (California, Oregon)
    California: 350,
    Oregon: 350,
};

// Color mapping for reimbursement amounts
const getReimbursementColor = (amount: number): string => {
    const colorMap: Record<number, string> = {
        0: "#422F89",      // Default - no reimbursement
        100: "#AC00EA",    // Purple
        200: "#EB2FD4",    // Violet
        250: "#FF7274",    // Red
        275: "#FFBA59",    // Yellow
        300: "#76B373",    // Green
        350: "#23ADDB",    // Sky Blue
    };
    return colorMap[amount] ?? "#422F89";
};

// Get dimmed version of color
const dimColor = (color: string, isDimmed: boolean): string => {
    if (!isDimmed) return color;
    // Convert hex to RGB, reduce opacity
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
};

interface InteractiveMapProps {
    className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ className }) => {
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = (geo: any) => {
        setHoveredState(geo.properties?.name || null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        setHoveredState(null);
    };

    return (
        <div className={className}>
            <Box className={styles.mapContainer} onMouseMove={handleMouseMove}>
                <ComposableMap
                    projection="geoAlbersUsa"
                    className={styles.composableMap}
                >
                    <Geographies geography="/us-atlas.json">
                        {({ geographies }: { geographies: any[] }) => (
                            <>
                                {geographies.map((geo: any) => {
                                    const stateName = geo.properties?.name || "";
                                    const reimbursement =
                                        STATE_REIMBURSEMENT[stateName] ?? 0;
                                    const baseColor = getReimbursementColor(
                                        reimbursement
                                    );
                                    const isHovered =
                                        geo.properties?.name === hoveredState;
                                    const isDimmed = Boolean(
                                        hoveredState && !isHovered
                                    );

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() =>
                                                handleMouseEnter(geo)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                            style={{
                                                default: {
                                                    fill: dimColor(
                                                        baseColor,
                                                        isDimmed
                                                    ),
                                                    stroke: "#fff",
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: baseColor,
                                                    stroke: "#fff",
                                                    strokeWidth: 2,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: baseColor,
                                                    stroke: "#fff",
                                                    strokeWidth: 2,
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ComposableMap>

                {/* Tooltip - State Name */}
                {hoveredState && (
                    <Paper
                        className={styles.mapTooltip}
                        elevation={8}
                        sx={{
                            position: "absolute",
                            top: mousePosition.y,
                            left: mousePosition.x,
                            transform: "translate(-50%, -150%)",
                            backgroundColor: "rgba(22, 19, 62, 0.95)",
                            color: "white",
                            padding: "0.75rem 1.25rem",
                            borderRadius: "12px",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            pointerEvents: "none",
                            zIndex: 1000,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                textAlign: "center",
                                color: "white",
                            }}
                        >
                            {hoveredState}
                        </Typography>
                    </Paper>
                )}

                {/* Price Display */}
                {hoveredState && (
                    <Paper
                        className={styles.priceDisplay}
                        elevation={8}
                        sx={{
                            position: "absolute",
                            bottom: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "rgba(22, 19, 62, 0.95)",
                            color: "white",
                            padding: "1rem 2rem",
                            borderRadius: "12px",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            pointerEvents: "none",
                            zIndex: 1000,
                        }}
                    >
                        {(() => {
                            const reimbursement = STATE_REIMBURSEMENT[hoveredState] ?? 0;
                            const color = getReimbursementColor(reimbursement);

                            return (
                                <>
                                    <Typography
                                        sx={{
                                            fontFamily: "Tsukimi Rounded",
                                            fontSize: "1.5rem",
                                            fontWeight: 700,
                                            textAlign: "center",
                                            color: color,
                                        }}
                                    >
                                        {reimbursement > 0 ? `$${reimbursement}` : "No Reimbursement"}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "0.85rem",
                                            textAlign: "center",
                                            color: "rgba(255, 255, 255, 0.8)",
                                            mt: 0.5,
                                        }}
                                    >
                                        {reimbursement > 0 ? "reimbursement cap" : "available"}
                                    </Typography>
                                </>
                            );
                        })()}
                    </Paper>
                )}
            </Box>
        </div>
    );
};

export default InteractiveMap;
