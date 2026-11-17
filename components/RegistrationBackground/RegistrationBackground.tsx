"use client";

import type { RegistrationBackgroundArt } from "@/modules/RegistrationBackgrounds";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Matches the opacity transition on every art layer. */
const FADE_MS = 320;
/** Extra time the old art stays mounted behind the new one before unloading. */
const HANDOFF_MS = FADE_MS + 80;

const CONTAINER_STYLE: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: -1,
    overflow: "hidden",
    pointerEvents: "none",
    backgroundColor: "#000000"
};

const LAYER_STYLE: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%"
};

type ArtLayerProps = {
    art: RegistrationBackgroundArt;
    opacity: number;
    blurPx: number;
    onReady?: (src: string) => void;
};

const ArtLayer = ({ art, opacity, blurPx, onReady }: ArtLayerProps) => {
    const imgRef = useRef<HTMLImageElement | null>(null);

    // An image restored from cache can finish before React attaches `onLoad`
    // (or before hydration), so ask the element directly once it is mounted.
    useEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalWidth > 0) onReady?.(art.src);
    }, [art.src, onReady]);

    const handleLoad = () => {
        const img = imgRef.current;
        if (!img) {
            onReady?.(art.src);
            return;
        }
        // Start the fade only once the frame is decoded, otherwise the layer
        // can fade in on a blank paint.
        img.decode().then(
            () => onReady?.(art.src),
            () => onReady?.(art.src)
        );
    };

    return (
        <picture
            style={{
                ...LAYER_STYLE,
                display: "block",
                opacity,
                filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
                transform: blurPx > 0 ? "scale(1.1)" : undefined,
                transition: `opacity ${FADE_MS}ms ease-out`
            }}
        >
            <source type="image/avif" srcSet={art.avifSrcSet} sizes="100vw" />
            <source type="image/webp" srcSet={art.webpSrcSet} sizes="100vw" />
            <img
                ref={imgRef}
                src={art.src}
                srcSet={art.webpSrcSet}
                sizes="100vw"
                alt=""
                width={art.width}
                height={art.height}
                decoding="async"
                onLoad={handleLoad}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center"
                }}
            />
        </picture>
    );
};

type RegistrationBackgroundProps = {
    /** Art for the page or step that is on screen now. */
    background: RegistrationBackgroundArt;
    /**
     * Art for the step that comes next. It is only requested once the current
     * art has painted, and only this one scene is ever prefetched.
     */
    next?: RegistrationBackgroundArt | null;
    /** Soft-focus the art, in CSS pixels. Used by the loading and 404 backdrops. */
    blurPx?: number;
};

/**
 * Full-viewport scene art for the registration flow and the pages around it.
 *
 * Paints the inline LQIP immediately, fades the encoded art in when it decodes
 * and keeps the previous scene mounted underneath until the new one is ready,
 * so a step change never flashes an empty background.
 */
const RegistrationBackground = ({
    background,
    next = null,
    blurPx = 0
}: RegistrationBackgroundProps) => {
    const [readySources, setReadySources] = useState<ReadonlySet<string>>(
        () => new Set()
    );
    const [previous, setPrevious] = useState<RegistrationBackgroundArt | null>(
        null
    );
    const shownRef = useRef(background);

    useEffect(() => {
        if (shownRef.current.src === background.src) return;
        // Only hold art that actually painted; a step that is still loading
        // would just cover the screen with its own LQIP.
        setPrevious(
            readySources.has(shownRef.current.src) ? shownRef.current : null
        );
        shownRef.current = background;
    }, [background, readySources]);

    const ready = readySources.has(background.src);

    useEffect(() => {
        if (!previous || !ready) return;
        const timer = setTimeout(() => setPrevious(null), HANDOFF_MS);
        return () => clearTimeout(timer);
    }, [previous, ready]);

    const handleReady = useCallback((src: string) => {
        setReadySources(sources =>
            sources.has(src) ? sources : new Set([...sources, src])
        );
    }, []);

    return (
        <div aria-hidden style={CONTAINER_STYLE}>
            <div
                style={{
                    ...LAYER_STYLE,
                    backgroundColor: "#000000",
                    backgroundImage: `url(${background.blurDataURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    opacity: ready ? 0 : 1,
                    filter: `blur(${blurPx + 12}px)`,
                    transform: "scale(1.06)",
                    transition: `opacity ${FADE_MS}ms ease-out`
                }}
            />
            {previous && previous.src !== background.src && (
                <ArtLayer
                    key={previous.src}
                    art={previous}
                    opacity={1}
                    blurPx={blurPx}
                />
            )}
            <ArtLayer
                key={background.src}
                art={background}
                opacity={ready ? 1 : 0}
                blurPx={blurPx}
                onReady={handleReady}
            />
            {ready &&
                next &&
                next.src !== background.src &&
                next.src !== previous?.src && (
                    <ArtLayer
                        key={next.src}
                        art={next}
                        opacity={0}
                        blurPx={blurPx}
                    />
                )}
            <div
                aria-hidden
                style={{
                    ...LAYER_STYLE,
                    zIndex: 1,
                    pointerEvents: "none",
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                }}
            />
        </div>
    );
};

export default RegistrationBackground;
