export type Step = {
    id: string;
    name: string;
    color: string;
    use_svg?: boolean;
};

export const steps = [
    {
        id: "personal_info",
        name: "Personal Information",
        color: "#3A2541"
    },
    {
        id: "background_info",
        name: "Background Information",
        color: "#3e66c2ff"
    },
    {
        id: "app_questions",
        name: "Application Questions",
        color: "#01313B"
    },
    {
        id: "attending_hack",
        name: "Attending HackIllinois",
        color: "#87304E",
        use_svg: true
    },
    { id: "review", name: "Review & Submit", color: "#983300" },
    { id: "confirmation", name: "Confirmation", color: "#480021" }
];

export const page_slugs = [
    "personal-information",
    "background-information",
    "application-questions",
    "attending-hackillinois",
    "review-and-submit",
    "confirmation"
] as const;
