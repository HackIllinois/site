import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

interface Option {
    label: string;
    value: string;
}

interface SelectInputProps {
    name: string;
    label: string;
    multiple?: boolean;
    required?: boolean;
    placeholder?: string;
    options: Option[];
    value: string | string[];
    /** Called with the normalized value:
     *  - single: string
     *  - multiple: string[]
     */
    onChange: (value: string | string[]) => void;
    error?: boolean;
    helperText?: string;
    [key: string]: unknown;
}

const SelectInput: React.FC<SelectInputProps> = ({
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

            <Select
                name={name}
                value={value}
                onChange={handleChange}
                multiple={multiple}
                displayEmpty
                renderValue={selected => {
                    if (selected.length === 0) {
                        return (
                            <Typography sx={{ opacity: 0.6 }}>
                                {placeholder}
                            </Typography>
                        );
                    }
                    if (!multiple) return selected as string;
                    const arr = selected as string[];
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                //flexWrap: "wrap",
                                gap: 0.5
                            }}
                        >
                            {arr.map(val => (
                                <Chip
                                    key={val}
                                    label={val}
                                    sx={{
                                        color: "white",
                                        bgcolor: "#2c2540",
                                        height: "24px",
                                        lineHeight: 1
                                    }}
                                />
                            ))}
                        </Box>
                    );
                }}
                {...props}
                sx={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: "9999px",
                    px: multiple ? 0 : 3,
                    py: 0.5,
                    color: "#2c2540",
                    "& .MuiSelect-select": {
                        px: multiple ? 2 : 0,
                        py: 0.5,
                        maskImage: multiple
                            ? "linear-gradient(90deg, transparent 4%, black 5%, black 86%, transparent 90%)"
                            : "",
                        overflow: "scroll",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        // hide scrollbar in WebKit browsers (Chrome/Safari)
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none"
                    },
                    "&.Mui-focused": {
                        backgroundColor: "#f0f0f0",
                        boxShadow: "0 0 4px 2px #ffffff40"
                    }
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={`menu-${option.value}-${index}`}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            {helperText && (
                <FormHelperText sx={{ mt: 0.5 }}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectInput;
