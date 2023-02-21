import React from 'react';
import clsx from 'clsx';

import Button from 'components/form/Button';
import LOGO_LARGE from 'assets/registration/finishLogo.svg';
import styles from './styles.module.scss';

const Sorry = (): JSX.Element => (
  <div className={clsx(styles.screen, styles.finish)}>
    <br></br>
    <a className={styles.logo} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      <img src={LOGO_LARGE} alt="HackIllinois" />
    </a>

    <h1 className={styles.headline}>HACK ILLINOIS</h1>

    <p className={styles.textOp2}>Registration has closed for HackIllinois 2023. If you have already registered and would like to change your information, please message us at <a href="mailto:contact@hackillinois.org" target="_blank" rel="noopener noreferrer">contact@hackillinois.org</a>. Thank you for your interest in HackIllinois!</p>

    <div className={styles.homeButton}>
      <Button onClick={() => { window.location.href = '/'; }}>Back Home</Button>
    </div>
  </div>
);

export default Sorry;
