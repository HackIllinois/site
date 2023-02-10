import React, { useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';

import styles from './styles.module.scss';
import FRONT_LIGHTS from '../../assets/travel/lights.svg';
import UMBRELLA from '../../assets/travel/umbrella.svg';
import STAND from '../../assets/travel/stand.svg';
import STAND_BOTTOM from '../../assets/travel/stand_bottom.svg';

const Travel = () => {
  return (
    <>
      <Head>
        <title>HackIllinois | Travel</title>
      </Head>
      <div className={styles.travel}>
        <img className={styles.umbrella} src={UMBRELLA} />
        <img className={styles.frontLights} src={FRONT_LIGHTS} />
        <div className={styles.standWrapper}>
          <h1>Travel Details</h1>
          <div className={styles.standContent}>
            <h2>Purdue To UIUC - 2/24</h2>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.leftColumn}>Pickup</td>
                        <td>
                            <div className={styles.time}>9:00 AM</div>
                            <div className={styles.location}>Purdue</div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.leftColumn}>Arrival</td>
                        <td>
                            <div className={styles.time}>2:30 PM</div>
                            <div className={styles.location}>Thomas M. Siebel Center for Computer Science, 201 N. Goodwin Ave, Urbana, IL</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2>UIUC To Purdue - 2/26</h2>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.leftColumn}>Pickup</td>
                        <td>
                            <div className={styles.time}>9:00 AM</div>
                            <div className={styles.location}>Purdue</div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.leftColumn}>Arrival</td>
                        <td>
                            <div className={styles.time}>2:30 PM</div>
                            <div className={styles.location}>Thomas M. Siebel Center for Computer Science, 201 N. Goodwin Ave, Urbana, IL</div>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <img className={styles.standBottom} src={STAND_BOTTOM} />
        </div>
      </div>
    </>
  );
};

export default Travel;
