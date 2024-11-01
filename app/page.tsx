import React from "react";
import styles from "./page.module.scss";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import TestForm from "@/components/Test/TestForm";
import MainDropdown from "@/components/DropdownBox/MainDropdown";

const Home: React.FC = () => {
    const options = ["Option 1", "Option 2", "Option 3","Option 3","Option 3","Option 3","Option 3"];
    const name = "school";

    return (
        <main className={styles.main}>
            <MainDropdown options={options} name={name} />
            <TestForm />
        </main>
    );
};

export default Home;
