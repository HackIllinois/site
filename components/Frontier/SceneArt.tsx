// The Figma scenery has different compositions on phones. Let the browser select
// one file before it starts downloading, including when JavaScript is disabled.
type SceneArtProps = {
    src: string;
    width?: number;
    height: number;
    phone?: { src: string; width: number; height: number; small?: number };
    priority?: boolean;
    alt?: string;
};

export default function SceneArt({
    src,
    width = 1440,
    height,
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
                    srcSet={
                        phone.small
                            ? `${phone.src}-small.webp ${phone.small}w, ${phone.src}.webp ${phone.width}w`
                            : `${phone.src}.webp`
                    }
                    sizes="100vw"
                />
            )}
            {/* Pre-encoded artwork is served directly from the static asset cache. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${src}.webp`}
                srcSet={`${src}-small.webp 780w, ${src}.webp ${width}w`}
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
