import FileUpload from "@/components/Form/FileUpload/FileUpload";
import styles from "./Education.module.scss";
import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import DropDownBox from "@/components/DropdownBox/MainDropdown";
import QuestionHeader from "@/components/QuestionHeader/QuestionHeader";

const graduationYearOptions: string[] = [];
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push(String(i));
}
graduationYearOptions.push("N/A");

const schoolOptions: string[] = schools.concat("N/A");

const majorOptions: string[] = majors.concat("N/A");

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const Education = ({ onChangePage }: PropTypes): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1>Education</h1>
            <div className={styles.dropdownContainer}>
                <div className={styles.question}>
                    <QuestionHeader text="School" required />
                    <DropDownBox
                        name="school"
                        options={schoolOptions}
                        width="100%"
                    />
                </div>
                <div className={styles.question}>
                    <QuestionHeader text="Graduation Year" required />
                    <DropDownBox
                        name="grad year"
                        options={graduationYearOptions}
                        width="100%"
                    />
                </div>
            </div>
            <div className={styles.dropdownContainer}>
                <div className={styles.question}>
                    <QuestionHeader text="Major" required />
                    <DropDownBox
                        name="majojr"
                        options={majorOptions}
                        width="100%"
                    />
                </div>
                <div className={styles.question}>
                    <QuestionHeader text="Minor" />
                    <DropDownBox
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