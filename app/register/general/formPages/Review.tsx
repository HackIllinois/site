import { RegistrationType } from "@/util/types";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { FormikProps } from "formik";

interface ReviewProps {
    formik: FormikProps<RegistrationType>;
}

const Line = () => <Divider sx={{ my: 2, borderColor: "#3d3558" }} />;

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap"
        }}
    >
        <Typography
            sx={{ color: "rgba(255,255,255,0.8)", fontFamily: "Montserrat" }}
        >
            {label}
        </Typography>
        <Box
            sx={{
                color: "white",
                fontFamily: "Montserrat",
                textAlign: "right"
            }}
        >
            {value}
        </Box>
    </Box>
);

const ChipList = ({ items }: { items: string[] }) => (
    <Box
        sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "flex-end"
        }}
    >
        {items.length === 0 ? (
            <Typography sx={{ color: "white" }}>—</Typography>
        ) : (
            items.map(i => <Chip key={i} label={i} sx={{ color: "white" }} />)
        )}
    </Box>
);

const Review = ({ formik }: ReviewProps) => {
    const { values } = formik;

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", pt: 5 }}>
            <Typography
                variant="h4"
                component="h1"
                fontFamily="Montserrat"
                color="white"
                sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
            >
                Review your information
            </Typography>

            {/* Personal */}
            <Typography
                sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
            >
                Personal
            </Typography>
            <Row label="Legal Name" value={values.legalName || "—"} />
            <Row label="Preferred Name" value={values.preferredName || "—"} />
            <Row label="Email" value={values.emailAddress || "—"} />
            <Row label="Location" value={values.location || "—"} />
            <Row label="Gender" value={values.gender || "—"} />
            <Row label="Race" value={<ChipList items={values.race} />} />
            <Line />

            {/* Education */}
            <Typography
                sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
            >
                Education
            </Typography>
            <Row label="Degree" value={values.degree || "—"} />
            <Row label="University" value={values.university || "—"} />
            <Row label="Major" value={values.major || "—"} />
            <Row label="Minor" value={values.minor || "—"} />
            <Row label="Graduation Year" value={values.gradYear || "—"} />
            <Line />

            {/* Experience (summaries) */}
            <Typography
                sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
            >
                Experience
            </Typography>
            <Row
                label="Consider For"
                value={
                    values.considerForGeneral === undefined
                        ? "—"
                        : values.considerForGeneral
                          ? "Yes"
                          : "No"
                }
            />
            <Row
                label="Heard About Us"
                value={<ChipList items={values.hackOutreach} />}
            />
            <Row
                label="Interests"
                value={<ChipList items={values.hackInterest} />}
            />
            <Line />

            {/* Transportation */}
            <Typography
                sx={{ color: "#b39ddb", fontFamily: "Montserrat", mb: 1 }}
            >
                Transportation
            </Typography>
            <Row
                label="Dietary"
                value={<ChipList items={values.dietaryRestrictions} />}
            />
            <Row
                label="Travel Reimbursement"
                value={
                    values.requestedTravelReimbursement === undefined
                        ? "—"
                        : values.requestedTravelReimbursement
                          ? "Yes"
                          : "No"
                }
            />
        </Box>
    );
};

export default Review;
