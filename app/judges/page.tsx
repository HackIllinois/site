"use client";
import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Image from "next/image";
import { StaffCard } from "@/components/StaffCard/StaffCard";
import { getJudges } from "@/util/api";
import { JudgeProfile } from "@/util/types";

const DEFAULT_JUDGE_IMAGE_URL =
    "https://raw.githubusercontent.com/HackIllinois/mobile/main/assets/point-shop/point-shop-shopkeeper-2.png";

const Judges = () => {
    const [judges, setJudges] = useState<JudgeProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activePerson, setActivePerson] = useState<{
        name: string;
        description: string;
        imageUrl: string;
    } | null>(null);

    useEffect(() => {
        const loadJudges = async () => {
            try {
                setLoading(true);
                const fetchedJudges = await getJudges();
                setJudges(fetchedJudges);
            } catch (e) {
                const message =
                    e instanceof Error ? e.message : "Failed to load judges.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadJudges();
    }, []);

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
                backgroundColor: "#512D83",
                backgroundImage:
                    "linear-gradient(0deg, #14123D 0%, #7059A6 60%, #533085 86%, #512D83 100%)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "url(/mentors-judges/debris.svg), url(/mentors-judges/starfield.svg)",
                    backgroundRepeat: "repeat-y",
                    maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 90%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 90%)",
                    pointerEvents: "none",
                    zIndex: 0
                },
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
                    JUDGES
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
                            Loading judges...
                        </Typography>
                    )}
                    {!loading && error && (
                        <Typography sx={{ color: "white", py: 4 }}>
                            Failed to load judges.
                        </Typography>
                    )}
                    {!loading &&
                        !error &&
                        judges.map((profile, index) => (
                            <StaffCard
                                key={index + "_" + profile.name}
                                name={profile.name}
                                photoSrc={
                                    profile.imageUrl || DEFAULT_JUDGE_IMAGE_URL
                                }
                                onClick={() =>
                                    setActivePerson({
                                        name: profile.name,
                                        description: profile.description,
                                        imageUrl:
                                            profile.imageUrl ||
                                            DEFAULT_JUDGE_IMAGE_URL
                                    })
                                }
                            />
                        ))}
                </Box>
            </Container>

            <Modal
                open={!!activePerson}
                onClose={() => setActivePerson(null)}
                aria-labelledby="info-modal-title"
                aria-describedby="info-modal-description"
            >
                <Box
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
                                    DEFAULT_JUDGE_IMAGE_URL
                                }
                                alt={`Picture of ${activePerson?.name}`}
                                onError={event => {
                                    event.currentTarget.src =
                                        DEFAULT_JUDGE_IMAGE_URL;
                                }}
                                sx={{
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
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
                            }}
                        >
                            {activePerson?.name}
                        </Typography>
                        <Typography
                            id="info-modal-description"
                            sx={{
                                color: "#292152",
                                overflow: "auto",
                                minHeight: 0,
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

export default Judges;
