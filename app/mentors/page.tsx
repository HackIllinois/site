"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const mentorData: { name: string; desc: string }[] = [
    { name: "first", desc: "eaofiohfeoifhPEsf" },
    { name: "ofoiehafe", desc: "kenfoaeihfaoipwehfapewihf" }
];

const Mentors = () => {
    return (
        <Box
            sx={{
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
                backgroundColor:
                    "linear-gradient(0deg, #14123D 0%, #7059A6 60%, #533085 86%, #512D83 100%)",

                backgroundImage: "url(/mentors/debris.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
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
                        <Grid size={{ xs: 6, md: 3 }} key={mentor.name}>
                            <Image
                                src={"/mentors/assets/astronaut.svg"}
                                height={200}
                                alt={"Icon of an astronaut"}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Mentors;
