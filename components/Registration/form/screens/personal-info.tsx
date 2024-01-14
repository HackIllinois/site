// TODO - Implement Page
import styles from "./styles.module.scss";
import Header from "@/public/registration/personalinfo/demographics header.svg";
import BackgroundMountain from "@/public/registration/personalinfo/background mountain.svg";
import Cave from "@/public/registration/personalinfo/cave.svg";
import Mascot from "@/public/registration/personalinfo/Hack Mascot.svg";
import MobileCave from "@/public/registration/personalinfo/mobile cave.svg";
import MobileHeader from "@/public/registration/personalinfo/mobile header.svg";

import Input from "@/components/form/Input";
import Select from "@/components/form/Select";

import Image from "next/image";
import clsx from "clsx";
import Checkboxes from "@/components/form/Checkboxes";
import { useEffect, useState } from "react";
const PersonalInfo = () => {

    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Non-Binary", value: "Non-Binary" },
        { label: "Prefer Not to Answer", value: "Prefer Not to Answer" }
    ];

    const ageOptions = [
        { label: "Yes", value: "YES", isRadio: true, isRadioButton: false }
    ];
    const transportation = [
        { label: "Yes", value: "YES", isRadio: true, isRadioButton: false }
    ];
    const reimbursement = [
        { label: "Yes", value: "YES", isRadio: true, isRadioButton: true },
        { label: "No", value: "NO", isRadio: true, isRadioButton: true }
    ];
    const raceOptions = [
        {
            label: "American Indian or Alaska Native",
            value: "American Indian or Alaska Native",
            isRadio: true
        },
        { label: "Asian", value: "Asian", isRadio: true },
        {
            label: "Black or African American",
            value: "Black or African American",
            isRadio: true
        },
        {
            label: "Native Hawaiian or Other Pacific Islander",
            value: "Native Hawaiian or Other Pacific Islander",
            isRadio: true
        },
        { label: "Hispanic or Latino", value: "Hispanic or Latino", isRadio: true },
        { label: "White", value: "White", isRadio: true },
        {
            label: "Biracial/Multiracial",
            value: "Biracial/Multiracial",
            isRadio: true
        },
        {
            label: "Prefer Not to Answer",
            value: "Prefer Not to Answer",
            isRadio: true
        }
    ];
   
    
    return (
    <>
        <div className={clsx(styles.screen, styles.personalInfo)}>
            <div className={styles.piBackgroundContainer}>
                <Image src={BackgroundMountain} alt="Background Mountain" className={styles.backMountain}/>
                <Image src={Header} alt="Header" className={styles.demographicsHeader}/>
                <Image src={MobileHeader} alt="Header" className={styles.mobileHeader}/>

            </div>

            <div className={styles.caveContainer}>
                <Image src={Mascot} alt="Mascot" className={styles.mascot}/>
                <Image src={Cave} alt="cave" className={styles.cave}/>
                <Image src={MobileCave} alt="cave" className={styles.mobileCave}/>
                

            </div>

            <div className={styles.piform}>
                <p className={styles.text}>What is your preferred name?</p>
                <Input
                    className={styles.input}
                    name="name"
                    placeholder="Type your response here"
                />
                <p className={styles.text}>What is your legal name?</p>
                <Input
                    className={styles.input}
                    name="name"
                    placeholder="Type your response here"
                />

                <p className={styles.text}>Email Address</p>
                <Input
                    className={styles.input}
                    name="email"
                    placeholder="Type your response here"
                />

                <Select
                    className={styles.select}
                    name="gender"
                    options={genderOptions}
                    placeholder="Gender"
                    menuPlacement="auto"
                    // creatable
                />

                <Select
                    className={styles.select}
                    name="race"
                    isMulti={true}
                    placeholder="Race/Ethnicity"
                    options={raceOptions}
                />
                <br></br>

                <p className={styles.text}>
                    Are you aware you have to be 18 by the start of our event (February
                    24th, 2023)?
                </p>
                <Checkboxes
                    className={styles.checkboxes}
                    name="ageMin"
                    options={ageOptions}
                />
                <p className={styles.text}>
                    Are you aware that this event will be in person and that you will be
                    responsible for transportation?
                </p>
                {/* <Checkboxes
                    className={styles.checkboxes}
                    name="transportation"
                    options={transportation}
                /> */}

                <p className={styles.text}>
                    Would you like to opt-in for consideration for travel reimbursements? 
                    Marking this does not guarantee reimbursement, but consideration for reimbursement opportunites.
                </p>
                <Select
                    className={styles.checkboxes}
                    name="reimbursement"
                    options={reimbursement}
                />
                
            </div>
        </div>
    </>
    );
};

export default PersonalInfo;
