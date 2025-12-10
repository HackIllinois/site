// import { RegistrationData } from "@/util/types";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import React from "react";

interface CheckboxSelectInputProps {
    name: string;
    label?: string;
    sublabel?: string;
    sublabelContent?: React.ReactNode;
    optionLabel: React.ReactNode | string;
    optionLabelSx?: object;
    required?: boolean;
    // formik controls
    value?: boolean;
    onChange: (value: boolean) => void;
    error: boolean;
    helperText?: string;
    // extra props
    accentColor?: string;
    [key: string]: unknown;
}

const CheckboxSelect: React.FC<CheckboxSelectInputProps> = ({
    name,
    label,
    sublabel,
    sublabelContent,
    optionLabel = "Yes",
    optionLabelSx,
    required = false,
    value = false,
    onChange,
    error,
    helperText = "",
    accentColor = "#2c2540"
}) => {
    // handle toggle manually so it works with Formik (onChange tries to pass event.target.checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <FormControl
            id={name}
            component="fieldset"
            error={error}
            sx={{ width: "100%", height: "100%" }}
        >
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 1,
                    fontWeight: 500
                }}
            >
                {label ? (
                    <>
                        {label}
                        {required && (
                            <span style={{ color: "#d32f2f" }}>*</span>
                        )}
                    </>
                ) : null}
                {sublabel ? (
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{ opacity: "0.8", fontStyle: "oblique" }}
                    >
                        {sublabel}
                    </Typography>
                ) : (
                    sublabelContent || null
                )}
            </FormLabel>

            <FormControlLabel
                sx={{
                    padding: 2,
                    display: "flex",
                    "& .MuiCheckbox-root": {
                        width: 36,
                        height: 36,
                        flexShrink: 0 // prevents checkbox from shrinking or stretching
                    }
                }}
                control={
                    <Checkbox
                        checked={value}
                        onChange={handleChange}
                        value={value}
                        sx={{
                            width: 36,
                            height: 36,
                            padding: "0px", // override default
                            borderRadius: 2,
                            backgroundColor: "#f0f0f0",
                            overflow: "hidden",

                            "& .MuiSvgIcon-root": {
                                transform: "scale(1.34)",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "transparent",
                                color: "transparent", // unchecked icon color
                                borderRadius: 1.5
                            },
                            "&.Mui-checked": {
                                color: accentColor // this affects the animation
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                                color: accentColor // checkmark color
                            },
                            "&:hover": {
                                backgroundColor: "#ffffff", // lighter on hover
                                boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
                            }
                        }}
                    />
                }
                label={
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#ffffff",
                            pl: 2,
                            ...optionLabelSx
                        }}
                    >
                        {optionLabel}
                    </Typography>
                }
            />

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default CheckboxSelect;
