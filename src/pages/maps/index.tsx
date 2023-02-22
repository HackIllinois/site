import React, { useState } from "react";
import Head from "next/head";
import Navbar from "components/Navbar";
import clsx from "clsx";

import styles from "./styles.module.scss";
import FRONT_LIGHTS from "../../assets/map/lights.svg";
import NAVUMBRELLA2 from 'assets/map/umbrella.svg';
import NAVUMBRELLA1 from 'assets/map/umbrella_2.svg';
import STAND_BOTTOM from "../../assets/map/stand_bottom.svg";
import CORNER_LEFT from "../../assets/map/corner_left.svg";
import CORNER_RIGHT from "../../assets/map/corner_right.svg";

import CIF_BASEMENT from "../../assets/map/cif_0.svg"
import CIF_FLOORONE from "../../assets/map/cif_1.svg"
import CIF_FLOORTHREE from "../../assets/map/cif_3.svg"
import CIF_FLOORFOUR from "../../assets/map/cif_4.svg"

import SIEBEL_FLOORONE from "../../assets/map/siebel_1.svg"
import SIEBEL_FLOORTWO from "../../assets/map/siebel_2.svg"


const Maps = () => {
const [mapSectionIndex, setMapSectionIndex] = useState(0);
const [levelIndex, setLevelIndex] = useState(0);
const UMBRELLAS = [NAVUMBRELLA1, NAVUMBRELLA2];
const CIF = [CIF_BASEMENT, CIF_FLOORONE, CIF_FLOORTHREE, CIF_FLOORFOUR];
const SIEBEL = [SIEBEL_FLOORONE, SIEBEL_FLOORTWO];
const LEVELMAX = [1, 3]; //Max Index for Siebel/CIF Building Levels
function changeBuildingSiebel () {
    console.log(1);
    setLevelIndex(0);
    setMapSectionIndex(0);
}
function changeBuildingCIF () {
    console.log(1);
    setLevelIndex(0);
    setMapSectionIndex(1);
}

  return (
    <>
      <Head>
        <title>HackIllinois | Maps</title>
      </Head>
      <div className={styles.maps}>
        <Navbar path="/maps" />
        <img className={styles.umbrella}  src={UMBRELLAS[mapSectionIndex]}/>
        <div tabIndex={1} className={mapSectionIndex==0 ? styles.sign1selected: styles.sign1} onClick={() => changeBuildingSiebel()}>SIEBEL</div>
        <div tabIndex={2} className={mapSectionIndex==1 ? styles.sign2selected: styles.sign2} onClick={() => changeBuildingCIF()}>CIF</div>
        <div tabIndex={3} hidden={levelIndex === 0} className={styles.pageLeft} onClick={() => setLevelIndex(levelIndex - 1)}>&lt;</div>
        <div tabIndex={4} hidden={levelIndex === LEVELMAX[mapSectionIndex]} className={styles.pageRight} onClick={() => setLevelIndex(levelIndex + 1)}>&gt;</div>        
        <img className={styles.frontLights} src={FRONT_LIGHTS} />
        <div className={styles.standWrapper}>
          <h1>Map of HackIllinois</h1>
          <div className={styles.standContent}>
            <h2></h2>
            {/* <div> */}
              {/* {mapSectionIndex === 0 ? (
                <div/>
                // <img className={styles.umbrella}  src={UMBRELLA} />
              ) : (
                <div/>
                // <img className={styles.umbrella}  src={UMBRELLA} />
              )} */}
            {/* </div> */}
            <table>
              <tbody>
                <tr>
                  <td className={styles.leftColumn}></td>
                  <td>
                    <div className={styles.mapBack}>
                        {mapSectionIndex === 0 ? (
                            <img className={styles.map}  src={SIEBEL[levelIndex]} />
                        ) : (
                            <img className={styles.map}  src={CIF[levelIndex]} />
                        )}

                        {/* <div className={styles.leftButton}></div> */}
                        {/* <br></br> */}
                        {/* <img className={styles.map}  src={CIF[levelIndex]} /> */}

                    </div>
                    {/* <div className={styles.time}>11:30 AM EST</div>
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
                    </div> */}
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

export default Maps;
