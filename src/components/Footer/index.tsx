import React from 'react';

import FOOTER from '../../assets/home/hero/footer_background.svg';
import FACEBOOK from '../../assets/home/hero/icons/facebook.svg';
import INSTAGRAM from '../../assets/home/hero/icons/instagram.svg';
import TWITTER from '../../assets/home/hero/icons/twitter.svg';
import LINKEDIN from '../../assets/home/hero/icons/linkedin.svg';
import GITHUB from '../../assets/home/hero/icons/github.svg';
import EMAIL from '../../assets/home/hero/icons/email.svg';

import styles from './styles.module.scss';

const Section: React.FC = () => (
  <section className={styles.footer}>

      <img className={styles.footerBackground} src={FOOTER} />

      <div className={styles.footerText}>
        <h2>Stay up to date with HackIllinois!</h2>
      </div>

      <div className={styles.icons}>
        <div>
        <a href="https://www.facebook.com/hackillinois/" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={FACEBOOK} /> </a>
        <a href="https://instagram.com/HackIllinois" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={INSTAGRAM} /> </a>
        <a href="https://twitter.com/HackIllinois" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={TWITTER} /> </a>
        </div>
        <div>
        <a href="https://www.linkedin.com/company/hackillinois/" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={LINKEDIN} /> </a>
        <a href="https://github.com/HackIllinois" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={GITHUB} /> </a>
        <a href="mailto:contact@hackillinois.org" target="_blank" rel="noopener noreferrer"><img className={styles.icon} src={EMAIL} /> </a>
        </div>
      </div>

  </section>
);

export default Section;
