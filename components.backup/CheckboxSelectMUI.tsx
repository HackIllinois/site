// import { RegistrationData } from "@/util/types";
import { Check } from "@mui/icons-material";
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
                    mb: 1
                }}
            >
                {label ? (
                    <>
                        {label}
                        {required && (
                            <span
                                style={{
                                    color: "#d32f2f",
                                    position: "absolute",
                                    fontWeight: 500
                                }}
                            >
                                *
                            </span>
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
                    margin: 2,
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
                        checkedIcon={<Check />}
                        sx={{
                            width: "36px",
                            height: "36px",
                            padding: "0px", // override default
                            borderRadius: 2, // override default
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            flexShrink: 0,

                            "& .MuiSvgIcon-root": {
                                width: "100%",
                                height: "100%",
                                backgroundColor: "transparent",
                                color: "transparent" // unchecked icon color
                            },
                            "&.Mui-checked": {
                                color: accentColor, // this affects the animation
                                background: accentColor
                            },
                            "&.Mui-checked .MuiSvgIcon-root": {
                                color: "#ffffff" // checkmark color
                            },

                            "&:hover": {
                                backgroundColor: "#ffffff", // lighter on hover
                                boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
                            },
                            "&.Mui-checked:hover": {
                                backgroundColor: accentColor, // don't lighten
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
