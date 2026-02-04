"use client";
import { useState } from "react";
import { EventType } from "@/util/types";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";
import { Box, Modal, Typography } from "@mui/material";

import { Tag, TagsList, TagMobile } from "@/app/schedule/Tags";

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

type ScheduleItemProps = {
    event: EventType;
};

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ event }) => {
    const eventTags = getEventTags(event);

    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    return (
        <Box
            sx={{
                backgroundColor: "#2B1350",
                borderRadius: "20px",
                p: { xs: 2, sm: 3, md: 4 },
                width: "140%",
                display: "flex",
                flexDirection: "column",
                gap: 1
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
            {locations.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: { xs: 14, sm: 16, md: 18 },
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

const ScheduleItemMobile: React.FC<ScheduleItemProps> = ({ event }) => {
    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    return (
        <Box
            sx={{
                position: "relative",
                px: "13%",
                pt: "14%",
                width: "100%",
                height: "auto",
                paddingBottom: "10%",
                display: "flex",
                flexDirection: "column",
                gap: "1%",
                overflow: "hidden",
                color: "#FFFFFF",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url(/schedule/mobile/event_card.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "80% auto",
                    pointerEvents: "none",
                    zIndex: 0
                }
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    transform: "rotate(-1.94deg)",
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                    }}
                >
                    {/* Event title */}
                    <Typography
                        sx={{
                            fontFamily: "'SF Pro Text', sans-serif",
                            fontWeight: "bold",
                            fontSize: "4.5vw",
                            mb: 1,
                            flex: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {event.name}
                    </Typography>

                    {/* Tag chip */}
                    <Box sx={{ padding: "0em 1em" }}>
                        <TagMobile
                            points={String(event.points ?? 0)}
                            eventType={event.eventType ?? "Unknown"}
                        />
                    </Box>
                </Box>

                {/* Time */}
                <Typography
                    sx={{
                        fontFamily: "'SF Pro Text', sans-serif",
                        fontWeight: "medium",
                        fontSize: "4vw",
                        mb: 1
                    }}
                >
                    {event.startTime === event.endTime
                        ? timeToHourMinute(event.startTime)
                        : `${timeToHourMinute(event.startTime)} - ${timeToHourMinute(event.endTime)}`}
                </Typography>

                {/* Locations */}
                {locations.length > 0 && (
                    <Typography
                        sx={{
                            fontFamily: "'SF Pro Text', sans-serif",
                            fontWeight: "medium",
                            fontSize: "3.5vw"
                        }}
                    >
                        {locations}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export const ScheduleItemMobileWithPopup: React.FC<ScheduleItemProps> = ({
    event
}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box onClick={handleOpen}>
                <ScheduleItemMobile event={event} />
            </Box>

            {/* Popup */}
            <Modal
                open={open}
                onClose={handleClose} // clicking the backdrop
                closeAfterTransition
                slotProps={{
                    backdrop: {
                        sx: { backgroundColor: "rgba(18, 11, 52, 0.69)" }
                    }
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxHeight: "90vh",
                        borderRadius: "16px",
                        p: 3,
                        overflowY: "auto",
                        zIndex: 1300
                    }}
                >
                    <ScheduleItemInfoMobile event={event} />
                </Box>
            </Modal>
        </>
    );
};

export const ScheduleItemInfoMobile: React.FC<ScheduleItemProps> = ({
    event
}) => {
    const locations = event.locations
        .map(location => location.description)
        .join(", ");

    return (
        <Box
            sx={{
                position: "relative",
                px: "16%",
                pt: "25%",
                width: "100%",
                aspectRatio: "1 / 1.31",
                overflow: "hidden",
                color: "#000",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: "url(/schedule/mobile/event_info.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    backgroundSize: "contain",
                    pointerEvents: "none",
                    zIndex: 0
                }
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}
            >
                {/* Event title */}
                <Typography
                    sx={{
                        fontFamily: "'SF Pro Text', sans-serif",
                        fontWeight: "bold",
                        fontSize: "5vw",
                        mb: 1,
                        lineHeight: 1.2,
                        wordBreak: "break-word"
                    }}
                >
                    {event.name}
                </Typography>

                {/* Tag chip */}
                <Box
                    sx={{
                        alignSelf: "flex-start",
                        mb: 1
                    }}
                >
                    <TagMobile
                        points={String(event.points ?? 0)}
                        eventType={event.eventType ?? "Unknown"}
                    />
                </Box>

                {/* Time */}
                <Typography
                    sx={{
                        fontFamily: "'SF Pro Text', sans-serif",
                        fontWeight: "medium",
                        fontSize: "4vw",
                        mb: 1
                    }}
                >
                    {event.startTime === event.endTime
                        ? timeToHourMinute(event.startTime)
                        : `${timeToHourMinute(event.startTime)} - ${timeToHourMinute(event.endTime)}`}
                </Typography>

                {/* Locations */}
                {locations.length > 0 && (
                    <Typography
                        sx={{
                            fontFamily: "'SF Pro Text', sans-serif",
                            fontWeight: "medium",
                            fontSize: "4vw"
                        }}
                    >
                        {locations}
                    </Typography>
                )}

                {/* Description */}
                {event.description && (
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            mt: 1,
                            maxHeight: "35%",
                            backgroundColor: "#D5D5D5",
                            borderRadius: "10px",
                            p: 1.5
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "'SF Pro Text', sans-serif",
                                fontWeight: "regular",
                                fontSize: 12
                            }}
                        >
                            {event.description}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
