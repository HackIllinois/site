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
        <section className={styles.eventInfo}>
            <img className={styles.group} src={GROUP} />
            <div className={styles.textWrapper}>
                <h2 className={styles.h1}>The Event</h2>
                <p>HackIllinois is University of Illinois at Urbana-Champaign’s premiere collegiate hackathon.This year, we’re celebrating our 10th Hackiversary!</p>
                <p>Join us <strong>in-person</strong> on February 24th to February 26th at the <a href="https://www.google.com/maps/place/Thomas+M.+Siebel+Center+for+Computer+Science/@40.1138028,-88.2270939,17z/data=!3m1!5s0x880cd76a5762dfb7:0xcf6a023935717398!4m5!3m4!1s0x880cd76baa8479a9:0x4e9f01d40d359630!8m2!3d40.1138028!4d-88.2249052">Siebel Center for Computer Science</a> and <a href="https://cif.illinois.edu/" target="_blank">CIF</a>! Participants can work individually or in teams to submit projects to a specific track for a chance to win prizes. Let’s make memories!</p>
                
                <h2>Join Us</h2>
                <p>Follow us on Twitter (<a href="https://twitter.com/hackillinois?lang=en" target="_blank">@HackIllinois</a>) and Instagram  (<a href="https://www.instagram.com/hackillinois/?hl=en" target="_blank">@HackIllinois</a>) to be notified of our event updates! There will be regular content and posts.</p>
                <h3>Mobile Apps <a href="https://play.google.com/store/apps/details?id=org.hackillinois.android.release" target="_blank"><img className={styles.outgoingLinkIcon} src={GET_ON_GOOGLE_PLAY} /></a> <a href="https://apps.apple.com/us/app/hackillinois/id1451755268" target="_blank"><img className={styles.outgoingLinkIcon} src={DOWNLOAD_ON_APP_STORE} /></a></h3>
                <p>All attendees will need to download the HackIllinois app to check in, collect points, get event notifications, and view the leaderboard. We’ll be using it during the event to make updates with any schedule changes and send out reminders for food, workshops, and other mini-events!</p>
                <h3>Instagram <a href="https://www.instagram.com/hackillinois/?hl=en" target="_blank"><img className={styles.outgoingLinkIcon} src={INSTAGRAM} /></a></h3>
                <p>This is where we’ll be posting more of the fun, behind-the-scenes aspects of our event! You’ll get an opportunity to see the work that goes into making the event a possibility through insights from teams and profiles of staff members.</p>
                <h3>Twitter <a href="https://twitter.com/hackillinois?lang=en" target="_blank"><img className={styles.outgoingLinkIcon} src={TWITTER} /></a></h3>
                <p>This is where we’ll be posting updates with regard to our schedule, additions to our event, and other things we come up with!</p>
                <h3><span>Discord</span> <img className={styles.outgoingLinkIcon} src={DISCORD} onClick={() => alert('Our Discord server will be open to the public between February 13th and February 24th :)')}/></h3>
                <p>Our discord server will be the secondary hub for our event. You can use this to communicate with attendees and company representatives, get help from mentors, and receive event reminders.</p>
            </div>
            <img className={clsx(styles.firework, styles.firework1)} src={FIREWORK_1} />
            <img className={clsx(styles.firework, styles.firework2)} src={FIREWORK_2} />
            <img className={clsx(styles.firework, styles.firework3)} src={FIREWORK_3} />
        </section>
    );
};

export default Section;