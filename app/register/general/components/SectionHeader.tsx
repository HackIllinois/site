import { TITLE_TEXT_SHADOW } from "@/theme/shadows";
import { Typography } from "@mui/material";

interface SectionHeaderProps {
    title: string;
    description?: string;
}

/** Page title + italic section description shared by the registration steps. */
const SectionHeader = ({ title, description }: SectionHeaderProps) => (
    <>
        <Typography
            variant="h4"
            component="h1"
            sx={{
                mt: 2,
                mb: description ? 1 : 2,
                fontFamily: "Ultra",
                color: "#ffffff",
                letterSpacing: "4px",
                fontSize: { xs: "30px", md: "40px" },
                textShadow: TITLE_TEXT_SHADOW
            }}
        >
            {title}
        </Typography>
        {description && (
            <Typography
                sx={{
                    mb: 3,
                    color: "rgba(255, 255, 255, 0.9)",
                    fontFamily: "Montserrat",
                    fontStyle: "italic",
                    fontSize: { xs: "14px", md: "16px" },
                    lineHeight: 1.6
                }}
            >
                {description}
            </Typography>
        )}
    </>
);

export default SectionHeader;
