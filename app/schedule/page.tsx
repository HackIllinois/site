"use client";
import RoundedButton from "@/components/Form/RoundedButton/RoundedButton";
import Tags from "@/components/Form/Tags/Tags";

import SCHEDULE_BACKGROUND from "@/public/schedule/schedule-background.svg";
import STONE_TABLET from "@/public/schedule/stone-tablet.svg";

import PENNANT from "@/public/schedule/icons/pennant.svg";
import HOURGLASS from "@/public/schedule/icons/hourglass.svg";
import GREEK_BUILDING from "@/public/schedule/icons/greek-building.svg";

import { getEvents } from "@/util/api";
import { EventType } from "@/util/types";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";
import styles from "./styles.module.scss";
import clsx from "clsx";
import useWindowSize from "@/hooks/use-window-size";
import Image from "next/image";
import { EVENT_TIMEZONE } from "@/util/config";

type ScheduleItemProps = {
    event: EventType;
};

function timeToHourMinute(time: number) {
    const date = moment(time * 1000).tz(EVENT_TIMEZONE);
    return date.format("h:mm A");
}

export type tag = {
    name: string;
    color: string;
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({ event }) => {
    const tags = useMemo(() => {
        const newTags: tag[] = [];

        if (event.isPro) {
            newTags.push({ name: "PRO", color: "#DE8E45" });
        }

        if (event.eventType) {
            newTags.push({ name: event.eventType, color: "#C5673F" });
        }

        // if (event.isAsync) {
        //     newTags.push("ASYNC");
        // }

        if (event.points) {
            newTags.push({ name: `${event.points} pts`, color: "#84BCB9" });
        }

        return newTags;
    }, [event]);

    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    // const COLORS = ["#84BCB9", "#DE8E45", "#C5673F"];

    const happeningNow = useMemo(() => {
        //
        const now = moment().unix();
        console.log(now, event.startTime, event.endTime);
        return event.startTime <= now && event.endTime >= now;
        // return true;
    }, [event.startTime, event.endTime]);

    return (
        <div>
            {happeningNow && (
                <p className={styles.happeningNowDiv}>HAPPENING NOW</p>
            )}
            <div
                className={clsx(
                    styles.scheduleItem,
                    happeningNow && styles.happeningNow
                )}
            >
                <h3>{event.name}</h3>
                <Tags tags={tags} />
                <div className={styles.textRow}>
                    <div
                        style={{
                            backgroundImage: `url(${HOURGLASS?.src})`
                        }}
                        className={styles.icon}
                    ></div>
                    <p>
                        {event.startTime === event.endTime
                            ? timeToHourMinute(event.startTime)
                            : `${timeToHourMinute(event.startTime)} - ${timeToHourMinute(event.endTime)}`}
                    </p>
                </div>
                {event.sponsor && (
                    <div className={styles.textRow}>
                        <div
                            style={{
                                backgroundImage: `url(${PENNANT?.src})`
                            }}
                            className={styles.icon}
                        ></div>
                        <p>{event.sponsor}</p>
                    </div>
                )}
                {locations.length > 0 && (
                    <div className={styles.textRow}>
                        <div
                            style={{
                                backgroundImage: `url(${GREEK_BUILDING?.src})`
                            }}
                            className={styles.icon}
                        ></div>
                        <p>{locations}</p>
                    </div>
                )}
                <p className={styles.description}>{event.description}</p>
            </div>
        </div>
    );
};

export interface EventsWithDay extends EventType {
    day: string;
}

const Schedule = () => {
    const [events, setEvents] = useState<EventsWithDay[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const eventRef = useRef<HTMLDivElement>(null);

    const handleSelectDay = (day: string) => {
        setSelectedDay(day);
        if (eventRef.current) {
            eventRef.current.scrollTop = 0;
        }
    };

    const availableDays = useMemo(() => {
        const days = new Set(events.map(event => event.day));
        return Array.from(days);
    }, [events]);

    const displayedEvents = useMemo(() => {
        return events
            .filter(event => event.day === selectedDay)
            .sort((a, b) => {
                if (a.startTime == b.startTime) {
                    return a.endTime - b.endTime;
                }
                return a.startTime - b.startTime;
            });
    }, [selectedDay]);

    const handleLoadEvents = async () => {
        try {
            const newEvents = await getEvents();
            setEvents(
                newEvents.map(event => {
                    return {
                        ...event,
                        day: moment(event.startTime * 1000)
                            .tz(EVENT_TIMEZONE)
                            .format("dddd, MMMM D")
                    };
                })
            );
        } catch {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadEvents();
    }, []);

    useEffect(() => {
        if (availableDays.length > 0 && !selectedDay) {
            const currentDay = moment(new Date())
                .tz(EVENT_TIMEZONE)
                .format("dddd, MMMM D");
            setSelectedDay(
                availableDays.includes(currentDay)
                    ? currentDay
                    : availableDays[0]
            );
        }
    }, [availableDays]);

    const windowSizeHook = useWindowSize();

    return (
        <>
            <Head>
                <title>HackIllinois | Schedule</title>
            </Head>

            <div
                style={{
                    backgroundImage: `url(${SCHEDULE_BACKGROUND?.src})`
                }}
                className={styles.screen}
            >
                <div>
                    <div className={styles.dateSelector}>
                        <div className={styles.availableDays}>
                            {availableDays.map(day => (
                                <RoundedButton
                                    key={day}
                                    text={day}
                                    isSelected={day === selectedDay}
                                    onClick={() => handleSelectDay(day)}
                                />
                            ))}
                        </div>

                        <div className={styles.cerberus}>
                            <Image
                                src="/schedule/characters/cerberus.svg"
                                fill
                                alt="cerberus"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>

                    <div className={styles.eventContent}>
                        {loading && <p>Loading...</p>}

                        <div
                            style={{
                                backgroundImage:
                                    windowSizeHook?.width &&
                                    windowSizeHook?.width > 768
                                        ? `url(${STONE_TABLET?.src})`
                                        : ""
                            }}
                            className={styles.stoneTablet}
                        >
                            <div ref={eventRef} className={styles.events}>
                                {displayedEvents.map((event, index) => (
                                    <ScheduleItem
                                        key={`event-${index}`}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
