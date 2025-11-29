import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";

const NotFound: React.FC = () => {
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
                <div>
                    <h2>Page not found</h2>
                    <br />
                    <p>
                        Return to the{" "}
                        <Link
                            prefetch={false}
                            href="/"
                            style={{
                                color: "#1976d2",
                                textDecoration: "underline"
                            }}
                        >
                            home page
                        </Link>
                    </p>
                </div>
            </Box>
        </>
    );
};

export default NotFound;
