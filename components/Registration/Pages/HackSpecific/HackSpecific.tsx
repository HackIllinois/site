import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./HackSpecific.module.scss";
import QuestionHeader from "@/components/QuestionHeader/QuestionHeader";
import TextInput from "@/components/Form/TextInput/TextInput";

const HackSpecific: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Hack-Specific</h1>
            <div className={styles.question}>
                <QuestionHeader
                    text="In a couple of sentences, please explain why you are interested in participating in HackIllinois 2024."
                    required
                />
                <TextInput
                    name="InterestExplanation"
                    multiline
                    required
                    placeholder="Type your response..."
                />
            </div>
            <div className={styles.question}>
                <QuestionHeader
                    text="How did you hear about HackIllinois?"
                    required
                />
                <Checkboxes
                    name="HeardAbout"
                    options={[
                        { label: "Instagram", value: "Instagram" },
                        { label: "Facebook", value: "Facebook" },
                        { label: "UIUC Flyers", value: "UIUC Flyers" },
                        { label: "Twitter", value: "Twitter" },
                        { label: "Slack", value: "Slack" },
                        { label: "School Emails", value: "School Emails" },
                        { label: "LinkedIn", value: "LinkedIn" },
                        { label: "Word of Mouth", value: "Word of Mouth" },
                        { label: "Other", value: "Other", isOther: true }
                    ]}
                    threeColEnabled
                    required
                />
            </div>
            <div className={styles.question}>
                <QuestionHeader
                    text="What are you looking forward to at HackIllinois?"
                    required
                />
                <Checkboxes
                    name="LookingForwardTo"
                    options={[
                        {
                            label: "Attending workshops",
                            value: "Attending workshops"
                        },
                        {
                            label: "Submitting a project to win prizes",
                            value: "Submitting a project to win prizes"
                        },
                        {
                            label: "Mini Events & Game Tournaments",
                            value: "Mini Events & Game Tournaments"
                        },
                        {
                            label: "Working with mentors",
                            value: "Working with mentors"
                        },
                        {
                            label: "Pitching your project",
                            value: "Pitching your project"
                        },
                        {
                            label: "Company Q & A's & Networking",
                            value: "Company Q & A's & Networking"
                        },
                        {
                            label: "Meeting new people",
                            value: "Meeting new people"
                        },
                        {
                            label: "Other",
                            value: "Other",
                            isOther: true,
                            otherPlaceholder:
                                "What are you looking forward to..."
                        }
                    ]}
                />
            </div>
            <div className={styles.question}>
                <QuestionHeader
                    text="Do you have any allergies or restrictions?"
                    required
                />
                <Checkboxes
                    name="AllergiesRestrictions"
                    options={[
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
                        { label: "Other", value: "Other", isOther: true }
                    ]}
                    required
                />
            </div>
            <div className={styles.question}>
                <QuestionHeader
                    text="Would you like to be considered for travel reimbursement?"
                    required
                />
                <Checkboxes
                    name="TravelReimbursement"
                    options={[
                        {
                            label: "Yes",
                            value: "Yes",
                            isRadio: true
                        },
                        {
                            label: "No",
                            value: "No",
                            isRadio: true
                        }
                    ]}
                    required
                    threeColEnabled
                />
            </div>
        </div>
    );
};

export default HackSpecific;
