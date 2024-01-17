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

import Start from "./screens/start";
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
const fields: (keyof RegistrationSchema)[][] = [
    [],
    ['preferredName', 'legalName', 'email', 'gender', 'race', 'ageMin', 'transportation', 'requestedTravelReimbursement'],
    ['location', 'degree', 'major', 'minor', 'university', 'gradYear'],
    ['hackInterest', 'hackOutreach', 'dietaryRestrictions', 'hackEssay1', 'hackEssay2', 'proEssay', 'considerForGeneral', 'optionalEssay'],
    []
  ];


const pages = [Start, PersonalInfo, Education, HackSpecific, Review, Complete];
const submitPageIndex = 4;
const postSubmitPageIndex = submitPageIndex + 1;

// Old API Methods
const convertToAPI = (data: RegistrationSchema, isPro: Boolean): RegistrationType => {
    const {
        legalName,
        gender: possibleGender,
        race: possibleRace,
        ageMin: overEighteen,
        ...registration
    } = data;

    // For gender and race, we default to 'Prefer Not to Answer' if user doesn't select anything so that
    // when they come back to edit registration, they'll see the prefer not to answer option selected
    const gender = possibleGender || "Prefer Not to Answer";
    const isProApplicant = isPro ? "YES" : "NO";
    const race =
        possibleRace.length === 0 ? ["Prefer Not to Answer"] : possibleRace;
    if (overEighteen[0] != "YES") {
        alert(
            "Please ensure that you are aware that you have to be 18 by the start of our event"
        );
    }

    return {
        ...registration,
        isProApplicant,
        legalName,
        gender,
        race
    };
};

const convertFromAPI = (registration: RegistrationType): RegistrationSchema => {
    const ageMin = ["YES"];
    return { ...registration, ageMin };
};


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
        return register(isEditing, "attendee", convertToAPI(data, true))
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
            {(formIndex !== postSubmitPageIndex && formIndex !== 0) && ( // last page does not have any buttons
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
