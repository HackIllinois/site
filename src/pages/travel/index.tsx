import React, { useState } from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import clsx from "clsx";

import styles from "./styles.module.scss";
import FRONT_LIGHTS from "../../assets/travel/lights.svg";
import UMBRELLA from "../../assets/travel/umbrella.svg";
import STAND_BOTTOM from "../../assets/travel/stand_bottom.svg";
import CORNER_LEFT from "../../assets/travel/corner_left.svg";
import CORNER_RIGHT from "../../assets/travel/corner_right.svg";

const Travel = () => {
  return (
    <>
      <Head>
        <title>HackIllinois | Travel</title>
      </Head>
      <div className={styles.travel}>
        <Navbar path="/travel" />
        <img className={styles.umbrella} src={UMBRELLA} />
        <img className={styles.frontLights} src={FRONT_LIGHTS} />
        <div className={styles.standWrapper}>
          <h1>Travel Details</h1>
          <div className={styles.standContent}>
            <h2>TO UIUC - 2/24</h2>
            <table>
              <tbody>
                <tr>
                  <td className={styles.leftColumn}>Pickup</td>
                  <td>
                    <div className={styles.time}>11:30 AM EST</div>
                    <div className={styles.location}>
                      Computer and Information Science Department, 732 W
                      Michigan St, Indianapolis, IN
                    </div>
                    <div className={styles.time}>1:30 PM EST</div>
                    <div className={styles.location}>
                      Richard and Patricia Lawson Computer Science Building, 305
                      N University St, West Lafayette, IN
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={styles.leftColumn}>Arrival</td>
                  <td>
                    <div className={styles.time}>2:30 PM CST</div>
                    <div className={styles.location}>
                      Thomas M. Siebel Center for Computer Science, 201 N.
                      Goodwin Ave, Urbana, IL
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>FROM UIUC - 2/26</h2>
            <table>
              <tbody>
                <tr>
                  <td className={styles.leftColumn}>Pickup</td>
                  <td>
                    <div className={styles.time}>4:30 PM CST</div>
                    <div className={styles.location}>
                      Thomas M. Siebel Center for Computer Science, 201 N.
                      Goodwin Ave, Urbana, IL
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className={styles.leftColumn}>Arrival</td>
                  <td>
                    <div className={styles.time}>7:30 PM EST</div>
                    <div className={styles.location}>
                      Richard and Patricia Lawson Computer Science Building, 305
                      N University St, West Lafayette, IN
                    </div>
                    <div className={styles.time}>9:30 PM EST</div>
                    <div className={styles.location}>
                      Computer and Information Science Department, 732 W
                      Michigan St, Indianapolis, IN
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.standBottomWrapper}>
            <img className={styles.standBottom} src={STAND_BOTTOM} />
            <img className={styles.cornerLeft} src={CORNER_LEFT} />
            <img className={styles.cornerRight} src={CORNER_RIGHT} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Travel;
