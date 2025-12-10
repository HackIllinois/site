import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useRef, useState } from "react";

interface Option {
    label: string;
    value: string;
}

interface SelectTextInputProps {
    name: string;
    label: string;
    sublabel?: string;
    multiple?: boolean;
    required?: boolean;
    placeholder?: string;
    options: Option[];
    value: string | string[];
    onChange: (value: string | string[]) => void;
    maxInputWidth?: string;
    error?: boolean;
    helperText?: string;
    accentColor?: string;
    [key: string]: unknown;
}

const SelectTextInput: React.FC<SelectTextInputProps> = ({
    name,
    label,
    sublabel,
    multiple = false,
    required = false,
    placeholder = "Select an option",
    options,
    value,
    onChange,
    error,
    maxInputWidth,
    helperText = "",
    accentColor = "2c2540",
    ...props
}) => {
    const OPTIONS_LIMIT = 55; // 55 so that all US states show up when used for state selection

    const [visibleCount, setVisibleCount] = useState(OPTIONS_LIMIT);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const tabPressedRef = useRef(false);

    const normalizedValue = multiple
        ? options.filter(o => Array.isArray(value) && value.includes(o.value))
        : options.find(o => o.value === value) || null;

    const defaultFilterOptions = createFilterOptions<Option>();

    const filterOptions = (optionsToFilter: Option[], state: any) => {
        const filtered = defaultFilterOptions(
            optionsToFilter,
            state
        ) as Option[];
        return filtered.slice(0, visibleCount);
    };

    const handleOpen = () => {
        setVisibleCount(OPTIONS_LIMIT); // reset when opening
    };

    const handleListboxScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const listboxNode = event.currentTarget;
        const { scrollTop, clientHeight, scrollHeight } = listboxNode;

        // When user reaches (or is very close to) the bottom, show more
        if (scrollTop + clientHeight >= scrollHeight - 8) {
            setVisibleCount(prev => prev + OPTIONS_LIMIT);
        }
    };

    return (
        <FormControl fullWidth error={error} id={name}>
            <FormLabel
                sx={{
                    color: "#ffffff",
                    mb: 1,
                    fontWeight: 400
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

            <Autocomplete
                ref={autocompleteRef}
                sx={{
                    maxWidth: maxInputWidth,
                    fontSize: "14px"
                }}
                filterOptions={filterOptions}
                multiple={multiple}
                options={options}
                value={normalizedValue as any}
                disableCloseOnSelect={multiple}
                filterSelectedOptions={false}
                autoHighlight={true}
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                getOptionLabel={opt => opt.label}
                onOpen={handleOpen}
                onChange={(_, val) => {
                    if (multiple) {
                        onChange((val as Option[]).map(v => v.value));
                    } else {
                        onChange((val as Option | null)?.value || "");
                    }
                }}
                ListboxProps={{
                    onScroll: handleListboxScroll,
                    ref: listboxRef
                }}
                // --- code for handling save-on-Tab-keypress
                onKeyDown={event => {
                    if (event.key === "Tab") {
                        tabPressedRef.current = true;
                    }
                }}
                onBlur={_ => {
                    // if the user pressed Tab, imitate Enter (select highlighted item)
                    const isTabPress = tabPressedRef.current;
                    tabPressedRef.current = false; // reset

                    const focusedItem =
                        listboxRef.current?.querySelector(".Mui-focused");

                    const focusedValue = focusedItem?.getAttribute("value");

                    if (isTabPress && focusedValue) {
                        if (multiple) {
                            const newValues = Array.isArray(value)
                                ? [...value]
                                : [];
                            if (newValues.includes(focusedValue)) {
                                onChange(
                                    newValues.filter(v => v !== focusedValue)
                                );
                            } else {
                                onChange([...newValues, focusedValue]);
                            }
                        } else {
                            onChange(focusedValue);
                        }
                    }
                }}
                onKeyUp={event => {
                    if (event.key === "Tab") {
                        tabPressedRef.current = false;
                    } // reset just in case
                }}
                // --- ^ code for handling Tab
                renderInput={params => (
                    <TextField
                        {...params}
                        inputRef={inputRef}
                        placeholder={placeholder}
                        error={error}
                        sx={theme => ({
                            fontSize: "14px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: 6,
                            color: accentColor,
                            border: "2px solid #f0f0f0",
                            "& .MuiAutocomplete-inputRoot": {
                                display: "flex",
                                alignItems: "center",
                                overflowX: "scroll",
                                padding: "4px 12px",
                                minHeight: 40,
                                whiteSpace: "nowrap",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none"
                                }
                            },
                            "& .MuiAutocomplete-tag": {
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
                                borderRadius: 6
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none"
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: "gray",
                                opacity: 0.8
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                backgroundColor: "#f0f0f0",
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
                            key={`${key}`}
                            id={`${key}`}
                            {...rest}
                            value={option.value}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                fontSize: "14px",
                                ...(selected && {
                                    backgroundColor: "#48b7e3ff !important",
                                    color: "#fff"
                                }),
                                "&.Mui-focused": {
                                    backgroundColor: selected
                                        ? "#48b7e3ff !important"
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
                <FormHelperText sx={{ m: 0, mt: 0.5 }}>
                    {helperText}
                </FormHelperText>
            )}
            {sublabel && (
                <FormHelperText
                    sx={{
                        m: 0,
                        mt: 1,
                        color: "#ffffffb3 !important",
                        fontSize: "12px"
                    }}
                >
                    {sublabel}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectTextInput;
