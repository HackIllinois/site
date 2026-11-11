import type { NavButtonThemeId } from "@/components/Form/NavigationButton/navButtonThemes";

export type Step = {
    id: string;
    name: string;
    /** Short label for nav plaques (fits 260×66 arrow). */
    navLabel: string;
    color: string;
    /** Textured plaque theme matching the stage sunset background. */
    buttonTheme: NavButtonThemeId;
    use_svg?: boolean;
};

export const steps: Step[] = [
    {
        id: "personal_info",
        name: "Personal Information",
        navLabel: "PERSONAL",
        color: "#3A2541",
        buttonTheme: "sunset1",
        use_svg: true
    },
    {
        id: "background_info",
        name: "Background Information",
        navLabel: "BACKGROUND",
        color: "#3e66c2ff",
        buttonTheme: "sunset2",
        use_svg: true
    },
    {
        id: "app_questions",
        name: "Application Questions",
        navLabel: "APPLICATION",
        color: "#01313B",
        buttonTheme: "sunset6",
        use_svg: true
    },
    {
        id: "attending_hack",
        name: "Attending HackIllinois",
        navLabel: "ATTENDING",
        color: "#87304E",
        buttonTheme: "sunset7",
        use_svg: true
    },
    {
        id: "review",
        name: "Review & Submit",
        navLabel: "REVIEW",
        color: "#983300",
        buttonTheme: "sunset1",
        use_svg: true
    },
    {
        id: "confirmation",
        name: "Confirmation",
        navLabel: "CONFIRMATION",
        color: "#480021",
        buttonTheme: "sunset7",
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
