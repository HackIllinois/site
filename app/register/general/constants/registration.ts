import type { LegalTabId } from "@/app/legal/content";
import type { NavButtonThemeId } from "@/components/Form/NavigationButton/navButtonThemes";
import type {
    RegistrationBackgroundArt,
    RegistrationBackgroundId
} from "@/modules/RegistrationBackgrounds";
import { registrationBackgrounds } from "@/modules/RegistrationBackgrounds";

export type Step = RegistrationBackgroundArt & {
    /** Scene key: also the name of the source art in public/registration/backgrounds/. */
    id: RegistrationBackgroundId;
    name: string;
    /** Short label for nav plaques (fits 260×66 arrow). */
    navLabel: string;
    color: string;
    /** Textured plaque theme matching the stage sunset background. */
    buttonTheme: NavButtonThemeId;
};

export const steps: Step[] = [
    {
        ...registrationBackgrounds.personal_info,
        id: "personal_info",
        name: "Personal Details",
        navLabel: "PERSONAL",
        color: "#3A2541",
        buttonTheme: "sunset1"
    },
    {
        ...registrationBackgrounds.canyon_background_info,
        id: "canyon_background_info",
        name: "Background Information",
        navLabel: "BACKGROUND",
        color: "#7A1F6E",
        buttonTheme: "sunset2"
    },
    {
        ...registrationBackgrounds.app_questions,
        id: "app_questions",
        name: "Application Questions",
        navLabel: "APPLICATION",
        color: "#01313B",
        buttonTheme: "sunset6"
    },
    {
        ...registrationBackgrounds.attending_hack,
        id: "attending_hack",
        name: "Attending HackIllinois",
        navLabel: "ATTENDING",
        color: "#87304E",
        buttonTheme: "sunset7"
    },
    {
        ...registrationBackgrounds.review,
        id: "review",
        name: "Review & Submit",
        navLabel: "REVIEW",
        color: "#983300",
        buttonTheme: "ocean"
    },
    {
        ...registrationBackgrounds.confirmation,
        id: "confirmation",
        name: "Confirmation",
        navLabel: "CONFIRMATION",
        color: "#480021",
        buttonTheme: "sunset7"
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

export const MLH_PRIVACY_POLICY_URL =
    "https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md";

export const MLH_CONTEST_TERMS_URL =
    "https://github.com/MLH/mlh-policies/blob/main/contest-terms.md";

export const MLH_CODE_OF_CONDUCT_URL =
    "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md";

export const PRO_TRACK_NAME = "HackOutlaws Pro Track";

/** Page describing the pro path/track. */
export const PRO_TRACK_URL = "/challenge";

/** Hardware interest form. Leave empty to hide the link until it exists. */
export const HARDWARE_INTEREST_FORM_URL = "";

/** The four tabs of /legal, in the order the 2027 legal checkbox names them. */
export const LEGAL_DOCUMENTS: readonly { name: string; tab: LegalTabId }[] = [
    { name: "Privacy Policy", tab: "privacy-policy" },
    { name: "Terms & Conditions", tab: "terms-and-conditions" },
    { name: "Code of Conduct", tab: "code-of-conduct" },
    { name: "Complaint Procedures", tab: "complaint-procedures" }
];

export const AGE_ELIGIBILITY_NOTE =
    "You must be at least 18 years old on or before February 26th 2027 to attend HackIllinois 2027";
