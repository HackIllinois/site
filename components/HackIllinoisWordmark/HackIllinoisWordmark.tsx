import { Box } from "@mui/material";
import { TITLE_TEXT_SHADOW } from "@/theme/shadows";

type HackIllinoisWordmarkProps = { sx?: object };

export const HackIllinoisWordmark = ({ sx }: HackIllinoisWordmarkProps) => (
    <Box
        role="img"
        aria-label="HackIllinois"
        sx={{
            color: "#fff",
            fontFamily: "Ultra",
            fontSize: { xs: "1.9rem", sm: "2.6rem" },
            lineHeight: 0.9,
            letterSpacing: { xs: "2px", sm: "3px" },
            textShadow: TITLE_TEXT_SHADOW,
            textAlign: "center",
            height: { xs: "72px", sm: "96px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ...sx
        }}
    >
        <span>HACK</span>
        <span>ILLINOIS</span>
    </Box>
);
