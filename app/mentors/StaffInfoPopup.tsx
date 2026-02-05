import { Box, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

export const StaffInfoPopup = ({
    name,
    description
}: {
    name: string;
    description: string;
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid size={{ xs: 6, md: 3 }}>
            <Image
                src={"/mentors/assets/astronaut.svg"}
                width={200}
                height={200}
                alt={"Icon of an astronaut"}
                onClick={handleOpen}
                style={{ cursor: "pointer" }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="info-modal-title"
                aria-describedby="info-modal-description"
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "95vw", md: "70vw" },
                        height: { xs: "fit-content", md: "55vh" },
                        background: "#f0f0f0",
                        borderRadius: 8,
                        outline: "2px dashed #70007c",
                        outlineOffset: -16,
                        boxShadow: 24,
                        padding: 4
                    }}
                >
                    <Box
                        flex={0}
                        padding={2}
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Image
                            src={"/mentors/assets/placeholder_profile.svg"}
                            width={200}
                            height={200}
                            alt={`Picture of ${name}`}
                            onClick={handleOpen}
                            style={{
                                position: "absolute",
                                marginBottom: "50px"
                            }}
                        />
                        <Image
                            src={"/mentors/assets/frame.svg"}
                            width={350}
                            height={350}
                            alt={"Mini-picture frame tape"}
                            onClick={handleOpen}
                            // style={{ cursor: "pointer" }}
                        />
                    </Box>
                    <Box flex={1} display="flex" flexDirection="column" gap={2}>
                        <Typography
                            id="info-modal-title"
                            component="h1"
                            sx={{
                                color: "#292152",
                                fontFamily: "var(--font-jersey), sans-serif",
                                fontSize: "64px",
                                lineHeight: "56px"
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            id="info-modal-description"
                            sx={{ color: "#292152" }}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    );
};
