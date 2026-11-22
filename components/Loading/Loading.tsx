import RegistrationBackground from "@/components/RegistrationBackground/RegistrationBackground";
import { registrationBackgrounds } from "@/modules/RegistrationBackgrounds";
import { Box, CircularProgress } from "@mui/material";

type LoadingProps = {
    /**
     * Full-size art to use instead of the registration stage (e.g. the profile
     * page's /profile/background.jpg). Anything else uses the stage scene.
     */
    backgroundImage?: string;
};

const Loading: React.FC<LoadingProps> = ({ backgroundImage }) => {
    return (
        // This wrapper is in normal flow and at least viewport tall, so the
        // footer below the content stays below the fold while the real
        // content is still loading instead of jumping up to the top.
        <Box sx={{ minHeight: "100dvh" }}>
            {backgroundImage ? (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        filter: "blur(10px)",
                        transform: "scale(1.1)",
                        zIndex: -1
                    }}
                />
            ) : (
                // Blur-up over the encoded stage art instead of a multi-MB SVG.
                <RegistrationBackground
                    background={registrationBackgrounds.personal_info}
                    blurPx={10}
                />
            )}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <CircularProgress />
                <h2>Loading...</h2>
            </Box>
        </Box>
    );
};

export default Loading;
