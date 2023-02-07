import React from 'react';
import Head from 'next/head';

import styles from './styles.module.scss';
import FRONT_LIGHTS from '../../assets/schedule/lights.svg';
import TICKETS_HORIZONTAL from '../../assets/schedule/tickets_horizontal.svg';

const Schedule: React.FC = () => (
  <>
    <Head>
      <title>HackIllinois | Schedule</title>
    </Head>
    <div className={styles.schedule}>
        <img className={styles.frontLights} src={FRONT_LIGHTS} />
        <div className={styles.tickets}>
          <img className={styles.ticket} src={TICKETS_HORIZONTAL} />
        </div>
    </div>
  </>
);

export default Schedule;

