// import { RegistrationData } from "@/util/types";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

interface CheckboxOption {
    label: string;
    value: string;
}

interface CheckboxGroupInputProps {
    name: string;
    label: string;
    options: CheckboxOption[];
    required?: boolean;
    // formik controls
    value: string[];
    onChange: (value: string[]) => void;
    error: boolean;
    helperText?: string;
    // extra props
    accentColor?: string;
    [key: string]: unknown;
}

const CheckboxGroupMUI: React.FC<CheckboxGroupInputProps> = ({
    name,
    label,
    options,
    required = false,
    value,
    onChange,
    error,
    helperText = "",
    accentColor = "#2c2540"
}) => {
    // handle toggle manually so it works with Formik array fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: checkboxValue, checked } = event.target;
        let newValue: string[];

        if (checked) {
            newValue = [...value, checkboxValue];
        } else {
            newValue = value.filter(v => v !== checkboxValue);
        }

        onChange(newValue);
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
            <FormGroup
                sx={{
                    width: "100%",
                    height: "100%",
                    color: "#ffffff",
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 4,
                    p: 2,
                    alignItems: "center"
                }}
            >
                {options.map(opt => (
                    <FormControlLabel
                        key={opt.value}
                        sx={{
                            width: "fit-content",
                            height: "fit-content"
                        }}
                        control={
                            <Checkbox
                                checked={value.includes(opt.value)}
                                onChange={handleChange}
                                value={opt.value}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    padding: 0, // override default
                                    borderRadius: 3,
                                    backgroundColor: "#f0f0f0",

                                    "& .MuiSvgIcon-root": {
                                        width: "90%",
                                        height: "90%",
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
                                sx={{
                                    color: "#ffffff",
                                    fontSize: "0.95rem",
                                    pl: 2
                                }}
                            >
                                {opt.label}
                            </Typography>
                        }
                    />
                ))}
            </FormGroup>

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default CheckboxGroupMUI;
