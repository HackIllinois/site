import React from 'react';

import FERRIS_WHEEL_LARGE from 'assets/home/hero/ferris_wheel_large.svg';
import FERRIS_WHEEL_SMALL from 'assets/home/hero/ferris_wheel_small.svg';
import BANNER from 'assets/home/hero/banner.svg';
import LINES from 'assets/home/hero/lines.svg';
import LOGO from 'assets/home/hero/logo.svg'
import styles from './styles.module.scss';

const Section: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.heroBackground}>
      <div className={styles.topHeader}>
        <nav>
          <img className={styles.logo} src={LOGO} />
          <ul>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
        <div className={styles.welcomeTo}>Welcome to</div>
        <h1>HackIllinois</h1>
        <div className={styles.dates}>Feb 24th - Feb 26th</div>
      </div>
      <img className={styles.ferrisWheelLarge} src={FERRIS_WHEEL_LARGE} />
      <img className={styles.ferrisWheelSmall} src={FERRIS_WHEEL_SMALL} />
    </div>
    <div className={styles.heroFooter}>
      <span className={styles.subtitle}>making memories</span>
      <img className={styles.banner} src={BANNER} />
      <img className={styles.lines} src={LINES} />
    </div>
  </section>
);

export default Section;
