import FileUpload from "@/components/Form/FileUpload/FileUpload";
import styles from "./styles.module.scss";
import Dropdown from "@/components/Form/DropdownBox/Dropdown";
import React from "react";
import {
    degreeOptions,
    graduationYearOptions,
    locationOptions,
    majorOptions,
    schoolOptions
} from "./options";

const Education: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Education</h1>
            <Dropdown
                name="location"
                label="What state/country are you currently residing in?"
                options={locationOptions}
                required
            />

            <Dropdown
                name="university"
                label="What university do you attend"
                options={schoolOptions}
                creatable
                required
            />

            <Dropdown
                name="degree"
                label="What degree are you currently persuing"
                options={degreeOptions}
                required
            />

            <Dropdown
                name="gradYear"
                label="Graduation Year"
                options={graduationYearOptions}
                required
            />

            <Dropdown
                name="major"
                label="Major"
                options={majorOptions}
                creatable
                required
            />

            <Dropdown
                name="minor"
                label="Minor"
                options={majorOptions}
                creatable
            />

            <FileUpload
                className={styles["resume-upload"]}
                name="resumeFileName"
                label="Resume"
                type="resume"
                accept="application/pdf"
                text="Upload or drag and drop PDF up to 2MB"
            />
        </div>
    );
};

export default Education;
