import { Box, Typography } from "@mui/material";
import Image from "next/image";

const DEFAULT_MENTOR_IMAGE_URL =
    "https://raw.githubusercontent.com/HackIllinois/hackillinois/main/mobile/assets/profile/avatar-screen/avatars/character1.svg";

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
                <Box
                    component="img"
                    position="absolute"
                    zIndex={1}
                    top="11px"
                    pl="1px"
                    src={photoSrc || DEFAULT_MENTOR_IMAGE_URL}
                    alt={`Picture of ${name}`}
                    onError={event => {
                        event.currentTarget.src = DEFAULT_MENTOR_IMAGE_URL;
                    }}
                    sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />
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
