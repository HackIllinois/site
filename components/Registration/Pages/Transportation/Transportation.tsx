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

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const Transportation = ({ onChangePage }: PropTypes): JSX.Element => {
    return (
        <div className={styles.container}>
            <h1>Transportation</h1>
            <Checkboxes
                name="travelAcknowledge"
                label="Are you aware that you are responsible for your own
                    transportation to the site?"
                options={travelAcknowledgeOptions}
                required
            />
            <Checkboxes
                name="travelMethod"
                label="How will you be getting to HackIllinois?"
                options={travelMethodOptions}
                required
            />
        </div>
    );
};

export default Transportation;
