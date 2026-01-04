import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const PRICING_DATA = [
    { id: 1, price: 100, color: "#A020F0" }, // Purple
    { id: 2, price: 200, color: "#E040FB" }, // Pink/Magenta
    { id: 3, price: 250, color: "#F08080" }, // Salmon/Coral
    { id: 4, price: 275, color: "#F4C430" }, // Saffron/Yellow
    { id: 5, price: 300, color: "#81C784" }, // Soft Green
    { id: 6, price: 350, color: "#4FC3F7" } // Light Blue
];

const MapLegend = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#F3E5F5", // Light lavender background
                borderRadius: "24px",
                padding: { xs: "16px 24px", md: "24px" }, // Slightly less padding on mobile
                width: "fit-content",

                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                maxWidth: "100%"
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        lg: "1fr"
                    },
                    gap: { xs: 2, md: 3 },
                    alignItems: "center",
                    justifyItems: "start"
                }}
            >
                {PRICING_DATA.map(item => (
                    <Stack
                        key={item.id}
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                        sx={{ flexShrink: 0 }} // Prevent shrinking on mobile
                    >
                        {/* The Colored Dot */}
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                                flexShrink: 0
                            }}
                        />

                        {/* The Price Text */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                color: "#4527a0",
                                fontFamily: "Montserrat, sans-serif",
                                fontSize: { xs: "16px", md: "20px" } // Responsive font size
                            }}
                        >
                            ${item.price}
                        </Typography>
                    </Stack>
                ))}
            </Box>
        </Box>
    );
};

export default MapLegend;
