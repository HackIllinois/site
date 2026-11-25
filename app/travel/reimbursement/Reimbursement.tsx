"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATE_REIMBURSEMENT, REIMBURSEMENT_TIERS } from "../constants";
import styles from "./Reimbursement.module.scss";

const internationalRates = [
    ["Waterloo (Canada)", 350],
    ["Singapore", 500],
    ["China", 500],
    ["India", 500],
    ["UK", 500],
    ["Not listed", 350]
] as const;
const tiers = REIMBURSEMENT_TIERS;

const mapWidth = 800;
const mapHeight = 520;
// Both the map and legend use the existing cap amounts, from light to dark olive.
function colorFor(amount: number) {
    const lowest = tiers[0];
    const range = tiers[tiers.length - 1] - lowest;
    const fraction = range === 0 ? 0 : (amount - lowest) / range;
    return `hsl(68, 38%, ${76 - fraction * 51}%)`;
}

export default function Reimbursement() {
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [below, setBelow] = useState(false);
    const area = useRef<HTMLDivElement>(null);
    const ticket = useRef<HTMLButtonElement>(null);
    const popup = useRef<HTMLElement>(null);
    const close = () => {
        setOpen(false);
        setPinned(false);
    };

    // Open above the ticket unless that would run under the fixed header.
    useLayoutEffect(() => {
        if (!open || !ticket.current || !popup.current) return;
        const headerBottom =
            document.querySelector("header")?.getBoundingClientRect().bottom ??
            0;
        const room = ticket.current.getBoundingClientRect().top - headerBottom;
        setBelow(room < popup.current.offsetHeight + 8);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const closeOnOutsidePress = (event: PointerEvent) => {
            const target = event.target as Node;
            if (
                !ticket.current?.contains(target) &&
                !popup.current?.contains(target)
            ) {
                close();
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            if (area.current?.contains(document.activeElement)) {
                ticket.current?.focus();
            }
            close();
        };
        document.addEventListener("pointerdown", closeOnOutsidePress);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePress);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    return (
        <section
            className={styles.reimbursement}
            aria-label="Reimbursement caps"
        >
            <p className={styles.hint}>
                State colors show reimbursement caps — see the key below
            </p>
            <div className={styles.mapPaper}>
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
                                                role="img"
                                                aria-label={`${name}: $${amount} reimbursement cap`}
                                                fill={colorFor(amount)}
                                                className={styles.state}
                                            />
                                        );
                                    })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
            <ul className={styles.legend} aria-label="Reimbursement tiers">
                {tiers.map(amount => (
                    <li key={amount}>
                        <span
                            aria-hidden="true"
                            style={{ backgroundColor: colorFor(amount) }}
                        />
                        ${amount}
                    </li>
                ))}
            </ul>
            <div
                ref={area}
                className={styles.ticketArea}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => {
                    if (!pinned) setOpen(false);
                }}
                onBlur={event => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        close();
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
                        if (open && pinned) {
                            close();
                        } else {
                            setOpen(true);
                            setPinned(true);
                        }
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
                        ref={popup}
                        tabIndex={-1}
                        className={`${styles.international} ${below ? styles.below : ""}`}
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
                    </section>
                )}
            </div>
        </section>
    );
}
