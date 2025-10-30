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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText?: string;
    // extra props
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
    helperText = ""
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

        // simulate Formik’s change event
        const syntheticEvent = {
            target: {
                name,
                value: newValue
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    return (
        <FormControl
            component="fieldset"
            error={error}
            sx={{
                color: "#ffffff",
                "& .MuiFormGroup-root": {
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                }
            }}
        >
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 1,
                    fontWeight: 400
                }}
            >
                {label + (required ? "*" : "")}
            </FormLabel>
            <FormGroup>
                {options.map(opt => (
                    <FormControlLabel
                        key={opt.value}
                        control={
                            <Checkbox
                                checked={value.includes(opt.value)}
                                onChange={handleChange}
                                value={opt.value}
                                sx={{
                                    padding: 0,
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8, // <-- roundness
                                    color: "#ffffff90", // unchecked icon color
                                    "&.Mui-checked": {
                                        color: "#ffffff", // checked icon color
                                        backgroundColor: "#ffffff" // fill color (if using icon replacement)
                                    },
                                    "& .MuiSvgIcon-root": {
                                        width: 28,
                                        height: 28,
                                        borderRadius: 8,
                                        backgroundColor: "#ffffff20", // subtle background for unselected
                                        transition:
                                            "background-color 0.2s ease, transform 0.2s ease"
                                    },
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                        backgroundColor: "#ffffff",
                                        color: "#2c2540", // checkmark color
                                        transform: "scale(0.95)"
                                    },
                                    "&:hover .MuiSvgIcon-root": {
                                        backgroundColor: "#ffffff40" // hover effect
                                    }
                                }}
                            />
                        }
                        label={
                            <Typography
                                sx={{ color: "#ffffff", fontSize: "0.95rem" }}
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
