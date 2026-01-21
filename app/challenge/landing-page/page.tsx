"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./LandingPage.module.scss";
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { ShootingStar } from "@/components/ShootingStars/ShootingStar";

const ProChallenge: React.FC = () => {
    const { offsetY, ref } = useParallaxScrollY();
    const { offsetY: offsetY2, ref: ref2 } = useParallaxScrollY();
    const { offsetY: offsetY3, ref: ref3 } = useParallaxScrollY();

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.05}px)`
    };
    const parallaxStyleMobile = {
        transform: `translateY(${offsetY * 0.07}px)`
    };

    const parallaxStyle2 = {
        transform: `translateY(${offsetY2 * 0.1}px)`
    };
    const parallaxStyleMobile2 = {
        transform: `translateY(${offsetY2 * 0.08}px)`
    };

    const parallaxStyle3 = {
        transform: `translateY(${offsetY3 * 0.05}px) scale(1.2)`
    };
    const parallaxStyleMobile3 = {
        transform: `translateY(${offsetY3 * 0.05}px) scale(1.2)`
    };

    // 1. Container Variant
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    // 2. Standard Item Variant (Used for the rest of the page)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // 3. NEW: Hero Specific Variants (Opposite Directions)
    // "INTRODUCING" slides DOWN from -40
    const slideDownVariant: Variants = {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // "HACKVOYAGERS" slides UP from 40
    const slideUpVariant: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

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
                ref={ref}
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
                            md: 'url("/challenge/backgrounds/desktop/landing_page.svg")'
                        }
                    }}
                />

                {/* Shooting Stars */}
                <ShootingStar />
                <ShootingStar />
                <ShootingStar />

                {/* OVERLAY LAYER */}
                <Box sx={{ position: "absolute", inset: 0 }}>
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
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* UPDATED: Uses slideDownVariant */}
                            <motion.div variants={slideDownVariant}>
                                <Typography
                                    sx={{
                                        textAlign: "center",
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
                            </motion.div>

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
                                {/* UPDATED: Uses slideUpVariant */}
                                <motion.div variants={slideUpVariant}>
                                    <Image
                                        src="/design-reference/HACKVOYAGERS.svg"
                                        alt="HackVoyagers"
                                        width={600}
                                        height={150}
                                        style={{
                                            width: "100%",
                                            height: "auto"
                                        }}
                                        priority
                                    />
                                </motion.div>
                            </Box>
                        </motion.div>
                    </Box>

                    {/* Rest of the code remains exactly as provided... */}
                    <Box className={styles.debris} style={parallaxStyle}>
                        <motion.img
                            src="/challenge/backgrounds/desktop/debris.svg"
                            alt="Space Debris"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block"
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                x: [-5, 10, -5]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </Box>

                    {/* ... (The rest of your component logic follows here unchanged) */}

                    <Box
                        className={clsx(styles.debris, styles.mobile)}
                        style={parallaxStyleMobile}
                    >
                        <motion.img
                            src="/challenge/backgrounds/mobile/debris.svg"
                            alt="Space Debris"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block"
                            }}
                            animate={{
                                y: [-10, 10, -10],
                                x: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </Box>

                    {/* panel start*/}
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: { xs: "23%", md: "20%" },
                            transform: "translateX(-50%)",
                            width: { xs: "96vw", md: "70vw" },
                            aspectRatio: "1018.479 / 728.271",
                            backgroundImage: `url("/challenge/landing_page/panel.svg")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { xs: "12vw", md: "10vw" },
                            textAlign: "center",
                            zIndex: 6
                        }}
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "4vw",
                                            md: "3vw",
                                            xl: "50px"
                                        },
                                        fontWeight: 700,
                                        fontFamily: "Tsukimi Rounded",
                                        color: "white",
                                        mb: { xs: 1, md: 6 },
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    WHAT IS{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            ml: "6px",
                                            height: {
                                                xs: "4.5vw",
                                                md: "3.25vw"
                                            },
                                            verticalAlign: "-0.07em"
                                        }}
                                    >
                                        <Image
                                            src="/design-reference/HACKVOYAGERS_.svg"
                                            alt="HackVoyagers"
                                            width={600}
                                            height={150}
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    </Box>
                                </Typography>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: "2.8vw",
                                            md: "1.4vw",
                                            xl: "24px"
                                        },
                                        lineHeight: 1.45,
                                        color: "white",
                                        opacity: 0.88,
                                        mb: { xs: "28vw", md: "20vw" }
                                    }}
                                >
                                    HackVoyagers is an exclusive path tailored
                                    for attendees who have mastered the
                                    fundamentals and are now looking to test
                                    their skills in a more challenging
                                    environment.
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Box>

                    <Box className={styles.ufos} style={parallaxStyle2}>
                        <motion.img
                            src="/challenge/backgrounds/desktop/ufos.svg"
                            alt="UFOs"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block"
                            }}
                            animate={{
                                y: [-15, 10, -15]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </Box>
                    <Box
                        className={clsx(styles.ufos, styles.mobile)}
                        style={parallaxStyleMobile2}
                    >
                        <motion.img
                            src="/challenge/backgrounds/mobile/ufos.svg"
                            alt="UFOs"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block"
                            }}
                            animate={{
                                y: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </Box>

                    <Box
                        ref={ref2}
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
                            textAlign: "center",
                            zIndex: 6
                        }}
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={itemVariants}>
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
                                    WHAT ARE THE BENEFITS OF BEING A{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            ml: "6px",
                                            height: { xs: "5vw", md: "3.2vw" },
                                            verticalAlign: "-0.07em"
                                        }}
                                    >
                                        <Image
                                            src="/design-reference/HACKVOYAGER_.svg"
                                            alt="HackVoyagers"
                                            width={600}
                                            height={150}
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    </Box>
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
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
                                    HackVoyagers prize ($5000). Additionally,
                                    they will have the opportunity to present
                                    their project in a thrilling Shark-Tank
                                    inspired showcase, among other exciting
                                    perks!
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Box>

                    {/* textbox 1 end */}

                    {/* textbox 2 start */}

                    <Box
                        ref={ref3}
                        sx={{
                            position: "absolute",
                            left: { xs: "50%", md: "63%" },
                            top: { xs: "50%", md: "55%" },
                            transform: "translateX(-50%)",
                            width: "65vw",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: { md: "15vw" },
                            textAlign: "center",
                            zIndex: 6
                        }}
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={itemVariants}>
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
                                    HOW DO I BECOME A{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            ml: "6px",
                                            height: { xs: "5vw", md: "3.2vw" },
                                            verticalAlign: "-0.07em"
                                        }}
                                    >
                                        <Image
                                            src="/design-reference/HACKVOYAGER_.svg"
                                            alt="HackVoyagers"
                                            width={600}
                                            height={150}
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    </Box>
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
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
                                    HackVoyagers requires completing a special
                                    coding challenge.
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
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
                                    NOTE: If you do not submit the challenge,
                                    you will be considered for general
                                    admission.
                                </Typography>
                            </motion.div>
                        </motion.div>
                    </Box>

                    <img
                        src="/challenge/backgrounds/desktop/planets.svg"
                        className={styles.planets}
                        style={parallaxStyle3}
                    />

                    <img
                        src="/challenge/backgrounds/mobile/planets.svg"
                        className={clsx(styles.planets, styles.mobile)}
                        style={parallaxStyleMobile3}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            left: { xs: "50%", md: "38%" },
                            top: { xs: "71%", md: "69%" },
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
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <motion.div variants={itemVariants}>
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
                                    HOW ARE{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            ml: "6px",
                                            height: { xs: "5vw", md: "3.2vw" },
                                            verticalAlign: "-0.07em"
                                        }}
                                    >
                                        <Image
                                            src="/design-reference/HACKVOYAGERS.svg"
                                            alt="HackVoyagers"
                                            width={600}
                                            height={150}
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                    </Box>{" "}
                                    DIFFERENT FROM GENERAL ATTENDEES?
                                </Typography>
                            </motion.div>
                            <motion.div variants={itemVariants}>
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
                                    HackVoyagers is designed for advanced
                                    hackers, fostering a competitive atmosphere
                                    for a higher prize pool, while general
                                    attendees compete in an environment that
                                    supports learning at every level.
                                </Typography>
                            </motion.div>
                            <motion.div variants={itemVariants}>
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
                            </motion.div>
                        </motion.div>
                    </Box>

                    {/* textbox 3 end */}
                </Box>
            </Box>
        </Box>
    );
};

export default ProChallenge;
