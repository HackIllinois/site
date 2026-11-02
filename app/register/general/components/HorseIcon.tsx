import { HORSE_PATHS, type HorsePose } from "./horsePaths";

type HorseIconProps = {
    pose: HorsePose;
    filled: boolean;
    /** Unique id so multiple horses on the page don't clash masks. */
    instanceId: string;
    className?: string;
};

/**
 * White horse silhouette. Outline (stroke) when incomplete; solid fill when
 * the user has reached that step.
 */
const HorseIcon = ({ pose, filled, instanceId, className }: HorseIconProps) => {
    const { viewBox, d } = HORSE_PATHS[pose];
    const maskId = `horse-mask-${instanceId}`;

    return (
        <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
            style={{
                width: "auto",
                height: "clamp(28px, 7vw, 56px)",
                display: "block",
                overflow: "visible"
            }}
        >
            {filled ? (
                <path d={d} fill="white" />
            ) : (
                <>
                    <mask id={maskId} fill="white">
                        <path d={d} />
                    </mask>
                    <path
                        d={d}
                        fill="none"
                        stroke="white"
                        strokeWidth={4}
                        mask={`url(#${maskId})`}
                    />
                </>
            )}
        </svg>
    );
};

export default HorseIcon;
