"use client";
import { useState } from "react";
import { TagsList } from "@/app/schedule/Tags";
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
import { tag } from "@/app/schedule/page";

interface FilterPopupProps {
    tags: tag[];
    onClose: () => void;
    onUpdate: () => void;
}

const TimeFilterBox = ({ label }: { label: string }) => {
    const [hour, setHour] = useState<string>("12");
    const [minute, setMinute] = useState<string>("00");
    const [amPm, setAmPm] = useState<"AM" | "PM">("AM");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const incHour = () =>
        setHour(h =>
            String(
                (Number(h) % 12 || 12) + 1 > 12 ? 1 : Number(h) + 1
            ).padStart(2, "0")
        );

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
        <Box sx={{ paddingTop: 1 }}>
            <IconButton
                onClick={onClick}
                sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#11031B",
                    color: "#F7EDFF",
                    "&:hover": { backgroundColor: "#11031B" }
                }}
            >
                <Typography sx={{ fontSize: 16, lineHeight: 1 }}>
                    {direction === "up" ? "^" : "v"}
                </Typography>
            </IconButton>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
                    gap: 2
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
                    <ArrowButton direction="up" onClick={() => incHour()} />

                    <TextField
                        value={hour}
                        onChange={e =>
                            setHour(
                                e.target.value.replace(/\D/g, "").slice(0, 2)
                            )
                        }
                        inputProps={{
                            style: {
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: 18,
                                color: "#454545",
                                padding: 4,
                                width: 36
                            }
                        }}
                        variant="standard"
                    />

                    <ArrowButton direction="down" onClick={() => decHour()} />
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
                    <ArrowButton direction="up" onClick={() => incMinute()} />

                    <TextField
                        value={minute}
                        onChange={e =>
                            setMinute(
                                e.target.value.replace(/\D/g, "").slice(0, 2)
                            )
                        }
                        inputProps={{
                            style: {
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: 18,
                                color: "#454545",
                                padding: 4,
                                width: 36
                            }
                        }}
                        variant="standard"
                    />

                    <ArrowButton direction="down" onClick={() => decMinute()} />
                </Box>

                {/* AM/PM */}
                <Box sx={{ position: "relative" }}>
                    <Button
                        onClick={() => setAmPm("AM")}
                        sx={{
                            width: "100%",
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 16,
                            color: "#454545",
                            "&:hover": { backgroundColor: "#ffffff" }
                        }}
                    >
                        {amPm}
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                setAmPm("AM");
                                setAnchorEl(null);
                            }}
                        >
                            AM
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                setAmPm("PM");
                                setAnchorEl(null);
                            }}
                        >
                            PM
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
};

const FilterPopup: React.FC<FilterPopupProps> = ({
    tags,
    onClose,
    onUpdate
}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 340,
                right: "8%",
                width: 500,
                backgroundColor: "#ffffff",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                zIndex: 20
            }}
        >
            {/* Tags filter */}
            <Box>
                <TagsList tags={tags} />
            </Box>

            <Divider variant="middle" />

            {/* Time filter */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <TimeFilterBox label="From:" />
                <TimeFilterBox label="To:" />
            </Box>

            <Divider variant="middle" />

            {/* Cancel/update options */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        color: "#000",
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: 15
                    }}
                >
                    Cancel
                </Button>

                <Divider orientation="vertical" flexItem />

                <Button
                    onClick={onUpdate}
                    sx={{
                        color: "#000"
                    }}
                >
                    Update
                </Button>
            </Box>
        </Box>
    );
};

export default FilterPopup;
