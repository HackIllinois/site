import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";

interface Option {
    label: string;
    value: string;
}

interface SelectTextInputProps {
    name: string;
    label: string;
    multiple?: boolean;
    required?: boolean;
    placeholder?: string;
    options: Option[];
    value: string | string[];
    onChange: (value: string | string[]) => void;
    error?: boolean;
    helperText?: string;
    accentColor?: string;
    [key: string]: unknown;
}

const SelectTextInput: React.FC<SelectTextInputProps> = ({
    name,
    label,
    multiple = false,
    required = false,
    placeholder = "Select an option",
    options,
    value,
    onChange,
    error,
    helperText = "",
    accentColor = "2c2540",
    ...props
}) => {
    const handleChange = (e: SelectChangeEvent<typeof value>) => {
        const raw = e.target.value;
        const normalized = multiple
            ? Array.isArray(raw)
                ? (raw as string[])
                : typeof raw === "string"
                  ? raw.split(",")
                  : []
            : (raw as string);

        onChange(normalized);
    };

    const normalizedValue = multiple
        ? options.filter(o => Array.isArray(value) && value.includes(o.value))
        : options.find(o => o.value === value) || null;

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

            <Autocomplete
                multiple={multiple}
                options={options}
                value={normalizedValue as any}
                disableCloseOnSelect={multiple}
                filterSelectedOptions={false}
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                getOptionLabel={opt => opt.label}
                onChange={(_, val) => {
                    if (multiple) {
                        onChange((val as Option[]).map(v => v.value));
                    } else {
                        onChange((val as Option | null)?.value || "");
                    }
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        error={error}
                        sx={theme => ({
                            backgroundColor: "#f0f0f0",
                            borderRadius: 6,
                            color: accentColor,
                            border: "2px solid #f0f0f0",
                            "& .MuiAutocomplete-inputRoot": {
                                display: "flex",
                                alignItems: "center",
                                overflowX: "scroll",
                                padding: "4px 18px 4px 18px",
                                marginLeft: "12px",
                                minHeight: 40,
                                whiteSpace: "nowrap",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                }
                            },
                            "& .MuiAutocomplete-tag": {
                                // chips in multiselect
                                display: "flex",
                                alignItems: "center",
                                height: "24px",
                                margin: "2px 2px 2px 0"
                            },
                            "& .MuiInputBase-input": {
                                padding: "0 12px !important",
                                width: "100%",
                                boxSizing: "border-box"
                            },
                            "& .MuiOutlinedInput-root": {
                                padding: 0,
                                borderRadius: 6,
                                height: "40px"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none"
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: "gray",
                                opacity: 0.8
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                backgroundColor: "#ffffff",
                                boxShadow: "0 0 4px 2px #ffffff40"
                            },
                            "&.Mui-error": {
                                borderColor: theme.palette.error.main
                            }
                        })}
                    />
                )}
                renderOption={(props, option, { selected }) => {
                    const { key, ...rest } = props;

                    return (
                        <MenuItem
                            key={key}
                            {...rest}
                            value={option.value}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                ...(selected && {
                                    backgroundColor: "#70D6FF !important",
                                    color: "#fff"
                                }),
                                "&.Mui-focused": {
                                    backgroundColor: selected
                                        ? "#70D6FF !important"
                                        : "#E0F4FF"
                                }
                            }}
                        >
                            <span>{option.label}</span>
                        </MenuItem>
                    );
                }}
                {...props}
            />

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectTextInput;
