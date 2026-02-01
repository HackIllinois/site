"use client";
import { getEvents } from "@/util/api";
import { EventType } from "@/util/types";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import { Box, IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { TagsList } from "@/app/schedule/Tags";
import DateSelector from "@/app/schedule/DateSelector";
import FilterPopup from "@/app/schedule/FilterPopup";

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
                width: 600,
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                {/* Event title */}
                <Typography
                    sx={{
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: 30,
                        background:
                            "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {event.name}
                </Typography>

                {/* Tags */}
                <TagsList tags={tags} />
            </Box>

            {/* Time */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: 20,
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
                            fontSize: 20,
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
                        fontSize: 14,
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

// for DateSelector filters
export interface DateOption {
    id: string; // ex. "2026-02-27"
    label: string; // ex. "FRI"
    day: string; // ex. "2/27"
}

const Schedule = () => {
    const [events, setEvents] = useState<EventsWithDay[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | undefined>();
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const eventRef = useRef<HTMLDivElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

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
            const id = dateMoment.format("YYYY-MM-DD");
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
                height: "135vh",
                position: "relative",
                overflow: "hidden",
                backgroundImage: 'url("/schedule/desktop_bkgd.svg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
                pt: "80px",
                px: "100px"
            }}
        >
            {/* Orange planet */}
            <Box
                component="img"
                src="/schedule/orange_planet.svg"
                sx={{
                    position: "absolute",
                    top: 150,
                    right: 0,
                    width: 100,
                    zIndex: 2,
                    pointerEvents: "none",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 0px 8px rgba(255,165,89,1))"
                }}
            />

            {/* Pink planet */}
            <Box
                component="img"
                src="/schedule/pink_planet.svg"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 50,
                    width: 200,
                    zIndex: 1,
                    pointerEvents: "none",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 0px 8px rgba(238,130,205,1))"
                }}
            />

            {/* DATE SELECTORS */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    overflowX: "visible",
                    overflowY: "visible",
                    paddingTop: "120px"
                }}
            >
                {availableDays.map((date, index) => (
                    <DateSelector
                        key={date.id}
                        label={date.label}
                        day={date.day}
                        active={selectedDay === date.id}
                        rotation={10 * (index % 2 === 0 ? 1 : -1)}
                        offsetX={index % 2 === 0 ? -10 : 10}
                        onClick={() => handleSelectDay(date.id)}
                    />
                ))}
            </Box>

            {/* EVENTS */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
            >
                {/* Notepad wrapper */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "800px", // notepad image size
                        aspectRatio: "5/6"
                    }}
                >
                    {/* Notepad image */}
                    <Box
                        component="img"
                        src="/schedule/notepad.svg"
                        sx={{
                            position: "absolute",
                            bottom: 100,
                            right: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 1,
                            pointerEvents: "none",
                            objectFit: "contain"
                        }}
                    />

                    {/* Scroll area + filters header */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 200,
                            bottom: 325,
                            left: "10%",
                            right: "8%",
                            zIndex: 2,
                            transform: "rotate(1.67deg)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        {/* Filters button */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <IconButton
                                onClick={() => setFilterOpen(true)}
                                sx={{
                                    color: "#000",
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.5)"
                                    }
                                }}
                            >
                                <FilterListIcon />
                            </IconButton>
                        </Box>

                        {/* Scroll area */}
                        <Box
                            ref={scrollRef}
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                overflowX: "hidden",

                                "&::-webkit-scrollbar": { width: "6px" },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    borderRadius: "10px"
                                },

                                // fade top/bottom edges
                                WebkitMaskImage:
                                    "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskSize: "100% 100%",
                                maskImage:
                                    "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
                                maskRepeat: "no-repeat",
                                maskSize: "100% 100%"
                            }}
                        >
                            {loading && (
                                <Typography sx={{ color: "black" }}>
                                    Loading...
                                </Typography>
                            )}

                            {/* Events list */}
                            <Box
                                ref={contentRef}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    width: "100%",
                                    boxSizing: "border-box",
                                    pr: 2
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

                    {/* Filters popup */}
                    {filterOpen && (
                        <FilterPopup
                            tags={[
                                { name: "Workshop" },
                                { name: "Food" },
                                { name: "Main Event" }
                            ]}
                            onClose={() => setFilterOpen(false)}
                            onUpdate={() => {
                                // TODO: apply filters
                                setFilterOpen(false);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
