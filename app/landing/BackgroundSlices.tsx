import SequenceImage from "./SequenceImage";
import { sequenceAssets } from "./sequenceAssets";

// The original background was one 1440 x 11799 image. It is cut into slices
// so each loads (and is decoded) only when needed; `y` is each slice's top
// row in that image, and 14.4px of it is 1cqw.
const PX_PER_CQW = 14.4;

export const desertSlices = ["bg-desert-1", "bg-desert-2"] as const;
export const saloonSlices = [
    "bg-saloon-1",
    "bg-saloon-2",
    "bg-saloon-3",
    "bg-saloon-4"
] as const;

type Slice = (typeof desertSlices)[number] | (typeof saloonSlices)[number];

/**
 * A window onto the background: the slices, positioned as if the whole
 * image were placed with row `origin` at the top of the containing box.
 */
export default function BackgroundSlices({
    slices,
    origin,
    priority = false,
    decodeEarly = false
}: {
    slices: readonly Slice[];
    origin: number;
    priority?: boolean;
    decodeEarly?: boolean;
}) {
    return slices.map((name, i) => (
        <SequenceImage
            key={name}
            name={name}
            sizes="100vw"
            priority={priority && i === 0}
            decodeEarly={decodeEarly}
            style={{
                top: `${(sequenceAssets[name].y - origin) / PX_PER_CQW}cqw`
            }}
        />
    ));
}
