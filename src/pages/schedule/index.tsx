import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import axios from 'axios';

import styles from './styles.module.scss';
import FRONT_LIGHTS from '../../assets/schedule/lights.svg';
import TICKETS_HORIZONTAL from '../../assets/schedule/tickets_horizontal.svg';
import TICKETS_VERTICAL from '../../assets/schedule/tickets_vertical.svg';
import TIME_ICON from '../../assets/schedule/time_icon.svg';
import LOCATION_ICON from '../../assets/schedule/location_icon.svg';
import Navbar from "components/Navbar";

interface Event {
  id: string,
  name: string,
  description: string,
  startTime: number,
  endTime: number,
  locations: {
    description: string
  }[],
  points: number
};


type Day = "Friday" | "Saturday" | "Sunday";

const Schedule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async() => {
      const { data } = await axios("https://api.hackillinois.org/event/");

      const { events } = data;
  
      setEvents(events);
    }
    
    getEvents();
  }, [setEvents])
  

  const fridayEvents = events.filter(event => (
    Date.parse("February 24, 2023") < event.startTime * 1000 && event.startTime * 1000 < Date.parse("February 25, 2023")
  )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
  ));

  const saturdayEvents = events.filter(event => (
    Date.parse("February 25, 2023") < event.startTime * 1000 && event.startTime * 1000 < Date.parse("February 26, 2023")
  )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
  ));

  const sundayEvents = events.filter(event => (
    Date.parse("February 26, 2023") < event.startTime * 1000
  )).sort((a, b) => (
    a.startTime == b.startTime ? a.endTime - b.endTime : a.startTime - b.startTime
  ));

  const [ticketDays, setTicketDays] = useState<[Day, Day, Day]>(["Friday", "Saturday", "Sunday"]);
  const dayToEvents: { "Friday": Event[], "Saturday": Event[], "Sunday": Event[] } = {
    "Friday": fridayEvents,
    "Saturday": saturdayEvents,
    "Sunday": sundayEvents,
  };

  const dayToTitle: { "Friday": string, "Saturday": string, "Sunday": string } = {
    "Friday": "Friday Feb. 24th",
    "Saturday": "Saturday Feb. 25th",
    "Sunday": "Sunday Feb. 26th",
  };


  return (
    <>
      <Head>
        <title>HackIllinois | Schedule</title>
      </Head>
      <Navbar path="/schedule" />
      <div className={styles.schedule}>
          <img className={styles.frontLights} src={FRONT_LIGHTS} />
          <div className={styles.ticketWrapperHorizontal}>
            <div className={clsx(styles.ticketTitle, styles.ticketTitle1)} onClick={() => setTicketDays(([d0, d1, d2]) => [d1, d0, d2])}>{ticketDays[1]}</div>
            <div className={clsx(styles.ticketTitle, styles.ticketTitle2)} onClick={() => setTicketDays(([d0, d1, d2]) => [d2, d1, d0])}>{ticketDays[2]}</div>
            <img className={styles.tickets} src={TICKETS_HORIZONTAL} />
            <table className={styles.ticketContent}>
              <thead>
                <tr>
                  <th>{dayToTitle[ticketDays[0]]}</th>
                  <th className={styles.gap}></th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                {dayToEvents[ticketDays[0]].map(event => (
                  <tr key={event.id}>
                    <td>
                      <div className={styles.timeBox}>
                        <div>
                          <img className={styles.icon} src={TIME_ICON} />
                          <div>{new Date(event.startTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })} - {new Date(event.endTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</div>
                        </div>
                        {event.locations.map((location, i) => (
                          <div key={i}>
                            <img className={styles.icon} src={LOCATION_ICON} />
                            {location.description}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className={styles.eventBox}>
                        <div className={styles.title}>{event.name}</div>
                        {event.points > 0 && <div className={styles.points}>{event.points} Points</div>}
                        <div className={styles.description}>{event.description}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.ticketWrapperVertical}>
            <div className={clsx(styles.ticketTitle, styles.ticketTitle1)} onClick={() => setTicketDays(([d0, d1, d2]) => [d1, d0, d2])}>{ticketDays[1]}</div>
            <div className={clsx(styles.ticketTitle, styles.ticketTitle2)} onClick={() => setTicketDays(([d0, d1, d2]) => [d2, d1, d0])}>{ticketDays[2]}</div>
            <img className={styles.tickets} src={TICKETS_VERTICAL} />
            <div className={styles.ticketContent}>
              <div className={styles.ticketHeader}>{ticketDays[0]}</div>
              <table>
                <tbody>
                  <tr className={styles.timeBoxes}>
                    {dayToEvents[ticketDays[0]].map(event => (
                      <td>
                        <div className={styles.timeBox}>
                          <div>
                            <img className={styles.icon} src={TIME_ICON} />
                            <div>{new Date(event.startTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })} - {new Date(event.endTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</div>
                          </div>
                          {event.locations.map(location => (
                            <div>
                              <img className={styles.icon} src={LOCATION_ICON} />
                              {location.description}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {dayToEvents[ticketDays[0]].map(() => <td />)}
                  </tr>
                  <tr>
                    {dayToEvents[ticketDays[0]].map(event => (
                        <td>
                          <div className={styles.eventBox}>
                            <div className={styles.title}>{event.name}</div>
                            {event.points > 0 && <div className={styles.points}>{event.points} Points</div>}
                            <div className={styles.description}>{event.description}</div>
                          </div>
                        </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </>
  );
};

// export const getStaticProps = async () => {
//   const { data } = await axios("https://api.hackillinois.org/event/");

//   const { events } = data;

//   return {
//     props: {
//       events
//     }
//   };
// };


export default Schedule;

