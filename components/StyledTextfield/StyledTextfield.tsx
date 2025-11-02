// components/StyledTextField.tsx
import { TextField, TextFieldProps } from "@mui/material";
import { SxProps } from "@mui/system";

interface StyledTextFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: React.ReactNode;
    InputLabelProps?: TextFieldProps["InputLabelProps"];

    // NEW: multiline support
    multiline?: boolean;
    rows?: number;
    minRows?: number;
    maxRows?: number;
}

export default function StyledTextField({
    name,
    label,
    placeholder = "Type here...",
    required = false,
    fullWidth = true,
    sx = {},
    type = "text",
    value,
    onChange,
    error,
    helperText,
    InputLabelProps,

    // NEW
    multiline = false,
    rows,
    minRows,
    maxRows
}: StyledTextFieldProps) {
    return (
        <TextField
            name={name}
            label={label}
            placeholder={placeholder}
            required={required}
            fullWidth={fullWidth}
            type={multiline ? undefined : type} // type is ignored for multiline
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            multiline={multiline}
            rows={rows}
            minRows={minRows}
            maxRows={maxRows}
            InputProps={{
                sx: {
                    color: "white",
                    fontFamily: "Montserrat",
                    borderRadius: multiline ? "18px" : "50px", // softer radius for textareas
                    backgroundColor: "#2c2540",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3d3558"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#a290e3"
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#b39ddb"
                    }
                }
            }}
            InputLabelProps={{
                sx: {
                    color: "white",
                    fontFamily: "Montserrat",
                    "&.Mui-focused": { color: "#b39ddb" }
                },
                ...InputLabelProps
            }}
            sx={{
                "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "Montserrat"
                },
                ...sx
            }}
        />
    );
}
