import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import {
    Box,
    Typography,
    Checkbox,
    FormGroup,
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
    formik: FormikProps<RegistrationData>;
}

const Transportation = ({ formik }: TransportationProps) => {
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    // helper to toggle a value inside an array field
    const toggleInArray = (field: keyof RegistrationData, val: string) => {
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

            {/* Travel reimbursement (multi-select) */}
            <StyledDropdown
                name="requestedTravelReimbursement"
                label="Requested Travel Reimbursement"
                multiple
                options={TRAVEL_REIMBURSE_OPTIONS.map(opt => ({
                    label: opt,
                    value: opt
                }))}
                value={values.requestedTravelReimbursement}
                onChange={value =>
                    setFieldValue("requestedTravelReimbursement", value)
                }
                error={
                    touched.requestedTravelReimbursement &&
                    Boolean(errors.requestedTravelReimbursement)
                }
                helperText={
                    touched.requestedTravelReimbursement &&
                    String(errors.requestedTravelReimbursement || "")
                }
            />

            {/* Travel Acknowledge (checkbox -> array<string>) */}
            <FormControl
                error={
                    touched.travelAcknowledge &&
                    Boolean(errors.travelAcknowledge)
                }
                sx={{
                    "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontFamily: "Montserrat"
                    }
                }}
            >
                <FormGroup>
                    {TRAVEL_ACK.map(text => (
                        <FormControlLabel
                            key={text}
                            control={
                                <Checkbox
                                    checked={(
                                        values.travelAcknowledge || []
                                    ).includes(text)}
                                    onChange={() =>
                                        toggleInArray("travelAcknowledge", text)
                                    }
                                    sx={{ color: "white" }}
                                />
                            }
                            label={text}
                        />
                    ))}
                </FormGroup>
                {touched.travelAcknowledge && errors.travelAcknowledge && (
                    <FormHelperText error>
                        {String(errors.travelAcknowledge)}
                    </FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default Transportation;
