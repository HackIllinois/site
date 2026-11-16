// Edit prize names, rewards, and section order here. See README.md beside this file.
// Provisional Figma examples, approved for the page while awards are finalized.
// Keep the repeated examples: they are sample content, not confirmed awards.
type Prize = {
    title: string;
    artwork: "purple" | "red" | "gold";
    rewards: string[];
};

type PrizeSection = {
    id: string;
    label: string;
    prizes: Prize[];
};

const webApi: Prize = {
    title: "Best Web API",
    artwork: "purple",
    rewards: [
        "1st place: $2000 for the team, JBL Tour One M2 Headphones for each team member",
        "Honorable Mention: $500 for the team, $100 Amazon gift card for each team member"
    ]
};

const companyExamples: Prize[] = [
    {
        title: "Best use of Solana",
        artwork: "purple",
        rewards: ["$5K in Crypto for the team and Ledger Nano S Plus"]
    },
    {
        title: "Best use of Supermemory",
        artwork: "gold",
        rewards: ["Pair of Meta Raybans for each member"]
    },
    {
        title: "Best use of OpenAI API",
        artwork: "red",
        rewards: ["$5k of OpenAI API credits for each member"]
    },
    {
        title: "Best use of Capital One Nessie",
        artwork: "gold",
        rewards: ["$300 gift card for each member"]
    }
];

export const prizeSections: PrizeSection[] = [
    {
        id: "path-prizes",
        label: "Path",
        prizes: [
            {
                title: "Best Voyager Hack",
                artwork: "purple",
                rewards: ["$5000"]
            },
            {
                title: "Best General Hack",
                artwork: "red",
                rewards: ["$2500"]
            }
        ]
    },
    {
        id: "track-prizes",
        label: "Track",
        prizes: [
            webApi,
            { ...webApi, artwork: "gold" },
            { ...webApi, artwork: "red" },
            webApi
        ]
    },
    { id: "company-prizes", label: "Company", prizes: companyExamples },
    {
        id: "extra-prizes",
        label: "Extra",
        prizes: companyExamples
    }
];
