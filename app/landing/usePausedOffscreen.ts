import { useEffect, useRef } from "react";
import styles from "../page.module.scss";

/**
 * For elements with looping CSS animations: adds `.paused` (see
 * page.module.scss) while the element is well away from the screen, so the
 * browser can stop the loop. The class is toggled on the element directly
 * rather than through state, so nothing re-renders when it changes. Starts
 * paused until the first check.
 */
export default function usePausedOffscreen<T extends Element>() {
    const ref = useRef<T>(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        element.classList.add(styles.paused);
        const observer = new IntersectionObserver(
            ([entry]) =>
                element.classList.toggle(styles.paused, !entry.isIntersecting),
            { rootMargin: "25% 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return ref;
}
