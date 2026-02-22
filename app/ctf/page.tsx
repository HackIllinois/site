"use client";

import ErrorSnackbar from "@/components/ErrorSnackbar/ErrorSnackbar";
import Loading from "@/components/Loading/Loading";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import Image from "next/image";
import styles from "./page.module.scss";

const TwinklingStar = ({
    size,
    top,
    left,
    delay,
    duration
}: {
    size: number;
    top: string;
    left: string;
    delay: number;
    duration: number;
}) => (
    <Box
        component={motion.div}
        animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        sx={{
            position: "absolute",
            top,
            left,
            width: size,
            height: size,
            backgroundColor: "#FFF",
            borderRadius: "50%",
            zIndex: 0,
            boxShadow: "0px 0px 4px 1px rgba(255, 255, 255, 0.6)"
        }}
    />
);

const ShootingStar = ({
    delay,
    duration
}: {
    delay: number;
    duration: number;
}) => (
    <Box
        component={motion.div}
        initial={{ x: -100, y: "10%", opacity: 0 }}
        animate={{
            x: ["-10vw", "120vw"],
            y: ["10%", "50%"],
            opacity: [0, 1, 1, 0]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: delay
        }}
        sx={{
            position: "absolute",
            width: "100px",
            height: "2px",
            background:
                "linear-gradient(90deg, transparent, #FFF, transparent)",
            zIndex: 1,
            filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))"
        }}
    />
);

const FloatingDebris = ({
    src,
    top,
    left,
    right,
    size,
    delay,
    duration,
    rotation
}: {
    src: string;
    top: string;
    left?: string;
    right?: string;
    size: string;
    delay: number;
    duration: number;
    rotation: number;
}) => (
    <Box
        component={motion.img}
        src={src}
        animate={{
            y: [0, -15, 0],
            rotate: [0, rotation, -rotation, 0],
            x: [-5, 5, -5]
        }}
        transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
        sx={{
            position: "absolute",
            top,
            left,
            right,
            width: size,
            maxWidth: "150px",
            zIndex: 5,
            pointerEvents: "none",
            opacity: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1 },
            filter: {
                xs: "brightness(0.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                sm: "brightness(0.7) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                md: "brightness(0.8) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                lg: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
            }
        }}
    />
);

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.15
        }
    }
};

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

export default function CTF() {
    const [loading, setLoading] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [stars, setStars] = useState<
        {
            id: number;
            size: number;
            top: string;
            left: string;
            delay: number;
            duration: number;
        }[]
    >([]);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 250);

        const generatedStars = Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 8,
            duration: 2 + Math.random() * 3
        }));
        setStars(generatedStars);

        (window as any).$FETCH_FLAG$ = {
            reward: "flag{flag-3}",
            reveal: () => {
                console.log("flag{flag-4}");
            }
        };

        (window as any).$SECRET_FLAG$ = {
            get: () => atob("ZmxhZ3tmbGFnLTl9")
        };
        (window as any).$HIDDEN_FLAG$ = {
            unlock: () => {
                console.log("flag{flag-10}");
            }
        };

        (window as any).$HINT_1$ = {
            hint: "Elements"
        };

        (window as any).$HINT_2$ = {
            hint: "Elements -> id=UNLOCK-ME -> Uncheck display: none"
        };

        (window as any).$HINT_3$ = {
            hint: "Console -> window -> $FETCH_FLAG$"
        };

        (window as any).$HINT_4$ = {
            hint: "Console -> window -> $FETCH_FLAG$ -> $FETCH_FLAG$.reveal()"
        };

        (window as any).$HINT_5$ = {
            hint: 'Console -> fetch("/ctf/miniapi/") -> Network -> Response'
        };

        (window as any).$HINT_6$ = {
            hint: 'Console -> fetch("/ctf/miniapi/unlock?secret=xxx") -> Network -> Response'
        };

        (window as any).$HINT_7$ = {
            hint: "Elements -> id=VISIBILITY-FLAG -> Change visibility: hidden to visible"
        };

        (window as any).$HINT_8$ = {
            hint: "Elements -> id=OPACITY-FLAG -> Change opacity: 0 to 1"
        };

        (window as any).$HINT_9$ = {
            hint: "Console -> window -> $SECRET_FLAG$.get()"
        };

        (window as any).$HINT_10$ = {
            hint: "Console -> window -> $HIDDEN_FLAG$ -> $HIDDEN_FLAG$.unlock()"
        };

        return () => clearTimeout(t);
    }, []);

    const pingMiniApi = async () => {
        try {
            await fetch("/ctf/miniapi");
        } catch (e: any) {
            setErrorMessage(e?.message || "Failed to ping MiniAPI.");
            setShowErrorAlert(true);
        }
    };

    const pingMiniApiAgain = async () => {
        try {
            await fetch("/ctf/miniapi/unlock");
        } catch (e: any) {
            setErrorMessage(e?.message || "Failed to ping MiniAPI.");
            setShowErrorAlert(true);
        }
    };

    if (loading) return <Loading />;

    return (
        <Box
            component="main"
            sx={{
                width: "100%",
                minHeight: "100vh",
                position: "relative",
                background: "linear-gradient(to bottom, #020316, #16133e)",
                overflow: "hidden"
            }}
        >
            <ErrorSnackbar
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                message={errorMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />

            {stars.map(star => (
                <TwinklingStar key={star.id} {...star} />
            ))}

            <ShootingStar delay={0} duration={8} />
            <ShootingStar delay={4} duration={10} />
            <ShootingStar delay={7} duration={9} />
            <ShootingStar delay={12} duration={11} />

            <Box
                component={motion.img}
                src="/schedule/pink_planet.svg"
                animate={{
                    y: [0, 20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 8, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "5%", md: "3%" },
                    left: { xs: "-5%", md: "-8%" },
                    width: {
                        xs: "35vw",
                        sm: "28vw",
                        md: "25vw"
                    },
                    maxWidth: "none",
                    zIndex: 11,
                    pointerEvents: "none",
                    objectFit: "contain",
                    opacity: { xs: 0.5, sm: 0.7, md: 0.8, lg: 1 },
                    filter: {
                        xs: "brightness(0.5) drop-shadow(0px 0px 30px rgba(238,130,205,0.8))",
                        sm: "brightness(0.7) drop-shadow(0px 0px 30px rgba(238,130,205,0.8))",
                        md: "brightness(0.8) drop-shadow(0px 0px 30px rgba(238,130,205,0.8))",
                        lg: "drop-shadow(0px 0px 30px rgba(238,130,205,0.8))"
                    }
                }}
            />

            <Box
                component={motion.img}
                src="/schedule/orange_planet.svg"
                animate={{
                    y: [0, 15, 0],
                    x: [0, -8, 0],
                    rotate: [0, -6, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "15%", md: "10%" },
                    right: { xs: "-10%", md: "-12%" },
                    width: {
                        xs: "32vw",
                        sm: "25vw",
                        md: "22vw"
                    },
                    maxWidth: "none",
                    zIndex: 11,
                    pointerEvents: "none",
                    objectFit: "contain",
                    opacity: { xs: 0.5, sm: 0.7, md: 0.8, lg: 1 },
                    filter: {
                        xs: "brightness(0.5) drop-shadow(0px 0px 30px rgba(255,165,89,0.8))",
                        sm: "brightness(0.7) drop-shadow(0px 0px 30px rgba(255,165,89,0.8))",
                        md: "brightness(0.8) drop-shadow(0px 0px 30px rgba(255,165,89,0.8))",
                        lg: "drop-shadow(0px 0px 30px rgba(255,165,89,0.8))"
                    }
                }}
            />

            <FloatingDebris
                src="/challenge/backgrounds/desktop/debris.svg"
                top="30%"
                left="10%"
                size="60px"
                delay={0}
                duration={6}
                rotation={15}
            />

            <FloatingDebris
                src="/challenge/backgrounds/desktop/ufos.svg"
                top="45%"
                right="12%"
                size="80px"
                delay={1}
                duration={7}
                rotation={-10}
            />

            <Box
                component={motion.img}
                src="/challenge/backgrounds/desktop/ufos.svg"
                animate={{
                    y: [0, 25, 0],
                    x: [-8, 8, -8],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "52%", md: "47%" },
                    left: { xs: "-10%", md: "-12%" },
                    width: {
                        xs: "42vw",
                        sm: "35vw",
                        md: "30vw"
                    },
                    maxWidth: "none",
                    zIndex: 9,
                    pointerEvents: "none",
                    opacity: { xs: 0.3, sm: 0.5, md: 0.7, lg: 0.8 },
                    filter: {
                        xs: "brightness(0.4)",
                        sm: "brightness(0.6)",
                        md: "brightness(0.8)",
                        lg: "none"
                    }
                }}
            />

            <Box
                component={motion.img}
                src="/challenge/backgrounds/mobile/debris.svg"
                animate={{
                    y: [0, -18, 0],
                    rotate: [0, -12, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "20%", md: "25%" },
                    right: { xs: "-5%", md: "0%" },
                    width: {
                        xs: "30vw",
                        sm: "25vw",
                        md: "20vw"
                    },
                    maxWidth: "none",
                    zIndex: 7,
                    pointerEvents: "none",
                    opacity: { xs: 0.2, sm: 0.35, md: 0.5, lg: 0.6 },
                    filter: {
                        xs: "brightness(0.4)",
                        sm: "brightness(0.6)",
                        md: "brightness(0.8)",
                        lg: "none"
                    }
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "400px",
                    height: "400px",
                    background:
                        "radial-gradient(circle, rgba(163, 21, 214, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "30%",
                    right: "10%",
                    width: "300px",
                    height: "300px",
                    background:
                        "radial-gradient(circle, rgba(253, 171, 96, 0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: {
                        xs: "80vw",
                        md: "600px"
                    },
                    height: {
                        xs: "80vw",
                        md: "600px"
                    },
                    background:
                        "radial-gradient(circle, rgba(163, 21, 214, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "5%",
                    width: {
                        xs: "70vw",
                        md: "500px"
                    },
                    height: {
                        xs: "70vw",
                        md: "500px"
                    },
                    background:
                        "radial-gradient(circle, rgba(253, 171, 96, 0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "45%",
                    left: "10%",
                    width: {
                        xs: "60vw",
                        md: "450px"
                    },
                    height: {
                        xs: "60vw",
                        md: "450px"
                    },
                    background:
                        "radial-gradient(circle, rgba(253, 171, 96, 0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                component={motion.img}
                src="/challenge/backgrounds/mobile/debris.svg"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, -15, 0],
                    x: [-3, 6, -3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "65%", md: "70%" },
                    right: { xs: "-8%", md: "-5%" },
                    width: {
                        xs: "32vw",
                        sm: "26vw",
                        md: "22vw"
                    },
                    maxWidth: "none",
                    zIndex: 6,
                    pointerEvents: "none",
                    opacity: { xs: 0.2, sm: 0.3, md: 0.4, lg: 0.5 },
                    filter: {
                        xs: "brightness(0.4)",
                        sm: "brightness(0.6)",
                        md: "brightness(0.8)",
                        lg: "none"
                    }
                }}
            />

            <Box
                component={motion.img}
                src="/landing/about/mobile/planets.png"
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "30%", md: "35%" },
                    right: { xs: "-15%", md: "-10%" },
                    width: {
                        xs: "40vw",
                        sm: "32vw",
                        md: "28vw"
                    },
                    maxWidth: "none",
                    zIndex: 7,
                    pointerEvents: "none",
                    opacity: { xs: 0.2, sm: 0.35, md: 0.5, lg: 0.6 },
                    filter: {
                        xs: "brightness(0.4)",
                        sm: "brightness(0.6)",
                        md: "brightness(0.8)",
                        lg: "none"
                    }
                }}
            />

            <Box sx={{ height: "80px", position: "relative", zIndex: 10 }} />

            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    py: 6
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ width: "100%" }}
                >
                    <motion.div
                        variants={itemVariants}
                        animate={{
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontSize: { xs: "42px", md: "72px" },
                                fontWeight: 700,
                                background:
                                    "linear-gradient(90deg, #A315D6 0%, #FDAB60 50%, #A315D6 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                mb: 3,
                                filter: "drop-shadow(0 0 30px rgba(163, 21, 214, 0.5))"
                            }}
                        >
                            CAPTURE THE FLAG
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontSize: { xs: "16px", md: "20px" },
                                color: "rgba(255, 255, 255, 0.9)",
                                maxWidth: "700px",
                                mx: "auto",
                                mb: 4,
                                lineHeight: 1.8
                            }}
                        >
                            Explore, discover, and uncover hidden secrets
                            embedded in this page. Use your browser's developer
                            tools and keen observation skills to find all flags.
                            Every flag you find brings you closer to victory!
                        </Typography>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box
                            sx={{
                                background: "rgba(255, 255, 255, 0.08)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "20px",
                                p: { xs: 3, md: 4 },
                                maxWidth: "600px",
                                mx: "auto",
                                mb: 4,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow:
                                        "0 0 40px rgba(163, 21, 214, 0.3)",
                                    border: "1px solid rgba(163, 21, 214, 0.4)"
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: { xs: "22px", md: "28px" },
                                    fontWeight: 700,
                                    background:
                                        "linear-gradient(90deg, #A315D6 0%, #FDAB60 50%, #A315D6 100%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent",
                                    mb: 2
                                }}
                            >
                                MISSION OBJECTIVE
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "14px", md: "16px" },
                                    color: "rgba(255, 255, 255, 0.85)",
                                    lineHeight: 1.7
                                }}
                            >
                                Find all 10 hidden flags scattered throughout
                                this page. Each flag is hidden using different
                                techniques — from inspecting elements to
                                exploring network requests and console commands.
                            </Typography>

                            <Box
                                id="VISIBILITY-FLAG"
                                data-ctf-flag="flag{flag-7}"
                                sx={{
                                    mt: 3,
                                    visibility: "hidden",
                                    px: 2,
                                    py: 1.5,
                                    borderRadius: "12px",
                                    background: "rgba(255, 255, 255, 0.05)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    "&::after": {
                                        content: '"flag{flag-7}"',
                                        color: "#A315D6",
                                        fontFamily: "Montserrat",
                                        fontSize: "14px",
                                        fontWeight: 700
                                    }
                                }}
                            />
                        </Box>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box
                            sx={{
                                background: "rgba(255, 255, 255, 0.08)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "20px",
                                p: { xs: 3, md: 4 },
                                maxWidth: "600px",
                                mx: "auto",
                                mb: 4,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow:
                                        "0 0 40px rgba(253, 171, 96, 0.3)",
                                    border: "1px solid rgba(253, 171, 96, 0.4)"
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: { xs: "20px", md: "24px" },
                                    fontWeight: 700,
                                    color: "white",
                                    mb: 2
                                }}
                            >
                                PRO TIPS
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    textAlign: "left"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: { xs: "13px", md: "15px" },
                                        color: "rgba(255, 255, 255, 0.8)"
                                    }}
                                >
                                    • Use Developer Tools (F12 or right-click →
                                    Inspect)
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: { xs: "13px", md: "15px" },
                                        color: "rgba(255, 255, 255, 0.8)"
                                    }}
                                >
                                    • Check Console tab for special window
                                    objects
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: { xs: "13px", md: "15px" },
                                        color: "rgba(255, 255, 255, 0.8)"
                                    }}
                                >
                                    • Monitor Network tab for API responses
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: { xs: "13px", md: "15px" },
                                        color: "rgba(255, 255, 255, 0.8)"
                                    }}
                                >
                                    • Look for hidden elements with display:
                                    none
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box
                            id="UNLOCK-ME"
                            data-ctf-flag="flag{flag-2}"
                            sx={{
                                background: "rgba(163, 21, 214, 0.2)",
                                border: "2px solid #A315D6",
                                borderRadius: "16px",
                                p: { xs: 2.5, md: 3 },
                                maxWidth: "400px",
                                mx: "auto",
                                display: "none",
                                "&::after": {
                                    content: '"You found flag{flag-2}!"',
                                    color: "#FDAB60",
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    display: "block"
                                }
                            }}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                mb: 4
                            }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={pingMiniApi}
                                    sx={{
                                        background:
                                            "linear-gradient(90deg, #A315D6, #FDAB60)",
                                        borderRadius: "50px",
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        textTransform: "none",
                                        px: 3,
                                        py: 1.5,
                                        fontSize: { xs: "14px", md: "16px" },
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow:
                                                "0 0 35px rgba(163, 21, 214, 0.8)"
                                        }
                                    }}
                                >
                                    Ping!
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={pingMiniApiAgain}
                                    sx={{
                                        background:
                                            "linear-gradient(90deg, #FDAB60, #A315D6)",
                                        borderRadius: "50px",
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        textTransform: "none",
                                        px: 3,
                                        py: 1.5,
                                        fontSize: { xs: "14px", md: "16px" },
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow:
                                                "0 0 35px rgba(253, 171, 96, 0.8)"
                                        }
                                    }}
                                >
                                    Pong?
                                </Button>
                            </motion.div>
                        </Box>

                        <Box
                            id="OPACITY-FLAG"
                            data-ctf-flag="flag{flag-8}"
                            sx={{
                                mt: 2,
                                opacity: 0,
                                px: 2,
                                py: 1.5,
                                borderRadius: "12px",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                "&::after": {
                                    content: '"flag{flag-8}"',
                                    color: "#FDAB60",
                                    fontFamily: "Montserrat",
                                    fontSize: "14px",
                                    fontWeight: 700
                                }
                            }}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box sx={{ mt: 4, mb: 2 }}>
                            <GradientButton
                                text="Go to flag submission page"
                                link="/ctf/submit"
                                target="_blank"
                            />
                        </Box>
                    </motion.div>
                </motion.div>
            </Container>

            <Box data-ctf-flag="flag{flag-1}" sx={{ display: "none" }}>
                {"flag{flag-1}"}
            </Box>
        </Box>
    );
}
