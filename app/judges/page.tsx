"use client";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
                    rowGap={{ xs: 4, md: 8 }}
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    {mentorData.map((mentor, index) => (
                        <Box
                            key={index + "_" + mentor.name}
                            width={200}
                            height={200}
                        >
                            <Box
                                position="relative"
                                width="inherit"
                                height="inherit"
                                display="flex"
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <Box position="absolute" zIndex={2}>
                                    <Image
                                        src={"/mentors/assets/astronaut.svg"}
                                        width={200}
                                        height={200}
                                        alt={
                                            "Frame icon of an astronaut's helmet"
                                        }
                                        onClick={() =>
                                            setActivePerson({
                                                name: mentor.name,
                                                description: mentor.description
                                            })
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                </Box>
                                <Box
                                    position="absolute"
                                    zIndex={1}
                                    top="11px"
                                    pl="1px"
                                >
                                    <Image
                                        src={`/mentors/people/${mentor.name}.png`}
                                        width={150}
                                        height={150}
                                        alt={`Picture of ${mentor.name}`}
                                        onClick={() =>
                                            setActivePerson({
                                                name: mentor.name,
                                                description: mentor.description
                                            })
                                        }
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "50%"
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Typography
                                position="relative"
                                zIndex={3}
                                bottom="0px"
                                onClick={() =>
                                    setActivePerson({
                                        name: mentor.name,
                                        description: mentor.description
                                    })
                                }
                                sx={{
                                    // boxShadow: "0 0 15px 0px black",
                                    // background: "#00000066"
                                    cursor: "pointer",
                                    fontWeight: 700
                                }}
                            >
                                {mentor.name}
                            </Typography>
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
                        // maxHeight: { xs: "80vh", md: "55vh" },
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
                    {/* x button */}
                    <Box display="flex" position="absolute" top={24} right={24}>
                        <IconButton
                            aria-label="close"
                            size="small"
                            sx={{ color: "#c4c4c4" }}
                            onClick={() => setActivePerson(null)}
                        >
                            <CloseIcon sx={{ fontSize: "45px" }} />
                        </IconButton>
                    </Box>
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
                        {/* Person's picture */}
                        <Box
                            position="relative"
                            zIndex={2}
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
                            display="flex"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Box position="absolute" zIndex={2} top="70px">
                                <Image
                                    src={"/mentors/assets/astronaut.svg"}
                                    width={150}
                                    height={150}
                                    alt={"Frame icon of an astronaut's helmet"}
                                />
                            </Box>
                            <Box
                                position="absolute"
                                zIndex={1}
                                top="79px"
                                pl="1px"
                            >
                                <Image
                                    src={`/mentors/people/${activePerson?.name}.png`}
                                    width={110}
                                    height={110}
                                    alt={`Picture of ${activePerson?.name}`}
                                    style={{
                                        borderRadius: "50%"
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* frame */}
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
