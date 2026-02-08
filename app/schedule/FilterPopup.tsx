"use client";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { EVENT_TIMEZONE } from "@/util/config";

import {
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Tag, TagsToggleList } from "@/app/schedule/Tags";

interface FilterPopupProps {
    tags: Tag[];
    selectedTagIds: Set<string>;
    selectedTime: { from?: moment.Moment; to?: moment.Moment };
    onClose: () => void;
    onUpdate: (
        newSelected: Set<string>,
        timeFilter: { from?: moment.Moment; to?: moment.Moment }
    ) => void;
}

interface TimeFilterBoxProps {
    label: string;
    value?: moment.Moment;
    onChange: (newTime?: moment.Moment) => void;
}
const TimeFilterBox: React.FC<TimeFilterBoxProps> = ({
    label,
    value,
    onChange
}) => {
    const [hour, setHour] = useState("12");
    const [minute, setMinute] = useState("00");
    const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    useEffect(() => {
        if (value) {
            const h = value.format("hh");
            const m = value.format("mm");
            const ap = value.format("A") as "AM" | "PM";
            setHour(h);
            setMinute(m);
            setAmPm(ap);
        } else {
            // clear time filter
            setHour("12");
            setMinute("00");
            setAmPm("AM");
        }
    }, [value]);

    // one-second debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            const newMoment = moment(`${hour}:${minute} ${amPm}`, "h:mm A").tz(
                EVENT_TIMEZONE
            );
            onChange(newMoment);
        }, 900);

        return () => {
            clearTimeout(handler);
        };
    }, [hour, minute, amPm]);

    const incHour = () =>
        setHour(h => String((Number(h) % 12) + 1).padStart(2, "0"));

    const decHour = () =>
        setHour(h =>
            String(Number(h) - 1 <= 0 ? 12 : Number(h) - 1).padStart(2, "0")
        );

    const incMinute = () =>
        setMinute(m => String((Number(m) + 1) % 60).padStart(2, "0"));

    const decMinute = () =>
        setMinute(m =>
            String(Number(m) - 1 < 0 ? 59 : Number(m) - 1).padStart(2, "0")
        );

    const ArrowButton = ({
        onClick,
        direction
    }: {
        onClick: () => void;
        direction: "up" | "down";
    }) => (
        <Box>
            <IconButton
                onClick={onClick}
                sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#11031B",
                    mb: direction === "up" ? 0.5 : 0,
                    mt: direction === "down" ? 1 : 0,
                    color: "#F7EDFF",
                    "&:hover": { backgroundColor: "#11031B" }
                }}
            >
                {direction === "up" ? (
                    <KeyboardArrowUpIcon fontSize="medium" />
                ) : (
                    <KeyboardArrowDownIcon fontSize="medium" />
                )}
            </IconButton>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 1 }}>
            <Typography
                sx={{
                    color: "#454545",
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: "bold",
                    fontSize: 15,
                    textAlign: "left"
                }}
            >
                {label}
            </Typography>

            <Box
                sx={{
                    backgroundColor: "#EDEDED",
                    borderRadius: 3,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                }}
            >
                {/* Hour */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <ArrowButton direction="up" onClick={incHour} />
                    <TextField
                        value={hour}
                        onChange={e => {
                            const val = e.target.value.replace(/\D/g, "");
                            const num = parseInt(val, 10);

                            if (num <= 12 && num >= 1) {
                                setHour(val.slice(0, 2));
                            } else if (val === "") {
                                setHour("");
                            }
                        }}
                        sx={{
                            width: 36,
                            "& input": {
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: 18,
                                color: "#454545",
                                padding: "4px 0"
                            }
                        }}
                        variant="standard"
                    />
                    <ArrowButton direction="down" onClick={decHour} />
                </Box>

                {/* Separator */}
                <Typography
                    sx={{
                        fontFamily: "Montserrat",
                        fontSize: 18,
                        color: "#454545"
                    }}
                >
                    :
                </Typography>

                {/* Minute */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <ArrowButton direction="up" onClick={incMinute} />
                    <TextField
                        value={minute}
                        onChange={e => {
                            const val = e.target.value.replace(/\D/g, "");
                            const num = parseInt(val, 10);

                            if (val === "") {
                                setMinute("");
                            } else if (num <= 59) {
                                setMinute(val.slice(0, 2));
                            }
                        }}
                        sx={{
                            width: 36,
                            "& input": {
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: 18,
                                color: "#454545",
                                padding: "4px 0"
                            }
                        }}
                        variant="standard"
                    />
                    <ArrowButton direction="down" onClick={decMinute} />
                </Box>

                {/* AM/PM button */}
                <Box
                    sx={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                    <Button
                        onClick={e => setAnchorEl(e.currentTarget)}
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 16,
                            color: "#454545",
                            minWidth: 0,
                            padding: 0,
                            "&:hover": { backgroundColor: "#ffffff" }
                        }}
                    >
                        {amPm}
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                        }}
                        slotProps={{
                            root: { sx: { zIndex: 9999 } },
                            paper: { sx: { zIndex: 9999 } }
                        }}
                    >
                        {["AM", "PM"].map(option => (
                            <MenuItem
                                key={option}
                                selected={amPm === option}
                                onClick={() => {
                                    setAmPm(option as "AM" | "PM");
                                    setAnchorEl(null);
                                }}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
};

const FilterPopup: React.FC<FilterPopupProps> = ({
    tags,
    selectedTagIds,
    selectedTime,
    onClose,
    onUpdate
}) => {
    const [localSelected, setLocalSelected] = useState<Set<string>>(
        new Set(selectedTagIds)
    );
    const [localTime, setLocalTime] = useState<{
        from?: moment.Moment;
        to?: moment.Moment;
    }>(selectedTime);
    const [timeError, setTimeError] = useState<string | null>(null);

    useEffect(() => {
        setLocalSelected(new Set(selectedTagIds));
        setLocalTime(selectedTime);
    }, [selectedTagIds, selectedTime]);

    useEffect(() => {
        setLocalTime(prev => ({
            from: prev.from ?? undefined,
            to: prev.to ?? undefined
        }));
    }, []);

    useEffect(() => {
        if (localTime.from && localTime.to) {
            const from = localTime.from.clone();
            const to = localTime.to.clone();
            const fromMinutes = from.hours() * 60 + from.minutes();
            let toMinutes = to.hours() * 60 + to.minutes();
            if (to.hours() === 0 && to.minutes() === 0) toMinutes = 24 * 60;

            if (fromMinutes > toMinutes) {
                setTimeError("Start time cannot be after end time");
            } else {
                setTimeError(null);
            }
        }
    }, [localTime.from, localTime.to]);

    const handleToggleTag = (tagId: string) => {
        setLocalSelected(prev => {
            const next = new Set(prev);
            if (next.has(tagId)) next.delete(tagId);
            else next.add(tagId);
            return next;
        });
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 340,
                right: "8%",
                width: 500,
                backgroundColor: "#ffffff",
                boxShadow: 24,
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                zIndex: 20
            }}
        >
            {/* Tags filter */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    alignItems: "flex-start"
                }}
            >
                <TagsToggleList
                    tags={tags}
                    selectedTagIds={[...localSelected]}
                    onToggleTag={handleToggleTag}
                />
                <Button
                    onClick={() => onUpdate(localSelected, localTime)}
                    sx={{ alignSelf: "flex-start" }}
                >
                    Update
                </Button>
            </Box>

            <Divider variant="middle" />

            {/* Time filters */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                <TimeFilterBox
                    label="From:"
                    value={localTime.from}
                    onChange={m => setLocalTime(prev => ({ ...prev, from: m }))}
                />
                <TimeFilterBox
                    label="To:"
                    value={localTime.to}
                    onChange={m => setLocalTime(prev => ({ ...prev, to: m }))}
                />

                {/* Clear time filter button */}
                <Button
                    onClick={() =>
                        setLocalTime({ from: undefined, to: undefined })
                    }
                    sx={{
                        height: 36,
                        minWidth: 0,
                        px: 2,
                        color: "#454545",
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontSize: 12,
                        backgroundColor: "#EEE",
                        "&:hover": { backgroundColor: "#DDD" }
                    }}
                >
                    Clear
                </Button>
            </Box>

            {timeError && (
                <Typography sx={{ color: "red", fontSize: 12 }}>
                    {timeError}
                </Typography>
            )}

            <Divider variant="middle" />

            {/* Cancel/update options */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "stretch"
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        flex: 1,
                        color: "#2B1350",
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: 15,
                        borderRadius: 0
                    }}
                >
                    Cancel
                </Button>

                <Divider orientation="vertical" flexItem />

                <Button
                    onClick={() => onUpdate(localSelected, localTime)}
                    sx={{
                        flex: 1,
                        color: "#2B1350",
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: 15,
                        borderRadius: 0,
                        "&.Mui-disabled": {
                            color: "rgba(43, 19, 80, 0.5)"
                        }
                    }}
                    disabled={!!timeError} // disable button if error exists
                >
                    Update
                </Button>
            </Box>
        </Box>
    );
};

export default FilterPopup;
