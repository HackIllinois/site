"use client";
import Checkboxes from "@/components/Form/Checkboxes/Checkboxes";
import TextInput from "@/components/Form/TextInput/TextInput";
import { useLayoutContext } from "@/components/Registration/Registration";
import React from "react";
import {
    allergiesRestrictionsOptions,
    generalConsiderationOptions,
    heardAboutOptions,
    lookingForwardToOptions
} from "./options";
import styles from "./styles.module.scss";

const HackSpecific: React.FC = () => {
    const { isProApplicant } = useLayoutContext();

    return (
        <div className={styles.container}>
            <h1>Hack-Specific</h1>
            <TextInput
                className={styles.largeTextField}
                label="(50 words) What opportunity, event, or feature of HackIllinois 2024 are you most excited to take part in and why?"
                name="hackEssay1"
                multiline
                required
                placeholder="Type your response..."
            />

            <TextInput
                className={styles.largeTextField}
                label="(50 words) Talk about a challenge you faced in the field of CS and how you overcame it. This challenge can be related to a technical personal project, experience in a field, personal experience with diversity/inclusions, etc. We recommend you keep your response to under 50 words, but we will accept responses up to 100 words."
                name="hackEssay2"
                multiline
                required
                placeholder="Type your response..."
            />

            <TextInput
                className={styles.largeTextField}
                label="(Optional, 50 words) If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to do so. Your application will not be negatively impacted if you choose not to answer this question."
                name="optionalEssay"
                multiline
                placeholder="Type your response..."
            />

            {isProApplicant && (
                <>
                    <TextInput
                        className={styles.largeTextField}
                        label="How did you complete the coding challenge?"
                        name="proEssay"
                        multiline
                        required
                        placeholder="Type your response..."
                    />
                    <Checkboxes
                        name="considerForGeneral"
                        label="Would you like to be considered for HackIllinois's General hackathon? This does not impact your Knights application, but will be considered if you are not selected for Knights."
                        options={generalConsiderationOptions}
                        required
                    />
                </>
            )}

            <Checkboxes
                name="hackOutreach"
                label="How did you hear about HackIllinois?"
                options={heardAboutOptions}
                threeColEnabled
                required
            />

            <Checkboxes
                name="hackInterest"
                label="Which of these aspects of the hackathon would you most be interested in engaging in?"
                options={lookingForwardToOptions}
            />

            <Checkboxes
                name="dietaryRestrictions"
                label="What food restrictions or allergies do you have?"
                options={allergiesRestrictionsOptions}
            />
        </div>
    );
};

export default HackSpecific;
