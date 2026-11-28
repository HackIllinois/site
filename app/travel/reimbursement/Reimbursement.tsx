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
    const [hoveredState, setHoveredState] = useState<string | null>(null);
    const [pinnedState, setPinnedState] = useState<string | null>(null);
    const [popupAnchor, setPopupAnchor] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [popupLayout, setPopupLayout] = useState<{
        left: number;
        below: boolean;
    }>({ left: 0, below: false });
    const sectionRef = useRef<HTMLElement>(null);
    const mapCanvasRef = useRef<HTMLDivElement>(null);
    const statePopupRef = useRef<HTMLDivElement>(null);
    const area = useRef<HTMLDivElement>(null);
    const ticket = useRef<HTMLButtonElement>(null);
    const popup = useRef<HTMLElement>(null);
    const activeState = hoveredState ?? pinnedState;
    const activeAmount = activeState
        ? STATE_REIMBURSEMENT[activeState]
        : undefined;
    const close = () => {
        setOpen(false);
        setPinned(false);
    };

    const setAnchorFromClientPoint = (clientX: number, clientY: number) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPopupAnchor({
            x: clientX - rect.left,
            y: clientY - rect.top
        });
    };

    const setAnchorFromElement = (element: Element) => {
        const sectionRect = sectionRef.current?.getBoundingClientRect();
        if (!sectionRect) return;
        const box = element.getBoundingClientRect();
        setPopupAnchor({
            x: box.left + box.width / 2 - sectionRect.left,
            y: box.top + box.height / 2 - sectionRect.top
        });
    };

    // Keep the state tooltip inside the reimbursement section and below the fixed navbar.
    useLayoutEffect(() => {
        if (
            !activeState ||
            !popupAnchor ||
            !sectionRef.current ||
            !statePopupRef.current
        ) {
            return;
        }
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const halfWidth = statePopupRef.current.offsetWidth / 2;
        const popupHeight = statePopupRef.current.offsetHeight;
        const margin = 6;
        const minLeft = Math.min(halfWidth + margin, sectionRect.width / 2);
        const maxLeft = Math.max(
            sectionRect.width - halfWidth - margin,
            sectionRect.width / 2
        );
        const left = Math.min(Math.max(popupAnchor.x, minLeft), maxLeft);
        const headerBottom =
            document.querySelector("header")?.getBoundingClientRect().bottom ??
            0;
        const topInViewport =
            sectionRect.top + popupAnchor.y - popupHeight - 16;
        const flipBelow =
            topInViewport < headerBottom + 4 ||
            popupAnchor.y < popupHeight + 12;
        setPopupLayout({ left, below: flipBelow });
    }, [activeState, popupAnchor]);

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
        if (!pinnedState && !hoveredState) return;
        const closeOnOutsidePress = (event: PointerEvent) => {
            const target = event.target as Node;
            if (!mapCanvasRef.current?.contains(target)) {
                setPinnedState(null);
                setHoveredState(null);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setPinnedState(null);
            setHoveredState(null);
        };
        document.addEventListener("pointerdown", closeOnOutsidePress);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePress);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [pinnedState, hoveredState]);

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
            ref={sectionRef}
            className={styles.reimbursement}
            aria-label="Reimbursement caps"
        >
            <p className={styles.hint}>
                Hover or tap a state to see its reimbursement cap
            </p>
            <div className={styles.mapPaper}>
                <div
                    ref={mapCanvasRef}
                    className={styles.mapCanvas}
                    onMouseLeave={() => setHoveredState(null)}
                >
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
                                        const isActive = activeState === name;
                                        const isDimmed = Boolean(
                                            activeState && !isActive
                                        );
                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                tabIndex={0}
                                                role="img"
                                                aria-label={`${name}: $${amount} reimbursement cap`}
                                                fill={colorFor(amount)}
                                                className={
                                                    isActive
                                                        ? `${styles.state} ${styles.stateActive}`
                                                        : isDimmed
                                                          ? `${styles.state} ${styles.stateDimmed}`
                                                          : styles.state
                                                }
                                                onMouseEnter={event => {
                                                    setHoveredState(name);
                                                    setAnchorFromClientPoint(
                                                        event.clientX,
                                                        event.clientY
                                                    );
                                                }}
                                                onMouseMove={event => {
                                                    if (
                                                        pinnedState &&
                                                        (event.movementX !==
                                                            0 ||
                                                            event.movementY !==
                                                                0)
                                                    ) {
                                                        setPinnedState(null);
                                                    }
                                                    if (hoveredState !== name) {
                                                        setHoveredState(name);
                                                    }
                                                    setAnchorFromClientPoint(
                                                        event.clientX,
                                                        event.clientY
                                                    );
                                                }}
                                                onMouseLeave={() => {
                                                    setHoveredState(prev =>
                                                        prev === name
                                                            ? null
                                                            : prev
                                                    );
                                                }}
                                                onFocus={event => {
                                                    setHoveredState(name);
                                                    setAnchorFromElement(
                                                        event.currentTarget
                                                    );
                                                }}
                                                onBlur={() => {
                                                    setHoveredState(prev =>
                                                        prev === name
                                                            ? null
                                                            : prev
                                                    );
                                                }}
                                                onClick={event => {
                                                    event.stopPropagation();
                                                    setHoveredState(null);
                                                    setPinnedState(prev =>
                                                        prev === name
                                                            ? null
                                                            : name
                                                    );
                                                    setAnchorFromElement(
                                                        event.currentTarget
                                                    );
                                                }}
                                            />
                                        );
                                    })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
            {activeState && activeAmount !== undefined && popupAnchor && (
                <div
                    ref={statePopupRef}
                    role="tooltip"
                    className={`${styles.statePopup} ${popupLayout.below ? styles.statePopupBelow : ""}`}
                    style={{
                        left: popupLayout.left || popupAnchor.x,
                        top: popupAnchor.y
                    }}
                >
                    <span className={styles.statePopupName}>{activeState}</span>
                    <span className={styles.statePopupAmount}>
                        <span
                            className={styles.statePopupDot}
                            aria-hidden="true"
                            style={{ backgroundColor: colorFor(activeAmount) }}
                        />
                        ${activeAmount}
                    </span>
                    <span className={styles.statePopupCaption}>
                        reimbursement cap
                    </span>
                </div>
            )}
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
