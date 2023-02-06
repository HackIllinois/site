import React from 'react';
import Head from 'next/head';

import styles from './styles.module.scss';
import FRONT_LIGHTS from '../../assets/schedule/lights.svg';

const Schedule: React.FC = () => (
  <>
    <Head>
      <title>HackIllinois | Schedule</title>
    </Head>
    <div className={styles.schedule}>
        <img className={styles.frontLights} src={FRONT_LIGHTS} />
    </div>
  </>
);

export default Schedule;

