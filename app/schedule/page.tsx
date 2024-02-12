'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { getEvents } from '@/utils/api';
import { EventType } from '@/utils/types';

import ScrollEnds from '@/public/schedule/scrollends.svg';
import MobileScrollEnds from '@/public/schedule/mobileScrollEnd.svg';
import Clock from '@/public/schedule/clock.svg';
import Pin from '@/public/schedule/pin.svg';
import Mountain from '@/public/schedule/bottom hill.svg';
import Wrinkle1 from '@/public/schedule/wrinkle 1.svg';
import Wrinkle2 from '@/public/schedule/wrinkle 2.svg';
import Wrinkle3 from '@/public/schedule/wrinkle 3.svg';
import StarCluster1 from '@/public/schedule/starCluster1.svg';
import StarCluster2 from '@/public/schedule/starCluster2.svg';
import StarCluster3 from '@/public/schedule/starCluster3.svg';
import StarCluster4 from '@/public/schedule/starCluster4.svg';
import Chest from '@/public/schedule/chest.svg';
import Header from '@/public/schedule/month header.svg';

import { ClickedFriday, ClickedSat, ClickedSun, Friday, Saturday, Sunday } from '@/public/schedule/swords/index.js';
import FriPot from '@/public/schedule/potions/FriPot.svg';
import SatPot from '@/public/schedule/potions/SatPot.svg';
import SunPot from '@/public/schedule/potions/SunPot.svg';

const Schedule: React.FC = () => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getEvents().then((data) => {
            setEvents(data);
            setIsLoading(false);
        });
    }, [isLoading]);

    const fridayEvents = events.filter(event => (
        Date.parse("February 23, 2024") <= event.startTime * 1000 && event.startTime * 1000 < Date.parse("February 24, 2024")
    )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
    ));
    
    const saturdayEvents = events.filter(event => (
        Date.parse("February 24, 2024") <= event.startTime * 1000 && event.startTime * 1000 < Date.parse("February 25, 2024")
    )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
    ));
    
    const sundayEvents = events.filter(event => (
        Date.parse("February 25, 2024") <= event.startTime * 1000
    )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
    ));
    const allEvents = [fridayEvents, saturdayEvents, sundayEvents];
    
    const [dayIndex, setDayIndex] = useState(0);
    const [friClicked, setFriClicked] = useState(true);
    const [satClicked, setSatClicked] = useState(false);
    const [sunClicked, setSunClicked] = useState(false);
    const handleClick = (id: number) => {
        if (id == 0) {
            setFriClicked(true);
            setSatClicked(false);
            setSunClicked(false);
            setDayIndex(0);
        } else if (id == 1) {
            setFriClicked(false);
            setSatClicked(true);
            setSunClicked(false);
            setDayIndex(1);
        } else {
            setFriClicked(false);
            setSatClicked(false);
            setSunClicked(true);
            setDayIndex(2);
        }
    }
    return (
        <section className={styles.schedContainer}>
            <div className={styles.itemContainer}>
                <div className={styles.notScrollContainer}>
                    <div className={styles.titleContainer}>
                        {/* <h3>FEBRUARY</h3> */}
                        <Image src={Header} alt="header" className={styles.header}/>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Image src={friClicked ? ClickedFriday : Friday} alt="sword" className={styles.sword} onClick={() => handleClick(0)}/>
                        <Image src={satClicked ? ClickedSat : Saturday} alt="sword" className={styles.sword} onClick={() => handleClick(1)}/>
                        <Image src={sunClicked ? ClickedSun : Sunday} alt="sword" className={styles.sword} onClick={() => handleClick(2)}/>
                    </div>
                    <div className={styles.potsContainer}>
                        <Image src={FriPot} alt="pot" className={styles.pot} onClick={() => handleClick(0)}/>
                        <Image src={SatPot} alt="pot" className={styles.pot} onClick={() => handleClick(1)}/>
                        <Image src={SunPot} alt="pot" className={styles.pot} onClick={() => handleClick(2)}/>
                    </div>
                </div>

                <div className={styles.scrollContainer}> {/* scroll */}
                    <Image src={StarCluster1} alt="star" className={styles.starCluster1}/>
                    <Image src={StarCluster2} alt="star" className={styles.starCluster2}/>
                    <Image src={StarCluster3} alt="star" className={styles.starCluster3}/>
                    <Image src={StarCluster4} alt="star" className={styles.starCluster4}/>
                    <Image src={Chest} alt="chest" className={styles.chest}/>
                    <Image src={MobileScrollEnds} alt="scroll" className={styles.mobileLeftScroll}/>
                    <Image src={ScrollEnds} alt="scroll" className={styles.leftScroll}/>
                    <div className={styles.scroll2}>
                        <Image src={Wrinkle1} alt="wrinkle" className={styles.wrinkle1}/>
                        <Image src={Wrinkle2} alt="wrinkle" className={styles.wrinkle2}/>
                        <Image src={Wrinkle3} alt="wrinkle" className={styles.wrinkle3}/>
                        <div className={styles.eventList}>
                            
                            {allEvents[dayIndex].map((event : EventType, index : number) => (
                                <div className={styles.eventCard} key={index}> 
                                    <div className={styles.headerContainer}> 
                                        <h3 className={styles.title}>{event.name}</h3>
                                        <div className={styles.tags}>
                                            {event.sponsor !== "" && <p className={styles.sponsor}>{event.sponsor}</p> }
                                            {event.isPro && <p className={styles.knights}>KNIGHTS</p>} 
                                            <p className={styles.type}>{event.eventType}</p>
                                            <p className={styles.points}>+{event.points} PTS</p>
                                        </div>
                                    </div>

                                    <div className={styles.timeContainer}> 
                                        <Image src={Clock} alt="clock" className={styles.clock}/>
                                        <p className={styles.time}>{new Date(event.startTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })} - {new Date(event.endTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</p>
                                    </div>
                                    <div className={styles.timeContainer}> 

                                        {event.locations.map((location, i) => (
                                            <>
                                                <Image src={Pin} alt="pin" className={styles.pin}/>
                                                <p className={styles.location} key={i}>
                                                    {location.description}
                                                </p>
                                            </>
                                        ))}
                                    </div>

                                    <p className={styles.description}>
                                        {event.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Image src={ScrollEnds} alt="scroll" className={styles.rightScroll}/>
                    <Image src={MobileScrollEnds} alt="scroll" className={styles.mobileRightScroll}/>
                </div>
            </div>
            <Image src={Mountain} alt="mountain" className={styles.mountain}/>
        </section>
    );
};

export default Schedule;
