import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./HackSpecific.module.scss";
import TextInput from "@/components/Form/TextInput/TextInput";

const heardAboutOptions = [
    { label: "Instagram", value: "INSTAGRAM" },
    { label: "Facebook", value: "FACEBOOK" },
    { label: "UIUC Flyers", value: "UIUC_FLYERS" },
    { label: "Twitter", value: "TWITTER" },
    { label: "Slack", value: "SLACK" },
    { label: "School Emails", value: "SCHOOL_EMAILS" },
    { label: "LinkedIn", value: "LINKEDIN" },
    { label: "Word of Mouth", value: "WORD_OF_MOUTH" },
    { label: "Other", value: "OTHER", isOther: true }
] satisfies CheckboxOption[];

const lookingForwardToOptions = [
    {
        label: "Attending workshops",
        value: "ATTENDING_WORKSHOPS"
    },
    {
        label: "Submitting a project to win prizes",
        value: "SUBMIT_PROJECT_TO_WIN_PRIZES"
    },
    {
        label: "Mini Events & Game Tournaments",
        value: "MINI_EVENTS_GAME_TOURNAMENTS"
    },
    {
        label: "Working with mentors",
        value: "WORKING_WITH_MENTORS"
    },
    {
        label: "Pitching your project",
        value: "PITCHING_YOUR_PROJECT"
    },
    {
        label: "Company Q & A's & Networking",
        value: "COMPANY_QA_NETWORKING"
    },
    {
        label: "Meeting new people",
        value: "MEETING_NEW_PEOPLE"
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
        value: "PEANUT_ALLERGY"
    },
    {
        label: "Dairy intolerance",
        value: "DAIRY_INTOLERANCE"
    },
    { label: "Vegetarian", value: "VEGETARIAN" },
    { label: "Vegan", value: "VEGAN" },
    { label: "Gluten-free", value: "GLUTEN_FREE" },
    {
        label: "Shellfish allergy",
        value: "SHELLFISH_ALLERGY"
    },
    { label: "Other", value: "Other", isOther: true }
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
                name="interestExplanation"
                multiline
                required
                placeholder="Type your response..."
            />

            <Checkboxes
                name="heardAbout"
                label="How did you hear about HackIllinois?"
                options={heardAboutOptions}
                threeColEnabled
                required
            />

            <Checkboxes
                name="lookingForwardTo"
                label="What are you looking forward to at HackIllinois?"
                options={lookingForwardToOptions}
            />

            <Checkboxes
                name="allergiesRestrictions"
                label="Do you have any allergies or restrictions?"
                options={allergiesRestrictionsOptions}
            />

            <Checkboxes
                name="travelReimbursement"
                label="Would you like to be considered for travel reimbursement?"
                options={travelReimbursementOptions}
                required
                threeColEnabled
            />
        </div>
    );
};

export default HackSpecific;
