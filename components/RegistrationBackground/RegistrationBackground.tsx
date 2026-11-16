"use client";

import { useEffect, useRef, useState } from "react";

export const registrationBackgrounds = {
    personal_info: "/registration/backgrounds/webp/personal_info-v1-1280.webp",
    canyon_background_info:
        "/registration/backgrounds/webp/canyon_background_info-v1-1280.webp",
    app_questions: "/registration/backgrounds/webp/app_questions-v1-1280.webp",
    attending_hack:
        "/registration/backgrounds/webp/attending_hack-v1-1280.webp",
    review: "/registration/backgrounds/webp/review-v1-1280.webp",
    confirmation: "/registration/backgrounds/webp/confirmation-v1-1280.webp",
    auth: "/registration/backgrounds/webp/auth-v1-1280.webp"
} as const;

const blurDataURL =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 14'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop stop-color='%233a2541'/%3E%3Cstop offset='.5' stop-color='%23bd3aac'/%3E%3Cstop offset='1' stop-color='%23236f98'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M0 0h24v14H0z'/%3E%3C/svg%3E";

type Props = { src: string; prefetchSrc?: string };

export default function RegistrationBackground({ src, prefetchSrc }: Props) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [previous, setPrevious] = useState<string>();

    useEffect(() => {
        const image = imageRef.current;
        if (image?.complete && image.naturalWidth) setLoaded(true);
    }, [src]);

    useEffect(() => {
        if (!prefetchSrc || prefetchSrc === src) return;
        const image = new Image();
        image.src = prefetchSrc;
    }, [prefetchSrc, src]);

    useEffect(() => {
        if (loaded) setPrevious(src);
    }, [loaded, src]);

    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -1,
                overflow: "hidden"
            }}
        >
            <img
                src={blurDataURL}
                alt=""
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "blur(16px)",
                    transform: "scale(1.08)"
                }}
            />
            {previous && previous !== src && (
                <img
                    src={previous}
                    alt=""
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
            )}
            <picture>
                <source
                    type="image/webp"
                    srcSet={`${src.replace("1280", "2560")} 2x`}
                />
                <img
                    ref={imageRef}
                    src={src}
                    alt=""
                    onLoad={() => setLoaded(true)}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: loaded ? 1 : 0,
                        transition: "opacity 350ms ease"
                    }}
                />
            </picture>
        </div>
    );
}
