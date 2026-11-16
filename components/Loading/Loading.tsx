import { Box, CircularProgress } from "@mui/material";
import RegistrationBackground, {
    registrationBackgrounds
} from "@/components/RegistrationBackground/RegistrationBackground";

type LoadingProps = {
    backgroundImage?: string;
    zoom?: boolean;
};

const Loading: React.FC<LoadingProps> = ({
    backgroundImage = registrationBackgrounds.personal_info,
    zoom = true
}) => {
    return (
        <>
            <RegistrationBackground src={backgroundImage} />
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <CircularProgress />
                <h2>Loading...</h2>
            </Box>
        </>
    );
};

export default Loading;
