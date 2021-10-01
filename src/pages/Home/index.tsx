import React from 'react';

import Hero from './Hero';
import EventInfo from './EventInfo';
import FAQ from './FAQ';
import Sponsors from './Sponsors';

import styles from './styles.module.scss';

const Home: React.FC = () => (
  <div className={styles.home}>
    <div className={styles.gradient} />
    <Hero />
    { /* Temporarily disable until content is ready
    <EventInfo />
    <FAQ />
    <Sponsors />
    */ }
  </div>
);

export default Home;
