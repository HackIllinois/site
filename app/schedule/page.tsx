"use client";
import Tags from "@/app/schedule/Tags";
import DateSelector from "@/app/schedule/DateSelector";
import { getEvents } from "@/util/api";
import { EventType } from "@/util/types";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import { Box, Typography } from "@mui/material";

type ScheduleItemProps = {
    event: EventType;
};

function timeToHourMinute(time: number) {
    const date = moment(time * 1000).tz(EVENT_TIMEZONE);
    return date.format("h:mm A");
}

export type tag = {
    name: string;
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({ event }) => {
    const tags = useMemo(() => {
        const newTags: tag[] = [];

        if (event.eventType) {
            newTags.push({ name: event.eventType });
        }

        if (event.points) {
            newTags.push({ name: `${event.points} pts` });
        }

        // TODO: add more tags as needed

        return newTags;
    }, [event]);

    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    return (
        <Box
            sx={{
                backgroundColor: "#2B1350",
                borderRadius: "20px",
                p: 4,
                width: "100%",
                maxWidth: 800,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            {/* Event title */}
            <Typography
                sx={{
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: "bold",
                    fontSize: "40px",
                    background:
                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                {event.name}
            </Typography>

            {/* Tags */}
            <Tags tags={tags} />

            {/* Time */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: 26,
                        color: "#EDDBFF"
                    }}
                >
                    {event.startTime === event.endTime
                        ? timeToHourMinute(event.startTime)
                        : `${timeToHourMinute(event.startTime)} - ${timeToHourMinute(event.endTime)}`}
                </Typography>
            </Box>

            {/* Locations */}
            {locations.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: 26,
                            color: "#EDDBFF"
                        }}
                    >
                        {locations}
                    </Typography>
                </Box>
            )}

            {/* Description */}
            {event.description && (
                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: 16,
                        color: "#EDDBFF"
                    }}
                >
                    {event.description}
                </Typography>
            )}
        </Box>
    );
};

export interface EventsWithDay extends EventType {
    weekday: string; // ex. "Friday"
    date: string; // ex. "2/27"
}

export interface DateOption {
    id: string; // ex. "2026-02-27"
    label: string; // ex. "FRI"
    day: string; // ex. "2/27"
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

    const availableDays: DateOption[] = useMemo(() => {
        const seen = new Map<string, DateOption>();
        events.forEach(event => {
            const dateMoment = moment(event.startTime * 1000).tz(
                EVENT_TIMEZONE
            );
            const id = dateMoment.format("YYYY-MM-DD"); // stable unique key
            if (!seen.has(id)) {
                seen.set(id, {
                    id,
                    label: dateMoment.format("ddd").toUpperCase(), // FRI
                    day: dateMoment.format("M/D") // 2/27
                });
            }
        });
        return Array.from(seen.values());
    }, [events]);

    const displayedEvents = useMemo(() => {
        if (!selectedDay) return [];
        return events
            .filter(event => {
                const eventId = moment(event.startTime * 1000)
                    .tz(EVENT_TIMEZONE)
                    .format("YYYY-MM-DD");
                return eventId === selectedDay;
            })
            .sort((a, b) => a.startTime - b.startTime);
    }, [events, selectedDay]);

    // const handleLoadEvents = async () => {
    //     try {
    //         const newEvents = await getEvents();
    //         setEvents(
    //             newEvents.map(event => {
    //                 return {
    //                     ...event,
    //                     day: moment(event.startTime * 1000)
    //                         .tz(EVENT_TIMEZONE)
    //                         .format("dddd, MMMM D")
    //                 };
    //             })
    //         );
    //     } catch {
    //         setLoading(false);
    //     }
    // };

    const handleLoadEvents = async () => {
        setLoading(true);
        try {
            const newEvents = await getEvents();

            const eventsWithDay: EventsWithDay[] = newEvents.map(event => {
                const startMoment = moment(event.startTime * 1000).tz(
                    EVENT_TIMEZONE
                );
                return {
                    ...event,
                    weekday: startMoment.format("ddd").toUpperCase(), // "FRI"
                    date: startMoment.format("M/D"), // "2/27"
                    id: event.id
                };
            });

            setEvents(eventsWithDay);
        } catch (err) {
            console.error("Error loading events:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadEvents();
    }, []);

    // useEffect(() => {
    //     if (availableDays.length > 0 && !selectedDay) {
    //         const currentDay = moment(new Date())
    //             .tz(EVENT_TIMEZONE)
    //             .format("dddd, MMMM D");
    //         setSelectedDay(
    //             availableDays.includes(currentDay)
    //                 ? currentDay
    //                 : availableDays[0]
    //         );
    //     }
    // }, [availableDays]);

    useEffect(() => {
        if (!selectedDay && availableDays.length > 0) {
            const todayId = moment().tz(EVENT_TIMEZONE).format("YYYY-MM-DD");
            setSelectedDay(
                availableDays.find(d => d.id === todayId)?.id ??
                    availableDays[0].id
            );
        }
    }, [availableDays, selectedDay]);

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#020316"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: {
                        xs: 'url("/schedule/desktop_bkgd.svg")'
                    },
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    pt: "100px",
                    pb: "200px",
                    px: "100px"
                }}
            >
                {/* DATE SELECTORS */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: 120,
                        overflowY: "auto",
                        pr: 1
                    }}
                >
                    {availableDays.map((date, index) => (
                        <DateSelector
                            key={date.id}
                            label={date.label}
                            day={date.day}
                            active={selectedDay === date.id}
                            rotation={((index * 7) % 10) - 5}
                            offsetY={((index * 11) % 8) - 4}
                            onClick={() => setSelectedDay(date.id)}
                        />
                    ))}
                </Box>

                {/* EVENTS */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        pr: 2
                    }}
                >
                    {loading && <Typography>Loading...</Typography>}

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3
                        }}
                    >
                        {displayedEvents.map((event, index) => (
                            <ScheduleItem
                                key={`event-${index}`}
                                event={event}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
