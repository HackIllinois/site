"use client";
import { getEvents } from "@/util/api";
import { EventType } from "@/util/types";
import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { Tag } from "@/app/schedule/Tags";
import {
    ScheduleItem,
    ScheduleItemMobileWithPopup
} from "@/app/schedule/ScheduleItem";
import { DateSelector, DateSelectorMobile } from "@/app/schedule/DateSelector";
import FilterPopup from "@/app/schedule/FilterPopup";

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

    // Filter
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(
        new Set()
    );
    const [timeFilter, setTimeFilter] = useState<{
        from?: moment.Moment;
        to?: moment.Moment;
    }>({});

    const [loading, setLoading] = useState(false);
    const eventRef = useRef<HTMLDivElement>(null);
    const eventsBoxRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isBetweenSmAndMd = useMediaQuery(
        theme.breakpoints.between("sm", "md")
    );

    const handleSelectDay = (day: string) => {
        setSelectedDay(day);

        const scrollContainer = eventRef.current || eventsBoxRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: 0,
                behavior: "smooth"
            });
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

    const allTags: Tag[] = useMemo(() => {
        const tagsSet = new Set<string>();
        events.forEach(event => {
            if (event.eventType) tagsSet.add(event.eventType);
            if (event.points) tagsSet.add(`${event.points} pts`);
        });

        const tagsArray = Array.from(tagsSet).map(t => ({ id: t, label: t }));

        // sort alphabetically
        tagsArray.sort((a, b) => a.label.localeCompare(b.label));
        return tagsArray;
    }, [events]);

    const numFiltersApplied = useMemo(() => {
        const tagsChanged = selectedTagIds.size !== allTags.length ? 1 : 0;
        const timeChanged = !!timeFilter.from || !!timeFilter.to ? 1 : 0;
        return tagsChanged + timeChanged;
    }, [selectedTagIds.size, allTags.length, timeFilter.from, timeFilter.to]);

    const displayedEvents = useMemo(() => {
        if (!selectedDay) return [];

        return events
            .filter(event => {
                const eventId = moment(event.startTime * 1000)
                    .tz(EVENT_TIMEZONE)
                    .format("YYYY-MM-DD");
                if (eventId !== selectedDay) return false;

                // tag filter
                const eventTags = new Set<string>();
                if (event.eventType) eventTags.add(event.eventType);
                if (event.points) eventTags.add(`${event.points} pts`);

                const tagMatch = [...eventTags].some(tag =>
                    selectedTagIds.has(tag)
                );
                if (!tagMatch) return false;

                // time filter
                const start = moment(event.startTime * 1000).tz(EVENT_TIMEZONE);
                const end = moment(event.endTime * 1000).tz(EVENT_TIMEZONE);

                if (timeFilter.from) {
                    const from = moment(timeFilter.from).tz(EVENT_TIMEZONE);
                    if (
                        start.hours() < from.hours() ||
                        (start.hours() === from.hours() &&
                            start.minutes() < from.minutes())
                    )
                        return false;
                }

                if (timeFilter.to) {
                    const to = moment(timeFilter.to).tz(EVENT_TIMEZONE);

                    const toMinutes =
                        to.hours() === 0 && to.minutes() === 0
                            ? 24 * 60
                            : to.hours() * 60 + to.minutes();
                    const endMinutes =
                        end.hours() === 0 && end.minutes() === 0
                            ? 24 * 60
                            : end.hours() * 60 + end.minutes();

                    if (endMinutes > toMinutes) return false;
                }

                return true;
            })
            .sort((a, b) => a.startTime - b.startTime);
    }, [events, selectedDay, selectedTagIds]);

    const handleLoadEvents = async () => {
        const EVENT_DAYS = ["2/27", "2/28", "3/1"];

        setLoading(true);
        try {
            const newEvents = await getEvents();

            const eventsWithDay: EventsWithDay[] = newEvents
                .filter(event => event.eventType !== "MEETING")
                .map(event => {
                    const startMoment = moment(event.startTime * 1000).tz(
                        EVENT_TIMEZONE
                    );
                    return {
                        ...event,
                        weekday: startMoment.format("ddd").toUpperCase(), // "FRI"
                        date: startMoment.format("M/D"), // "2/27"
                        id: event.id
                    };
                })
                .filter(event => EVENT_DAYS.includes(event.date));

            console.log("eventsWithDay", eventsWithDay);

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

    useEffect(() => {
        setSelectedTagIds(new Set(allTags.map(t => t.id)));
    }, [allTags]);

    // lock scroll when filter is open
    useEffect(() => {
        if (filterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [filterOpen]);

    // Mobile layout
    if (isMobile) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: 'url("/schedule/mobile/background.svg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    pt: "120px",
                    gap: 3
                }}
            >
                {/* DATE SELECTORS */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        overflowX: "visible",
                        px: "8%"
                    }}
                >
                    {availableDays.map((date, index) => (
                        <DateSelectorMobile
                            key={date.id}
                            label={date.label}
                            day={date.day}
                            active={selectedDay === date.id}
                            onClick={() => handleSelectDay(date.id)}
                        />
                    ))}
                </Box>

                {/* EVENTS */}
                <Box
                    sx={{
                        position: "relative",
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        px: 0
                    }}
                >
                    {/* Scroll area + filters header */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            top: 0,
                            bottom: "2%",
                            zIndex: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}
                    >
                        {/* Scroll area */}
                        <Box
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
                            {/* Events list */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    width: "100%",
                                    boxSizing: "border-box",
                                    px: 0
                                }}
                            >
                                {displayedEvents.map((event, index) => (
                                    <ScheduleItemMobileWithPopup
                                        key={`event-${index}`}
                                        event={event}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    // Desktop/tablet layout
    return (
        <Box
            sx={{
                width: "100%",
                height: "100dvh",
                position: "relative",
                overflow: "hidden",
                backgroundImage: 'url("/schedule/background.svg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: { sm: "column", md: "row" },
                justifyContent: { sm: "center", md: "space-around" },
                alignItems: { sm: "center", md: "auto" },
                px: "80px",
                boxSizing: "border-box"
            }}
        >
            {/* Pink planet */}
            <Box
                component="img"
                src="/schedule/pink_planet.svg"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 50,
                    width: {
                        sm: "20vw",
                        md: "15vw"
                    },
                    zIndex: 11,
                    pointerEvents: "none",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 0px 8px rgba(238,130,205,1))"
                }}
            />

            {/* DATE SELECTORS */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { sm: "row", md: "column" },
                    flexShrink: 0,
                    alignSelf: "center",
                    gap: "30px",
                    overflowX: "visible",
                    overflowY: "visible",
                    paddingTop: { sm: "150px", md: "120px" },
                    mt: "-80px",
                    zIndex: 12
                }}
            >
                {availableDays.map((date, index) => {
                    const finalRotation = isBetweenSmAndMd
                        ? 0
                        : 10 * (index % 2 === 0 ? 1 : -1);
                    const finalOffsetX = isBetweenSmAndMd
                        ? 0
                        : index % 2 === 0
                          ? -10
                          : 10;

                    return (
                        <DateSelector
                            key={date.id}
                            label={date.label}
                            day={date.day}
                            active={selectedDay === date.id}
                            rotation={finalRotation}
                            offsetX={finalOffsetX}
                            onClick={() => handleSelectDay(date.id)}
                        />
                    );
                })}
            </Box>

            {/* EVENTS */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexGrow: 1,
                    alignSelf: { sm: "center", md: "flex-end" },
                    mt: { sm: "60px", md: "0px" }
                }}
            >
                {/* NOTEPAD ANCHOR */}
                <Box
                    sx={{
                        position: "relative",
                        width: { sm: "100%", md: "90%" },
                        display: "flex",
                        justifyContent: "center",
                        transform: "rotate(1.67deg)"
                    }}
                >
                    {/* Orange planet */}
                    <Box
                        component="img"
                        src="/schedule/orange_planet.svg"
                        sx={{
                            position: "absolute",
                            top: { sm: "-40px", md: "-60px" },
                            right: {
                                sm: "calc(-1 * (100vw - 95%) / 2)",
                                md: "calc(-5vw - 80px)"
                            },
                            width: {
                                sm: "15vw",
                                md: "12vw"
                            },
                            minWidth: "150px",
                            zIndex: 11,
                            pointerEvents: "none",
                            objectFit: "contain",
                            objectPosition: "right",
                            filter: "drop-shadow(0px 0px 8px rgba(255,165,89,1))",
                            transform: "rotate(-1.67deg)"
                        }}
                    />

                    {/* Alien image */}
                    <Box
                        component="img"
                        src="/schedule/alien.svg"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: "10%",
                            width: "20%",
                            zIndex: 10,
                            transform: "translate(-23%, -60%)"
                        }}
                    />

                    {/* Notepad spiral image */}
                    <Box
                        component="img"
                        src="/schedule/notepad_spiral.svg"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            width: "40%",
                            maxWidth: "400px",
                            zIndex: 10,
                            transform: "translate(-50%, -50%)"
                        }}
                    />

                    {/* Notepad background rectangle */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "80%",
                            right: "10%",
                            top: 0,
                            height: { sm: "65dvh", md: "80dvh" },
                            backgroundColor: "#6A4B8D",
                            borderRadius: "10px",
                            transform: "rotate(-5deg)",
                            transformOrigin: "top right",
                            zIndex: 1,
                            pointerEvents: "none"
                        }}
                    />

                    {/* Filter button and Events list */}
                    <Box
                        ref={eventsBoxRef}
                        sx={{
                            width: "80%",
                            height: { xs: "60vh", md: "70vh" },
                            position: "relative",
                            overflowY: "auto",
                            zIndex: 2,
                            background:
                                "linear-gradient(180deg, #FCADF8 0%, #BA80D5 100%)",
                            borderRadius: "10px",
                            py: 4,
                            px: 4,
                            mb: 2,
                            display: "flex",
                            flexDirection: "column"
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
                                    color: numFiltersApplied ? "#FFF" : "#000",
                                    backgroundColor: numFiltersApplied
                                        ? "rgba(0,0,0,0.4)"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: numFiltersApplied
                                            ? "rgba(0,0,0,0.6)"
                                            : "rgba(255,255,255,0.5)"
                                    },
                                    transition: "all 0.2s ease-in-out"
                                }}
                            >
                                <Badge
                                    invisible={!numFiltersApplied}
                                    color="primary"
                                    variant="dot"
                                >
                                    <FilterListIcon />
                                </Badge>
                            </IconButton>
                        </Box>

                        {/* Scroll area */}
                        <Box
                            ref={eventRef}
                            sx={{
                                flex: 1,
                                width: "100%",
                                py: 5,
                                px: 3,
                                overflowY: "auto",

                                "&::-webkit-scrollbar": { width: "6px" },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "rgba(0,0,0,0.4)"
                                    }
                                },

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
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        mt: 4,
                                        color: "#FFF",
                                        fontFamily:
                                            "'Tsukimi Rounded', sans-serif",
                                        fontWeight: "medium",
                                        fontSize: 16
                                    }}
                                >
                                    Loading...
                                </Typography>
                            )}

                            {!loading && displayedEvents.length === 0 && (
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        mt: 4,
                                        color: "#FFF",
                                        fontFamily:
                                            "'Tsukimi Rounded', sans-serif",
                                        fontWeight: "medium",
                                        fontSize: 16
                                    }}
                                >
                                    No events match your filters.
                                </Typography>
                            )}

                            {/* Events list */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                    width: "100%"
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

                    {/* Filter popup */}
                    {filterOpen && (
                        <>
                            {/* Backdrop */}
                            <Box
                                onClick={() => setFilterOpen(false)}
                                sx={{
                                    position: "fixed",
                                    top: "-100vh",
                                    left: "-100vw",
                                    width: "300vw",
                                    height: "300vh",
                                    zIndex: 9998,
                                    backgroundColor: "rgba(0,0,0,0.1)",
                                    cursor: "default",
                                    transform: "rotate(-1.67deg)"
                                }}
                            />

                            <Box
                                sx={{
                                    position: "absolute",
                                    zIndex: 10000,
                                    top: "50%",
                                    left: "50%",
                                    width: "fit-content",
                                    maxWidth: "90%",
                                    minWidth: "280px",
                                    maxHeight: "70dvh",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    transform:
                                        "translate(-50%, -50%) rotate(-1.67deg)",
                                    "& > *": {
                                        overflowY: "auto"
                                    }
                                }}
                            >
                                <FilterPopup
                                    tags={allTags}
                                    selectedTagIds={selectedTagIds}
                                    selectedTime={timeFilter}
                                    onClose={() => setFilterOpen(false)}
                                    onUpdate={(
                                        updatedIds,
                                        updatedTimeFilter
                                    ) => {
                                        setSelectedTagIds(new Set(updatedIds));
                                        setTimeFilter({ ...updatedTimeFilter });
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
