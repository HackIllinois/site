import React from 'react';
import Head from 'next/head';

import Hero from '../components/home/hero';
import EventInfo from '../components/event-info';

import Sponsor from '../components/sponsors';
import FAQs from '../components/faqs';
import Footer from '../components/Footer';

import styles from './styles.module.scss';

const Home: React.FC = () => (
  <>
    <Head>
      <title>HackIllinois</title>
    </Head>
    <div className={styles.home}>
      <Hero />
      <EventInfo />
      <FAQs />
      <Sponsor /> 

      <Footer />

    </div>
  </>
);

export default Home;
