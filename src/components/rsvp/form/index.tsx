import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm, SubmitHandler, SubmitErrorHandler, FormProvider } from 'react-hook-form';
import router, { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTime } from 'luxon';

import LOGO_LARGE from 'assets/registration/finishLogo.svg';
import MOLEMACHINE from 'assets/registration/whacked_mole_machine.svg';
import DISCORD_HELP from 'assets/registration/discord_username_how_to.png';
import Input from 'components/form/Input';
import Button from 'components/form/Button';
import Constant from 'components/form/Constant';
import Random from 'components/form/Random';
import { createProfile, getRegistration, refreshToken, rsvp, getRoles, getProfile, APIError } from 'util/api';
import { ProfileType, RegistrationType, WithId } from '../../../util/types';


import styles from './styles.module.scss';
import { rsvpSchema, RSVPSchema, errorMap, defaultValues } from '../validation';

const NUM_PROFILE_PICTURES = 11;
const getProfilePicture = (index: number) => ((index >= 0 && index < NUM_PROFILE_PICTURES)
  ? `https://hackillinois-upload.s3.amazonaws.com/photos/profiles-2022/profile-${index}.png`
  : ''
);

const preProcessData = (data: RSVPSchema) => {
  if (data.firstName) {
    data.firstName = data.firstName.trim();
  }
  if (data.lastName) {
    data.lastName = data.lastName.trim();
  }
};

const Form = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [finished, setFinished] = useState(false);

  const [registration, setRegistration] = useState<WithId<RegistrationType> | null>(null);
  const [profile, setProfile] = useState<WithId<ProfileType> | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const roles = await getRoles();
      if (roles.includes('Applicant')) {
        const registrationData = await getRegistration('attendee');
        setRegistration(registrationData);
        if (roles.includes('Attendee')) {
          setIsEditing(true);
          const { points, ...profileData } = await getProfile();
          setProfile(profileData);
        }
      }
    };

    initialize().finally(() => setIsLoading(false));
  }, []);

  const methods = useForm<RSVPSchema>({
    resolver: zodResolver(rsvpSchema, { errorMap }),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (profile !== null) {
      reset(profile);
    }
  }, [reset, profile]);

  const onSubmit: SubmitHandler<RSVPSchema> = async (data) => {
    preProcessData(data);
    setIsLoading(true);
    try {
      await Promise.all([
        rsvp(isEditing, { isAttending: true }).then(() => refreshToken()),
        createProfile(isEditing, data),
      ]);
      setFinished(true);
    } catch (e) {
      const err = e as APIError;
      alert(`There was an error while submitting. If this error persists, please email contact@hackillinois.org\n\nError: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<RSVPSchema> = (errors) => {
    console.log('error', errors);
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url("${MOLEMACHINE}")` }}>
      {!isLoading && (registration === null ? (
        // <div onLoad={() => router.push('/register')}>Finish Registration First</div>
        // const router = useRouter()
        <div/>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
            <div className={clsx(styles.screenContainer, styles.visible)}>
              {(!finished) ? (
                <>
                  <Scrollbars>
                    <div className={styles.title}>RSVP</div>
                    <Constant name="firstName" value={registration?.firstName} />
                    <Constant name="lastName" value={registration?.lastName} />
                    <Constant name="timezone" value={DateTime.local().toFormat('ZZZZ', { locale: 'en-US' })} />
                    <Random name="avatarUrl" seed={registration?.id} min={0} max={NUM_PROFILE_PICTURES} generateValue={getProfilePicture} />
                    <Input name="discord" placeholder="Please Enter your Discord Username *" helpLink={DISCORD_HELP} linkColor="#F6F4D4" />
                  </Scrollbars>

                  <div className={styles.button}>
                    {isLoading && <Button loading>Loading...</Button>}
                    {!isLoading && <Button type="submit">Submit</Button>}
                  </div>
                </>
              ) : (
                <div className={clsx(styles.screen, styles.finish)}>
                  <a className={styles.logo} href="/">
                    <img src={LOGO_LARGE} alt="HackIllinois" />
                  </a>
                  <p className={styles.text}>Thank you for RSVPing for HackIllinois 2023! Be sure to follow our instagram (<a href="https://www.instagram.com/hackillinois/" target="_blank" rel="noreferrer">@hackillinois</a>) and our twitter (<a href="https://twitter.com/hackillinois/" target="_blank" rel="noreferrer">@hackillinois</a>). We will be posting live updates during the event that you won’t want to miss!</p>
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      ))}
    </div>
  );
};

export default Form;
