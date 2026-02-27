import { Box, Typography } from "@mui/material";
import Image from "next/image";

type StaffCardProps = {
    name: string;
    photoSrc: string;
    onClick: () => void;
};

export const StaffCard: React.FC<StaffCardProps> = ({
    name,
    photoSrc,
    onClick
}) => {
    return (
        <Box
            width={200}
            height={200}
            sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": {
                    transform: "scale(1.05)"
                }
            }}
            onClick={onClick}
        >
            <Box
                position="relative"
                width="inherit"
                height="inherit"
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box position="absolute" zIndex={2}>
                    <Image
                        src="/mentors-judges/assets/astronaut.svg"
                        width={200}
                        height={200}
                        alt="Frame icon of an astronaut's helmet"
                    />
                </Box>
                <Box position="absolute" zIndex={1} top="11px" pl="1px">
                    <Image
                        src={photoSrc}
                        width={150}
                        height={150}
                        alt={`Picture of ${name}`}
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                        onError={event => {
                            event.currentTarget.srcset =
                                "/mentors-judges/assets/placeholder.png";
                        }}
                    />
                </Box>
            </Box>
            <Typography
                position="relative"
                zIndex={3}
                top="5px"
                sx={{
                    fontWeight: 700
                }}
            >
                {name}
            </Typography>
        </Box>
    );
};
