import { Box, CircularProgress } from "@mui/material";
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url("/registration/backgrounds/personal_info.svg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    filter: "blur(10px)",
                    transform: "scale(1.25)"
                }}
            ></Box>
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
