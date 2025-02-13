import { CheckboxOption } from "@/components/Form/Checkboxes/Checkboxes";

export const generalConsiderationOptions = [
    {
        label: "Yes",
        value: "YES",
        isRadio: true
    },
    {
        label: "No",
        value: "NO",
        isRadio: true
    }
] satisfies CheckboxOption[];

export const heardAboutOptions = [
    { label: "HackIllinois Newsletter", value: "HackIllinois Newsletter" },
    { label: "Instagram", value: "Instagram" },
    { label: "Facebook", value: "Facebook" },
    { label: "UIUC Flyers", value: "Posters/Flyers on Campus" },
    { label: "Discord", value: "Discord" },
    { label: "Twitter/X", value: "Twitter/X" },
    { label: "TikTok", value: "TikTok" },
    { label: "Slack", value: "Slack" },
    { label: "School Emails", value: "CS Department Email" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "Reddit", value: "Reddit" },
    { label: "Word of Mouth", value: "Word of Mouth" },
    { label: "Other", value: "OTHER" }
] satisfies CheckboxOption[];

export const lookingForwardToOptions = [
    {
        label: "Attending technical workshops",
        value: "Attending technical workshops"
    },
    {
        label: "Submitting a project to win prizes",
        value: "Submitting a project to win prizes"
    },
    {
        label: "Mini Events & Game Tournaments",
        value: "Participating in mini-events"
    },
    {
        label: "Working with mentors",
        value: "Working with mentors to get feedback"
    },
    {
        label: "Company Q & A's & Networking",
        value: "Company Q&As and networking events"
    },
    {
        label: "Meeting new people",
        value: "Meeting new people"
    },
    {
        label: "Other",
        value: "OTHER"
    }
] satisfies CheckboxOption[];

export const allergiesRestrictionsOptions = [
    {
        label: "Lactose Intolerant",
        value: "Lactose Intolerant"
    },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Gluten-free", value: "Gluten-free" },
    {
        label: "No Beef",
        value: "No Beef"
    },
    {
        label: "Kosher",
        value: "Kosher"
    },
    {
        label: "No Pork",
        value: "No Pork"
    },
    {
        label: "Halal",
        value: "Halal"
    },
    { label: "Other", value: "OTHER", isOther: true }
] satisfies CheckboxOption[];
