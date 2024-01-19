import React, { useEffect, useState } from "react";
import {
    useForm,
    SubmitHandler,
    SubmitErrorHandler,
    FormProvider
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegistrationType } from "@/utils/types";
import { getRegistration, register, registerUpdate, getChallenge, isRegistered, getRoles } from "@/utils/api";
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
import HackSpecific from "./screens/hack-specific-p1";
import Review from "./screens/review";
import HackSpecificP2 from "./screens/hack-specific-p2";
import Complete from "./screens/complete";

import styles from "./styles.module.scss";
import Image from "next/image";
import { BackButton, EducationButton, LoadingButton, PersonalButton, ReviewButton, HackspecificButton, SubmitButton } from "@/public/registration/buttons/index"

type FormProps = {
    formIndex: number;
    setFormIndex: React.Dispatch<React.SetStateAction<number>>;
};

//New Page Strcture
const fields: (keyof RegistrationSchema)[][] = [
    [],
    ['preferredName', 'legalName', 'emailAddress', 'gender', 'race', 'ageMin', 'transportation', 'requestedTravelReimbursement'],
    ['location', 'degree', 'major', 'minor', 'university', 'gradYear', 'resumeFileName'],
    ['hackEssay1', 'hackEssay2', 'proEssay', 'considerForGeneral', 'optionalEssay'],
    ['hackInterest', 'hackOutreach', 'dietaryRestrictions'],
    []
  ];


// New Variables for above settings
const pages = [Start, PersonalInfo, Education, HackSpecific, HackSpecificP2, Review, Complete];
const submitPageIndex = 5;
const postSubmitPageIndex = submitPageIndex + 1;

const buttons = [LoadingButton, BackButton, PersonalButton, EducationButton, HackspecificButton, HackspecificButton, ReviewButton, SubmitButton]

// Old API Methods
const convertToAPI = (data: RegistrationSchema, isPro: Boolean): RegistrationType => {
    const {
        legalName,
        gender: possibleGender,
        race: possibleRace,
        ageMin: overEighteen,
        transportation,
        considerForGeneral: gen,
        requestedTravelReimbursement: reimburse,
        ...registration
    } = data;

    // For gender and race, we default to 'Prefer Not to Answer' if user doesn't select anything so that
    // when they come back to edit registration, they'll see the prefer not to answer option selected
    const considerForGeneral = gen === "YES" ? true : false;
    const requestedTravelReimbursement = reimburse === "YES" ? true : false;
    const gender = possibleGender || "Prefer Not to Answer";
    const isProApplicant = isPro;
    const race =
        possibleRace.length === 0 ? ["Prefer Not to Answer"] : possibleRace;
    return {
        ...registration,
        isProApplicant,
        legalName,
        considerForGeneral,
        requestedTravelReimbursement,
        gender,
        race
    };
};

const convertFromAPI = (registration: RegistrationType): RegistrationSchema => {
    const {requestedTravelReimbursement: reimburse, considerForGeneral: gen, ...rest} = registration;
    const ageMin = ["YES"];
    const transportation = ["YES"];
    const requestedTravelReimbursement = reimburse ? "YES" : "NO";
    const considerForGeneral = gen ? "YES" : "NO";
    return { ...rest, ageMin, transportation, requestedTravelReimbursement, considerForGeneral };
};


const Form = ({ formIndex, setFormIndex }: FormProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true);
    const [isKnight, setIsKnight] = useState(false);

    const methods = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema, { errorMap }),
        defaultValues
    });
    const {
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        formState: { errors }
    } = methods;

    useEffect(() => {
        getRoles().then((roles) => {
            if (!roles.includes("TESTER")) {
                window.location.pathname = "/";
                return;
            }
        }).then(() => {
            isRegistered().then((isRegistered) => {
                if (isRegistered) {
                    window.location.pathname = "/profile";
                    return;
                }
        }).then(() => {
            getRegistration()
                .then(registrationWithId => {
                    if (registrationWithId) {
                        const { id, ...registration } = registrationWithId;
                        methods.reset(convertFromAPI(registration));
                        setFormIndex(1);
                    }
                    return getChallenge();
                }).then((chal) => {
                    if (chal) {
                        setIsKnight(true);
                        setFormIndex(1);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
        });

    }, []); // deliberately not including `methods`

    const onSubmit: SubmitHandler<RegistrationSchema> = data => {
        // console.log(isEditing);

        setIsLoading(true);
        return register(convertToAPI(data, isKnight))
            .then(() => {
                setFormIndex(postSubmitPageIndex);
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
        console.log(errorData);
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

    const nextPage = () => {
        const vals = convertToAPI(getValues(), isKnight);
        registerUpdate(vals).catch(() => {});
        setFormIndex(current => current + 1);
        window.scrollTo(0, 0); // scroll to the top of the page
    }
    
    const previousPage = () => {
        setFormIndex(current => current - 1);
        window.scrollTo(0, 0); // scroll to the top of the page
    }

    var props = {formIndex: formIndex, setFormIndex: setFormIndex, isKnight: isKnight};

    return (
        <div className={styles.container}>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                >  
                    {React.createElement(pages[formIndex],props)}    
                </form>
            </FormProvider>
            {(formIndex !== postSubmitPageIndex && formIndex !== 0) && ( // last page does not have any buttons
                <div className={styles.buttons}>
                    {formIndex > 0 && <Button
                        arrow="left"
                        hidden={formIndex === 0}
                        onClick={previousPage}
                    >
                        <Image src={buttons[formIndex]} alt="previous button" className={styles.button} />
                    </Button>}
                    {isLoading && <Button loading><Image src={LoadingButton} alt="loading button" className={styles.button} /></Button>}
                    {!isLoading && formIndex !== submitPageIndex && (
                        <Button arrow="right" onClick={nextPage}>
                            <Image src={buttons[formIndex+2]} alt="next button" className={formIndex===0 ? styles.singlebutton : styles.button} />
                        </Button>
                    )}
                    {!isLoading && formIndex === submitPageIndex && (
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmit, onError)}
                        >
                            <Image src={SubmitButton} alt="submit button" className={styles.button} />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Form;
