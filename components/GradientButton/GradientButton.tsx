import { Box, Button } from "@mui/material";
import Link from "next/link";

type GradientButtonProps = {
    text: string;
    link: string;
};

export const GradientButton = ({ text, link }: GradientButtonProps) => {
    return (
        <Link prefetch={false} href={link}>
            <Box
                sx={{
                    p: "6px",
                    borderRadius: "40px",
                    background:
                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                    display: "inline-block"
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundImage:
                            "linear-gradient(120deg, #401A79 0%, #401A79 30%, #653089 30%, #653089 53%, #401A79 53%, #401A79 100%)",
                        backgroundSize: "150% 100%",
                        backgroundPosition: "50% 0%",
                        color: "white",
                        fontWeight: 800,
                        fontSize: { xs: "18px", sm: "20px" },
                        textTransform: "none",
                        px: { xs: 4, sm: 6 },
                        py: 1.5,
                        borderRadius: "40px",
                        fontFamily: "Tsukimi Rounded",
                        border: "none",
                        transition: "background-position 0.5s ease",
                        "&:hover": {
                            backgroundPosition: "-20% 0%"
                        }
                    }}
                >
                    {text}
                </Button>
            </Box>
        </Link>
    );
};
