// import { RegistrationData } from "@/util/types";
import {
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    SxProps,
    Theme
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

interface Option {
    label: string;
    value: string | boolean;
}

interface RadioSelectGroupInputProps {
    name: string;
    label: string;
    options: Option[];
    required?: boolean;
    // Typically used by formik.
    value?: string | boolean;
    onChange: (value: string | boolean) => void;
    error: boolean;
    helperText?: string;
    // Extra props
    accentColor?: string;
    row?: boolean;
    booleanOptions?: boolean;
    inputSx?: SxProps<Theme>;
    [key: string]: unknown;
}

const RadioSelectGroup: React.FC<RadioSelectGroupInputProps> = ({
    name,
    label,
    options,
    required = false,
    value,
    onChange,
    error,
    helperText = "",
    accentColor = "#2c2540",
    row = false,
    booleanOptions = false,
    inputSx = []
}) => {
    // handle toggle manually so it works with Formik (onChange tries to pass event.target.checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // event.target.value is a string. We must convert it back to a boolean here.
        onChange(
            booleanOptions ? event.target.value === "true" : event.target.value
        );
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
            </FormLabel>
            <RadioGroup
                row={row}
                sx={{
                    width: "100%",
                    height: "100%",
                    color: "#ffffff",
                    display: row ? "grid" : "flex",
                    gridTemplateColumns: {
                        xs: "repeat(auto-fit, minmax(120px, 1fr))",
                        sm: "repeat(auto-fit, 120px)",
                        md: "repeat(auto-fit, 150px)"
                    },
                    rowGap: 4
                }}
            >
                {options.map(opt => (
                    <FormControlLabel
                        key={String(opt.value)}
                        sx={{
                            width: "fit-content",
                            height: "fit-content",
                            pl: 2
                        }}
                        control={
                            <Radio
                                checked={value === opt.value}
                                onChange={handleChange}
                                value={opt.value}
                                sx={[
                                    {
                                        width: 36,
                                        height: 36,
                                        padding: "6px", // override default
                                        borderRadius: "50%",
                                        backgroundColor: "#f0f0f0",

                                        "& .MuiSvgIcon-root": {
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "50%",
                                            backgroundColor: "transparent",
                                            color: "transparent" // unchecked icon color
                                        },
                                        "&.Mui-checked": {
                                            color: accentColor // this affects the animation
                                        },
                                        "&.Mui-checked .MuiSvgIcon-root": {
                                            color: accentColor, // checkmark color
                                            backgroundColor: accentColor
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffffff", // lighter on hover
                                            boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
                                        }
                                    },
                                    ...(Array.isArray(inputSx)
                                        ? inputSx
                                        : [inputSx])
                                ]}
                            />
                        }
                        label={
                            <Typography
                                variant="h3"
                                sx={{
                                    color: "#ffffff",
                                    pl: 2
                                }}
                            >
                                {opt.label}
                            </Typography>
                        }
                    />
                ))}
            </RadioGroup>

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default RadioSelectGroup;
