import styles from "./PersonalInfo.module.scss";
import TextInput from "@/components/Form/TextInput/TextInput";
import Dropdown from "@/components/Form/DropdownBox/Dropdown";

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

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const PersonalInfo = ({ onChangePage }: PropTypes): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1>Personal Info</h1>

            <TextInput
                name="legalName"
                label="Legal Name"
                required
                placeholder="Type here..."
            />

            <TextInput
                name="preferredName"
                label="Preferred Name"
                required
                placeholder="Type here..."
            />

            <div className={styles.row}>
                <div className={styles.field}>
                    <Dropdown
                        name="gender"
                        label="Gender"
                        options={gender}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <TextInput
                        name="age"
                        label="Age"
                        placeholder="Type here..."
                        type="number"
                        min="18"
                        required
                    />
                </div>
            </div>

            <div className={styles.field}>
                <Dropdown
                    name="race"
                    label="Race/Ethnicity"
                    options={race}
                    required
                />
            </div>

            <TextInput
                name="emailAddress"
                label="Email Address"
                type="email"
                required
                placeholder="Type here..."
            />

            <TextInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                required
                placeholder="Type here..."
            />
        </div>
    );
};

export default PersonalInfo;
