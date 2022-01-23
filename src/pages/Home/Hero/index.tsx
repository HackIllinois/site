import React from 'react';
import { Link } from 'react-router-dom';

import BACKGROUND from 'assets/home/hero/background.svg';
import BAKERY from 'assets/home/hero/bakery.svg';
import CLOUDS from 'assets/home/hero/clouds.svg';
import LOGO from 'assets/home/hero/logo.svg';
import PLANTS from 'assets/home/hero/plants.svg';
import SCOOTER from 'assets/home/hero/scooter.svg';
import SUN_RAYS from 'assets/home/hero/sun_rays.svg';

// import NavBar from 'components/NavBar';
import styles from './styles.module.scss';

const Section1: React.FC = () => (
  <div className={styles.hero}>
    { // <NavBar hideLogo />
    }
    <div className={styles.background} style={{ backgroundImage: `url(${BACKGROUND})` }} />
    <div className={styles.clouds} style={{ backgroundImage: `url(${CLOUDS})` }} />
    <div className={styles.sun_rays} style={{ backgroundImage: `url(${SUN_RAYS})` }} />
    <div className={styles.logo} style={{ backgroundImage: `url(${LOGO})` }} />

    <Link className={styles.registerButton} to="/register">Register</Link>

    <div className={styles.foreground}>
      <img className={styles.plants} src={PLANTS} alt="Small plants" />
      <img className={styles.bakery} src={BAKERY} alt="Rise to your potential in this bakery" />
      <img className={styles.scooter} src={SCOOTER} alt="Scooter" />
    </div>
  </div>
);

export default Section1;
