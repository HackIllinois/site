import Checkboxes, {
    CheckboxOption
} from "@/components/Form/Checkboxes/Checkboxes";
import styles from "./Transportation.module.scss";
import React from "react";

const acknowledgeOptions = [
    {
        label: "",
        value: "YES"
    }
] satisfies CheckboxOption[];

type PropTypes = {
    onChangePage: (newIndex: number) => void;
};

const Transportation: React.FC<PropTypes> = ({ onChangePage }) => {
    return (
        <div className={styles.container}>
            <h1>Code of Conduct</h1>
            <Checkboxes
                name="acknowledge"
                label="I acknowledge that I have read, understood, and agree to abide by the HackIllinois Code of Conduct."
                options={acknowledgeOptions}
                required
            />
        </div>
    );
};

export default Transportation;
