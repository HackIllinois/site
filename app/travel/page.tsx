/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

import CastleTop from '@/public/travel/castle top.svg';
import RightTower from '@/public/travel/right tower.svg';
import LeftTower from '@/public/travel/left tower.svg';
import LeftFlames from '@/public/travel/left flames.svg';
import MobileTop from '@/public/travel/mobile top.svg';
import Alan from '@/public/travel/alan.svg';
import MobileFlame from '@/public/travel/mobile flame.svg';
import RightCloud from '@/public/travel/right cloud.svg';
import MiddleCloud from '@/public/travel/middle cloud.svg';
import Brick from '@/public/travel/brick.svg';

const Travel: React.FC = () => {
    return (
        <section className={styles.travel}>

            <Image className={styles.rightCloud} src={RightCloud} alt="Right Cloud" />
            <Image className={styles.middleCloud} src={MiddleCloud} alt="Middle Cloud" />
            <Image className={styles.leftTower} src={LeftTower} alt="Left Tower" />
            <Image className={styles.leftFlames} src={LeftFlames} alt="Left Flames" />
            <Image className={styles.alan} src={Alan} alt="Alan" />

            <div className={styles.castle}>
                <Image className={styles.mobileTop} src={MobileTop} alt="Mobile Top" />
                <Image className={styles.castleTop} src={CastleTop} alt="Castle Top" />
                <Image className={styles.mobileFlame} src={MobileFlame} alt="Mobile Flame" />
                <div className={styles.castleBase}>
                    <div>
                        <Image className={styles.brick1} src={Brick} alt="Brick" />
                        <Image className={styles.brick2} src={Brick} alt="Brick" />
                        <Image className={styles.brick3} src={Brick} alt="Brick" />
                        <Image className={styles.brick8} src={Brick} alt="Brick" />
                    </div>
                    <div className={styles.doorway}>
                        <div className={styles.travelInfo}>
                            <h3>TRAVEL</h3>
                            <br></br>
                            <p>
                                For HackIllinois 2024, we are excited to offer travel reimbursements to qualifying attendees. 
                                To be considered for reimbursement, participants must opt-in during the registration process 
                                for HackIllinois.
                            </p>
                            <br></br>
                            <p>
                                It's important to note that opting in for reimbursement consideration will not impact your chances of being admitted to the event.
                            </p>
                            <br></br>
                            <p>
                                To qualify for reimbursement, attendees <b>must</b> meet the following criteria:
                            </p>
                            <br></br>
                            <ul>
                                <li>Receive an acceptance to HackIllinois with a specified reimbursement amount notified in their acceptance portal.</li>
                                <li>RSVP ‘Yes’ to attend HackIllinois.</li>
                                <li>Attend HackIllinois 2024 in person.</li>
                                <li>Submit a qualifying project for the HackIllinois hackathon.</li>
                            </ul>
                            <br></br>
                            <p>
                                Please be aware that failing to meet any of these requirements will result 
                                in disqualification from receiving any reimbursement.
                            </p>
                            <br></br>
                            <p>
                                The determination of reimbursement amounts is influenced by several factors, 
                                including but not limited to an applicant’s geographic location and their distance from 
                                the University of Illinois Urbana-Champaign campus. Although a preliminary reimbursement 
                                amount may be indicated upon acceptance, please understand that this amount is <b>not guaranteed</b> and may be subject to adjustments based on the final review 
                                of eligibility criteria.
                            </p>
                            <br></br>
                            <p>
                                For further questions regarding travel logistics or reimbursement, 
                                please contact <a href="mailto:travel@hackillinois.org">travel@hackillinois.org</a>.
                            </p>
                        </div>
                    </div>

                    <div>
                        <Image className={styles.brick4} src={Brick} alt="Brick" />
                        <Image className={styles.brick5} src={Brick} alt="Brick" />
                        <Image className={styles.brick6} src={Brick} alt="Brick" />
                        <Image className={styles.brick7} src={Brick} alt="Brick" />
                    </div>
                </div>

            </div>
            <Image className={styles.rightTower} src={RightTower} alt="Right Tower" />
            
            
        </section>
    );
};

export default Travel;