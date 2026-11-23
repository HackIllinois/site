// The Figma scenery has different compositions on phones. Let the browser select
// one file before it starts downloading, including when JavaScript is disabled.
type SceneArtProps = {
    src: string;
    width?: number;
    height: number;
    largeWidth?: number;
    phone?: {
        src: string;
        width: number;
        height: number;
        format?: "png" | "webp";
        small?: number;
        largeWidth?: number;
    };
    priority?: boolean;
    alt?: string;
};

function sceneSources(
    src: string,
    width: number,
    small?: number,
    large?: number,
    format = "webp"
) {
    return [
        small && `${src}-small.${format} ${small}w`,
        `${src}.${format} ${width}w`,
        large && `${src}-large.${format} ${large}w`
    ]
        .filter(Boolean)
        .join(", ");
}

export default function SceneArt({
    src,
    width = 1440,
    height,
    largeWidth,
    phone,
    priority = false,
    alt = ""
}: SceneArtProps) {
    return (
        <picture>
            {phone && (
                <source
                    media="(max-width: 850px)"
                    width={phone.width}
                    height={phone.height}
                    srcSet={sceneSources(
                        phone.src,
                        phone.width,
                        phone.small,
                        phone.largeWidth,
                        phone.format
                    )}
                    sizes="100vw"
                />
            )}
            {/* Pre-encoded artwork is served directly from the static asset cache. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${src}.webp`}
                srcSet={sceneSources(src, width, 780, largeWidth)}
                sizes="100vw"
                width={width}
                height={height}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : undefined}
                decoding="async"
            />
        </picture>
    );
}
