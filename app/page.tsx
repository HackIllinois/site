import React from "react";
import styles from "./page.module.scss";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import TestForm from "@/components/Test/TestForm";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <TestForm />
        </main>
    );
};

export default Home;
