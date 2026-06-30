"use client";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StaffCard } from "@/components.backup/StaffCard/StaffCard";
import { getMentors } from "@/util/api";
import { MentorProfile } from "@/util/types";

const Mentors = () => {
    const DEFAULT_MENTOR_IMAGE_URL =
        "https://raw.githubusercontent.com/HackIllinois/mobile/main/assets/point-shop/point-shop-shopkeeper-2.png";

    const [mentors, setMentors] = useState<MentorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activePerson, setActivePerson] = useState<{
        name: string;
        description: string;
        imageUrl: string;
    } | null>(null);

    useEffect(() => {
        const loadMentors = async () => {
            try {
                setLoading(true);
                const fetchedMentors = await getMentors();
                setMentors(fetchedMentors);
            } catch (e) {
                const message =
                    e instanceof Error ? e.message : "Failed to load mentors.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadMentors();
    }, []);

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
                        "url(/mentors-judges/debris.svg), url(/mentors-judges/starfield.svg)",
                    backgroundRepeat: "repeat-y",

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
                    rowGap={{ xs: 8, md: 8 }}
                    mb={4}
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                >
                    {loading && (
                        <Typography sx={{ color: "white", py: 4 }}>
                            Loading mentors...
                        </Typography>
                    )}
                    {!loading && error && (
                        <Typography sx={{ color: "white", py: 4 }}>
                            Failed to load mentors.
                        </Typography>
                    )}
                    {!loading &&
                        !error &&
                        mentors.map((profile, index) => (
                            <StaffCard
                                key={index + "_" + profile.name}
                                name={profile.name}
                                photoSrc={
                                    profile.imageUrl || DEFAULT_MENTOR_IMAGE_URL
                                }
                                onClick={() =>
                                    setActivePerson({
                                        name: profile.name,
                                        description: profile.description,
                                        imageUrl:
                                            profile.imageUrl ||
                                            DEFAULT_MENTOR_IMAGE_URL
                                    })
                                }
                            />
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
                        height: { xs: "80vh", md: "55vh" },
                        overflow: "hidden",
                        maxWidth: "100vw",
                        background: "#f0f0f0",
                        borderRadius: 8,
                        outline: "2px dashed #70007c",
                        outlineOffset: -16,
                        boxSizing: "border-box",
                        boxShadow: 24,
                        padding: 4,
                        gap: { xs: 1, md: 2 }
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
                            xs: "240px",
                            md: "300px"
                        }}
                        height={{
                            xs: "240px",
                            md: "300px"
                        }}
                    >
                        {/* frame */}
                        <Image
                            src={"/mentors-judges/assets/frame.svg"}
                            width={100}
                            height={100}
                            alt={"Mini-picture frame tape"}
                            style={{
                                position: "absolute",
                                zIndex: 3,
                                width: "100%",
                                height: "100%"
                            }}
                        />
                        {/* Person's picture */}
                        <Box
                            position="relative"
                            zIndex={2}
                            width={{
                                xs: "200px",
                                md: "300px"
                            }}
                            height={{
                                xs: "200px",
                                md: "300px"
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <Box
                                position="absolute"
                                zIndex={2}
                                top={{ xs: "30px", md: "60px" }}
                                width={{
                                    xs: "160px",
                                    md: "200px"
                                }}
                                height={{
                                    xs: "160px",
                                    md: "200px"
                                }}
                            >
                                <Image
                                    src={"/mentors-judges/assets/astronaut.svg"}
                                    fill
                                    alt={"Frame icon of an astronaut's helmet"}
                                />
                            </Box>
                            <Box
                                component="img"
                                position="absolute"
                                zIndex={1}
                                top={{ xs: "39px", md: "69px" }}
                                pl="1px"
                                width={{
                                    xs: "120px",
                                    md: "150px"
                                }}
                                height={{
                                    xs: "120px",
                                    md: "150px"
                                }}
                                src={
                                    activePerson?.imageUrl ||
                                    DEFAULT_MENTOR_IMAGE_URL
                                }
                                alt={`Picture of ${activePerson?.name}`}
                                onError={event => {
                                    event.currentTarget.src =
                                        DEFAULT_MENTOR_IMAGE_URL;
                                }}
                                sx={{
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                        {/* backing */}
                        <Image
                            src={"/mentors-judges/assets/backing.svg"}
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
                        py={2.5}
                        pr={1}
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
