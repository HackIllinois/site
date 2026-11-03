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
    const { viewBox, paths } = HORSE_PATHS[pose];

    return (
        <svg
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
            style={{
                width: "auto",
                height: "clamp(40px, 8vw, 56px)",
                display: "block",
                overflow: "visible"
            }}
        >
            {filled
                ? paths.map((path, idx) => (
                      <path key={idx} d={path.d} fill="white" />
                  ))
                : paths.map((path, idx) => {
                      const maskId = `horse-mask-${instanceId}-${idx}`;
                      return (
                          <g key={idx}>
                              <mask id={maskId} fill="white">
                                  <path d={path.d} fill="white" />
                              </mask>
                              <path
                                  d={path.d}
                                  fill="none"
                                  stroke="white"
                                  strokeWidth={path.strokeWidth ?? 4}
                                  mask={`url(#${maskId})`}
                              />
                          </g>
                      );
                  })}
        </svg>
    );
};

export default HorseIcon;
