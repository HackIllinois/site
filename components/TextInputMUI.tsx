// import { RegistrationData } from "@/util/types";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

interface TextInputProps {
    name: string;
    label: string;
    multiline?: boolean;
    required?: boolean;
    placeholder?: string;
    // formik controls
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText?: string;
    // extra props
    [key: string]: unknown;
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    multiline = false,
    required = false,
    placeholder = "Type here",
    value,
    onChange,
    error,
    helperText = "",
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
            </FormLabel>
            <InputBase
                name={name}
                value={value}
                onChange={onChange}
                multiline={multiline}
                placeholder={placeholder}
                {...props}
                sx={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: "9999px",
                    px: 3,
                    py: 0.5,
                    color: "#2c2540",
                    "&::placeholder": { opacity: 0.6 },
                    "&.Mui-focused": {
                        // Mui props needed because of the MUI component structure... the focus is on the input _inside_ this div
                        backgroundColor: "#f0f0f0", // lighter on focus
                        boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
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
