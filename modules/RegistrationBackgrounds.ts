/**
 * Encoded copies of the registration scene art.
 *
 * The sources in `public/registration/backgrounds/` are 3.5–5.5 MB of SVG
 * (the canyon step is a ~1 MB PNG), which is far too heavy to fetch on every
 * step change. Each scene is therefore committed here as static WebP/AVIF:
 *
 * - `-1280` is the 1x render, `-2560` the 2x one (WebP q82, AVIF q52).
 * - `blurDataURL` is the same art rendered 24 px wide (WebP q45) and inlined,
 *   so a scene paints immediately instead of after the first byte arrives.
 *
 * To regenerate after the source art changes, rasterise the SVG with librsvg
 * at the target width, flatten it onto black, then encode it with WebP/AVIF at
 * the quality above. Keep the widths and heights below in sync with the files.
 */
const BASE_PATH = "/registration/backgrounds/webp";

export type RegistrationBackgroundId =
    | "personal_info"
    | "canyon_background_info"
    | "app_questions"
    | "attending_hack"
    | "review"
    | "confirmation"
    | "auth";

export type RegistrationBackgroundArt = {
    /** 1x WebP. Also the `<img>` fallback for browsers without AVIF. */
    src: string;
    webpSrcSet: string;
    avifSrcSet: string;
    /** Intrinsic size of the 1x render, in CSS pixels. */
    width: number;
    height: number;
    /** 24px-wide WebP inlined as a data URL, shown until the art decodes. */
    blurDataURL: string;
};

const art = (
    id: RegistrationBackgroundId,
    width: number,
    height: number,
    blurDataURL: string
): RegistrationBackgroundArt => ({
    src: `${BASE_PATH}/${id}-1280.webp`,
    webpSrcSet: `${BASE_PATH}/${id}-1280.webp 1280w, ${BASE_PATH}/${id}-2560.webp 2560w`,
    avifSrcSet: `${BASE_PATH}/${id}-1280.avif 1280w, ${BASE_PATH}/${id}-2560.avif 2560w`,
    width,
    height,
    blurDataURL
});

export const registrationBackgrounds: Record<
    RegistrationBackgroundId,
    RegistrationBackgroundArt
> = {
    personal_info: art(
        "personal_info",
        1280,
        832,
        "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAwBACdASoYABAAPt1apkyopSOiMAgBEBuJagCdL1yBeJzbgPMVtC6LQuAAzdXVIERddZfvStav9d/L7qpS+LLqbogQPl9eqKdNc/amDCyTYT1F30lbs8kouOLx1/yw7PM6t8H09oq7FQvTqmxvC8VNBxgPYvpA5MQbn4T7niYAAA=="
    ),
    canyon_background_info: art(
        "canyon_background_info",
        1280,
        832,
        "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAABwBACdASoYABAAPt1apkyopSOiMAgBEBuJbACdMoACAlaAUbvx61wudSRkQADNlCLkNW/poGr7VuBe+SYYmyXzgWOMWqhH85IY/F0ITYkf+rqk1oGTuvbJVriLBFXtyGl5dyNpONE/CwqFxtmWxa5+orG4l6jeV/a6/k+aFXqNXc4tMQJgAA=="
    ),
    app_questions: art(
        "app_questions",
        1280,
        832,
        "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAAAwBACdASoYABAAPt1apkyopSOiMAgBEBuJagCdMoACX/KlS4sVpKgRuAAA/ZF8Rn/URJ4xZqkCR9TXOhHM+MUfiYONUihXIn/kkpNUo4f3SpjdET3yl3Z+4+/ci6OeOSzauokyHkfkrtXu1yy6S+7eMXpIU1oTO5BUdDLhqUkqRroIo4AAAA=="
    ),
    attending_hack: art(
        "attending_hack",
        1280,
        832,
        "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAADQAwCdASoYABAAPt1apkyopSOiMAgBEBuJaAC7ABSuY07rEcGIz8gA/qlWVgjOTz5MnfRdILlmFmqQRC7WPnCyGa6dUy40PUWWoLl/q77On84msmZxlgxjTWViNuQLzk+6cV+m5iEBj6ezeuWouoShkXC8IWZdeDOX80Zar2zAAAAA"
    ),
    review: art(
        "review",
        1280,
        1189,
        "data:image/webp;base64,UklGRr4AAABXRUJQVlA4ILIAAAAQBQCdASoYABYAPt1iqU+opSOiKAqpEBuJbACdM2h86AbScFB2z9zlcU/eTfEOOp6AAM2QjZ2L2tsI3fGcvOAvMYCgPR1xFKBbAnDG5YEsTzzZ0PGlX32peOItvE5mObSZ+KkbWzdof7/hfNE5xalpxRZ32n3hD51YNc335238qbEeOXXaEcBx08KrWuvmi4W8/kZW4+1lMm9HRN/CwzWyelIs+zMI1ALgz/HNEyWUJUAA"
    ),
    confirmation: art(
        "confirmation",
        1280,
        832,
        "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAwBACdASoYABAAPt1apkyopSOiMAgBEBuJagCdL1yBeJzbgPMVtC6LQuAAzdXVIERddZfvStav9d/L7qpS+LLqbogQPl9eqKdNc/amDCyTYT1F30lbs8kouOLx1/yw7PM6t8H09oq7FQvTqmxvC8VNBxgPYvpA5MQbn4T7niYAAA=="
    ),
    auth: art(
        "auth",
        1280,
        832,
        "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAwBACdASoYABAAPt1apkyopSOiMAgBEBuJagCdL1yBeJzbgPMVtC6LQuAAzdXVIERddZfvStav9d/L7qpS+LLqbogQPl9eqKdNc/amDCyTYT1F30lbs8kouOLx1/yw7PM6t8H09oq7FQvTqmxvC8VNBxgPYvpA5MQbn4T7niYAAA=="
    )
};
