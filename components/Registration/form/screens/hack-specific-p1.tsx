/* eslint-disable react/no-unescaped-entities */
// TODO - Implement Page
import styles from "./styles.module.scss";
import Image from "next/image";

import Forest from "@/public/registration/hack-specific/mushroom forest.svg";
import MobileForest from "@/public/registration/hack-specific/mobile forest.svg";

import RiverGrass from "@/public/registration/hack-specific/river grass.svg";
import MobileRiverGrass from "@/public/registration/hack-specific/mobile grass.svg";

import Header from "@/public/registration/hack-specific/hack specific header.svg";
import MobileHeader from "@/public/registration/hack-specific/mobile hack specific header.svg";

import Mascot from "@/public/registration/hack-specific/mascot.svg";

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
        label: "Participating in mini-events (e.g. games, socials)",
        value: "Participating in mini-events (e.g. games, socials)"
    },
    { label: "Meeting new people", value: "Meeting new people" },
    {
        label: "Working with mentors to get feedback",
        value: "Working with mentors to get feedback"
    },
    {
        label: "Company Q&As and Networking events",
        value: "Company Q&As and Networking events"
    },

    { label: "Other", value: "Other", isOther: true }
];

const learnOptions = [
    { label: "Instagram", value: "Instagram" },
    { label: "Twitter/X", value: "Twitter/X" },
    { label: "TikTok", value: "TikTok" },
    { label: "Discord", value: "Discord" },
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
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" }
];

const HackSpecific = ({ isKnight }: any) => {
    const isMobile = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 600;
        }
    };
    const [mobile, setMobile] = useState(isMobile());
    const [forest, setForest] = useState(mobile ? Forest : Forest);
    const [header, setHeader] = useState(mobile ? Header : Header);

    useEffect(() => {
        const handleResize = () => {
            const newMobile = isMobile();
            setMobile(newMobile);
            setForest(newMobile ? MobileForest : Forest);
            setHeader(newMobile ? MobileHeader : Header);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobile]);

    return (
        <>
            <div className={clsx(styles.screen, styles.experience)}>
                <div className={styles.hsHeader}>
                    <Image
                        src={header}
                        alt="Hack Specific"
                        className={styles.hackspecificHeader}
                    />
                </div>

                <div className={styles.hsForestContainer}>
                    <Image
                        src={forest}
                        alt="Mushroom Forest"
                        className={styles.forest}
                    />
                    <Image
                        src={RiverGrass}
                        alt="River Grass"
                        className={styles.rivergrass}
                    />
                    <Image
                        src={MobileRiverGrass}
                        alt="River Grass"
                        className={styles.mobilerivergrass}
                    />
                    <Image
                        src={Mascot}
                        alt="Mascot"
                        className={styles.mascot}
                    />
                </div>

                <div className={styles.hsForm}>
                    <p className={styles.title}>General Questions</p>

                    <p className={styles.text}>
                        (50 words max) What opportunity, event, or feature of
                        HackIllinois 2024 are you most excited to take part in
                        and why?
                    </p>
                    <Input
                        className={styles.input}
                        multiline={true}
                        name="hackEssay1"
                        placeholder="Type your response here"
                    />

                    <p className={styles.text}>
                        (50 words max) Talk about a challenge you faced in the
                        field of CS and how you overcame it. This challenge can
                        be related to a technical personal project, experience
                        in a field, personal experience with
                        diversity/inclusions, etc.
                    </p>
                    <Input
                        className={styles.input}
                        multiline={true}
                        name="hackEssay2"
                        placeholder="Type your response here"
                    />

                    {isKnight && (
                        <>
                            <p className={styles.title}>Knights Questions</p>

                            <p className={styles.text}>
                                (100 words max) How did you complete the coding
                                challenge?
                            </p>
                            <Input
                                className={styles.input}
                                multiline={true}
                                name="proEssay"
                                placeholder="Type your response here"
                            />

                            <p className={styles.text}>
                                Would you like to be considered for
                                HackIllinois's General hackathon? This does not
                                impact your Knights application, but will be
                                considered if you are not selected for Knights.
                            </p>
                            <Select
                                className={styles.select}
                                name="considerForGeneral"
                                options={considerationOptions}
                            />
                        </>
                    )}

                    <p className={styles.text}>
                        (Optional, 50 words max) If you feel as though an
                        essential aspect of your experience/background has not
                        been included in your application, please use this space
                        to do so. Your application will not be negatively
                        impacted if you choose not to answer this question
                    </p>
                    <Input
                        className={styles.input}
                        multiline={true}
                        name="optionalEssay"
                        placeholder="Type your response here"
                    />
                </div>
            </div>
        </>
    );
};

export default HackSpecific;
