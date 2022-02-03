import React from 'react';

import Background from 'pages/Registration/Background';
import styles from './styles.module.scss';
import Form from './Form';

const RSVP = (): JSX.Element => (
  <div className={styles.rsvp}>
    <Background />
    <Form />
  </div>
);

export default RSVP;
