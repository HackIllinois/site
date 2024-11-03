import styles from "./PersonalInfo.module.scss";
import QuestionHeader from "@/components/QuestionHeader/QuestionHeader";
import TextInput from "@/components/Form/TextInput/TextInput";
import DropDownBox from "@/components/DropdownBox/MainDropdown";

const gender = ["Male", "Female", "Non-Binary", "Other", "Prefer not to say"];
const race = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Other",
    "Prefer not to say"
];

const PersonalInfo: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Personal Info</h1>

            <div className={styles.question}>
                <QuestionHeader text="Name" required />
                <TextInput name="name" required placeholder="Type here..." />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <div className={styles.question}>
                        <QuestionHeader text="Gender" required />
                        <DropDownBox
                            name="gender"
                            options={gender}
                            width="100%"
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <div className={styles.question}>
                        <QuestionHeader text="Age" required />
                        <TextInput
                            name="age"
                            placeholder="Type here..."
                            required
                        />
                    </div>
                </div>
            </div>

            <div className={styles.field}>
                <div className={styles.question}>
                    <QuestionHeader text="Race/Ethnicity" required />
                    <DropDownBox
                        name="race/ethnicity"
                        options={race}
                        width="101%"
                        required
                    />
                </div>
            </div>

            <div className={styles.question}>
                <QuestionHeader text="Email Address" required />
                <TextInput
                    name="emailaddress"
                    required
                    placeholder="Type here..."
                />
            </div>

            <div className={styles.question}>
                <QuestionHeader text="Phone Number" required />
                <TextInput
                    name="phonenumber"
                    required
                    placeholder="Type here..."
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
