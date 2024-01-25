/* eslint-disable react/no-unescaped-entities */
// TODO - Implement Page
import styles from "./styles.module.scss";
import Castle from "@/public/registration/review/castle.svg";
import Dragon from "@/public/registration/review/dragon.svg";

import Header from "@/public/registration/review/review header.svg";
import MobileHeader from "@/public/registration/review/mobile review header.svg";

import Mountain from "@/public/registration/review/review mountain.svg";
import MobileMountain from "@/public/registration/review/mobile mountains.svg";

import Sky from "@/public/registration/review/sky.svg";
import MobileSky from "@/public/registration/review/mobile sky.svg";
import { RegistrationType } from "@/utils/types";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { FormProps } from "@/utils/types";
import { get } from "http";
import { Vidaloka } from "next/font/google";

const Review = ({ formIndex, setFormIndex, isKnight, getValues }: any) => {
    const returnToPage = (page: number) => {
        setFormIndex(page);
        window.scrollTo(0, 0);
    };
    const isMobile = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 600;
        }
    };
    const [mobile, setMobile] = useState(isMobile());
    const [mountain, setMountain] = useState(
        mobile ? MobileMountain : Mountain
    );
    const [sky, setSky] = useState(mobile ? MobileSky : Sky);
    const [header, setHeader] = useState(mobile ? MobileHeader : Header);
    const [vals, setVals] = useState<any>({});

    useEffect(() => {
        setVals(getValues());
    }, [getValues]);

    useEffect(() => {

        if (typeof window !== 'undefined' && navigator.userAgent.indexOf('iPhone') > -1) {
            const viewport = document.querySelector("[name=viewport]");
            if (viewport) {
                viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
            }
        }

        const handleResize = () => {
            const newMobile = isMobile();
            setMobile(newMobile);
            setMountain(newMobile ? MobileMountain : Mountain);
            setSky(newMobile ? MobileSky : Sky);
            setHeader(newMobile ? MobileHeader : Header);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobile]);
    return (
        <>
            <div className={clsx(styles.screen, styles.review)}>
                <Image src={Dragon} alt="Review" className={styles.dragon} />
                <Image src={Castle} alt="Review" className={styles.castle} />

                <Image src={header} alt="Review" className={styles.header} />
                <Image src={sky} alt="Review" className={styles.sky} />
                <Image
                    src={mountain}
                    alt="Review"
                    className={styles.mountain}
                />

                <div className={styles.reviewForm}>
                    <h1
                        className={styles.title2}
                        onClick={() => returnToPage(1)}
                    >
                        Personal Information
                    </h1>
                    <div>
                        <p className={styles.text}>
                            What is your preferred name?
                        </p>
                        <p>{vals.preferredName}</p>
                        <p className={styles.text}>What is your legal name?</p>
                        <p>{vals.legalName}</p>

                        <p className={styles.text}>Email Address</p>
                        <p>{vals.emailAddress}</p>
                        <p className={styles.text}>Gender</p>
                        <p>{vals.gender}</p>

                        <p className={styles.text}>Race/Ethnicity</p>
                        <p>{vals.race?.join(", ")}</p>

                        <p className={styles.text}>
                            Are you aware you have to be 18 by the start of our
                            event (February 24th, 2023)?
                        </p>
                        <p>{vals.ageMin}</p>
                        <p className={styles.text}>
                            Are you aware that this event will be in person and
                            that you will be responsible for transportation?
                        </p>
                        <p>{vals.transportation}</p>

                        <p className={styles.text}>
                        Would you like to opt-in for consideration for travel reimbursements? <i>Reimbursements are contingent on you attending HackIllinois and submitting a project. </i>Marking this does not guarantee reimbursement, but consideration for reimbursement opportunites.
                        </p>
                        <p>{vals.requestedTravelReimbursement}</p>
                    </div>
                    <br /> <br />
                    <h1
                        className={styles.title2}
                        onClick={() => returnToPage(2)}
                    >
                        Education
                    </h1>
                    <div className={styles.eduForm}>
                        <p className={styles.text}>
                            What state/country are you currently residing in?
                        </p>
                        <p>{vals.location}</p>

                        <p className={styles.text}>
                            What degree are you currently pursuing?
                        </p>
                        <p>{vals.degree}</p>
                        <p className={styles.text}>What is your major?</p>
                        <p>{vals.major}</p>
                        <p className={styles.text}>
                            What is your minor? (Enter N/A if not applicable)
                        </p>
                        {vals.minor}
                        <p className={styles.text}>
                            What university do you attend?
                        </p>
                        {vals.university}
                        <p className={styles.text}>
                            What is your graduation year?
                        </p>
                        {vals.gradYear}
                        <p className={styles.textOp2}>
                            Please submit a copy of your resume, it will be
                            shared with our sponsors
                        </p>
                        {vals.resumeFileName}
                    </div>
                    <br /> <br />
                    <h1
                        className={styles.title2}
                        onClick={() => returnToPage(3)}
                    >
                        Hack-Specific
                    </h1>
                    <div className={styles.hsForm}>

                        <p className={styles.text}>
                            (50 words max) What opportunity, event, or feature
                            of HackIllinois 2024 are you most excited to take
                            part in and why?
                        </p>
                        <p>{vals.hackEssay1}</p>

                        <p className={styles.text}>
                            (50 words max) Talk about a challenge you faced in
                            the field of CS and how you overcame it. This
                            challenge can be related to a technical personal
                            project, experience in a field, personal experience
                            with diversity/inclusions, etc.
                        </p>
                        <p>{vals.hackEssay2}</p>

                        {isKnight && (
                            <>
                                <p className={styles.title}>
                                    Knights Questions
                                </p>

                                <p className={styles.text}>
                                    (100 words max) How did you complete the
                                    coding challenge?
                                </p>
                                <p>{vals.proEssay}</p>

                                <p className={styles.text}>
                                    Would you like to be considered for
                                    HackIllinois's General hackathon? This does
                                    not impact your Knights application, but
                                    will be considered if you are not selected
                                    for Knights.
                                </p>
                                <p>{vals.considerForGeneral}</p>
                            </>
                        )}

                        <p className={styles.text2}>
                            (Optional, 50 words max) If you feel as though an
                            essential aspect of your experience/background has
                            not been included in your application, please use
                            this space to do so. Your application will not be
                            negatively impacted if you choose not to answer this
                            question
                        </p>
                        <p>{vals.optionalEssay}</p>

                        <p className={styles.text}>
                            Which of these aspects of the hackathon would you
                            most be interested in engaging in?
                        </p>
                        <p>{vals.hackInterest?.join(", ")}</p>

                        <p className={styles.text}>
                            How did you hear about HackIllinois?
                        </p>
                        <p>{vals.hackOutreach?.join(", ")}</p>

                        <p className={styles.text}>
                            What food restrictions or allergies do you have?
                        </p>
                        <p>{vals.dietaryRestrictions?.join(", ")}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
