// import { RegistrationData } from "@/util/types";
import { Check } from "@mui/icons-material";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    SxProps,
    Theme
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

interface Option {
    label: string;
    value: string;
}

interface CheckboxGroupInputProps {
    name: string;
    label: string;
    options: Option[];
    required?: boolean;
    // formik controls
    value: string[];
    onChange: (value: string[]) => void;
    error: boolean;
    helperText?: string;
    // extra props
    accentColor?: string;
    inputSx?: SxProps<Theme>;
    disabled?: boolean;
    [key: string]: unknown;
}

const CheckboxGroup: React.FC<CheckboxGroupInputProps> = ({
    name,
    label,
    options,
    required = false,
    value,
    onChange,
    error,
    helperText = "",
    accentColor = "#2c2540",
    disabled,
    inputSx = []
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
            name={name}
            component="fieldset"
            error={error}
            sx={{ width: "100%", height: "100%" }}
            disabled={disabled}
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
            <FormGroup
                sx={{
                    width: "100%",
                    height: "100%",
                    color: "#ffffff",
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(275px, 1fr))",
                    rowGap: 4,
                    columnGap: 0,
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
                                checkedIcon={<Check />}
                                sx={[
                                    {
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
            </FormGroup>

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default CheckboxGroup;
