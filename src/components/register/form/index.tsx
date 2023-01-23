import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler, SubmitErrorHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegistrationType } from '../../../util/types';
import { getRegistration, getRoles, refreshToken, register } from 'util/api';
import MOLEMACHINE from 'assets/registration/whack_a_mole_machine.svg';
import Button from 'components/form/Button';
import { registrationSchema, RegistrationSchema, errorMap, defaultValues } from '../validation';
import Welcome from './screens/welcome';
import PersonalInfoP1 from './screens/personal-info-p1';
import PersonalInfoP2 from './screens/personal-info-p2';
import PersonalInfoP3 from './screens/personal-info-p3';
import Education from './screens/education-p1';
import EducationP2 from './screens/education-p2';
import Experience from './screens/experience-p1';
import ExperienceP2 from './screens/experience-p2';
import Event from './screens/event-p1';
import EventP2 from './screens/event-p2';
import EventP3 from './screens/event-p3';
import Finish from './screens/finish';

import styles from './styles.module.scss';
import FormNavigation from './form-navigation';



type FormProps = {
  formIndex: number,
  setFormIndex: React.Dispatch<React.SetStateAction<number>>,
};

const fields: (keyof RegistrationSchema)[][] = [
  ['name', 'gender', 'email'],
  ['race'],
  ['ageMin','selfTransport','purdueTransport'],
  ['location', 'degreePursued', 'school', 'major'],
  ['graduationYear', 'resumeFilename'],
  ['whyHack'],
  ['programmingYears', 'programmingAbility'],
  ['interests'],
  ['outreachSurvey'],
  ['dietary'],
  []
];

// const pages = [Welcome, PersonalInfo, PersonalInfoP2, PersonalInfoP3, Education, EducationP2, Experience, ExperienceP2, Event, EventP2, EventP3, Finish]; //With Welcome Page
const pages = [PersonalInfoP1, PersonalInfoP2, PersonalInfoP3, Education, EducationP2, Experience, ExperienceP2, Event, EventP2, EventP3, Finish];
const submitPageIndex = 9;
const postSubmitPageIndex = submitPageIndex + 1;

const convertToAPI = (data: RegistrationSchema): RegistrationType => {
  const { name, gender: possibleGender, race: possibleRace, programmingYears: yearsArray, programmingAbility: abiltyArray, ageMin: overEighteen, ...registration } = data;
  const [firstName, ...remainingWords] = name.split(' ');
  const lastName = remainingWords.join(' ') || ' ';

  // For gender and race, we default to 'Prefer Not to Answer' if user doesn't select anything so that
  // when they come back to edit registration, they'll see the prefer not to answer option selected
  const gender = possibleGender || 'Prefer Not to Answer';
  const race = possibleRace.length === 0 ? ['Prefer Not to Answer'] : possibleRace;
  const programmingYears = (yearsArray.at(0) || 0);
  const programmingAbility = (abiltyArray.at(0) || 0);
  if (overEighteen[0] != "YES") {
    alert("Please ensure that you are aware that you have to be 18 by the start of our event")
  }

  // console.log(registration, firstName, lastName, gender, race, programmingYears, programmingAbility )
  return { ...registration, firstName, lastName, gender, race, programmingYears, programmingAbility };
};

const convertFromAPI = (registration: RegistrationType): RegistrationSchema => {
  const { firstName, lastName, programmingYears: year, programmingAbility: ability, ...remaining } = registration;
  const name = firstName ? (`${firstName} ${lastName}`).trim() : '';
  const programmingYears = [year];
  const programmingAbility = [ability];
  const ageMin = ["YES"]
 

  return { ...remaining, name, programmingYears, programmingAbility, ageMin};
};

const Form = ({ formIndex, setFormIndex }: FormProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema, { errorMap }),
    defaultValues,
  });
  const { handleSubmit, setError, clearErrors, formState: { errors } } = methods;

  useEffect(() => {
    getRoles().then((roles) => {
      if (roles.includes('Applicant')) {
        setIsEditing(true);
        // console.log(isEditing);
        return getRegistration('attendee');
      }
      return null;
    }).then((registrationWithId) => {
      if (registrationWithId) {
        const { id, ...registration } = registrationWithId;
        methods.reset(convertFromAPI(registration));
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, []); // deliberately not including `methods`

  const onSubmit: SubmitHandler<RegistrationSchema> = (data) => {
    // console.log("data");
    // console.log(isEditing);

    setIsLoading(true);
    return register(isEditing, 'attendee', convertToAPI(data)).then(() => {
      setFormIndex(postSubmitPageIndex);
      refreshToken(); // token changes after registration, so need to refetch
    }).catch(() => {
      alert('There was an error while submitting. If this error persists, please email contact@hackillinois.org');
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const onError: SubmitErrorHandler<RegistrationSchema> = (errorData) => {
    // console.log(errorData);
    clearErrors();
    let inputName: keyof typeof errorData;
    for (inputName in errorData) {
      setError(inputName, { type: "required", message: errorData[inputName]?.message });
    }

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].some((field) => errorData[field])) {
        setFormIndex(i);
        break;
      }
    }
  };

  const nextPage = () => setFormIndex((current) => current + 1);
  const previousPage = () => setFormIndex((current) => current - 1);

  return (
    <div className={styles.container} style={{ backgroundImage: `url("${MOLEMACHINE}")` }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
          {pages.map((Page, i) => (
            // the array should be constant, so using index as key is fine
            // eslint-disable-next-line react/no-array-index-key
            <div className={clsx(styles.screenContainer, formIndex === i && styles.visible)} key={i}>
              <Page />
            </div>
          ))}
          
        </form>
      </FormProvider>
      {formIndex !== postSubmitPageIndex && ( // last page does not have any buttons
        <div className={styles.buttons}>
          {/* {(formIndex !== 0) && <Button arrow="right" onClick={nextPage}>Previous</Button>} */}
          <Button arrow="left" hidden={formIndex === 0} onClick={previousPage}>Back</Button>
          <div className={styles.spacer} />
          {isLoading && <Button loading>Loading...</Button>}
          {(!isLoading && formIndex !== submitPageIndex) && <Button arrow="right" onClick={nextPage}>Next</Button>}
          {(!isLoading && formIndex === submitPageIndex) && <Button type="submit" onClick={handleSubmit(onSubmit, onError)}>Submit</Button>}
        </div>
      )}
      
      <FormNavigation setFormIndex={setFormIndex} formIndex={formIndex}></FormNavigation>
      
    </div>
  );
};

export default Form;
