import FileUpload from "@/components/Form/FileUpload/FileUpload";
import styles from "./Education.module.scss";
import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import Dropdown from "@/components/DropdownBox/Dropdown";

const graduationYearOptions: string[] = [];
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push(String(i));
}
graduationYearOptions.push("N/A");

const schoolOptions: string[] = schools.concat("N/A");

const majorOptions: string[] = majors.concat("N/A");

const Education: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Education</h1>
            <div className={styles.dropdownContainer}>
                <div className={styles.question}>
                    <h3>School*</h3>
                    <Dropdown
                        name="school"
                        options={schoolOptions}
                        width="100%"
                        required
                    />
                </div>
                <div className={styles.question}>
                    <h3>Graduation Year*</h3>
                    <Dropdown
                        name="grad year"
                        options={graduationYearOptions}
                        width="100%"
                        required
                    />
                </div>
            </div>
            <div className={styles.dropdownContainer}>
                <div className={styles.question}>
                    <h3>Major*</h3>
                    <Dropdown
                        name="major"
                        options={majorOptions}
                        width="100%"
                        required
                    />
                </div>
                <div className={styles.question}>
                    <h3>Minor</h3>
                    <Dropdown
                        name="minor"
                        options={majorOptions}
                        width="100%"
                    />
                </div>
            </div>

            <div className={styles.question}>
                <h3>Resume*</h3>
                <FileUpload
                    className={styles["resume-upload"]}
                    name="resumeFileName"
                    type="resume"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    text="Upload or drag and drop PDF, DOCX, up to 4MB"
                    required
                />
            </div>
        </div>
    );
};

export default Education;
