import type { NavButtonThemeId } from "@/components/Form/NavigationButton/navButtonThemes";

/** Site footer palette; driven by CSS variables on :root. */
export type FooterTheme = {
    bgFrom: string;
    bgTo: string;
    link: string;
    linkHover: string;
};

/** Legacy space-theme navy — default outside /register. */
export const SITE_FOOTER_THEME: FooterTheme = {
    bgFrom: "#16133e",
    bgTo: "#2a2654",
    link: "#a78bfa",
    linkHover: "#c4b5fd"
};

/**
 * Warm canyon/wood tint matching stage bottom bands + wooden plaque highlights.
 * Used for /register auth and as the fallback when a step theme is unavailable.
 */
export const REGISTER_FOOTER_DEFAULT: FooterTheme = {
    bgFrom: "#983723",
    bgTo: "#A5372F",
    link: "#FFD8B3",
    linkHover: "#FFE8D0"
};

const FOOTER_CSS_VARS = [
    "--footer-bg-from",
    "--footer-bg-to",
    "--footer-link",
    "--footer-link-hover"
] as const;

export function applyFooterTheme(theme: FooterTheme): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--footer-bg-from", theme.bgFrom);
    root.style.setProperty("--footer-bg-to", theme.bgTo);
    root.style.setProperty("--footer-link", theme.link);
    root.style.setProperty("--footer-link-hover", theme.linkHover);
}

export function clearFooterTheme(): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    for (const name of FOOTER_CSS_VARS) {
        root.style.removeProperty(name);
    }
}

export type Step = {
    id: string;
    name: string;
    /** Short label for nav plaques (fits 260×66 arrow). */
    navLabel: string;
    color: string;
    /** Textured plaque theme matching the stage sunset background. */
    buttonTheme: NavButtonThemeId;
    /**
     * Footer gradient matching the stage art bottom band
     * (public/registration/backgrounds/{id}.svg y=727 / V839 strip).
     */
    footerTheme: FooterTheme;
    use_svg?: boolean;
};

const woodLink = {
    link: REGISTER_FOOTER_DEFAULT.link,
    linkHover: REGISTER_FOOTER_DEFAULT.linkHover
};

export const steps: Step[] = [
    {
        id: "personal_info",
        name: "Personal Information",
        navLabel: "PERSONAL",
        color: "#3A2541",
        buttonTheme: "sunset1",
        footerTheme: { bgFrom: "#983723", bgTo: "#A5372F", ...woodLink },
        use_svg: true
    },
    {
        id: "background_info",
        name: "Background Information",
        navLabel: "BACKGROUND",
        color: "#3e66c2ff",
        buttonTheme: "sunset2",
        footerTheme: { bgFrom: "#712398", bgTo: "#862FA5", ...woodLink },
        use_svg: true
    },
    {
        id: "app_questions",
        name: "Application Questions",
        navLabel: "APPLICATION",
        color: "#01313B",
        buttonTheme: "sunset6",
        footerTheme: { bgFrom: "#372398", bgTo: "#4735BB", ...woodLink },
        use_svg: true
    },
    {
        id: "attending_hack",
        name: "Attending HackIllinois",
        navLabel: "ATTENDING",
        color: "#87304E",
        buttonTheme: "sunset7",
        footerTheme: { bgFrom: "#236F98", bgTo: "#357ABB", ...woodLink },
        use_svg: true
    },
    {
        id: "review",
        name: "Review & Submit",
        navLabel: "REVIEW",
        color: "#983300",
        buttonTheme: "sunset1",
        footerTheme: { bgFrom: "#983723", bgTo: "#A5372F", ...woodLink },
        use_svg: true
    },
    {
        id: "confirmation",
        name: "Confirmation",
        navLabel: "CONFIRMATION",
        color: "#480021",
        buttonTheme: "sunset7",
        footerTheme: { bgFrom: "#236F98", bgTo: "#357ABB", ...woodLink },
        use_svg: true
    }
];

export const page_slugs = [
    "personal-information",
    "background-information",
    "application-questions",
    "attending-hackillinois",
    "review-and-submit",
    "confirmation"
] as const;

export const OTHER_SCHOOL_OPTION = "Other - Not Listed";

export const MLH_CODE_OF_CONDUCT_URL =
    "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md";

/** Placeholder until admissions publishes the HackVoyagers challenge cutoff. */
export const PRO_CHALLENGE_DEADLINE = "January 31, 2027";

export const AGE_ELIGIBILITY_NOTE =
    "You must be at least 18 years old on or before February 26th 2027 to attend HackIllinois 2027";
