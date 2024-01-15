import React from "react";
import clsx from "clsx";

import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import styles from "./styles.module.scss";

// const internshipOptions = [
//   { value: 'YES', label: 'Yes' },
//   { value: 'NO', label: 'No' },
// ];

const Experience = (): JSX.Element => (
    <div className={clsx(styles.screen, styles.experience)}>
        <h1 className={styles.title}>Prior Experience</h1>
        <p className={styles.text}>
            In a couple of sentences, explain why you are interested in
            participating in HackIllinois 2023 and what do you hope to get out
            of it?
        </p>
        <Input
            className={styles.input}
            multiline={true}
            name="whyHack"
            placeholder="Type your response here"
        />
    </div>
);

export default Experience;
