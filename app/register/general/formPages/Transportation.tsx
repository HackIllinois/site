import CheckboxSelect from "@/components/CheckboxMUI";
import RadioSelectGroup from "@/components/RadioGroupMUI";
import SelectInput from "@/components/SelectInputMUI";
import StyledDropdown from "@/components/StyledDropdown/StyledDropdown";
import { RegistrationData } from "@/util/types";
import {
    Box,
    Typography,
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
const TRAVEL_REIMBURSE_OPTIONS = ["Yes", "No"];
const TRAVEL_ACK =
    "I understand travel reimbursements are limited and not guaranteed";

interface TransportationProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Transportation = ({ formik, accentColor }: TransportationProps) => {
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
                <Grid size={{ xs: 12, md: 12 }}>
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
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    {/* Travel reimbursement (multi-select) */}
                    <RadioSelectGroup
                        name="requestedTravelReimbursement"
                        label="Requested Travel Reimbursement"
                        row
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
                        accentColor={accentColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <CheckboxSelect
                        name="travelAcknowledge"
                        label="Travel Acknowledgement"
                        row
                        optionLabel={TRAVEL_ACK}
                        value={values.travelAcknowledge}
                        onChange={value =>
                            setFieldValue("travelAcknowledge", value)
                        }
                        error={
                            !!touched.travelAcknowledge &&
                            Boolean(errors.travelAcknowledge)
                        }
                        helperText={
                            !!touched.travelAcknowledge
                                ? String(errors.travelAcknowledge || "")
                                : ""
                        }
                        accentColor={accentColor}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transportation;
