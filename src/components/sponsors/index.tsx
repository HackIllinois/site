import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

import FIREWORK_1 from 'assets/home/event_info/firework_1.svg';
import FIREWORK_2  from 'assets/home/event_info/firework_2.svg';
import FIREWORK_3 from 'assets/home/event_info/firework_3.svg';
import GROUP from 'assets/home/event_info/group.svg';

import GET_ON_GOOGLE_PLAY from 'assets/home/event_info/get_on_google_play.svg';
import DOWNLOAD_ON_APP_STORE from 'assets/home/event_info/download_on_app_store.svg';
import INSTAGRAM from 'assets/home/event_info/instagram.svg';
import TWITTER from 'assets/home/event_info/twitter.svg';
import DISCORD from 'assets/home/event_info/discord.svg';

const Section = () => {
    return (
        <div className={styles.sponsors}>
            <div className={styles.container}>
            <div className= {styles.rectangletitle}>
                <h1 className={styles.h1}>SPONSORS</h1>
            </div>
        
        
        <div >
            <h2>Interested to Sponsor Hackillinois?</h2>
            <h2>Email us at \n sponsor@hackillinois.org </h2>

        </div>

        </div>
        </div>
    );
};

export default Section;