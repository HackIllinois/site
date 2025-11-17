// import { RegistrationData } from "@/util/types";
import {
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup
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
    [key: string]: unknown;
    row?: boolean;
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
    row = false
}) => {
    // handle toggle manually so it works with Formik (onChange tries to pass event.target.checked)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl
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
                {label + (required ? "*" : "")}
            </FormLabel>
            <RadioGroup
                row={row}
                sx={{
                    width: "100%",
                    height: "100%",
                    color: "#ffffff",
                    display: row ? "grid" : "flex",
                    gridTemplateColumns: {
                        xs: "repeat(auto-fit, minmax(150px, 1fr))",
                        sm: "repeat(auto-fit, 150px)",
                        md: "repeat(auto-fit, 250px)"
                    },
                    rowGap: 4,
                    // columnGap: 20,
                    // justifyContent: { xs: "space-between", sm: "normal" },
                    p: 2
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
                                sx={{
                                    width: 48,
                                    height: 48,
                                    padding: "8px", // override default
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
                                }}
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
