import { BOX_SHADOW_FILTER } from "@/theme/shadows";
import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import React from "react";

interface RankItem {
    /** Form field name, e.g. "interestSoftware". */
    name: string;
    label: string;
    value?: string;
    onChange: (rank: string) => void;
}

interface RankSelectProps {
    name: string;
    label: string;
    required?: boolean;
    /** Things being ranked (one row each). */
    items: RankItem[];
    /** Rank choices, e.g. ["1", "2"]. */
    ranks: string[];
    error?: boolean;
    helperText?: string;
}

/** Same cut-corner shape as the other inputs. */
const CHAMFER =
    "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)";

/**
 * Rank a few options with a small numbered dropdown each.
 */
const RankSelect: React.FC<RankSelectProps> = ({
    name,
    label,
    required = false,
    items,
    ranks,
    error = false,
    helperText = ""
}) => (
    <FormControl id={name} component="fieldset" error={error} fullWidth>
        <FormLabel
            component="legend"
            sx={{ color: "#ffffff", mb: 1, fontWeight: 400 }}
        >
            <span style={{ marginRight: required ? "14px" : "8px" }}>
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
        </FormLabel>

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "auto 140px",
                alignItems: "center",
                columnGap: { xs: 3, md: 4 },
                rowGap: 2,
                width: "fit-content",
                pt: 1
            }}
        >
            {items.map(item => (
                <React.Fragment key={item.name}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            minWidth: 150
                        }}
                    >
                        <Typography
                            id={`${item.name}-label`}
                            sx={{
                                color: "#ffffff",
                                fontFamily: "Montserrat",
                                fontSize: "18px"
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>

                    <Box sx={{ filter: BOX_SHADOW_FILTER }}>
                        <Select
                            name={item.name}
                            value={item.value || ""}
                            onChange={e =>
                                item.onChange(String(e.target.value))
                            }
                            displayEmpty
                            error={error && !item.value}
                            inputProps={{
                                "aria-labelledby": `${item.name}-label`
                            }}
                            renderValue={selected =>
                                selected ? (
                                    selected
                                ) : (
                                    <Typography
                                        component="span"
                                        sx={{ color: "gray", opacity: 0.8 }}
                                    >
                                        Rank
                                    </Typography>
                                )
                            }
                            sx={{
                                width: "100%",
                                height: 40,
                                backgroundColor: "#ffffff",
                                clipPath: CHAMFER,
                                fontFamily: "Montserrat",
                                fontSize: "14px",
                                color: "#222222",
                                "& .MuiSelect-select": { pl: 2 },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none"
                                }
                            }}
                        >
                            {ranks.map(rank => (
                                <MenuItem
                                    key={rank}
                                    value={rank}
                                    sx={{ fontSize: "14px" }}
                                >
                                    {rank}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </React.Fragment>
            ))}
        </Box>

        {helperText && (
            <FormHelperText sx={{ mt: 1, color: "#ffffff" }}>
                {helperText}
            </FormHelperText>
        )}
    </FormControl>
);

export default RankSelect;
