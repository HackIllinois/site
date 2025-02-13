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
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import styles from "./styles.module.scss";
import clsx from "clsx";
import useWindowSize from "@/hooks/use-window-size";
import Image from "next/image";

type ScheduleItemProps = {
    event: EventType;
};

function timeToHourMinute(time: number) {
    const date = moment(time * 1000);
    return date.format("h:mm A");
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ event }) => {
    const tags = useMemo(() => {
        const newTags: string[] = [];
        if (event.isPro) {
            newTags.push("PRO");
        }

        if (event.eventType) {
            newTags.push(event.eventType);
        }

        if (event.isAsync) {
            newTags.push("ASYNC");
        }

        return newTags;
    }, [event.isPro, event.eventType, event.isAsync]);

    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    const COLORS = ["#DE8E45", "#C5673F", "#84BCB9"];

    const happeningNow = useMemo(() => {
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
                <Tags tags={tags} colors={COLORS} />
                <div className={styles.textRow}>
                    <div
                        style={{
                            backgroundImage: `url(${HOURGLASS?.src})`
                        }}
                        className={styles.icon}
                    ></div>
                    <p>
                        {timeToHourMinute(event.startTime)} -{" "}
                        {timeToHourMinute(event.endTime)}
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
                <div className={styles.textRow}>
                    <div
                        style={{
                            backgroundImage: `url(${GREEK_BUILDING?.src})`
                        }}
                        className={styles.icon}
                    ></div>
                    <p>{locations}</p>
                </div>
                <p>{event.description}</p>
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

    const availableDays = useMemo(() => {
        const days = new Set(events.map(event => event.day));
        return Array.from(days);
    }, [events]);

    const availableDayToDate = useMemo(() => {
        const dayToDate: { [key: string]: string } = {};
        for (const event of events) {
            const date = moment(event.startTime * 1000).format("MMMM D");
            dayToDate[event.day] = date;
        }
        return dayToDate;
    }, [availableDays]);

    const displayedEvents = useMemo(() => {
        return events.filter(event => event.day === selectedDay);
    }, [selectedDay]);

    const handleLoadEvents = async () => {
        try {
            const newEvents = await getEvents();
            setEvents(
                newEvents.map(event => {
                    return {
                        ...event,
                        day: moment(event.startTime * 1000).format("dddd")
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
            setSelectedDay(availableDays[0]);
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
                <div className={styles.dateSelector}>
                    <h1>
                        {selectedDay ? availableDayToDate[selectedDay] : ""}
                    </h1>
                    <div className={styles.availableDays}>
                        {availableDays.map(day => (
                            <RoundedButton
                                key={day}
                                text={day}
                                isSelected={day === selectedDay}
                                onClick={() => setSelectedDay(day)}
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
                        <div className={styles.events}>
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
        </>
    );
};

export default Schedule;
