import { Box } from "@mui/material";

export default function DesignChallenge() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                height: "100%",
                width: "100%",
                backgroundImage: `url("/challenge/backgrounds/design_chal.png")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {/* Your content goes here */}
        </Box>
    );
}
