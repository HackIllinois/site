"use client";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, ButtonBase, Collapse, Typography } from "@mui/material";
import React from "react";
import { BOX_SHADOW_FILTER } from "@/theme/shadows";

/** Same cut-corner shape as the form inputs on the earlier steps. */
const chamfer = (px: number) =>
    `polygon(${px}px 0%, calc(100% - ${px}px) 0%, 100% ${px}px, 100% calc(100% - ${px}px), calc(100% - ${px}px) 100%, ${px}px 100%, 0% calc(100% - ${px}px), 0% ${px}px)`;

const EDIT_BUTTON_COLOR = "#13294B";

interface ReviewSectionCardProps {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    onEdit: () => void;
    /** Thin outline color; defaults to the step accent. */
    outlineColor?: string;
    children: React.ReactNode;
}

/**
 * One collapsible review section: a white cut-corner card with the section
 * title, a check mark when collapsed and an "Edit section" button when open.
 */
export const ReviewSectionCard = ({
    title,
    expanded,
    onToggle,
    onEdit,
    outlineColor = "rgba(255, 255, 255, 0.6)",
    children
}: ReviewSectionCardProps) => {
    const contentId = `review-${title.replace(/\W+/g, "-").toLowerCase()}`;
    return (
        // Outer layer is the outline; the white card sits 2px inside it.
        <Box
            sx={{
                p: "2px",
                backgroundColor: outlineColor,
                clipPath: chamfer(14),
                filter: BOX_SHADOW_FILTER
            }}
        >
            <Box sx={{ backgroundColor: "#ffffff", clipPath: chamfer(13) }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        px: { xs: 2, md: 3 },
                        py: expanded ? 2 : 1.25
                    }}
                >
                    <ButtonBase
                        onClick={onToggle}
                        aria-expanded={expanded}
                        aria-controls={contentId}
                        sx={{
                            flex: 1,
                            justifyContent: "flex-start",
                            textAlign: "left",
                            py: 0.5
                        }}
                    >
                        <Typography
                            component="h2"
                            sx={{
                                fontFamily: "Montserrat",
                                fontWeight: 500,
                                fontSize: { xs: "16px", md: "18px" },
                                color: "#1a1a1a"
                            }}
                        >
                            {title}
                        </Typography>
                    </ButtonBase>

                    {expanded ? (
                        <ButtonBase
                            onClick={onEdit}
                            sx={{
                                gap: 1,
                                px: 2.5,
                                py: 1,
                                backgroundColor: EDIT_BUTTON_COLOR,
                                color: "#ffffff",
                                clipPath: chamfer(8),
                                fontFamily:
                                    "var(--font-oswald), 'Oswald', sans-serif",
                                fontWeight: 500,
                                fontSize: { xs: "13px", md: "15px" },
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                transition: "filter 0.15s ease",
                                "&:hover": { filter: "brightness(1.25)" }
                            }}
                        >
                            <EditOutlinedIcon sx={{ fontSize: "18px" }} />
                            Edit Section
                        </ButtonBase>
                    ) : (
                        <ButtonBase
                            onClick={onToggle}
                            aria-label={`Show ${title}`}
                            sx={{ p: 0.5, borderRadius: "50%" }}
                        >
                            <CheckIcon sx={{ color: "#1a1a1a" }} />
                        </ButtonBase>
                    )}
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box
                        id={contentId}
                        sx={{
                            px: { xs: 2, md: 3 },
                            pb: { xs: 2.5, md: 3.5 },
                            pt: 0.5
                        }}
                    >
                        {children}
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};

/** Two-column label/value grid inside a section card. */
export const ReviewFieldGrid = ({
    children
}: {
    children: React.ReactNode;
}) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            columnGap: 6,
            rowGap: { xs: 2, md: 2.5 }
        }}
    >
        {children}
    </Box>
);

interface ReviewFieldProps {
    label: string;
    value: string;
    /** Span both columns (long answers). */
    wide?: boolean;
    /** Show a paperclip before the value (uploaded files). */
    attachment?: boolean;
}

export const ReviewField = ({
    label,
    value,
    wide = false,
    attachment = false
}: ReviewFieldProps) => (
    <Box sx={{ gridColumn: wide ? "1 / -1" : "auto", minWidth: 0 }}>
        <Typography
            sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: { xs: "15px", md: "17px" },
                color: "#111111",
                mb: 0.5
            }}
        >
            {label}
        </Typography>
        <Typography
            component="div"
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 0.75,
                fontFamily: "Montserrat",
                fontWeight: 400,
                fontSize: { xs: "15px", md: "17px" },
                color: "#222222",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere"
            }}
        >
            {attachment && (
                <AttachFileIcon
                    sx={{
                        fontSize: "20px",
                        mt: "2px",
                        transform: "rotate(45deg)"
                    }}
                />
            )}
            {value}
        </Typography>
    </Box>
);

/** Links inside the acknowledgement checkboxes (white, like other steps). */
export const AckLinkStyle = {
    color: "#ffffff",
    fontWeight: 600,
    textDecoration: "underline",
    textDecorationColor: "#ffffff",
    "&:hover": { opacity: 0.8 }
};
