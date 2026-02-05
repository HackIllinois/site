"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { StaffInfoPopup } from "./StaffInfoPopup";

const mentorData: { name: string; desc: string }[] = [
    {
        name: "first efaefae",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "ofoiehafe aef efaefaewfa",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "eafewf aefefdfdsf",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "ofaefaefoiehafe aefdsfadsf",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "firaefst aefsdfsa",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "aefaef aefafsdfdaf",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "aefefaewf aewfewfewfasdfewfdfadfsdf",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    },
    {
        name: "aefefefefefe-afefsfas eafsdfadfsa",
        desc: "This is a place to write the bio of the potential mentors and sponsors. "
    }
];

const Mentors = () => {
    return (
        <Box
            sx={{
                // position not specified - debris overlay attaches to the page
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                height: "100%",
                width: "100%",
                pt: "80px",
                pb: "50px",
                backgroundColor: "#512D83",
                backgroundImage:
                    "linear-gradient(0deg, #14123D 0%, #7059A6 60%, #533085 86%, #512D83 100%)",

                // Image (debris) overlay layer
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url(/mentors/debris.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    // Fade debris at top and bottom
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 90%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 90%)",

                    pointerEvents: "none",
                    zIndex: 0
                },
                // Ensure content sits above everything
                "& > *": {
                    position: "relative",
                    zIndex: 1
                }
            }}
        >
            <Container>
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        mt: 8,
                        mb: 4
                    }}
                >
                    MENTORS
                </Typography>
                <Grid container columnSpacing={2} rowSpacing={{ xs: 3, md: 6 }}>
                    {mentorData.map(mentor => (
                        <StaffInfoPopup
                            key={mentor.name}
                            name={mentor.name}
                            description={mentor.desc}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Mentors;
