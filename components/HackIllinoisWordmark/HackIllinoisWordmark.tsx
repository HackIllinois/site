import { Box } from "@mui/material";
import { TITLE_TEXT_SHADOW } from "@/theme/shadows";

type HackIllinoisWordmarkProps = { sx?: object };

/** Stacked Ultra wordmark sized to ~the old hackastra-logo maxHeight (~110px on md). */
export const HackIllinoisWordmark = ({ sx }: HackIllinoisWordmarkProps) => (
    <Box
        component="h1"
        role="img"
        aria-label="HackIllinois"
        sx={{
            m: 0,
            color: "#fff",
            fontFamily: '"Ultra", Georgia, serif',
            fontWeight: 400,
            fontSize: { xs: "40px", sm: "52px", md: "72px" },
            lineHeight: 0.8,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textShadow: TITLE_TEXT_SHADOW,
            textAlign: "center",
            maxWidth: "100%",
            mr: "-0.05em",
            ...sx
        }}
    >
        HACK
        <br />
        ILLINOIS
    </Box>
);
