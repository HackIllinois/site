import React from 'react';
import styles from './styles.module.scss';

import logo1 from 'assets/sponsors/BATS.svg';
import logo2  from 'assets/sponsors/BlueHill.svg';
import logo3 from 'assets/sponsors/Epic logo.svg';
import logo4 from 'assets/sponsors/Github_Logo.svg';
import logo5 from 'assets/sponsors/Caterpillar.svg';
import logo6 from 'assets/sponsors/John-deere.svg';
import logo7 from 'assets/sponsors/Cardano.svg'
import logo8 from 'assets/sponsors/1517.svg'

const Section = () => {
    return (
        <div className={styles.sponsors}>
            <div className={styles.background}>
           
         
      <div className={styles.emailBox}>
        <div className={styles.gridContainer}>
    <img className = {styles.logo4} src = {logo1}/>
    <img  className = {styles.logo5} src = {logo2}/>
    <img  className = {styles.logo3} src = {logo3}/>
    <img  className = {styles.logo2} src = {logo4}/>
    <img  className = {styles.logo6} src = {logo5}/>
    <img  className = {styles.logo1} src = {logo6}/>
    <img className = {styles.logo7} src = {logo7} />
    <img className = {styles.logo8} src = {logo8} />


    </div>
</div>

                <div className={styles.rect}>
                <h1 className={styles.sponsorstitle}>SPONSORS</h1>
            </div>
</div>
</div>
     
    );
};


export default Section; 