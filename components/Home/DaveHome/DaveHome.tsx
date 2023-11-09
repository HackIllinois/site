'use client';

import Lottie from "lottie-react";
import dragon from '@/public/home/dave/dragon.json';
import styles from './DaveHome.module.scss';

const DaveHome = () => {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <img src='/home/dave/background.svg' className={styles.image} />
            </div>
            <Lottie
                className={styles.dave}
                animationData={dragon}
                loop={true}
            />
        </div>
    );
}

export default DaveHome;