import Dropdown from "@/components/DropdownBox/Dropdown";
import FileUpload from "@/components/Form/FileUpload/FileUpload";
import styles from "./Education.module.scss";
import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";

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
                <div>
                    <Dropdown
                        name={"school"}
                        label={"School"}
                        options={schoolOptions}
                        required
                        onSubmit={() => {}}
                        width={"100%"}
                    />
                </div>
                <div>
                    <Dropdown
                        name={"Graduation Year"}
                        label={"Graduation Year"}
                        options={graduationYearOptions}
                        required
                        onSubmit={() => {}}
                        width={"100%"}
                    />
                </div>
            </div>
            <div className={styles.dropdownContainer}>
                <Dropdown
                    name={"Major"}
                    label={"Major"}
                    options={majorOptions}
                    required
                    onSubmit={() => {}}
                    width={"100%"}
                />
                <Dropdown
                    name={"Minor"}
                    label={"Minor"}
                    options={majorOptions}
                    onSubmit={() => {}}
                    width={"100%"}
                />
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
