import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationType } from "@/util/types";
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormHelperText
} from "@mui/material";
import { FormikProps } from "formik";

const DIETARY_OPTIONS = [
    "None",
    "Vegetarian",
    "Vegan",
    "Halal",
    "Kosher",
    "Gluten-free",
    "Nut Allergy",
    "Dairy-free",
    "Other"
];
const TRAVEL_REIMBURSE_OPTIONS = [
    "Not requesting",
    "Bus",
    "Train",
    "Flight",
    "Gas"
];
const TRAVEL_ACK = [
    "I understand travel reimbursements are limited and not guaranteed"
];

interface TransportationProps {
    formik: FormikProps<RegistrationType>;
}

const Transportation = ({ formik }: TransportationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    // helper to toggle a value inside an array field (for dietary)
    const toggleInArray = (field: keyof RegistrationType, val: string) => {
        const arr = new Set<string>((values[field] as string[]) || []);
        arr.has(val) ? arr.delete(val) : arr.add(val);
        setFieldValue(field, Array.from(arr));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 700,
                mx: "auto",
                pt: 5
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
            >
                Transportation
            </Typography>

            {/* Dietary (multi-select) */}
            <StyledDropdown
                name="dietaryRestrictions"
                label="Dietary Restrictions"
                multiple
                options={DIETARY_OPTIONS.map(opt => ({
                    label: opt,
                    value: opt
                }))}
                value={values.dietaryRestrictions}
                onChange={value => setFieldValue("dietaryRestrictions", value)}
                error={
                    touched.dietaryRestrictions &&
                    Boolean(errors.dietaryRestrictions)
                }
                helperText={
                    touched.dietaryRestrictions &&
                    String(errors.dietaryRestrictions || "")
                }
            />

            {/* Travel reimbursement (now boolean) */}
            <FormControl sx={{ ml: 0 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={Boolean(
                                values.requestedTravelReimbursement
                            )}
                            onChange={e =>
                                setFieldValue(
                                    "requestedTravelReimbursement",
                                    e.target.checked
                                )
                            }
                            sx={{ color: "white" }}
                        />
                    }
                    label="I would like to be considered for travel reimbursement"
                    sx={{ color: "white", fontFamily: "Montserrat" }}
                />
            </FormControl>
        </Box>
    );
};

export default Transportation;
