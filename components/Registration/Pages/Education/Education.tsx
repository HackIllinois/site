import FileUpload from "@/components/Form/FileUpload/FileUpload";
import styles from "./Education.module.scss";
import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";
import degrees from "@/modules/degrees.json";
import Dropdown from "@/components/Form/DropdownBox/Dropdown";

const graduationYearOptions: string[] = [];
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push(String(i));
}
graduationYearOptions.push("N/A");

const locationOptions: string[] = states.concat(countries);

const schoolOptions: string[] = schools.concat("N/A");

const degreeOptions: string[] = degrees.concat("N/A");

const majorOptions: string[] = majors.concat("N/A");

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const Education = ({ onChangePage }: PropTypes): JSX.Element => {
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

            <div className={styles.dropdownContainer}>
                <Dropdown
                    name="major"
                    label="Major"
                    options={majorOptions}
                    required
                />

                <Dropdown name="minor" label="Minor" options={majorOptions} />
            </div>

            <FileUpload
                className={styles["resume-upload"]}
                name="resumeFileName"
                label="Resume"
                type="resume"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                text="Upload or drag and drop PDF, DOCX, up to 4MB"
            />
        </div>
    );
};

export default Education;
