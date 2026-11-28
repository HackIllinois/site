import Box from "@mui/material/Box";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import Popper, { PopperProps } from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import React, { useMemo, useRef, useState } from "react";
import { BOX_SHADOW_FILTER } from "@/theme/shadows";

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

/**
 * Autocomplete's popup with an open and close animation (it has none by
 * default), growing out of the edge that touches the input.
 */
const AnimatedPopper = ({ children, open, ...props }: PopperProps) => {
    // Autocomplete empties the list the moment it closes, so keep showing the
    // last open contents while the popup animates out.
    const lastOpenChildren = useRef(children);
    if (open) lastOpenChildren.current = children;
    const content = (open ? children : lastOpenChildren.current) as
        | React.ReactNode
        | undefined;

    return (
        <Popper {...props} open={open} transition>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    timeout={{ enter: 200, exit: 140 }}
                    style={{
                        transformOrigin: placement.startsWith("top")
                            ? "center bottom"
                            : "center top"
                    }}
                >
                    <div>{content}</div>
                </Grow>
            )}
        </Popper>
    );
};

const SelectTextInput: React.FC<SelectTextInputProps> = ({
    name,
    label,
    sublabel,
    multiple = false,
    required = false,
    placeholder = "Select",
    options: allOptions,
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

    // Repeated values share a React key, which leaves stale rows behind in
    // the list when the search text changes.
    const options = useMemo(() => {
        const seen = new Set<string>();
        return allOptions.filter(option => {
            if (seen.has(option.value)) return false;
            seen.add(option.value);
            return true;
        });
    }, [allOptions]);

    // MUI Autocomplete clears the typed text whenever `value` changes
    // identity, and callers rebuild `options`/`value` every render. Reuse the
    // last array while it holds the same options, so a re-render (e.g. a draft
    // autosave) doesn't wipe what the applicant is typing.
    const lastMultiValue = useRef<Option[]>([]);
    let normalizedValue: Option[] | Option | null;
    if (multiple) {
        const next = options.filter(
            o => Array.isArray(value) && value.includes(o.value)
        );
        const prev = lastMultiValue.current;
        const same =
            next.length === prev.length &&
            next.every((o, i) => o.value === prev[i].value);
        if (!same) {
            lastMultiValue.current = next;
        }
        normalizedValue = lastMultiValue.current;
    } else {
        normalizedValue = options.find(o => o.value === value) || null;
    }

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
                            color: "#ffffff",
                            position: "absolute",
                            fontWeight: 500
                        }}
                    >
                        *
                    </span>
                )}
            </FormLabel>
            <Box sx={{ filter: BOX_SHADOW_FILTER }}>
                <Autocomplete
                    ref={autocompleteRef}
                    sx={{
                        maxWidth: maxInputWidth,
                        fontSize: "14px",
                        "& .MuiAutocomplete-popupIndicator": {
                            transition:
                                "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)"
                        }
                    }}
                    slots={{ popper: AnimatedPopper }}
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
                        ref: listboxRef,
                        // dvh so the list still fits when a phone keyboard
                        // or browser toolbar shrinks the viewport
                        style: { maxHeight: "min(40dvh, 360px)" }
                    }}
                    // handle saving on Tab keypress
                    onKeyDown={event => {
                        if (event.key !== "Tab") {
                            return;
                        }

                        // grab the currently highlighted item
                        const focusedItem =
                            listboxRef.current?.querySelector(".Mui-focused");

                        const focusedValue = focusedItem?.getAttribute("value");

                        // and set it to be properly selected before moving on
                        if (focusedValue) {
                            if (multiple) {
                                const newValues = Array.isArray(value)
                                    ? [...value]
                                    : [];
                                // Add only: Enter may already have selected it.
                                if (!newValues.includes(focusedValue)) {
                                    onChange([...newValues, focusedValue]);
                                }
                            } else {
                                onChange(focusedValue);
                            }
                        }
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            inputRef={inputRef}
                            placeholder={placeholder}
                            error={error}
                            sx={theme => ({
                                fontSize: "14px",
                                backgroundColor: "#ffffff",
                                clipPath:
                                    "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                                color: accentColor,
                                //border: "2px solid #f0f0f0",
                                "& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root":
                                    {
                                        display: "flex",
                                        alignItems: "center",
                                        overflowX: "scroll",
                                        padding: "0 0 0 24px",
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
                                    padding: "0 12px 0 0 !important",
                                    width: "100%",
                                    boxSizing: "border-box"
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none"
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "gray",
                                    opacity: 0.8
                                },
                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    backgroundColor: "#ffffff"
                                    //boxShadow: "0 0 4px 2px #ffffff40"
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
                                    // comfortable touch target on phones
                                    minHeight: { xs: 44, sm: 36 },
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
            </Box>

            {helperText && (
                <FormHelperText sx={{ m: 0, mt: 0.5, color: "#ffffff" }}>
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
