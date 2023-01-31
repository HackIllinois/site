import React from 'react';
import styles from './styles.module.scss';

const Section = () => {
    return (
        <div className={styles.sponsors}>
            <div className={styles.background}>
           
         
      <div className={styles.emailBox}>
    <h2 className={styles.email}> Interested in Sponsoring HackIllinois?</h2>
    <h2 className = {styles.email}>Email us at <a href = "mailto:sponsor@hackillinois.org">sponsor@hackillinois.org</a></h2>
    
</div>
<div className={styles.rect}>
                <h1 className={styles.sponsorstitle}>SPONSORS</h1>
            </div>
</div>
</div>
     
    );
};

export default Section;