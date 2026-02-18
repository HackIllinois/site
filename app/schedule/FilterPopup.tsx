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
    const [hour, setHour] = useState(value ? value.format("hh") : "");
    const [minute, setMinute] = useState(value ? value.format("mm") : "");
    const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    useEffect(() => {
        if (value && value.isValid()) {
            setHour(value.format("hh"));
            setMinute(value.format("mm"));
            setAmPm(value.format("A") as "AM" | "PM");
        } else if (!value) {
            // clear time filter
            setHour("12");
            setMinute("00");
            setAmPm("AM");
        }
    }, [value]);

    const handleBlur = () => {
        const finalH = (hour === "" ? "12" : hour).padStart(2, "0");
        const finalM = (minute === "" ? "00" : minute).padStart(2, "0");

        setHour(finalH);
        setMinute(finalM);

        updateParent(finalH, finalM, amPm);
    };

    const updateParent = (h: string, m: string, ap: string) => {
        if (h === "" || m === "") return;

        const hNum = parseInt(h, 10);
        const mNum = parseInt(m, 10);

        if (
            isNaN(hNum) ||
            isNaN(mNum) ||
            hNum < 1 ||
            hNum > 12 ||
            mNum < 0 ||
            mNum > 59
        ) {
            onChange(moment.invalid());
            return;
        }
        const newMoment = moment(`${hNum}:${mNum} ${ap}`, "h:m A").tz(
            EVENT_TIMEZONE
        );

        if (newMoment.isValid()) {
            onChange(newMoment);
        } else {
            onChange(moment.invalid());
        }
    };

    const incHour = () => {
        const next = String((parseInt(hour || "12") % 12) + 1).padStart(2, "0");
        setHour(next);
        updateParent(next, minute, amPm);
    };

    const decHour = () => {
        const current = parseInt(hour || "12");
        const next = String(current - 1 <= 0 ? 12 : current - 1).padStart(
            2,
            "0"
        );
        setHour(next);
        updateParent(next, minute, amPm);
    };

    const incMinute = () => {
        const next = String((parseInt(minute || "0") + 1) % 60).padStart(
            2,
            "0"
        );
        setMinute(next);
        updateParent(hour, next, amPm);
    };

    const decMinute = () => {
        const current = parseInt(minute || "0");
        const next = String(current - 1 < 0 ? 59 : current - 1).padStart(
            2,
            "0"
        );
        setMinute(next);
        updateParent(hour, next, amPm);
    };

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "170px",
                gap: 1
            }}
        >
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
                        onChange={e => setHour(e.target.value)}
                        onBlur={handleBlur}
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
                        onChange={e => setMinute(e.target.value)}
                        onBlur={handleBlur}
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
                    >
                        {["AM", "PM"].map(option => (
                            <MenuItem
                                key={option}
                                selected={amPm === option}
                                onClick={() => {
                                    setAmPm(option as "AM" | "PM");
                                    setAnchorEl(null);
                                    onChange(
                                        moment(
                                            `${hour}:${minute} ${option}`,
                                            "h:mm A"
                                        ).tz(EVENT_TIMEZONE)
                                    );
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
    const [timeError, setTimeError] = useState<string | null>(null);

    useEffect(() => {
        const { from, to } = selectedTime;
        let errorMessage = null;

        if ((from && !from.isValid()) || (to && !to.isValid())) {
            errorMessage = "Please enter a valid format.";
        } else if (from?.isValid() && to?.isValid()) {
            const fromMinutes = from.hours() * 60 + from.minutes();
            let toMinutes = to.hours() * 60 + to.minutes();
            if (to.hours() === 0 && to.minutes() === 0) toMinutes = 24 * 60;

            if (fromMinutes > toMinutes) {
                errorMessage = "Start time cannot be after end time.";
            }
        }
        setTimeError(errorMessage);
    }, [selectedTime]);

    const handleToggleTag = (tagId: string) => {
        const next = new Set(selectedTagIds);
        if (next.has(tagId)) next.delete(tagId);
        else next.add(tagId);
        onUpdate(next, selectedTime);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                boxShadow: 24,
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                zIndex: 20,

                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    width: "8px"
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "10px"
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: "10px",
                    "&:hover": {
                        backgroundColor: "#bbb"
                    }
                }
            }}
        >
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
                    selectedTagIds={[...selectedTagIds]}
                    onToggleTag={handleToggleTag}
                />
            </Box>

            <Divider variant="middle" />

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "flex-end"
                }}
            >
                <TimeFilterBox
                    label="From:"
                    value={selectedTime.from}
                    onChange={m =>
                        onUpdate(selectedTagIds, { ...selectedTime, from: m })
                    }
                />
                <TimeFilterBox
                    label="To:"
                    value={selectedTime.to}
                    onChange={m =>
                        onUpdate(selectedTagIds, { ...selectedTime, to: m })
                    }
                />
                <Button
                    onClick={() =>
                        onUpdate(selectedTagIds, {
                            from: undefined,
                            to: undefined
                        })
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

            <Button
                onClick={onClose}
                sx={{
                    flex: 1,
                    color: "#2B1350",
                    fontFamily: "'Tsukimi Rounded', sans-serif",
                    fontWeight: "bold",
                    fontSize: 15
                }}
            >
                Close
            </Button>
        </Box>
    );
};

export default FilterPopup;
