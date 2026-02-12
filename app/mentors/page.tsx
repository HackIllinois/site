"use client";
import { Box, Container, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { mentorData } from "@/util/staffData";

const Mentors = () => {
    const [activePerson, setActivePerson] = useState<{
        name: string;
        description: string;
    } | null>(null);

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
                    backgroundImage:
                        "url(/mentors/debris.svg), url(/mentors/starfield.svg)",
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
                <Box
                    display="flex"
                    columnGap={4}
                    rowGap={{ xs: 4, md: 6 }}
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    {mentorData.map(mentor => (
                        <Box key={mentor.name}>
                            <Image
                                src={"/mentors/assets/astronaut.svg"}
                                width={200}
                                height={200}
                                alt={"Icon of an astronaut"}
                                onClick={() =>
                                    setActivePerson({
                                        name: mentor.name,
                                        description: mentor.desc
                                    })
                                }
                                style={{ cursor: "pointer" }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
            {/* info display modal */}
            <Modal
                open={!!activePerson}
                onClose={() => setActivePerson(null)}
                aria-labelledby="info-modal-title"
                aria-describedby="info-modal-description"
            >
                <Box // main modal box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: {
                            xs: "95vw",
                            sm: "575px",
                            md: "80vw",
                            lg: "70vw"
                        },
                        height: { xs: "fit-content", md: "55vh" },
                        minHeight: { xs: "60vh", md: "55vh" },
                        maxHeight: { xs: "80vh", md: "55vh" },
                        overflow: "hidden",
                        maxWidth: "100vw",
                        background: "#f0f0f0",
                        borderRadius: 8,
                        outline: "2px dashed #70007c",
                        outlineOffset: -16,
                        boxSizing: "border-box",
                        boxShadow: 24,
                        padding: 4,
                        gap: { xs: 2, sm: 4 }
                    }}
                >
                    {/* profile image and frame */}
                    <Box
                        flexShrink={0}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                        width={{
                            xs: "200px",
                            sm: "200px",
                            md: "300px",
                            lg: "300px"
                        }}
                        height={{
                            xs: "200px",
                            sm: "200px",
                            md: "300px",
                            lg: "300px"
                        }}
                    >
                        <Image
                            src={"/mentors/assets/placeholder_profile.svg"}
                            width={100}
                            height={100}
                            alt={`Picture of ${activePerson?.name}`}
                            style={{
                                position: "absolute",
                                zIndex: 2,
                                width: "65%",
                                height: "65%"
                            }}
                        />
                        <Image
                            src={"/mentors/assets/frame.svg"}
                            width={100}
                            height={100}
                            alt={"Mini-picture frame tape"}
                            style={{
                                position: "absolute",
                                zIndex: 1,
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </Box>
                    {/* text (name, description) */}
                    <Box
                        flex={1}
                        minWidth={0}
                        minHeight={0}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        gap={1}
                        width="100%"
                        height="100%"
                    >
                        <Typography
                            id="info-modal-title"
                            component="h1"
                            sx={{
                                color: "#292152",
                                fontFamily: "var(--font-jersey), sans-serif",
                                fontSize: "clamp(3rem, 5vw, 5rem)",
                                lineHeight: { xs: 0.8, sm: 1 },
                                overflowWrap: "break-word"
                                // hyphens: "auto"
                            }}
                        >
                            {activePerson?.name}
                        </Typography>
                        <Typography
                            id="info-modal-description"
                            sx={{
                                color: "#292152",
                                overflow: "auto",
                                minHeight: 0, // IMPORTANT for flexbox scrolling
                                overflowWrap: "break-word",
                                maskImage:
                                    "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
                                WebkitMaskImage:
                                    "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
                                py: 0.5
                            }}
                        >
                            {activePerson?.description}
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Mentors;
