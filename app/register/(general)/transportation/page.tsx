import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./styles.module.scss";
import React from "react";

const travelAcknowledgeOptions = [
    {
        label: "I acknowledge",
        value: "YES",
        isRadio: true
    }
] satisfies CheckboxOption[];

const travelReimbursementOptions = [
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

const Transportation: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Transportation</h1>

            <Checkboxes
                name="requestedTravelReimbursement"
                label="Would you like to be considered for travel reimbursement?"
                options={travelReimbursementOptions}
                required
                threeColEnabled
            />
            <Checkboxes
                name="travelAcknowledge"
                label="Are you aware that you are responsible for your own
                    transportation to the site?"
                options={travelAcknowledgeOptions}
                required
            />
        </div>
    );
};

export default Transportation;
