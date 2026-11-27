"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { sequenceAssets, type SequenceAssetName } from "./sequenceAssets";

const base = "/landing/frontier/sequence/";

type Props = {
    name: SequenceAssetName;
    alt?: string;
    className?: string;
    style?: CSSProperties;
    /** Rendered width, for picking between the file and its -small variant. */
    sizes?: string;
    /** Above the fold: load eagerly, at high priority. */
    priority?: boolean;
    /**
     * Needed early in the scroll: load eagerly and decode in idle time
     * after it arrives, so the first frame that draws it does not wait for
     * the decode.
     */
    decodeEarly?: boolean;
};

/**
 * One of the landing page's pre-built WebP images (see sequenceAssets.ts).
 * Files with a half-width `-small` variant get a srcset so phones download
 * only what they can show. The files are already optimized, so like
 * SceneArt this is a plain <img> rather than next/image.
 */
export default function SequenceImage({
    name,
    alt = "",
    className,
    style,
    sizes = "100vw",
    priority = false,
    decodeEarly = false
}: Props) {
    const ref = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const image = ref.current;
        if (!decodeEarly || !image) return;
        const decode = () => void image.decode().catch(() => {});
        // Safari has no requestIdleCallback.
        if (typeof window.requestIdleCallback !== "function") {
            const timer = window.setTimeout(decode, 500);
            return () => window.clearTimeout(timer);
        }
        const idle = window.requestIdleCallback(decode, { timeout: 3000 });
        return () => window.cancelIdleCallback(idle);
    }, [decodeEarly]);
    const asset = sequenceAssets[name];
    const src = `${base}${name}.webp`;
    const srcSet =
        "small" in asset
            ? `${base}${name}-small.webp ${asset.small}w, ${src} ${asset.width}w`
            : undefined;
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            ref={ref}
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            width={asset.width}
            height={asset.height}
            alt={alt}
            aria-hidden={alt ? undefined : true}
            className={className}
            style={style}
            loading={priority || decodeEarly ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            draggable={false}
        />
    );
}
