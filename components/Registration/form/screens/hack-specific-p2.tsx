// TODO - Implement Page
import styles from "./styles.module.scss";
import Image from "next/image";

import Background from "@/public/registration/hack-specific/hackspecific pt 2background.svg";
import Header from "@/public/registration/hack-specific/hackspecific pt 2 header.svg";
import MobileHeader from "@/public/registration/hack-specific/mobile header.svg";
import MobileBackground from "@/public/registration/hack-specific/mobile hackspecific pt 2 background.svg"

import Select from "@/components/form/Select";
import Input from "@/components/form/Input";
import clsx from "clsx";

import { useEffect, useState } from "react";

const interestOptions = [
    {
        label: "Attending technical workshops",
        value: "Attending technical workshops"
    },
    {
        label: "Submitting a project to win prizes",
        value: "Submitting a project to win prizes"
    },
    {
        label: "Mini-events (e.g. games, socials)",
        value: "Participating in mini-events (e.g. games, socials)"
    },
    { label: "Meeting new people", value: "Meeting new people" },
    {
        label: "Working with mentors to get feedback",
        value: "Working with mentors to get feedback"
    },
    {
        label: "Company Q&As & Networking events",
        value: "Company Q&As and Networking events"
    },

    { label: "Other", value: "Other", isOther: true }
];

const learnOptions = [
    { label: "Instagram", value: "Instagram" },
    { label: "Twitter/X", value: "Twitter/X" },
    { label: "TikTok", value: "TikTok"},
    { label: "Discord", value: "Discord"},
    { label: "Facebook", value: "Facebook" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "Slack", value: "Slack" },
    { label: "Reddit", value: "Reddit" },
    { label: "Word of Mouth", value: "Word of Mouth" },
    { label: "CS Department Email", value: "CS Department Email" },
    {
        label: "Posters/Flyers on UIUC Campus",
        value: "Posters/Flyers on UIUC Campus"
    },
    { label: "Other", value: "Other", isOther: true }
];

const foodOptions = [
    { label: "None", value: "None" },
    { label: "Gluten-Free", value: "Gluten-Free" },
    { label: "Vegan", value: "Vegan" },
    { label: "Lactose-Intolerant", value: "Lactose-Intolerant" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "No Pork", value: "No Pork" },
    { label: "No Beef", value: "No Beef" },
    { label: "Halal", value: "Halal" },
    { label: "Kosher", value: "Kosher" },
    { label: "Other", value: "Other", isOther: true }
];

const considerationOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
];

const HackSpecificP2 = () => {

    
    return (
        <>
            <div className={clsx(styles.screen, styles.hackspecificp2)}>
                <div className={styles.hsHeader}>
                    <Image src={Header} alt="HackIllinois Header" className={styles.header} />
                    <Image src={MobileHeader} alt="HackIllinois Header" className={styles.mobileheader} />
                </div>

                <div className={styles.backgroundContainer}>
                    <Image src={Background} alt="background" className={styles.background2} />
                    <Image src={MobileBackground} alt="background" className={styles.mobilebackground2} />
                </div>

                <div className={styles.hsForm2}>
                    <p className={styles.text}>
                        Which of these aspects of the hackathon would you most be interested in engaging in?
                    </p>
                    <Select
                        className={styles.select}
                        name="hackInterest"
                        isMulti={true}
                        options={interestOptions}
                    />

                    <p className={styles.text}>
                        How did you hear about HackIllinois?
                    </p>
                    <Select
                        className={styles.select}
                        name="hackOutreach"
                        isMulti={true}
                        options={learnOptions}
                    />

                    <p className={styles.text}>
                        What food restrictions or allergies do you have?
                    </p>
                    <Select
                        className={styles.select}
                        name="dietaryRestrictions"
                        isMulti={true}
                        options={foodOptions}
                    />

                </div>


                    
            </div>
        </>
    );
};

export default HackSpecificP2;