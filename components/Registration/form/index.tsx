import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FormProvider
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegistrationType } from "@/utils/types";
import { getRegistration, getRoles, refreshToken, register } from "@/utils/api";
import Button from "@/components/form/Button";
import {
    registrationSchema,
    RegistrationSchema,
    errorMap,
    defaultValues
} from "../validation";

// Old Pages left for Reference
import Welcome from "./screens/welcome";
import PersonalInfoP1 from "./screens/personal-info-p1";
import PersonalInfoP2 from "./screens/personal-info-p2";
import PersonalInfoP3 from "./screens/personal-info-p3";
import Educations from "./screens/education-p1";
import EducationP2 from "./screens/education-p2";
import Experience from "./screens/experience-p1";
import ExperienceP2 from "./screens/experience-p2";
import Event from "./screens/event-p1";
import EventP2 from "./screens/event-p2";
import EventP3 from "./screens/event-p3";
import Finish from "./screens/finish";

// New Pages for you to build
import PersonalInfo from "./screens/personal-info";
import Education from "./screens/education";
import HackSpecific from "./screens/hack-specific";
import Review from "./screens/review";
import Complete from "./screens/complete";

import styles from "./styles.module.scss";

// Probably unneeded given the new designs
import FormNavigation from "./form-navigation";

type FormProps = {
    formIndex: number;
    setFormIndex: React.Dispatch<React.SetStateAction<number>>;
};

//New Page Strcture
// const fields: (keyof RegistrationSchema)[][] = [
//   ['name', 'gender', 'race', 'age', 'email', 'phone'],
//   ['location', 'school', 'major', 'minor', 'graduationYear', 'resumeFilename'],
//   ['whyHack', 'programmingYears', 'programmingAbility', 'outreachSurvey', 'interests', 'dietary', 'travelReimbursement'],
//   []
// ];

// Old Pages!
const fields: (keyof RegistrationSchema)[][] = [
    [],
    ["name", "gender", "email"],
    ["race"],
    ["ageMin", "selfTransport", "purdueTransport"],
    ["location", "degreePursued", "school", "major"],
    ["graduationYear", "resumeFilename"],
    ["whyHack"],
    ["programmingYears", "programmingAbility"],
    ["interests"],
    ["outreachSurvey"],
    ["dietary"]
];

// Old Page counts
// const pages = [
//     Welcome,
//     PersonalInfoP1,
//     PersonalInfoP2,
//     PersonalInfoP3,
//     Educations,
//     EducationP2,
//     Experience,
//     ExperienceP2,
//     Event,
//     EventP2,
//     EventP3,
//     Finish
// ];
// const submitPageIndex = 10;
// const postSubmitPageIndex = submitPageIndex + 1;

// New Variables for above settings
const pages = [PersonalInfo, Education, HackSpecific, Review, Complete];
const submitPageIndex = 3;
const postSubmitPageIndex = submitPageIndex + 1;

// Old API Methods
const convertToAPI = (data: RegistrationSchema): RegistrationType => {
    const {
        name,
        gender: possibleGender,
        race: possibleRace,
        programmingYears: yearsArray,
        programmingAbility: abiltyArray,
        ageMin: overEighteen,
        ...registration
    } = data;
    const [firstName, ...remainingWords] = name.split(" ");
    const lastName = remainingWords.join(" ") || " ";

    // For gender and race, we default to 'Prefer Not to Answer' if user doesn't select anything so that
    // when they come back to edit registration, they'll see the prefer not to answer option selected
    const gender = possibleGender || "Prefer Not to Answer";
    const race =
        possibleRace.length === 0 ? ["Prefer Not to Answer"] : possibleRace;
    const programmingYears = yearsArray.at(0) || 0;
    const programmingAbility = abiltyArray.at(0) || 0;
    if (overEighteen[0] != "YES") {
        alert(
            "Please ensure that you are aware that you have to be 18 by the start of our event"
        );
    }

    // console.log(registration, firstName, lastName, gender, race, programmingYears, programmingAbility )
    return {
        ...registration,
        firstName,
        lastName,
        gender,
        race,
        programmingYears,
        programmingAbility
    };
};

const convertFromAPI = (registration: RegistrationType): RegistrationSchema => {
    const {
        firstName,
        lastName,
        programmingYears: year,
        programmingAbility: ability,
        ...remaining
    } = registration;
    const name = firstName ? `${firstName} ${lastName}`.trim() : "";
    const programmingYears = [year];
    const programmingAbility = [ability];
    const ageMin = ["YES"];

    return { ...remaining, name, programmingYears, programmingAbility, ageMin };
};

// New API methods
// const convertToAPI = (data: RegistrationSchema): RegistrationType => {
//   const { name, gender: possibleGender, race: possibleRace, programmingYears: yearsArray, programmingAbility: abiltyArray, age, ...registration } = data;
//   const [firstName, ...remainingWords] = name.split(' ');
//   const lastName = remainingWords.join(' ') || ' ';

//   // For gender and race, we default to 'Prefer Not to Answer' if user doesn't select anything so that
//   // when they come back to edit registration, they'll see the prefer not to answer option selected
//   const gender = possibleGender || 'Prefer Not to Answer';
//   const race = possibleRace.length === 0 ? ['Prefer Not to Answer'] : possibleRace;
//   const programmingYears = (yearsArray.at(0) || 0);
//   const programmingAbility = (abiltyArray.at(0) || 0);
//   if (age < 18) {
//     alert("Please ensure that you are aware that you have to be 18 by the start of our event")
//   }

//   // console.log(registration, firstName, lastName, gender, race, programmingYears, programmingAbility )
//   return { ...registration, firstName, lastName, gender, race, programmingYears, programmingAbility, age };
// };

// const convertFromAPI = (registration: RegistrationType): RegistrationSchema => {
//   const { firstName, lastName, programmingYears: year, programmingAbility: ability, ...remaining } = registration;
//   const name = firstName ? (`${firstName} ${lastName}`).trim() : '';
//   const programmingYears = [year];
//   const programmingAbility = [ability];

//   return { ...remaining, name, programmingYears, programmingAbility};
// };

const Form = ({ formIndex, setFormIndex }: FormProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const methods = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema, { errorMap }),
        defaultValues
    });
    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = methods;

    useEffect(() => {
        getRoles()
            .then(roles => {
                if (roles.includes("Applicant")) {
                    setIsEditing(true);
                    // console.log(isEditing);
                    return getRegistration("attendee");
                }
                return null;
            })
            .then(registrationWithId => {
                if (registrationWithId) {
                    const { id, ...registration } = registrationWithId;
                    methods.reset(convertFromAPI(registration));
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []); // deliberately not including `methods`

    const onSubmit: SubmitHandler<RegistrationSchema> = data => {
        // console.log("data");
        // console.log(isEditing);

        setIsLoading(true);
        return register(isEditing, "attendee", convertToAPI(data))
            .then(() => {
                setFormIndex(postSubmitPageIndex);
                refreshToken(); // token changes after registration, so need to refetch
            })
            .catch(() => {
                alert(
                    "There was an error while submitting. If this error persists, please email contact@hackillinois.org"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onError: SubmitErrorHandler<RegistrationSchema> = errorData => {
        // console.log(errorData);
        clearErrors();
        let inputName: keyof typeof errorData;
        for (inputName in errorData) {
            setError(inputName, {
                type: "required",
                message: errorData[inputName]?.message
            });
        }

        for (let i = 0; i < fields.length; i += 1) {
            if (fields[i].some(field => errorData[field])) {
                setFormIndex(i);
                break;
            }
        }
    };

    const nextPage = () => setFormIndex(current => current + 1);
    const previousPage = () => setFormIndex(current => current - 1);

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className={styles.form}
                >
                    {formIndex < postSubmitPageIndex && React.createElement(pages[formIndex])}
                    
                </form>
            </FormProvider>
            {formIndex !== postSubmitPageIndex && ( // last page does not have any buttons
                <div className={styles.buttons}>
                    <Button
                        arrow="left"
                        hidden={formIndex === 0}
                        onClick={previousPage}
                    >
                        Back
                    </Button>
                    <div className={styles.spacer} />
                    {isLoading && <Button loading>Loading...</Button>}
                    {!isLoading && formIndex !== submitPageIndex && (
                        <Button arrow="right" onClick={nextPage}>
                            Next
                        </Button>
                    )}
                    {!isLoading && formIndex === submitPageIndex && (
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit, onError)}
                        >
                            Submit
                        </Button>
                    )}
                </div>
            )}

            {/* <FormNavigation setFormIndex={setFormIndex} formIndex={formIndex}></FormNavigation> */}
        </div>
    );
};

export default Form;
