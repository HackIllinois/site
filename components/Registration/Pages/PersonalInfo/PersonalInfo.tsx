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
                <h3>Name*</h3>
                <TextInput name="name" required placeholder="Type here..." />
            </div>

            <div className={styles.row}>
                <div className={styles.field}>
                    <div className={styles.question}>
                        <h3>Gender*</h3>
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
                        <h3>Age*</h3>
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
                    <h3>Race/Ethnicity*</h3>
                    <DropDownBox
                        name="race/ethnicity"
                        options={race}
                        width="101%"
                        required
                    />
                </div>
            </div>

            <div className={styles.question}>
                <h3>Email Address*</h3>
                <TextInput
                    name="emailaddress"
                    required
                    placeholder="Type here..."
                />
            </div>

            <div className={styles.question}>
                <h3>Phone Number*</h3>
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
