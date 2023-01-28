import React from 'react';
import styles from './styles.module.scss';

const Section = () => {
    return (
        <div className={styles.sponsors}>
            <div className={styles.rect}>
                <h1 className={styles.h1}>SPONSORS</h1>
            </div>
      <div className={styles.emailBox}>
    <h2 className = {styles.email}>Email us at <span className={styles.email}>sponsor@hackillinois.org</span></h2>
</div>
        </div>
    );
};

export default Section;