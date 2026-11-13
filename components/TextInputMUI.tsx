import Box from "@mui/material/Box";
import { FormHelperText, SxProps, Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { BOX_SHADOW_FILTER } from "@/theme/shadows";

interface TextInputProps {
    name: string;
    label: string;
    sublabel?: string;
    multiline?: boolean;
    required?: boolean;
    placeholder?: string;
    // formik controls
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText?: string;
    // extra props
    accentColor?: string;
    placeholderColor?: string;
    inputSx?: SxProps<Theme>;
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
    accentColor = "#2c2540",
    placeholderColor = "gray",
    inputSx = [],
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
                <span
                    style={{
                        marginRight: required ? "14px" : "8px"
                    }}
                >
                    {label}
                </span>
                {required && (
                    <span
                        style={{
                            color: "#ffffff",
                            position: "absolute",
                            marginLeft: "-13px",
                            fontWeight: 500
                        }}
                    >
                        *
                    </span>
                )}
                <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "#c4c4c4ff", fontStyle: "oblique" }}
                >
                    {sublabel}
                </Typography>
            </FormLabel>
            <Box sx={{ filter: BOX_SHADOW_FILTER }}>
                <InputBase
                    name={name}
                    value={value}
                    onChange={onChange}
                    multiline={multiline}
                    placeholder={placeholder}
                    {...props}
                    sx={[
                        theme => ({
                            width: "100%",
                            backgroundColor: "#ffffff",
                            clipPath:
                                "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                            px: multiline ? 2.5 : 3,
                            py: multiline ? 2 : 0.5,
                            color: accentColor,
                            //border: "2px solid #ffffff",
                            "&.Mui-focused": {
                                // Mui props needed because of the MUI component structure... the focus is on the input _inside_ this div
                                backgroundColor: "#ffffff" // lighter on focus
                                //boxShadow: "0 0 4px 2px #ffffff40" // subtle glow
                            },
                            "&.Mui-error": {
                                borderColor: theme.palette.error.main
                            }
                        }),
                        ...(Array.isArray(inputSx) ? inputSx : [inputSx])
                    ]}
                    slotProps={{
                        // for some reason you can't access the placeholder from general sx, hit the input slot directly
                        input: {
                            sx: {
                                "::placeholder": {
                                    color: placeholderColor,
                                    opacity: 0.8
                                },
                                "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
                                    {
                                        WebkitBoxShadow:
                                            "0 0 0 1000px #ffffff inset", // same as your bg
                                        WebkitTextFillColor: accentColor
                                    }
                            }
                        }
                    }}
                />
            </Box>
            {helperText && (
                <FormHelperText sx={{ mt: 0.5, color: "#ffffff" }}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default TextInput;
