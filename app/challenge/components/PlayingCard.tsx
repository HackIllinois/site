import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Saloon.module.scss";

export type CardSpec = {
    rank: string;
    suit: "♠" | "♥" | "♣" | "♦";
    icon: ReactNode;
    title: string;
    body: ReactNode;
};

/** A playing card with a rank and suit in two corners. Render inside a `styles.cards` list. */
export default function PlayingCard({
    rank,
    suit,
    icon,
    title,
    body
}: CardSpec) {
    const red = suit === "♥" || suit === "♦";
    return (
        <li
            className={clsx(
                styles.card,
                red ? styles.cardRed : styles.cardBlack
            )}
        >
            <span className={styles.cardCornerTop} aria-hidden="true">
                <span>{rank}</span>
                <span>{suit}</span>
            </span>
            <span className={styles.cardIcon} aria-hidden="true">
                {icon}
            </span>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardBody}>{body}</p>
            <span className={styles.cardCornerBottom} aria-hidden="true">
                <span>{rank}</span>
                <span>{suit}</span>
            </span>
        </li>
    );
}
