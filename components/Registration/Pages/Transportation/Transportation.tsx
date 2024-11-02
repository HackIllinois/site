import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./Transportation.module.scss";

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

const Transportation: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Transportation</h1>
            <div className={styles.question}>
                <h3>
                    Are you aware that you are responsible for your own
                    transportation to the site?*
                </h3>
                <Checkboxes
                    name="travelAcknowledge"
                    options={travelAcknowledgeOptions}
                    required
                />
            </div>
            <div className={styles.question}>
                <h3>How will you be getting to HackIllinois?*</h3>
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
