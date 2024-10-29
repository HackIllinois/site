import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./Transportation.module.scss";
import { FormPageProps } from "../../Form";
import clsx from "clsx";

const travelAcknowledgeOptions = [
    {
        label: "Yes",
        value: "YES",
        isRadio: true
    },
    {
        label: "No",
        value: "NO",
        isRadio: true
    }
] satisfies CheckboxOption[];

const travelMethodOptions = [
    {
        label: "Self Travel",
        value: "SELF_TRAVEL",
        isRadio: true
    },
    {
        label: "Bus Charter",
        value: "BUS_CHARTER",
        isRadio: true
    }
] satisfies CheckboxOption[];

const Transportation: React.FC<FormPageProps> = ({
    containerClass,
    headerClass,
    questionClass,
    questionTextClass,
    requiredClass
}) => {
    return (
        <div className={clsx(containerClass, styles.container)}>
            <h1 className={clsx(headerClass, styles.header)}>Transportation</h1>
            <div className={clsx(questionClass, styles.question)}>
                <h3 className={clsx(questionTextClass, styles.questionText)}>
                    Are you aware that you are responsible for your own
                    transportation to the site?
                    <span className={requiredClass}>*</span>
                </h3>
                <Checkboxes
                    name="travelAcknowledge"
                    options={travelAcknowledgeOptions}
                    required
                />
            </div>
            <div className={clsx(questionClass, styles.question)}>
                <h3 className={clsx(questionTextClass, styles.questionText)}>
                    How will you be getting to HackIllinois?
                    <span className={requiredClass}>*</span>
                </h3>
                <Checkboxes
                    name="travelMethod"
                    options={travelMethodOptions}
                    required
                />
            </div>
        </div>
    );
};

export default Transportation;
