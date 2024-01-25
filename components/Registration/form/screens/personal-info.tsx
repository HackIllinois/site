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
    const transportationOptions = [
        { label: "Yes", value: "YES", isRadio: true, isRadioButton: false }
    ];
    const reimbursement = [
        { label: "Yes", value: "YES", isRadio: true, isRadioButton: false },
        { label: "No", value: "NO", isRadio: true, isRadioButton: false }
    ];
    const raceOptions = [
        {
            label: "American Indian or Alaska Native",
            value: "American Indian or Alaska Native",
        },
        {
            label: "Arab or Middle Eastern",
            value: "Middle Eastern or North African",
        },
        {
            label: "Black or African American",
            value: "Black or African American",
        },
        {
            label: "Native Hawaiian or Pacific Islander",
            value: "Native Hawaiian or Pacific Islander",
        },
        {
            label: "East Asian",
            value: "East Asian",
        },
        { 
            label: "Hispanic or Latino", 
            value: "Hispanic or Latino" 
        },
        { 
            label: "White", 
            value: "White",
        },
        {
            label: "Biracial/Multiracial",
            value: "Biracial/Multiracial",
        },
        {
            label: "South Asian",
            value: "South Asian",
        },
        {
            label: "Prefer Not to Answer",
            value: "Prefer Not to Answer",
        }
    ];
   
    
    return (
    <>
        <div className={clsx(styles.screen, styles.personalInfo)}>
            <div className={styles.piAbsolutes}>
                <Image src={Header} alt="Header" className={styles.demographicsHeader}/>
                <Image src={MobileHeader} alt="Header" className={styles.mobileHeader}/>
                <Image src={Mascot} alt="Mascot" className={styles.mascot}/>
                <Image src={BackgroundMountain} alt="Background Mountain" className={styles.backMountain}/>
            </div>

            <div className={styles.piCaveContainer}>
                <Image src={Cave} alt="Cave" className={styles.cave}/>
                <Image src={MobileCave} alt="MobileCave" className={styles.mobileCave}/>

                <div className={styles.piForm}>
                    <p className={styles.text}>What is your preferred name?</p>
                    <Input
                        className={styles.input}
                        name="preferredName"
                        placeholder="Type your response here"
                    />
                    <p className={styles.text}>What is your legal name?</p>
                    <Input
                        className={styles.input}
                        name="legalName"
                        placeholder="Type your response here"
                    />

                    <p className={styles.text}>Email Address</p>
                    <Input
                        className={styles.input}
                        name="emailAddress"
                        placeholder="Type your response here"
                    />
                    <p className={styles.text}>Gender</p>
                    <Select
                        className={styles.select}
                        name="gender"
                        options={genderOptions}
                        menuPlacement="auto"
                        // creatable
                    />
                    
                    <p className={styles.text}>Race/Ethnicity</p>
                    <Checkboxes
                        className={styles.checkboxes}
                        name="race"
                        options={raceOptions}
                        // isRadio={false}
                    />
                    {/* <Select
                        className={styles.select}
                        name="race"
                        isMulti={true}
                        options={raceOptions}
                    /> */}
                    <br></br>

                    <p className={styles.text}>
                        Are you aware you have to be 18 by the start of our event (February
                        23th, 2024)?
                    </p>
                    <Checkboxes
                        className={styles.checkboxes}
                        name="ageMin"
                        options={ageOptions}
                    />
                    <p className={styles.text}>
                        Are you aware that this event will be in person and that you will be
                        responsible for transportation and lodging?
                    </p>
                    <Checkboxes
                        className={styles.checkboxes}
                        name="transportation"
                        options={transportationOptions}
                    />

                    <p className={styles.text}>
                        Would you like to opt-in for consideration for travel reimbursements? 
                        Marking this does not guarantee reimbursement, but consideration for reimbursement opportunites.
                    </p>
                    
                            
                    <Select
                        className={styles.select}
                        name="requestedTravelReimbursement"
                        options={reimbursement}
                        /> 

                    {/* <Checkboxes
                        className={styles.checkboxes}
                        name="requestedTravelReimbursement"
                        options={reimbursement}
                        // isRadio={false}

                    /> */}
                    
                </div>
            </div>

            
        </div>
    </>
    );
};

export default PersonalInfo;