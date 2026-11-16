"use client";

import { useRef, useState } from "react";
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
const states = Object.keys(STATE_REIMBURSEMENT).sort();
const tiers = [...new Set(Object.values(STATE_REIMBURSEMENT))].sort(
    (a, b) => a - b
);

export default function Reimbursement() {
    const [selected, setSelected] = useState("");
    const [hovered, setHovered] = useState("");
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const ticket = useRef<HTMLButtonElement>(null);
    const active = hovered || selected;
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
            <div className={styles.mapPaper}>
                <ComposableMap
                    projection="geoAlbersUsa"
                    width={800}
                    height={520}
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
                                    const amount = STATE_REIMBURSEMENT[name];
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`${name}: $${amount} reimbursement cap`}
                                            aria-pressed={selected === name}
                                            onMouseEnter={() =>
                                                setHovered(name)
                                            }
                                            onMouseLeave={() => setHovered("")}
                                            onFocus={() => setHovered(name)}
                                            onBlur={() => setHovered("")}
                                            onClick={() => setSelected(name)}
                                            onKeyDown={event => {
                                                if (
                                                    event.key === "Enter" ||
                                                    event.key === " "
                                                ) {
                                                    event.preventDefault();
                                                    setSelected(name);
                                                }
                                            }}
                                            className={styles.state}
                                            data-active={active === name}
                                        />
                                    );
                                })
                        }
                    </Geographies>
                </ComposableMap>
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
            <div className={styles.selection}>
                <label htmlFor="travel-state">Choose a state or district</label>
                <select
                    id="travel-state"
                    value={selected}
                    onChange={event => {
                        setSelected(event.target.value);
                        setHovered("");
                    }}
                >
                    <option value="">Select a location</option>
                    {states.map(name => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <p role="status" aria-live="polite">
                    {active
                        ? `${active}: $${STATE_REIMBURSEMENT[active]} reimbursement cap`
                        : "Select a location to see its reimbursement cap."}
                </p>
            </div>
        </section>
    );
}
