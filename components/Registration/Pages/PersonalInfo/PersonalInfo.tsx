import styles from "./PersonalInfo.module.scss";
import TextInput from "@/components/Form/TextInput/TextInput";
import Dropdown from "@/components/Form/DropdownBox/Dropdown";
import React from "react";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";

const gender = [
    "Male",
    "Female",
    "Non-Binary",
    "Other",
    "Prefer Not To Answer"
];
const race = [
    "American Indian or Alaska Native",
    "Arab or Middle Eastern",
    "Black or African American",
    "East Asian",
    "Hispanic or Latino",
    "Native Hawaiian or Pacific Islander",
    "South East Asian",
    "South Asian",
    "White",
    "Other",
    "Prefer Not To Answer"
];

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const PersonalInfo: React.FC<PropTypes> = ({ onChangePage }) => {
    return (
        <div className={styles.container}>
            <h1>Personal Info</h1>

            <TextInput
                name="legalName"
                label="Full Legal Name"
                required
                placeholder="Type here..."
            />

            <TextInput
                name="preferredName"
                label="Preferred Name"
                required
                placeholder="Type here..."
            />

            <TextInput
                name="emailAddress"
                label="Email Address"
                type="email"
                required
                placeholder="Type here..."
            />

            <div className={styles.field}>
                <Dropdown
                    name="gender"
                    label="Gender"
                    options={gender}
                    required
                />
            </div>

            <Checkboxes
                name="race"
                label="Race/Ethnicity"
                options={race.map(option => ({ value: option, label: option }))}
                required
            />
        </div>
    );
};

export default PersonalInfo;
