// TODO - Implement Page
import styles from "./styles.module.scss";

import UpperCave from "@/public/registration/education/upper cave.svg";
import MobileUpperCave from "@/public/registration/education/mobile upper cave.svg";

import Header from "@/public/registration/education/demographics header 2.svg"
import MobileHeader from "@/public/registration/education/mobile demographics header.svg"

import Lab from "@/public/registration/education/lab.svg";

import IceCave from "@/public/registration/education/ice cave.svg";
import MobileIceCave from "@/public/registration/education/mobile ice cave.svg";

import Rabbit from "@/public/registration/education/Rabbit 1.svg";

import Image from "next/image";
import { useEffect, useState } from "react";
import Select, { OptionType } from "@/components/form/Select";

import majors from "@/modules/majors.json";
import schools from "@/modules/schools.json";
import states from "@/modules/states.json";
import countries from "@/modules/countries.json";

import clsx from "clsx";
import FileUpload from "@/components/form/FileUpload";

const degreeOptions: OptionType[] = [
    { value: "ASSOCIATES", label: "Associates Degree" },
    { value: "BACHELORS", label: "Bachelor’s Degree" },
    { value: "MASTERS", label: "Master’s Degree" },
    { value: "PHD", label: "PhD" },
    { value: "GRADUATED", label: "Graduated" },
    { value: "OTHER", label: "Other" }
];

const graduationYearOptions: OptionType[] = [];
for (let i = 2030; i >= 1970; i -= 1) {
    graduationYearOptions.push({ value: i, label: String(i) });
}
graduationYearOptions.push({ value: 0, label: "N/A" });

const schoolOptions: OptionType[] = schools
    .concat("N/A")
    .map(school => ({ value: school, label: school }));

const firstMajors = [
    "Computer Science",
    "Computer Engineering",
    "Electrical Engineering"
];
const remainingMajors = majors.filter(major => !firstMajors.includes(major));
const majorOptions: OptionType[] = firstMajors
    .concat(remainingMajors)
    .concat("N/A")
    .map(major => ({ value: major, label: major }));

const locationOptions = states
    .concat(countries)
    .filter(place => place !== "United States") // removing US because we want people in the US to pick a state
    .concat("Other")
    .map(place => ({ value: place, label: place }));


const Education = () => {
    const isMobile = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth <= 768;
        }
    }
    const [mobile, setMobile] = useState(isMobile());
    const [uppercave, setUppercave] = useState(mobile ? MobileUpperCave : UpperCave);
    const [icecave, setIcecave] = useState(mobile ? MobileIceCave : IceCave);
    const [header, setHeader] = useState(mobile ? MobileHeader : Header);

    useEffect(() => {
        const handleResize = () => {
            const newMobile = isMobile();
            setMobile(newMobile);
            setUppercave(newMobile ? MobileUpperCave : UpperCave);
            setIcecave(newMobile ? MobileIceCave : IceCave);
            setHeader(newMobile ? MobileHeader : Header);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobile]) 
    return (
    <>
        <div className={clsx(styles.screen, styles.education)}> 
            <div className={styles.labcave}>
                <Image src={header} alt="Header" className={styles.demographicsHeader2} />
                <Image src={Lab} alt="Lab" className={styles.lab} />
                <Image src={Rabbit} alt="Rabbit" className={styles.rabbit} />

                <Image src={uppercave} alt="Upper Cave" className={styles.uppercave} />
                <Image src={icecave} alt="Ice Cave" className={styles.icecave}/>


            </div>

            <div className={styles.educationform}>
                <Select
                    className={styles.select}
                    name="location"
                    options={locationOptions}
                    placeholder="What state/country are you currently residing in?"
                    menuPlacement="bottom"
                />
                <Select
                    className={styles.select}
                    name="degreePursued"
                    options={degreeOptions}
                    placeholder="What degree are you currently pursuing?"
                    menuPlacement="auto"
                />
                <Select
                    className={styles.select}
                    name="major"
                    options={majorOptions}
                    placeholder="What is your major?"
                    menuPlacement="auto"
                    creatable
                />

                <Select
                    className={styles.select}
                    name="minor"
                    options={majorOptions}
                    placeholder="What is your minor? (Enter N/A if not applicable)"
                    menuPlacement="auto"
                    creatable
                />
                <Select
                    name="school"
                    options={schoolOptions}
                    placeholder="What university do you attend?"
                    menuPlacement="top"
                    creatable
                />

                <Select
                    name="graduationYear"
                    options={graduationYearOptions}
                    placeholder="What is your graduation year?"
                />
                <br />
                <br />
                <p className={styles.textOp}>
                    Please submit a copy of your resume, it will be shared with our
                    sponsors
                </p>
                <FileUpload
                    className={styles["resume-upload"]}
                    name="resumeFilename"
                    type="resume"
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    text="File types accepted: PDF and DOCX "
                />
            </div>


        </div>
    </>
    );
};

export default Education;
