export type NavButtonThemeId = "sunset1" | "sunset2" | "sunset6" | "sunset7";

export type NavButtonTheme = {
    id: NavButtonThemeId;
    /** Hard offset shadow under the plaque (Figma solid Y-offset). */
    shadow: string;
    shadowOpacity: number;
    shadowY: number;
};

export const NAV_BUTTON_THEMES: Record<NavButtonThemeId, NavButtonTheme> = {
    sunset1: {
        id: "sunset1",
        shadow: "#000000",
        shadowOpacity: 0.4,
        shadowY: 4
    },
    sunset2: {
        id: "sunset2",
        shadow: "#510B3E",
        shadowOpacity: 0.8,
        shadowY: 6
    },
    sunset6: {
        id: "sunset6",
        shadow: "#3A0B51",
        shadowOpacity: 0.8,
        shadowY: 6
    },
    sunset7: {
        id: "sunset7",
        shadow: "#0B2D51",
        shadowOpacity: 0.8,
        shadowY: 6
    }
};

/** Registration step id → button plaque theme matching stage background. */
export const STEP_NAV_BUTTON_THEME: Record<string, NavButtonThemeId> = {
    personal_info: "sunset1",
    background_info: "sunset2",
    app_questions: "sunset6",
    attending_hack: "sunset7",
    review: "sunset1",
    confirmation: "sunset7"
};

export function navButtonAsset(
    theme: NavButtonThemeId,
    direction: "left" | "right" | "default"
): string {
    // Cache-bust when plaque assets are regenerated
    return `/registration/buttons/${direction}-${theme}.svg?v=4`;
}
