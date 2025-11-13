"use client";
import { Box, Paper, Typography } from "@mui/material";
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

const ProChallenge: React.FC = () => {
    const Lollipop = ({
        size = 120,
        color = "#d9d9d9",
        stem = 16,
        stemWidth = 10,
        sx = {}
    }: {
        size?: number | string;
        color?: string;
        stem?: number;
        stemWidth?: number;
        sx?: any;
    }) => (
        <Box
            sx={{
                position: "absolute",
                width: size,
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                bgcolor: color,
                transform: "translate(-50%, -50%)",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: `-${stem}px`,
                    transform: "translateX(-50%)",
                    width: stemWidth,
                    height: stem,
                    bgcolor: color,
                    borderRadius: 1
                },
                ...sx
            }}
        />
    );

    const nodes = [
        // bottom left
        {
            top: { xs: "70%", md: "72%" },
            left: { xs: "15%", md: "18%" },
            size: { xs: 70, sm: 100, md: 150 }
        },
        // top right
        {
            top: { xs: "14%", md: "16%" },
            left: { xs: "82%", md: "86%" },
            size: { xs: 70, sm: 100, md: 150 }
        },
        // upper middle
        {
            top: { xs: "28%", md: "30%" },
            left: { xs: "42%", md: "44%" },
            size: { xs: 70, sm: 100, md: 150 }
        },
        // lower right
        {
            top: { xs: "64%", md: "66%" },
            left: { xs: "72%", md: "76%" },
            size: { xs: 70, sm: 100, md: 150 }
        }
    ];

    return (
        <div
            style={{
                backgroundColor: "white",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "10vh 10vh 0 10vh",
                paddingTop: "20vh"
            }}
        >
            <h1
                style={{
                    color: "black",
                    fontSize: "clamp(28px, 6vw, 56px)",
                    margin: 0
                }}
            >
                HackVoyagers
            </h1>

            <p
                style={{
                    color: "black",
                    marginTop: "clamp(8px, 2vh, 16px)",
                    fontSize: "clamp(16px, 3.2vw, 24px)"
                }}
            >
                Welcome aboard
            </p>

            <div
                style={{
                    backgroundColor: "#D9D9D9",
                    width: "clamp(220px, 70vw, 320px)",
                    aspectRatio: "3 / 2",
                    marginTop: "clamp(16px, 8vh, 80px)"
                }}
            />

            <div
                style={{
                    backgroundColor: "#D9D9D9",
                    width: "100%",
                    height: "clamp(80px, 18vw, 160px)"
                }}
            />

            <Box
                sx={{
                    width: {
                        xs: "90vw",
                        sm: "min(85vw, 1500px)"
                    },
                    aspectRatio: "16 / 9",
                    backgroundColor: "#D9D9D9",
                    transform: "rotate(7deg)",
                    marginTop: {
                        xs: "10vh",
                        sm: "15vh",
                        md: "25vh"
                    },
                    padding: "20px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2%"
                }}
            >
                <p
                    style={{
                        color: "#7A7676",
                        margin: 0,
                        fontSize: "clamp(8px, 1.4vw, 18px)"
                    }}
                >
                    Click for more info
                </p>

                <div
                    style={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 0.7fr",
                        gap: "20px",
                        width: "100%",
                        minHeight: 0
                    }}
                >
                    {/* left side */}
                    <div
                        style={{
                            backgroundColor: "#7A7676",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            color: "white",
                            padding: "5px",
                            fontSize: "clamp(8px, 1.6vw, 22px)",
                            letterSpacing: "0.06em"
                        }}
                    >
                        USER INFO
                    </div>

                    {/* middle */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 1fr 1fr",
                            gap: "20px",
                            width: "100%",
                            height: "100%",
                            minHeight: 0
                        }}
                    >
                        <div
                            style={{ backgroundColor: "#7A7676", minHeight: 0 }}
                        />
                        <div
                            style={{ backgroundColor: "#7A7676", minHeight: 0 }}
                        />
                        <div
                            style={{ backgroundColor: "#7A7676", minHeight: 0 }}
                        />
                    </div>

                    {/* right side */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: "1fr 1fr 1fr",
                            gap: "2%",
                            width: "100%",
                            height: "100%",
                            minHeight: 0
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#7A7676",
                                        borderRadius: "50%",
                                        aspectRatio: "1 / 1",
                                        width: "70%"
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Box>

            <Box
                sx={{
                    mt: { xs: "10vh", sm: "15vh", md: "25vh" },
                    width: "100%"
                }}
            >
                <Box
                    component="h1"
                    sx={{
                        m: 0,
                        color: "black",
                        textAlign: "center",
                        fontSize: { xs: "clamp(24px, 7vw, 40px)", md: "3rem" }
                    }}
                >
                    Who are the HackVoyagers?
                </Box>

                <Box
                    sx={{
                        mt: { xs: 2, sm: 3 },
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(auto-fit, minmax(170px, 1fr))"
                        },
                        gap: { xs: 2, sm: 3 },
                        width: "100%",
                        maxWidth: 1100,
                        mx: "auto"
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <Box
                            key={i}
                            sx={{
                                bgcolor: "#D9D9D9",
                                aspectRatio: "3/4",
                                width: "100%"
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <h1
                style={{
                    color: "black",
                    fontSize: "clamp(28px, 6vw, 48px)",
                    marginTop: "clamp(24px, 8vh, 160px)",
                    marginBottom: "clamp(8px, 2vh, 24px)"
                }}
            >
                Benefits
            </h1>

            <div
                style={{
                    width: "min(80vw, 1100px)",
                    display: "grid",
                    rowGap: "clamp(12px, 2.5vw, 24px)",
                    paddingTop: "clamp(8px, 2vw, 20px)"
                }}
            >
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "clamp(48px, 9vw, 80px) 1fr",
                            columnGap: "clamp(12px, 2vw, 20px)"
                        }}
                    >
                        <div
                            style={{
                                width: "clamp(44px, 9vw, 72px)",
                                aspectRatio: "1 / 1",
                                display: "grid",
                                placeItems: "center"
                            }}
                        >
                            <img
                                src="/registration/challenge/Star.svg"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>

                        <div
                            style={{
                                backgroundColor: "#D9D9D9",
                                height: "clamp(48px, 8vw, 80px)",
                                borderRadius: "8px",
                                width: "100%"
                            }}
                        />
                    </div>
                ))}
            </div>

            <Typography
                component="h1"
                variant="h1"
                align="left"
                sx={{
                    fontSize: { xs: "clamp(20px, 5vw, 40px)", md: "3rem" },
                    alignSelf: "flex-start",
                    width: "100%",
                    color: "black",
                    marginTop: "10vh"
                }}
            >
                Application Process
            </Typography>
            <Box
                sx={{
                    position: "relative",
                    width: "min(95vw, 1100px)",
                    aspectRatio: "16 / 9",
                    bgcolor: "transparent",
                    marginTop: "6vh"
                }}
            >
                {nodes.map((n, i) => (
                    <Lollipop
                        key={i}
                        size={n.size as any}
                        sx={{ top: n.top as any, left: n.left as any }}
                    />
                ))}
            </Box>

            <Typography
                component="h1"
                variant="h1"
                align="left"
                sx={{
                    fontSize: { xs: "clamp(20px, 5vw, 40px)", md: "3rem" },
                    alignSelf: "flex-start",
                    width: "100%",
                    color: "black",
                    marginTop: "10vh"
                }}
            >
                Questions? Contact Us!
            </Typography>
            <div
                style={{
                    width: "100vw",
                    height: "400px",
                    backgroundColor: "#D9D9D9",
                    marginTop: "8vh"
                }}
            ></div>
        </div>
    );
};

export default ProChallenge;
