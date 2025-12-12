import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";

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
    //
    [key: string]: unknown;
}

/** NOT REAL (FROM BRANCH COPYING), DO NOT USE */
const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    multiline = false,
    required = false,
    value,
    onChange,
    error,
    helperText = "",
    ...props
}) => {
    return (
        <FormControl fullWidth>
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 2,
                    fontWeight: 300
                }}
            >
                {label + (required && "*")}
            </FormLabel>
            <InputBase
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                multiline={multiline}
                {...props}
                sx={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: "9999px",
                    px: 3,
                    py: 0.5,
                    color: "black",
                    "&::placeholder": { opacity: 0.6 }
                }}
            />
            {error && (
                <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                    {helperText}
                </Typography>
            )}
        </FormControl>
    );
};

export default TextInput;
