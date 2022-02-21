import React, { useState, useRef, useEffect } from 'react';
import lottie from 'lottie-web';

import CAKE_LAYER_ONE from 'assets/home/event_info/cake_layer_one.svg';
import CAKE_LAYER_TWO from 'assets/home/event_info/cake_layer_two.svg';
import CAKE_LAYER_THREE from 'assets/home/event_info/cake_layer_three.svg';
import CAKE_STAND from 'assets/home/event_info/cake_stand.svg';

import INSTAGRAM_LOGO from 'assets/home/event_info/instagram_logo.svg';
import DISCORD_LOGO from 'assets/home/event_info/discord_logo.svg';
import TWITTER_LOGO from 'assets/home/event_info/twitter_logo.svg';

import PIPING_ANIMATION from 'assets/home/event_info/piping.json';

import faqs from './faqs';

import styles from './styles.module.scss';

const EventInfo: React.FC = () => {
  const [faqSectionIndex, setFaqSectionIndex] = useState(0);
  const piping = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (piping.current) {
      lottie.destroy();
      lottie.loadAnimation({
        container: piping.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: PIPING_ANIMATION,
      });
    }
  }, [faqSectionIndex]);

  return (
    <section className={styles.eventInfo}>
      <div className={styles.cakeLayer1}>
        <div className={styles.cakeTop}>
          <img className={styles.cakeFrosting} src={CAKE_LAYER_ONE} alt="" />
          <h1>The Event</h1>
        </div>
        <div className={styles.cakeMiddle}>
          <p><span className={styles.emphasized}>HackIllinois</span> is University of Illinois at Urbana-Champaign’s premiere collegiate hackathon. In recent years, we have run our first fully virtual hackathon as well as our very new Open Source Fellowship.</p>
          <p>This year, participants will take part virtually at HackIllinois. Participants can work individually or in teams to submit projects to a specific track for a chance to win the prize.</p>
        </div>
        <div className={styles.cakeBottom} />
      </div>
      <div className={styles.cakeLayer2}>
        <div className={styles.cakeTop}>
          <img className={styles.cakeFrosting} src={CAKE_LAYER_TWO} alt="" />
          <h1>Join Us</h1>
        </div>
        <div className={styles.cakeMiddle}>
          <p>Follow us on <span className={styles.emphasized}>Twitter (<a href="https://twitter.com/HackIllinois">@HackIllinois</a>)</span> and <span className={styles.emphasized}>Instagram (<a href="https://instagram.com/HackIllinois">@HackIllinois</a>)</span> to be notified of our event updates!</p>
          <p>As the event is fully virtual, we’ll connect mentors and attendees on Discord!</p>
          <div className={styles.platforms}>
            <div className={styles.platform}>
              <div className={styles.platformTitle}>
                <img src={DISCORD_LOGO} alt="Discord Logo" />
                <h2>Discord</h2>
              </div>
              <p className={styles.platformDescription}>Our discord server will be the main hub for our event. You’ll use this to find and communicate with teammates and other attendees, access our workshops and company events, and get help from mentors—all through one centralized platform.</p>
            </div>
            <div className={styles.platform}>
              <div className={styles.platformTitle}>
                <img src={TWITTER_LOGO} alt="Twitter Logo" />
                <h2>Twitter</h2>
              </div>
              <p className={styles.platformDescription}>This is where we’ll be posting main updates with regards to our schedule, additions to our event, and other things we come up with! We’ll also be using it during the event to make updates with any schedule changes and send out reminders for workshops and other mini-events starting out!</p>
            </div>
            <div className={styles.platform}>
              <div className={styles.platformTitle}>
                <img src={INSTAGRAM_LOGO} alt="Instagram Logo" />
                <h2>Instagram</h2>
              </div>
              <p className={styles.platformDescription}>This is where we’ll be posting more of the fun, behind-the-scenes aspects of our event! You’ll get an opportunity to see the work that goes into making the event a possibility through insights from teams and profiles of staff members.</p>
            </div>
          </div>
        </div>
        <div className={styles.cakeBottom} />
      </div>
      <div className={styles.cakeLayer3}>
        <div className={styles.cakeTop}>
          <img className={styles.cakeFrosting} src={CAKE_LAYER_THREE} alt="" />
          <h1>General FAQs</h1>
        </div>
        <div className={styles.cakeMiddle}>
          <div className={styles.faqSectionHeaders}>
            {Array(faqs.length).fill(0).map((_, i) => i).map((i) => (
              <div className={styles.faqSectionHeaderContainer}>
                <button key={i} className={styles.faqSectionHeader} onClick={() => setFaqSectionIndex(i)}>{faqs[i].sectionTitle}</button>
                {i === faqSectionIndex && <div ref={piping} className={styles.faqSectionPiping} />}
              </div>
            ))}
          </div>
          <div className={styles.faqContent}>
            {faqs[faqSectionIndex].sectionFaqs.map(({ question, answer }) => (
              <div className={styles.faqContentColumn}>
                <h3>{question}</h3>
                {answer.map((a) => (<p>{a}</p>))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.cakeBottom} />
      </div>
      <img className={styles.cakeStand} src={CAKE_STAND} alt="" />
    </section>
  );
};

export default EventInfo;
