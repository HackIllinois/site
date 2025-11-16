// import { RegistrationData } from "@/util/types";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

interface TextInputProps {
    name: string;
    label: string;
    sublabel?: string;
    multiline?: boolean;
    required?: boolean;
    placeholder?: string;
    // formik controls
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText?: string;
    // extra props
    accentColor?: string;
    [key: string]: unknown;
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    sublabel,
    multiline = false,
    required = false,
    placeholder = "Type here",
    value,
    onChange,
    error,
    helperText = "",
    accentColor = "2c2540",
    ...props
}) => {
    return (
        <FormControl fullWidth error={error}>
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 1,
                    fontWeight: 400
                }}
            >
                {label + (required ? "*" : "")}
                <Typography
                    component="span"
                    variant="body2"
                    sx={{ ml: 1, opacity: "0.8", fontStyle: "oblique" }}
                >
                    {sublabel}
                </Typography>
            </FormLabel>
            <InputBase
                name={name}
                value={value}
                onChange={onChange}
                multiline={multiline}
                placeholder={placeholder}
                {...props}
                sx={theme => ({
                    backgroundColor: "#f0f0f0",
                    borderRadius: 6,
                    px: multiline ? 2.5 : 3,
                    py: multiline ? 2 : 0.5,
                    color: accentColor,
                    border: "2px solid #f0f0f0",
                    "&.Mui-focused": {
                        // Mui props needed because of the MUI component structure... the focus is on the input _inside_ this div
                        backgroundColor: "#ffffff", // lighter on focus
                        boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
                    },
                    "&.Mui-error": {
                        borderColor: theme.palette.error.main
                    }
                })}
                slotProps={{
                    // for some reason you can't access the placeholder from general sx, hit the input slot directly
                    input: {
                        sx: {
                            "::placeholder": {
                                color: "gray",
                                opacity: 0.8
                            }
                        }
                    }
                }}
            />
            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default TextInput;
