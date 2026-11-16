import RegistrationBackground, {
    registrationBackgrounds
} from "@/components/RegistrationBackground/RegistrationBackground";
import { Box } from "@mui/material";
import Link from "next/link";

const NotFound: React.FC = () => {
    return (
        <>
            <RegistrationBackground
                src={registrationBackgrounds.personal_info}
            />
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
