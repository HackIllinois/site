import SelectInput from "@/components/SelectInputMUI";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import {
    Box,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormHelperText,
    Container,
    Grid
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
        <Container>
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    mt: 8,
                    mb: 4
                }}
            >
                TRANSPORTATION
            </Typography>

            <Grid container columnSpacing={2} rowSpacing={6}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Dietary (multi-select) */}
                    <SelectInput
                        name="dietaryRestrictions"
                        label="Dietary Restrictions"
                        multiple
                        options={DIETARY_OPTIONS.map(opt => ({
                            label: opt,
                            value: opt
                        }))}
                        value={values.dietaryRestrictions}
                        onChange={value =>
                            setFieldValue("dietaryRestrictions", value)
                        }
                        error={
                            !!touched.dietaryRestrictions &&
                            Boolean(errors.dietaryRestrictions)
                        }
                        helperText={
                            !!touched.dietaryRestrictions
                                ? String(errors.dietaryRestrictions || "")
                                : ""
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Travel reimbursement (multi-select) */}
                    <SelectInput
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
                            !!touched.requestedTravelReimbursement &&
                            Boolean(errors.requestedTravelReimbursement)
                        }
                        helperText={
                            !!touched.requestedTravelReimbursement
                                ? String(
                                      errors.requestedTravelReimbursement || ""
                                  )
                                : ""
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
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
                                                toggleInArray(
                                                    "travelAcknowledge",
                                                    text
                                                )
                                            }
                                            sx={{ color: "white" }}
                                        />
                                    }
                                    label={text}
                                />
                            ))}
                        </FormGroup>
                        {touched.travelAcknowledge &&
                            errors.travelAcknowledge && (
                                <FormHelperText error>
                                    {String(errors.travelAcknowledge)}
                                </FormHelperText>
                            )}
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transportation;
