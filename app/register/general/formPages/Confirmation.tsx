import { RegistrationData } from "@/util/types";
import {
    Box,
    Typography,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText
} from "@mui/material";
import { FormikProps } from "formik";

const COC_ACKS = [
    "I agree to abide by the Code of Conduct (MLH or event-specific)"
];
const REVIEW_ACKS = ["I have reviewed my information and it is accurate"];

interface ConfirmationProps {
    formik: FormikProps<RegistrationData>;
    accentColor?: string;
}

const Confirmation = ({ formik, accentColor }: ConfirmationProps) => {
    const { values, errors, touched, setFieldValue } = formik;

    const toggleInArray = (field: keyof RegistrationData, val: string) => {
        const arr = new Set<string>((values[field] as string[]) || []);
        arr.has(val) ? arr.delete(val) : arr.add(val);
        setFieldValue(field, Array.from(arr));
    };

    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                pt: 5,
                display: "flex",
                flexDirection: "column",
                gap: 4
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
            >
                Confirmation
            </Typography>

            <FormControl
                error={
                    touched.codeOfConductAcknowledge &&
                    Boolean(errors.codeOfConductAcknowledge)
                }
                sx={{
                    "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontFamily: "Montserrat"
                    }
                }}
            >
                <Typography
                    sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
                >
                    Code of Conduct
                </Typography>
                <FormGroup>
                    {COC_ACKS.map(text => (
                        <FormControlLabel
                            key={text}
                            control={
                                <Checkbox
                                    checked={(
                                        values.codeOfConductAcknowledge || []
                                    ).includes(text)}
                                    onChange={() =>
                                        toggleInArray(
                                            "codeOfConductAcknowledge",
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
                {touched.codeOfConductAcknowledge &&
                    errors.codeOfConductAcknowledge && (
                        <FormHelperText error>
                            {String(errors.codeOfConductAcknowledge)}
                        </FormHelperText>
                    )}
            </FormControl>

            <FormControl
                error={
                    touched.reviewedInformationAcknowledge &&
                    Boolean(errors.reviewedInformationAcknowledge)
                }
                sx={{
                    "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontFamily: "Montserrat"
                    }
                }}
            >
                <Typography
                    sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
                >
                    Review & Submit
                </Typography>
                <FormGroup>
                    {REVIEW_ACKS.map(text => (
                        <FormControlLabel
                            key={text}
                            control={
                                <Checkbox
                                    checked={(
                                        values.reviewedInformationAcknowledge ||
                                        []
                                    ).includes(text)}
                                    onChange={() =>
                                        toggleInArray(
                                            "reviewedInformationAcknowledge",
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
                {touched.reviewedInformationAcknowledge &&
                    errors.reviewedInformationAcknowledge && (
                        <FormHelperText error>
                            {String(errors.reviewedInformationAcknowledge)}
                        </FormHelperText>
                    )}
            </FormControl>
        </Box>
    );
};

export default Confirmation;
