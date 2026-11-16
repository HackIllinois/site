"use client";

import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATE_REIMBURSEMENT } from "../constants";
import styles from "./Reimbursement.module.scss";

const internationalRates = [
    ["Waterloo (Canada)", 350],
    ["Singapore", 500],
    ["China", 500],
    ["India", 500],
    ["UK", 500],
    ["Not listed", 350]
] as const;
const tiers = [...new Set(Object.values(STATE_REIMBURSEMENT))].sort(
    (a, b) => a - b
);

const mapWidth = 800;
const mapHeight = 520;
type MapLabel = { name: string; x: number; y: number; below: boolean };

function labelFor(name: string, element: SVGPathElement): MapLabel {
    const bounds = element.getBBox();
    const below = bounds.y + bounds.height / 2 < mapHeight / 2;
    return {
        name,
        x: ((bounds.x + bounds.width / 2) / mapWidth) * 100,
        y: ((below ? bounds.y + bounds.height : bounds.y) / mapHeight) * 100,
        below
    };
}

export default function Reimbursement() {
    const [selected, setSelected] = useState<MapLabel | null>(null);
    const [hovered, setHovered] = useState<MapLabel | null>(null);
    const mapArea = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const ticket = useRef<HTMLButtonElement>(null);
    const active = hovered || selected;
    useEffect(() => {
        const dismiss = (event: PointerEvent) => {
            if (!mapArea.current?.contains(event.target as Node)) {
                setSelected(null);
                setHovered(null);
            }
        };
        document.addEventListener("pointerdown", dismiss);
        return () => document.removeEventListener("pointerdown", dismiss);
    }, []);
    const closeRates = () => {
        setOpen(false);
        setPinned(false);
        ticket.current?.focus();
    };

    return (
        <section
            className={styles.reimbursement}
            aria-label="Reimbursement caps"
        >
            <p className={styles.hint}>
                Hover, tap, or select a state for reimbursement rates
            </p>
            <div
                ref={mapArea}
                className={styles.mapPaper}
                onKeyDown={event => {
                    if (event.key === "Escape") {
                        setSelected(null);
                        setHovered(null);
                    }
                }}
            >
                <div className={styles.mapCanvas}>
                    <ComposableMap
                        projection="geoAlbersUsa"
                        width={mapWidth}
                        height={mapHeight}
                        projectionConfig={{ scale: 1000 }}
                        className={styles.map}
                        aria-label="United States reimbursement map"
                    >
                        <Geographies geography="/us-atlas.json">
                            {({ geographies }) =>
                                geographies
                                    .filter(
                                        geo =>
                                            geo.properties.name in
                                            STATE_REIMBURSEMENT
                                    )
                                    .map(geo => {
                                        const name = geo.properties.name;
                                        const amount =
                                            STATE_REIMBURSEMENT[name];
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`${name}: $${amount} reimbursement cap`}
                                                aria-pressed={
                                                    selected?.name === name
                                                }
                                                onPointerEnter={event => {
                                                    if (
                                                        event.pointerType ===
                                                        "mouse"
                                                    )
                                                        setHovered(
                                                            labelFor(
                                                                name,
                                                                event.currentTarget
                                                            )
                                                        );
                                                }}
                                                onPointerLeave={() =>
                                                    setHovered(null)
                                                }
                                                onFocus={event =>
                                                    setHovered(
                                                        labelFor(
                                                            name,
                                                            event.currentTarget
                                                        )
                                                    )
                                                }
                                                onBlur={() => setHovered(null)}
                                                onClick={event =>
                                                    setSelected(
                                                        labelFor(
                                                            name,
                                                            event.currentTarget
                                                        )
                                                    )
                                                }
                                                onKeyDown={event => {
                                                    if (
                                                        event.key === "Enter" ||
                                                        event.key === " "
                                                    ) {
                                                        event.preventDefault();
                                                        setSelected(
                                                            labelFor(
                                                                name,
                                                                event.currentTarget
                                                            )
                                                        );
                                                    }
                                                }}
                                                className={styles.state}
                                                data-active={
                                                    active?.name === name
                                                }
                                            />
                                        );
                                    })
                            }
                        </Geographies>
                    </ComposableMap>
                    {active && (
                        <p
                            role="status"
                            aria-live="polite"
                            className={styles.mapLabel}
                            data-below={active.below}
                            style={{
                                left: `clamp(0px, calc(${active.x}% - 85px), calc(100% - 170px))`,
                                top: `${active.y}%`
                            }}
                        >
                            <span>{active.name}: </span>
                            <strong>${STATE_REIMBURSEMENT[active.name]}</strong>
                            <small>reimbursement cap</small>
                        </p>
                    )}
                </div>
            </div>
            <div
                className={styles.ticketArea}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => {
                    if (!pinned) setOpen(false);
                }}
                onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpen(false);
                        setPinned(false);
                    }
                }}
                onKeyDown={event => {
                    if (event.key === "Escape") {
                        event.preventDefault();
                        closeRates();
                    }
                }}
            >
                <button
                    ref={ticket}
                    type="button"
                    className={styles.ticket}
                    aria-label="International reimbursement rates"
                    aria-expanded={open}
                    aria-controls="international-rates"
                    onClick={() => {
                        setOpen(true);
                        setPinned(true);
                    }}
                >
                    <span className={styles.ticketText}>
                        <small>Hover or tap for</small>International
                        <br />
                        rates
                    </span>
                </button>
                {open && (
                    <section
                        id="international-rates"
                        className={styles.international}
                        aria-label="International reimbursement rates"
                    >
                        <h3>International rates</h3>
                        <dl>
                            {internationalRates.map(([location, rate]) => (
                                <div key={location}>
                                    <dt>{location}</dt>
                                    <dd>${rate}</dd>
                                </div>
                            ))}
                        </dl>
                        <button type="button" onClick={closeRates}>
                            Close rates
                        </button>
                    </section>
                )}
            </div>
            <ul className={styles.legend} aria-label="Reimbursement tiers">
                {tiers.map(amount => (
                    <li key={amount}>${amount}</li>
                ))}
            </ul>
        </section>
    );
}
