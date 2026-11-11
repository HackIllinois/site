import { useId } from "react";

/**
 * One louvered saloon door, drawn as the left-hand door (hinge on the left).
 * Mirror it with CSS for the right-hand door.
 */
export default function SaloonDoor({ className }: { className?: string }) {
    const id = useId().replace(/:/g, "");
    const wood = `${id}-wood`;
    const slat = `${id}-slat`;
    const louvers = `${id}-louvers`;

    return (
        <svg
            className={className}
            viewBox="0 0 200 330"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={wood} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#8a5a33" />
                    <stop offset="0.5" stopColor="#a8784a" />
                    <stop offset="1" stopColor="#7a4c29" />
                </linearGradient>
                <linearGradient id={slat} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#c19563" />
                    <stop offset="1" stopColor="#7d5230" />
                </linearGradient>
                <pattern
                    id={louvers}
                    width="200"
                    height="11"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="200" height="11" fill="#3b2211" />
                    <rect y="1" width="200" height="7" fill={`url(#${slat})`} />
                </pattern>
            </defs>

            {/* Door body with a curved crest and scalloped hem */}
            <path
                d="M0 46 C 28 46, 42 14, 72 16 C 102 18, 112 38, 142 32 C 168 27, 186 8, 200 6
                   L 200 300 C 178 300, 166 326, 136 322 C 108 318, 96 298, 66 302
                   C 38 306, 20 324, 0 318 Z"
                fill={`url(#${wood})`}
                stroke="#2a170c"
                strokeWidth="4"
            />

            {/* Grain */}
            <g
                stroke="#5a3519"
                strokeOpacity="0.35"
                strokeWidth="1.2"
                fill="none"
            >
                <path d="M12 60 C 14 140, 10 220, 13 300" />
                <path d="M186 30 C 184 120, 189 210, 186 300" />
                <path d="M60 40 C 62 50, 58 56, 61 62" />
                <path d="M120 275 C 140 280, 150 272, 170 278" />
            </g>

            {/* Louver panel */}
            <rect
                x="28"
                y="66"
                width="144"
                height="196"
                rx="4"
                fill={`url(#${louvers})`}
                stroke="#2a170c"
                strokeWidth="4"
            />
            <rect
                x="22"
                y="60"
                width="156"
                height="208"
                rx="6"
                fill="none"
                stroke="#c9a06f"
                strokeOpacity="0.45"
                strokeWidth="2"
            />

            {/* Hinges */}
            <g fill="#c9a24f" stroke="#2a170c" strokeWidth="2">
                <rect x="-2" y="78" width="16" height="30" rx="3" />
                <rect x="-2" y="226" width="16" height="30" rx="3" />
            </g>
        </svg>
    );
}
