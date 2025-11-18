"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    Typography
} from "@mui/material";
import { useRouter } from "next/navigation";

export const ReviewContainer = styled(Stack)(({ theme }) => ({
    width: "85vw",
    margin: "0 auto",
    marginTop: "25px",
    alignItems: "stretch",
    gap: "25px",
    [theme.breakpoints.down("sm")]: {
        gap: "18px"
    }
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
    width: "100%",
    backgroundColor: "#f6f6f67A",
    borderRadius: 12,
    border: "1px solid white",
    overflow: "hidden",
    "&:first-of-type": {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    "&:last-of-type": {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    "&.Mui-expanded": {
        borderRadius: 12,
        overflow: "hidden"
    },
    [theme.breakpoints.down("sm")]: {
        borderRadius: 6,
        "&:first-of-type": {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6
        },
        "&:last-of-type": {
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6
        }
    }
}));

interface AccordionHeaderProps {
    title: string;
    isExpanded: boolean;
    onEdit: () => void;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    title,
    isExpanded,
    onEdit
}) => {
    const router = useRouter();

    return (
        <AccordionSummary
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
            expandIcon={
                !isExpanded ? (
                    <ExpandMoreIcon sx={{ color: "white" }} />
                ) : undefined
            } // only set expandIcon if collapsed
        >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <Typography
                    sx={theme => ({
                        color: "#fff",
                        fontFamily: `Montserrat, sans-serif`,
                        fontSize: "30px",
                        fontWeight: 600,
                        paddingLeft: "18px",
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "20px",
                            paddingLeft: "13px"
                        }
                    })}
                >
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {isExpanded && onEdit && (
                    <Box
                        onClick={onEdit}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px",
                            cursor: "pointer",
                            color: "white",
                            "&:hover": {
                                color: "navy",
                                transform: "scale(1.1)"
                            },
                            transition: "transform 0.2s, color 0.2s"
                        }}
                    >
                        <EditIcon fontSize="medium" />
                    </Box>
                )}
            </Box>
        </AccordionSummary>
    );
};

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: "4px 18px 18px 18px",
    [theme.breakpoints.down("sm")]: {
        padding: "0px 10px 10px 10px"
    }
}));

export const ReviewInfoAccordionBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "25px",
    alignItems: "center",
    padding: "0px 13px 13px 13px",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: "11px"
    }
}));

interface UserInfoProps {
    label: string;
    userResponse: string;
}

const StyledUserInfoBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    padding: "10px",
    gap: "5px",
    flex: "1 1 auto",
    minWidth: 0,
    maxWidth: "100%"
}));

export const UserInfoBox: React.FC<UserInfoProps> = ({
    label,
    userResponse
}) => {
    return (
        <StyledUserInfoBox>
            <Typography
                sx={theme => ({
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "text.primary",
                    fontFamily: "'Montserrat', sans-serif",
                    [theme.breakpoints.down("sm")]: {
                        fontSize: "13px"
                    }
                })}
            >
                {label}
            </Typography>
            <Typography
                sx={theme => ({
                    fontWeight: 400,
                    fontSize: "15px",
                    fontFamily: "'Montserrat', sans-serif",
                    color: "text.secondary",
                    wordWrap: "break-word",
                    overflowWrap: "anywhere",
                    whiteSpace: "normal",
                    [theme.breakpoints.down("sm")]: {
                        fontSize: "13px"
                    }
                })}
            >
                {userResponse}
            </Typography>
        </StyledUserInfoBox>
    );
};
