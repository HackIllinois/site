import {
    Box,
    Chip,
    FormControl,
    FormControlProps,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";

export interface DropdownOption {
    label: string;
    value: string;
}

interface StyledDropdownProps {
    name: string;
    label: string;
    options: DropdownOption[];
    value: string | string[];
    multiple?: boolean;

    /** Called with the normalized value:
     *  - single: string
     *  - multiple: string[]
     */
    onChange: (value: string | string[]) => void;

    error?: boolean;
    helperText?: React.ReactNode;
    formControlProps?: Omit<FormControlProps, "error" | "fullWidth">;
}

export default function StyledDropdown({
    name,
    label,
    options,
    value,
    multiple = false,
    onChange,
    error,
    helperText,
    formControlProps
}: StyledDropdownProps) {
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
        <FormControl
            fullWidth
            error={Boolean(error)}
            {...formControlProps}
            sx={{
                "& .MuiInputBase-root": {
                    color: "white",
                    fontFamily: "Montserrat",
                    borderRadius: multiple ? "24px" : "50px",
                    backgroundColor: "#2c2540"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3d3558"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a290e3"
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#b39ddb"
                },
                "& .MuiInputLabel-root": {
                    color: "white",
                    fontFamily: "Montserrat"
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#b39ddb" },
                ...(formControlProps?.sx || {})
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                label={label}
                value={value as any}
                multiple={multiple}
                onChange={handleChange}
                renderValue={selected => {
                    if (!multiple) return selected as string;
                    const arr = selected as string[];
                    return (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {arr.map(val => (
                                <Chip
                                    key={val}
                                    label={val}
                                    sx={{ color: "white" }}
                                />
                            ))}
                        </Box>
                    );
                }}
            >
                {options.map((opt, index) => (
                    <MenuItem
                        key={`menu-${opt.value}-${index}`}
                        value={opt.value}
                    >
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
