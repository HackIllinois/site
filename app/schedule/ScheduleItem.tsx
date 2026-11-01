"use client";
import { EventType } from "@/util/types";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import { Box, Link, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Tag, TagsList } from "@/app/schedule/Tags";

function timeToHourMinute(time: number) {
    const date = moment(time * 1000).tz(EVENT_TIMEZONE);
    return date.format("h:mm A");
}

function getEventTags(event: EventType): Tag[] {
    const tags: Tag[] = [];

    if (event.eventType) {
        tags.push({ id: event.eventType, label: event.eventType });
    }

    if (event.points) {
        const pts = `${event.points} pts`;
        tags.push({ id: pts, label: pts });
    }

    // TODO: add more tags as needed

    return tags;
}

const LOCATION_LINKS: Record<string, string> = {
    "Siebel CS": "https://maps.app.goo.gl/hcCozcrtpUJPK6X66",
    "Sidney Lu Mechanical Engineering Building":
        "https://maps.app.goo.gl/EXAfjtuG95Kggvbs7",
    "Siebel Center for Design": "https://maps.app.goo.gl/MxsiqKW77PQctJBK7"
};

type ScheduleItemProps = {
    event: EventType;
};

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ event }) => {
    const eventTags = getEventTags(event);

    return (
        <Box
            sx={{
                backgroundColor: "#2B1350",
                borderRadius: "20px",
                p: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: { xs: 1, md: 2 }
                }}
            >
                {/* Event title */}
                <Typography
                    sx={{
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: { xs: 20, sm: 24, md: 26 },
                        background:
                            "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {event.name}
                </Typography>

                {/* Event's tags */}
                <TagsList tags={eventTags} />
            </Box>

            {/* Time */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon
                    sx={{
                        color: "#EDDBFF",
                        fontSize: { xs: 16, sm: 18, md: 20 }
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        fontSize: { xs: 14, sm: 16, md: 18 },
                        color: "#EDDBFF"
                    }}
                >
                    {event.startTime === event.endTime
                        ? timeToHourMinute(event.startTime)
                        : `${timeToHourMinute(event.startTime)} - ${timeToHourMinute(event.endTime)}`}
                </Typography>
            </Box>

            {/* Locations */}
            {event.locations && event.locations.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon
                        sx={{
                            color: "#EDDBFF",
                            fontSize: { xs: 16, sm: 18, md: 20 }
                        }}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: { xs: 14, sm: 16, md: 18 },
                            color: "#EDDBFF"
                        }}
                    >
                        {event.locations.map((loc, index) => {
                            const fullDesc = loc.description;

                            const buildingKey = Object.keys(
                                LOCATION_LINKS
                            ).find(key => fullDesc.includes(key));

                            if (buildingKey) {
                                const url = LOCATION_LINKS[buildingKey];
                                const parts = fullDesc.split(buildingKey);

                                return (
                                    <span key={`${fullDesc}-${index}`}>
                                        <Link
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                color: "#FDAB60",
                                                textDecoration: "none",
                                                "&:hover": { color: "#A315D6" }
                                            }}
                                        >
                                            {buildingKey}
                                        </Link>
                                        {parts[1]}
                                        {index < event.locations.length - 1 &&
                                            ", "}
                                    </span>
                                );
                            }

                            return (
                                <span key={`${fullDesc}-${index}`}>
                                    {fullDesc}
                                    {index < event.locations.length - 1 && ", "}
                                </span>
                            );
                        })}
                    </Typography>
                </Box>
            )}

            {/* Description */}
            {event.description && (
                <Typography
                    sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: { xs: 12, sm: 14 },
                        color: "#EDDBFF"
                    }}
                >
                    {event.description}
                </Typography>
            )}
        </Box>
    );
};
