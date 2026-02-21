"use client";

import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import PathPrizesSection from "./PathPrizesSection";
import TrackPrizesSection from "./TrackPrizesSection";
import ExtraPathPrizesSection from "./ExtraPathPrizesSection";
import { twinkle } from "./animations";

const Prizes: React.FC = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#020316"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: {
                        xs: 'url("/prizes/backgrounds/prizesbg.svg")'
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: "100px",
                    pb: "200px"
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                        backgroundImage: 'url("/prizes/backgrounds/stars.svg")',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        opacity: 0.4,
                        animation: `${twinkle} 8s ease-in-out infinite`
                    }}
                />

                <HeroSection />
                <PathPrizesSection />
                <TrackPrizesSection />
                <ExtraPathPrizesSection />
            </Box>
        </Box>
    );
};

export default Prizes;
