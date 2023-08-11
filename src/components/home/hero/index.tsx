import React from "react";
import Navbar from "components/Navbar";
import Newsletter from "./newsletter";

import FERRIS_WHEEL_LARGE from "assets/home/hero/ferris_wheel_large.svg";
import FERRIS_WHEEL_SMALL from "assets/home/hero/ferris_wheel_small.svg";
import BANNER from "assets/home/hero/banner.svg";
import LINES from "assets/home/hero/lines.svg";
import LOGO from "assets/home/hero/logo.svg";
import styles from "./styles.module.scss";
import Lottie from "lottie-react";
import FERRIS_WHEEL_ANIMATION from "assets/home/hero/ferris_wheel_lottie.json";
import HACK_I_ANIMATION from "assets/home/hero/Hack_I_Animation.gif"
console.log(HACK_I_ANIMATION)

const Section: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.heroBackground}>
      {/* <Navbar path="/" /> */}
      <img className={styles.logoAnimation} src={"/_next/static/media/Hack_I_Animation.5013dd4f.gif"} />
      <div className={styles.topHeader}>
        {/* <nav>
          <img className={styles.logo} src={LOGO} />
          <ul>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav> */}

        {/* <div className={styles.welcomeTo}>Welcome to</div> */}
        <h1>HackIllinois 2024</h1>
        {/* <div className={styles.dates}>Feb 24th - Feb 26th</div> */}
      </div>
      
      {/* <Lottie className={styles.ferrisWheelAnimation} animationData={FERRIS_WHEEL_ANIMATION} />; */}
      {/* <img className={styles.ferrisWheelLarge} src={FERRIS_WHEEL_LARGE} /> */}
      {/* <img className={styles.ferrisWheelSmall} src={FERRIS_WHEEL_SMALL} /> */}
    </div>
    <div className={styles.heroFooter}>
      <span className={styles.subtitle}>coming soon</span>
        <div className={styles.newsletter}><Newsletter/> </div>
      {/* <img className={styles.banner} src={BANNER} />
      <img className={styles.lines} src={LINES} /> */}
    </div>
  </section>
);

export default Section;
