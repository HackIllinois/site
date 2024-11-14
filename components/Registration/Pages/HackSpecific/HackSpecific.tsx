import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./HackSpecific.module.scss";
import TextInput from "@/components/Form/TextInput/TextInput";

const heardAboutOptions = [
    { label: "Instagram", value: "Instagram" },
    { label: "Facebook", value: "Facebook" },
    { label: "UIUC Flyers", value: "Posters/Flyers on Campus" },
    { label: "Twitter", value: "Twitter/X" },
    { label: "Slack", value: "Slack" },
    { label: "School Emails", value: "CS Department Email" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "Word of Mouth", value: "Word of Mouth" },
    { label: "Other", value: "OTHER", isOther: true }
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
        label: "Pitching your project",
        value: "PITCHING_YOUR_PROJECT"
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
        value: "OTHER",
        isOther: true,
        otherPlaceholder: "What are you looking forward to..."
    }
] satisfies CheckboxOption[];

const allergiesRestrictionsOptions = [
    {
        label: "Peanut allergy",
        value: "Peanut allergy"
    },
    {
        label: "Dairy intolerance",
        value: "Dairy intolerance"
    },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Vegan", value: "Vegan" },
    { label: "Gluten-free", value: "Gluten-free" },
    {
        label: "Shellfish allergy",
        value: "Shellfish allergy"
    },
    { label: "Other", value: "OTHER", isOther: true }
] satisfies CheckboxOption[];

const travelReimbursementOptions = [
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

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const HackSpecific = ({ onChangePage }: PropTypes): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1>Hack-Specific</h1>
            <TextInput
                className={styles.largeTextField}
                label="In a couple of sentences, please explain why you are interested in participating in HackIllinois 2024."
                name="hackEssay1"
                multiline
                required
                placeholder="Type your response..."
            />

            <Checkboxes
                name="hackOutreach"
                label="How did you hear about HackIllinois?"
                options={heardAboutOptions}
                threeColEnabled
                required
            />

            <Checkboxes
                name="hackInterest"
                label="What are you looking forward to at HackIllinois?"
                options={lookingForwardToOptions}
            />

            <Checkboxes
                name="dietaryRestrictions"
                label="Do you have any allergies or restrictions?"
                options={allergiesRestrictionsOptions}
            />

            <Checkboxes
                name="requestedTravelReimbursement"
                label="Would you like to be considered for travel reimbursement?"
                options={travelReimbursementOptions}
                required
                threeColEnabled
            />
        </div>
    );
};

export default HackSpecific;
