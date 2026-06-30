"use client";
import { getEvents } from "@/util/api";
import { EventType } from "@/util/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import {
    Badge,
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion } from "framer-motion";

import { Tag } from "@/app.backup/schedule/Tags";
import { ScheduleItem } from "@/app.backup/schedule/ScheduleItem";
import { DateSelector } from "@/app.backup/schedule/DateSelector";
import FilterPopup from "@/app.backup/schedule/FilterPopup";

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

const TwinklingStar = ({
    size,
    top,
    left,
    delay,
    duration
}: {
    size: number;
    top: string;
    left: string;
    delay: number;
    duration: number;
}) => (
    <Box
        component={motion.div}
        animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        sx={{
            position: "absolute",
            top,
            left,
            width: size,
            height: size,
            backgroundColor: "#FFF",
            borderRadius: "50%",
            zIndex: 0,
            boxShadow: "0px 0px 4px 1px rgba(255, 255, 255, 0.6)"
        }}
    />
);

const BlinkingAlien = () => {
    const [isLookingRight, setIsLookingRight] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const performAction = () => {
            // start the blink
            setIsBlinking(true);

            // during the blink, decide whether to change direction
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    setIsLookingRight(prev => !prev);
                }
            }, 100);

            // end the blink
            setTimeout(() => {
                setIsBlinking(false);
                const nextInterval = 2000 + Math.random() * 3000;
                timeoutId = setTimeout(performAction, nextInterval);
            }, 200);
        };

        timeoutId = setTimeout(performAction, 1000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: { xs: "5%", md: "10%" },
                width: { xs: "18dvw", md: "10dvw" },
                zIndex: 10,
                transform: "translate(-23%, -60%)",
                pointerEvents: "none"
            }}
        >
            {/* Base image (centered eyes) */}
            <Box
                component="img"
                src="/schedule/alien.svg"
                sx={{ width: "100%", display: "block" }}
            />

            {/* Looking right overlay */}
            <Box
                component={motion.img}
                src="/schedule/alien_looking_right.svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLookingRight ? 1 : 0 }}
                transition={{ duration: 0 }}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1
                }}
            />

            {/* Closed eyes overlay */}
            <Box
                component={motion.img}
                src="/schedule/alien_eye_closed.svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: isBlinking ? 1 : 0 }}
                transition={{
                    duration: 0.05,
                    ease: "linear"
                }}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2
                }}
            />
        </Box>
    );
};

const Schedule = () => {
    const [events, setEvents] = useState<EventsWithDay[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | undefined>();

    const [stars, setStars] = useState<
        {
            id: number;
            size: number;
            top: string;
            left: string;
            delay: number;
            duration: number;
        }[]
    >([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: 2 + Math.random() * 2
        }));
        setStars(generatedStars);
    }, []);

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
    const dateSelectorContainerRef = useRef<HTMLDivElement>(null);

    const theme = useTheme();
    const isBetweenXsAndMd = useMediaQuery(
        theme.breakpoints.between("xs", "md")
    );
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const isShortScreen = useMediaQuery("(max-height: 550px)");

    const handleSelectDay = useCallback(
        (day: string) => {
            setSelectedDay(day);

            const scrollContainer = eventRef.current || eventsBoxRef.current;
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            // Auto-scroll the date selector to the clicked date on mobile
            // Only when dates are in a horizontal row (xs–sm viewports)
            const container = dateSelectorContainerRef.current;
            if (container && isBetweenXsAndMd) {
                const target = container.querySelector(
                    `[data-date-id="${day}"]`
                ) as HTMLElement | null;
                if (target) {
                    const scrollLeft =
                        target.offsetLeft -
                        container.offsetWidth / 2 +
                        target.offsetWidth / 2;
                    container.scrollTo({
                        left: scrollLeft,
                        behavior: "smooth"
                    });
                }
            }
        },
        [isBetweenXsAndMd]
    );

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
                .filter(event => {
                    if (event.eventType === "MEETING") {
                        return false;
                    }
                    if (event.isPrivate) {
                        return false;
                    }
                    return true;
                })
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

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "unset", md: "auto" },
                minHeight: "100dvh",
                position: "relative",
                overflow: "hidden",
                backgroundImage: 'url("/schedule/background.svg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
                justifyContent: { xs: "center", md: "space-between" },
                px: { xs: "1px", md: "80px" },
                pt: {
                    xs:
                        events.length > 0
                            ? "calc(60px + env(safe-area-inset-top))"
                            : "150px",
                    md: "150px",
                    lg: "180px"
                },
                pb: isBetweenXsAndMd || isShortScreen ? 2 : 0,
                boxSizing: "border-box"
            }}
        >
            {/* Background twinkling stars */}
            {stars.map(star => (
                <TwinklingStar key={star.id} {...star} />
            ))}

            {/* Pink planet */}
            {!isBetweenXsAndMd && (
                <Box
                    component={motion.img}
                    src="/schedule/pink_planet.svg"
                    animate={{
                        y: [0, 10, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    sx={{
                        position: "absolute",
                        bottom: { xs: "-4%", lg: "-7%" },
                        left: { xs: 10, md: 50 },
                        width: {
                            xs: "20vw",
                            sm: "15vw",
                            md: "15vw"
                        },
                        zIndex: 11,
                        pointerEvents: "none",
                        objectFit: "contain",
                        filter: "drop-shadow(0px 0px 8px rgba(238,130,205,1))"
                    }}
                />
            )}

            {/* DATE SELECTORS */}
            <Box
                ref={dateSelectorContainerRef}
                sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    justifyContent: { xs: "flex-start", sm: "space-around" },
                    flexShrink: 0,
                    alignSelf: { xs: "center", md: "flex-start" },
                    gap: { xs: "10px", sm: "30px", xl: "60px" },
                    width: { xs: "100%", sm: "auto" },
                    overflowX: { xs: "auto", md: "visible" },
                    overflowY: { xs: "hidden", md: "visible" },
                    zIndex: 12,
                    px: { xs: 2, sm: 0 },
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",

                    // Right-edge fade to hint at horizontal scroll
                    maskImage: {
                        xs: "linear-gradient(to right, black 80%, transparent 100%)",
                        sm: "none"
                    },
                    WebkitMaskImage: {
                        xs: "linear-gradient(to right, black 80%, transparent 100%)",
                        sm: "none"
                    }
                }}
            >
                {availableDays.map((date, index) => {
                    const finalRotation = isBetweenXsAndMd
                        ? 0
                        : 10 * (index % 2 === 0 ? 1 : -1);
                    const finalOffsetX = isBetweenXsAndMd
                        ? 0
                        : index % 2 === 0
                          ? -10
                          : 10;

                    return (
                        <motion.div
                            key={date.id}
                            data-date-id={date.id}
                            animate={
                                !isBetweenXsAndMd
                                    ? {
                                          x: [-8, 8, -8]
                                      }
                                    : {}
                            }
                            whileHover={
                                !isBetweenXsAndMd
                                    ? {
                                          rotate: [0, -2, 2, -1, 0]
                                      }
                                    : {}
                            }
                            transition={{
                                x: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.4
                                },
                                rotate: {
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }
                            }}
                            style={{
                                width: "fit-content",
                                flexShrink: 0,
                                cursor: "pointer"
                            }}
                        >
                            <DateSelector
                                label={date.label}
                                day={date.day}
                                active={selectedDay === date.id}
                                rotation={finalRotation}
                                offsetX={finalOffsetX}
                                onClick={() => handleSelectDay(date.id)}
                            />
                        </motion.div>
                    );
                })}
            </Box>

            {/* EVENTS */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1440px",
                    maxHeight: isMdUp && !isShortScreen ? "70dvh" : "none",
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                    flexGrow: 1,
                    alignSelf: { xs: "center", md: "auto" },
                    pr: { xs: 0, md: "5vw", lg: "8vw", xl: "0vw" }
                }}
            >
                {/* NOTEPAD ANCHOR */}
                <Box
                    sx={{
                        position: "relative",
                        width: { xs: "100%", md: "90dvw" },
                        minHeight: "70dvh",
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        transform:
                            !isBetweenXsAndMd && !isShortScreen
                                ? "rotate(0.5deg)"
                                : "none"
                    }}
                >
                    {/* Orange planet */}
                    {!isBetweenXsAndMd && (
                        <Box
                            component={motion.img}
                            src="/schedule/orange_planet.svg"
                            animate={{
                                y: [0, 10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                            sx={{
                                position: "absolute",
                                right: -10,
                                top: "-120px",
                                width: "15vw",
                                minWidth: "120px",
                                maxWidth: "220px",
                                zIndex: 11,
                                pointerEvents: "none",
                                objectFit: "contain",
                                objectPosition: "right",
                                filter: "drop-shadow(0px 0px 8px rgba(255,165,89,1))"
                            }}
                        />
                    )}

                    {/* Alien image */}
                    <BlinkingAlien />

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
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none"
                        }}
                    />

                    {/* Notepad background rectangle */}
                    {!isBetweenXsAndMd && !isShortScreen && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                width: "80%",
                                right: "10%",
                                height: { md: "90dvh" },
                                backgroundColor: "#6A4B8D",
                                borderRadius: "10px",
                                transform: "rotate(-5deg)",
                                transformOrigin: "top right",
                                zIndex: 1,
                                pointerEvents: "none"
                            }}
                        />
                    )}

                    {/* Filter button and Events list */}
                    <Box
                        ref={eventsBoxRef}
                        sx={{
                            width: { xs: "90%", md: "80%" },
                            position: "relative",
                            height:
                                isMdUp && !isShortScreen
                                    ? {
                                          md: "calc(100dvh - 150px)",
                                          lg: "calc(100dvh - 180px)",
                                          xl: "calc(100dvh - 200px)"
                                      }
                                    : "auto",
                            overflowY:
                                isMdUp && !isShortScreen ? "auto" : "visible",
                            zIndex: 2,
                            background:
                                "linear-gradient(180deg, #FCADF8 0%, #BA80D5 100%)",
                            borderRadius: "10px",
                            px: { xs: 1, lg: 2 },
                            pt: { xs: 2, md: 4 },
                            pb: 4,
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {/* Filters button */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                pl: { xs: 1, md: 2 }
                            }}
                        >
                            <Button
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
                                <Typography
                                    sx={{
                                        color: numFiltersApplied
                                            ? "#FFF"
                                            : "#000",
                                        fontFamily:
                                            "'Tsukimi Rounded', sans-serif",
                                        fontWeight: "medium",
                                        fontSize: { xs: 12, sm: 13, md: 15 }
                                    }}
                                >
                                    {"Filters   "}
                                </Typography>

                                <Badge
                                    invisible={!numFiltersApplied}
                                    color="primary"
                                    variant="dot"
                                >
                                    <FilterListIcon />
                                </Badge>
                            </Button>
                        </Box>

                        {/* Scroll area */}
                        <Box
                            ref={eventRef}
                            sx={{
                                flex: 1,
                                width: "100%",
                                py: { xs: 1, md: 2 },
                                px: { xs: 2, md: 3 },
                                overflowY:
                                    isMdUp && !isShortScreen
                                        ? "auto"
                                        : "visible",

                                "&::-webkit-scrollbar": { width: "6px" },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: "rgba(0,0,0,0.15)",
                                    borderRadius: "10px"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "rgba(0,0,0,0.3)",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        backgroundColor: "rgba(0,0,0,0.4)"
                                    }
                                },

                                WebkitMaskImage:
                                    isMdUp && !isShortScreen
                                        ? "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)"
                                        : "none",

                                WebkitMaskRepeat:
                                    isMdUp && !isShortScreen
                                        ? "no-repeat"
                                        : "unset",
                                WebkitMaskSize:
                                    isMdUp && !isShortScreen
                                        ? "100% 100%"
                                        : "unset",

                                maskImage:
                                    isMdUp && !isShortScreen
                                        ? "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)"
                                        : "none",

                                maskRepeat:
                                    isMdUp && !isShortScreen
                                        ? "no-repeat"
                                        : "unset",
                                maskSize:
                                    isMdUp && !isShortScreen
                                        ? "100% 100%"
                                        : "unset"
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
                                    width: "100%",
                                    pb: { xs: 2, md: 6 }
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
                    {/* Backdrop */}
                    <Box
                        onClick={() => setFilterOpen(false)}
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 9998,
                            backgroundColor: "transparent",
                            cursor: "default",
                            opacity: filterOpen ? 1 : 0,
                            pointerEvents: filterOpen ? "auto" : "none",
                            transition: "opacity 0.2s ease-in-out"
                        }}
                    />

                    <Box
                        sx={{
                            position: "fixed",
                            zIndex: 10000,
                            top: "50%",
                            left: "50%",
                            width: { xs: "90%", md: "500px" },
                            maxWidth: "90vw",
                            maxHeight: "80dvh",
                            display: "flex",
                            flexDirection: "column",
                            transform: {
                                xs: "translate(-50%, -50%)",
                                md: "translate(-50%, -50%) rotate(-0.5deg)"
                            },
                            "& > *": {
                                overflowY: "auto"
                            },
                            opacity: filterOpen ? 1 : 0,
                            pointerEvents: filterOpen ? "auto" : "none",
                            transition: "opacity 0.2s ease-in-out"
                        }}
                    >
                        <FilterPopup
                            tags={allTags}
                            selectedTagIds={selectedTagIds}
                            selectedTime={timeFilter}
                            isOpen={filterOpen}
                            onClose={() => setFilterOpen(false)}
                            onUpdate={(updatedIds, updatedTimeFilter) => {
                                setSelectedTagIds(new Set(updatedIds));
                                setTimeFilter({ ...updatedTimeFilter });
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Schedule;
