import { RegistrationType } from "@/util/types";
import { Box, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface ConfirmationProps {
    formik: FormikProps<RegistrationType>;
}

const Confirmation = ({ formik }: ConfirmationProps) => {
    // The confirmation step no longer requires explicit acknowledgement fields.
    // Final validation and submission are handled in the parent form.
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

            <Typography sx={{ color: "white", fontFamily: "Montserrat" }}>
                Please review your information on the previous page. When you
                click Submit your responses will be saved. There are no
                additional acknowledgement fields on this form.
            </Typography>
        </Box>
    );
};

export default Confirmation;
