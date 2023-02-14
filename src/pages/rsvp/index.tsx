import React, { useEffect } from 'react';

import Background from '../../components/register/background';
import styles from './styles.module.scss';
import Form from '../../components/rsvp/form';

import { useRouter } from 'next/router';

const RSVP = (): JSX.Element => {
  const router = useRouter();

  // useEffect(() => {
  //   router.replace('/register');
  // }, []);

  return (
    <div className={styles.rsvp}>
      <Background />
      <Form />
    </div>
  );
};

export default RSVP;
