import { useEffect, useRef, useState } from "react";

export const useParallaxScrollY = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();

            // Optimization: Only update state if the element is currently visible
            // (or close to being visible) in the viewport.
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                setOffsetY(rect.top);
            }
        };

        // Trigger once on mount to set initial position
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return {
        ref,
        offsetY
    };
};
