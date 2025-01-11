"use client";
import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./styles.module.scss";
import TextInput from "@/components/Form/TextInput/TextInput";
import React from "react";
import { useLayoutContext } from "@/components/Registration/Registration";

const generalConsiderationOptions = [
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

const heardAboutOptions = [
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

const lookingForwardToOptions = [
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

const allergiesRestrictionsOptions = [
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

const HackSpecific: React.FC = () => {
    const { isPro } = useLayoutContext();

    return (
        <div className={styles.container}>
            <h1>Hack-Specific</h1>
            <TextInput
                className={styles.largeTextField}
                label="(50 words) What opportunity, event, or feature of HackIllinois 2024 are you most excited to take part in and why?"
                name="hackEssay1"
                multiline
                required
                placeholder="Type your response..."
            />

            <TextInput
                className={styles.largeTextField}
                label="(50 words) Talk about a challenge you faced in the field of CS and how you overcame it. This challenge can be related to a technical personal project, experience in a field, personal experience with diversity/inclusions, etc. We recommend you keep your response to under 50 words, but we will accept responses up to 100 words."
                name="hackEssay2"
                multiline
                required
                placeholder="Type your response..."
            />

            <TextInput
                className={styles.largeTextField}
                label="(Optional, 50 words) If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to do so. Your application will not be negatively impacted if you choose not to answer this question."
                name="optionalEssay"
                multiline
                placeholder="Type your response..."
            />

            {isPro && (
                <>
                    <TextInput
                        className={styles.largeTextField}
                        label="How did you complete the coding challenge?"
                        name="proEssay"
                        multiline
                        required
                        placeholder="Type your response..."
                    />
                    <Checkboxes
                        name="considerForGeneral"
                        label="Would you like to be considered for HackIllinois's General hackathon? This does not impact your Knights application, but will be considered if you are not selected for Knights."
                        options={generalConsiderationOptions}
                        required
                    />
                </>
            )}

            <Checkboxes
                name="hackOutreach"
                label="How did you hear about HackIllinois?"
                options={heardAboutOptions}
                threeColEnabled
                required
            />

            <Checkboxes
                name="hackInterest"
                label="Which of these aspects of the hackathon would you most be interested in engaging in?"
                options={lookingForwardToOptions}
            />

            <Checkboxes
                name="dietaryRestrictions"
                label="What food restrictions or allergies do you have?"
                options={allergiesRestrictionsOptions}
            />
        </div>
    );
};

export default HackSpecific;
