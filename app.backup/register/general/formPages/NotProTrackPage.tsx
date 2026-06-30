import { Box, Button, Typography } from "@mui/material";

type NotProTrackPageProps = {
    backgroundImage?: string;
};

const NotProTrackPage = ({
    backgroundImage = "/registration/pro/landing.svg"
}: NotProTrackPageProps) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url("${backgroundImage}")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 20px"
                    }}
                >
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            mb: 3,
                            color: "white",
                            opacity: 0.9,
                            fontFamily: "Montserrat",
                            paddingLeft: 4,
                            paddingRight: 4
                        }}
                    >
                        This page is not available.
                    </Typography>
                    <Button
                        component="a"
                        href="/register/general"
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: "#307cc8ff",
                            fontFamily: "Montserrat"
                        }}
                    >
                        Back to registration
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default NotProTrackPage;
