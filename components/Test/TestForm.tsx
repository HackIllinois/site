"use client";
import { FormProvider, useForm } from "react-hook-form";
import Checkboxes from "../Form/Checkboxes/Checkboxes";
import styles from "./TestForm.module.scss";

const TestForm: React.FC = () => {
    // This is a testing form developed to test the Checkboxes component.
    // It is not a part of the actual application.

    const methods = useForm();

    const onSubmit = (data: { [key: string]: unknown }) => {
        console.log("Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.form}>
                    <p className={styles.text}>
                        How did you hear about HackIllinois?
                    </p>
                    <Checkboxes
                        name="HeardAbout"
                        options={[
                            { label: "Instagram", value: "Instagram" },
                            { label: "Facebook", value: "Facebook" },
                            { label: "UIUC Flyers", value: "UIUC Flyers" },
                            { label: "Twitter", value: "Twitter" },
                            { label: "Slack", value: "Slack" },
                            { label: "School Emails", value: "School Emails" },
                            { label: "LinkedIn", value: "LinkedIn" },
                            { label: "Word of Mouth", value: "Word of Mouth" },
                            { label: "Other", value: "Other", isOther: true }
                        ]}
                        threeColEnabled
                        required
                    />

                    <p className={styles.text}>
                        What are you looking forward to at HackIllinois?*
                    </p>
                    <Checkboxes
                        name="LookingForwardTo"
                        options={[
                            {
                                label: "Attending workshops",
                                value: "Attending workshops"
                            },
                            {
                                label: "Submitting a project to win prizes",
                                value: "Submitting a project to win prizes"
                            },
                            {
                                label: "Mini Events & Game Tournaments",
                                value: "Mini Events & Game Tournaments"
                            },
                            {
                                label: "Working with mentors",
                                value: "Working with mentors"
                            },
                            {
                                label: "Pitching your project",
                                value: "Pitching your project"
                            },
                            {
                                label: "Company Q & A's & Networking",
                                value: "Company Q & A's & Networking"
                            },
                            {
                                label: "Meeting new people",
                                value: "Meeting new people"
                            },
                            {
                                label: "Other",
                                value: "Other",
                                isOther: true,
                                otherPlaceholder:
                                    "What are you looking forward to..."
                            }
                        ]}
                    />

                    <p className={styles.text}>
                        Do you have any allergies or restrictions?*
                    </p>
                    <Checkboxes
                        name="AllergiesRestrictions"
                        options={[
                            {
                                label: "Peanut allergy",
                                value: "Peanut allergy"
                            },
                            {
                                label: "Dairy intolerance",
                                value: "Dairy intolerance"
                            },
                            { label: "Vegetarian", value: "Vegetarian" },
                            { label: "Vegan", value: "Vegan" },
                            { label: "Gluten-free", value: "Gluten-free" },
                            {
                                label: "Shellfish allergy",
                                value: "Shellfish allergy"
                            },
                            { label: "Other", value: "Other", isOther: true }
                        ]}
                        required
                    />

                    <p className={styles.text}>
                        Would you like to be considered for travel
                        reimbursement?*
                    </p>
                    <Checkboxes
                        name="TravelReimbursement"
                        options={[
                            {
                                label: "Yes",
                                value: "Yes",
                                isRadio: true
                            },
                            {
                                label: "No",
                                value: "No",
                                isRadio: true
                            }
                        ]}
                        required
                        threeColEnabled
                    />
                    <p className={styles.text}>
                        Are you aware that you are responsible for your own
                        transportation to the site?*
                    </p>
                    <Checkboxes
                        name="TransportationResponsible"
                        options={[
                            {
                                label: "Yes",
                                value: "Yes",
                                isRadio: true
                            },
                            {
                                label: "No",
                                value: "No",
                                isRadio: true
                            }
                        ]}
                        required
                        threeColEnabled
                    />
                    <p className={styles.text}>
                        How will you be getting to HackIllinois?*
                    </p>
                    <Checkboxes
                        name="HowGetToHackIllinois"
                        options={[
                            {
                                label: "Self Travel",
                                value: "Self Travel",
                                isRadio: true
                            },
                            {
                                label: "Bus Charter",
                                value: "Bus Charter",
                                isRadio: true
                            }
                        ]}
                        threeColEnabled
                        required
                    />

                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default TestForm;
