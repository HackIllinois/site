"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const ProChallenge: React.FC = () => {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                m: 0,
                p: 0,
                bgcolor: "#020316"
            }}
        >
            {/* HERO CONTAINER */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    mx: "auto",
                    aspectRatio: { xs: "393 / 2596", md: "1440 / 4695" }
                }}
            >
                {/* full bg */}
                <Box
                    component="img"
                    alt="HackVoyagers hero"
                    sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        zIndex: -1,

                        content: {
                            xs: 'url("/challenge/backgrounds/mobile/landing_page.svg")',
                            md: 'url("/challenge/backgrounds/landing_page.svg")'
                        }
                    }}
                />

                {/* OVERLAY LAYER (same size as the image) */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0
                    }}
                >
                    {/* pill and text */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: { xs: "13.3%", md: "9%" },
                            transform: "translate(-50%, -50%) rotate(-16deg)",
                            width: { xs: "85vw", md: "55vw" },
                            maxWidth: "900px",
                            height: { xs: "20vw", md: "11vw" },
                            maxHeight: "200px",
                            borderRadius: "200px",
                            backgroundColor: "rgba(51, 5, 82, 0.68)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white",
                                fontSize: {
                                    xs: "4.5vw",
                                    md: "3vw",
                                    xl: "50px"
                                },
                                fontWeight: 500
                            }}
                        >
                            INTRODUCING
                        </Typography>
                        <Box
                            sx={{
                                mt: "0.5vw",
                                width: {
                                    xs: "58vw",
                                    md: "33vw",
                                    xl: "580px"
                                }
                            }}
                        >
                            <Image
                                src="/design-reference/HACKVOYAGERS.svg"
                                alt="HackVoyagers"
                                width={600}
                                height={150}
                                style={{
                                    width: "100%",
                                    height: "auto"
                                }}
                            />
                        </Box>
                    </Box>

                    {/* panel start*/}
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: { xs: "23%", md: "20%" },
                            transform: "translateX(-50%)",
                            width: { xs: "122vw", md: "85vw" },
                            aspectRatio: "1018.479 / 728.271",
                            backgroundImage: `url("/challenge/landing_page/panel.svg")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { xs: "17vw", md: "15vw" },
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "5.2vw",
                                    md: "3vw",
                                    xl: "50px"
                                },
                                fontWeight: 700,
                                fontFamily: "Tsukimi Rounded",
                                color: "white",
                                mb: { xs: 1, md: 6 },
                                transform: "rotate(1.457deg)"
                            }}
                        >
                            WHAT ARE HACKVOYAGERS?
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88,
                                mb: { xs: 1, md: 3 },
                                transform: "rotate(1.457deg)"
                            }}
                        >
                            HackVoyagers is an exclusive path tailored for
                            attendees who have mastered the fundamentals and are
                            now looking to test their skills in a more
                            challenging environment.
                        </Typography>
                    </Box>

                    {/* panel end*/}

                    {/* textbox 1 start */}

                    <Box
                        sx={{
                            position: "absolute",
                            left: { xs: "50%", md: "40%" },
                            top: { xs: "41.2%", md: "42%" },
                            transform: "translateX(-50%)",
                            width: "80vw",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { md: "15vw" },
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "5.2vw",
                                    md: "3vw",
                                    xl: "50px"
                                },
                                fontWeight: 700,
                                fontFamily: "Tsukimi Rounded",
                                color: "white",
                                mb: { xs: 1, md: 6 }
                            }}
                        >
                            WHAT ARE THE BENEFITS OF BEING A HACKVOYAGER?
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88,
                                mb: { xs: 1, md: 3 }
                            }}
                        >
                            Attendees in this path compete for the grand
                            HackVoyagers prize ($5000). Additionally, they will
                            have the opportunity to present their project in a
                            thrilling Shark-Tank inspired showcase, among other
                            exciting perks!
                        </Typography>
                    </Box>

                    {/* textbox 1 end */}

                    {/* textbox 2 start */}

                    <Box
                        sx={{
                            position: "absolute",
                            left: { xs: "50%", md: "63%" },
                            top: { xs: "54%", md: "55%" },
                            transform: "translateX(-50%)",
                            width: "65vw",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { md: "15vw" },
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "5.2vw",
                                    md: "3vw",
                                    xl: "50px"
                                },
                                fontWeight: 700,
                                fontFamily: "Tsukimi Rounded",
                                color: "white",
                                mb: { xs: 1, md: 6 }
                            }}
                        >
                            HOW DO I BECOME A HACKVOYAGER?
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88,
                                mb: { xs: 1, md: 3 }
                            }}
                        >
                            In addition to registering, admission into
                            HackVoyagers requires completing a special coding
                            challenge.
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88
                            }}
                        >
                            NOTE: If you do not submit the challenge, you will
                            be considered for general admission.
                        </Typography>
                    </Box>

                    {/* textbox 2 end */}

                    {/* textbox 3 start */}

                    <Box
                        sx={{
                            position: "absolute",
                            left: { xs: "50%", md: "38%" },
                            top: { xs: "71%", md: "66%" },
                            transform: "translateX(-50%)",
                            width: "85vw",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { md: "15vw" },
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "5.2vw",
                                    md: "3vw",
                                    xl: "50px"
                                },
                                fontWeight: 700,
                                fontFamily: "Tsukimi Rounded",
                                color: "white",
                                mb: { xs: 2, md: 6 }
                            }}
                        >
                            HOW IS HACKVOYAGERS DIFFERENT FROM STANDARD
                            HACKILLINOIS ATTENDANCE?
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88,
                                mb: { xs: 1, md: 3 }
                            }}
                        >
                            HackVoyagers is designed for advanced hackers,
                            fostering a competitive atmosphere for a higher
                            prize pool, while general attendees compete in an
                            environment that supports learning at every level.
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: {
                                    xs: "3.3vw",
                                    md: "1.4vw",
                                    xl: "24px"
                                },
                                lineHeight: 1.45,
                                color: "white",
                                opacity: 0.88,
                                mb: { xs: 1, md: 3 }
                            }}
                        >
                            {`Regardless, all attendees can enjoy HackIllinois' events, workshops, company Q&As, and the Company Expo.`}
                        </Typography>
                    </Box>

                    {/* textbox 3 end */}
                </Box>
            </Box>
        </Box>
    );
};

export default ProChallenge;
