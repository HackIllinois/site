import { useEffect, useRef, useState } from "react";

export const useParallaxScrollY = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [offsetY, setOffsetY] = useState(0);

    // We use refs to track values without triggering re-renders
    const targetOffset = useRef(0);
    const currentOffset = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            // 1. Just update the target. We don't set state here.
            // This is the "true" position where the element *should* be.
            const rect = ref.current.getBoundingClientRect();
            targetOffset.current = rect.top;
        };

        // Initialize positions
        handleScroll();
        currentOffset.current = targetOffset.current;

        // 2. The Loop: calculates the intermediate steps (smoothing)
        let animationFrameId: number;

        const loop = () => {
            const target = targetOffset.current;
            const current = currentOffset.current;

            // The "Smoothness" magic:
            // Calculate the distance to the target
            const diff = target - current;

            // Move a fraction of the distance (0.1 = 10% closer per frame)
            // Lower = Smoother/Slower (0.05)
            // Higher = Snappier (0.2)
            const ease = 0.05;

            // Only update if the distance is significant (stops micro-jitters)
            if (Math.abs(diff) > 0.1) {
                currentOffset.current = current + diff * ease;

                // Optimization: Only trigger React render if visible
                // We use the 'target' (actual position) to check visibility boundaries
                // assuming the lag isn't massive.
                const isVisible =
                    target < window.innerHeight &&
                    target + (ref.current?.offsetHeight || 0) > 0;

                if (isVisible) {
                    setOffsetY(currentOffset.current);
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        // Start the loop and listener
        loop();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return {
        ref,
        offsetY
    };
};
