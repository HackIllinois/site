"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Accordion,
    AccordionSummary,
    Typography,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormikContext } from "formik";

export const ReviewContainer = styled(Box)(({ theme }) => ({
    width: "85vw",
    margin: "0 auto",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: theme.spacing(2)
    }
}));

export const StyledAccordion = styled(Accordion)(() => ({
    width: "100%",
    backgroundColor: "#f6f6f67A",
    borderRadius: 12,
    overflow: "hidden",
    margin: "25px 0",
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
        overflow: "hidden",
        margin: "25px 0"
    }
}));

interface AccordionHeaderProps {
    title: string;
    editRoute: string;
    isExpanded: boolean;
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    title,
    editRoute,
    isExpanded
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
                    sx={{
                        color: "#fff",
                        fontFamily: `Montserrat, sans-serif`,
                        fontSize: "30px",
                        fontWeight: 600
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {isExpanded && (
                    <Box
                        onClick={() => router.push(editRoute)}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "white",
                            "&:hover": {
                                color: "navy",
                                transform: "scale(1.1)"
                            },
                            transition: "transform 0.2s, color 0.2s"
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </Box>
                )}
            </Box>
        </AccordionSummary>
    );
};

export const ReviewInfoAccordionBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "23px",
    alignItems: "center",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "stretch"
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
    minWidth: "124px",
    maxWidth: "100%",
    flex: "0 0 auto"
}));

export const UserInfoBox: React.FC<UserInfoProps> = ({
    label,
    userResponse
}) => {
    return (
        <StyledUserInfoBox>
            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "text.primary",
                    fontFamily: "'Montserrat', sans-serif"
                }}
            >
                {label}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: "text.secondary",
                    fontFamily: "'Montserrat', sans-serif"
                }}
            >
                {userResponse}
            </Typography>
        </StyledUserInfoBox>
    );
};

interface FormikCheckboxProps {
    name: string;
    label: React.ReactNode;
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
    name,
    label
}) => {
    const { values, setFieldValue } = useFormikContext<any>();
    const isChecked =
        Array.isArray(values[name]) && values[name].includes("YES");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFieldValue(name, ["YES"]);
        } else {
            setFieldValue(name, []);
        }
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} />}
            label={label}
        />
    );
};
