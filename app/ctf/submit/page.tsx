"use client";

import { Box, Container, Typography, TextField, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { GradientButton } from "@/components/GradientButton/GradientButton";
import Link from "next/link";
import styles from "./submit.module.scss";

const CORRECT_FLAGS = [
    "flag{flag-1}",
    "flag{flag-2}",
    "flag{flag-3}",
    "flag{flag-4}",
    "flag{flag-5}",
    "flag{flag-6}"
];

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

const FloatingPlanet = ({
    src,
    top,
    left,
    right,
    size,
    delay,
    duration
}: {
    src: string;
    top: string;
    left?: string;
    right?: string;
    size: string;
    delay: number;
    duration: number;
}) => (
    <Box
        component={motion.img}
        src={src}
        animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, 5, 0]
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
            maxWidth: "none",
            zIndex: 5,
            pointerEvents: "none",
            objectFit: "contain"
        }}
    />
);

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

export default function CTFSubmit() {
    const [flagInputs, setFlagInputs] = useState(["", "", "", "", "", ""]);
    const [flagStatus, setFlagStatus] = useState<(boolean | null)[]>([
        null,
        null,
        null,
        null,
        null,
        null
    ]);
    const [showSuccess, setShowSuccess] = useState(false);
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
        const savedFlags = localStorage.getItem("ctf_flags");
        if (savedFlags) {
            const parsedFlags = JSON.parse(savedFlags);
            setFlagInputs(parsedFlags);
            validateFlags(parsedFlags);
        }

        const generatedStars = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            size: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 8,
            duration: 2 + Math.random() * 3
        }));
        setStars(generatedStars);
    }, []);

    const validateFlags = (flags: string[]) => {
        const newStatus = flags.map(flag => {
            if (!flag) return null;
            const isCorrect = CORRECT_FLAGS.includes(flag.trim());
            return isCorrect;
        });
        setFlagStatus(newStatus);
    };

    const handleFlagChange = (index: number, value: string) => {
        const newInputs = [...flagInputs];
        newInputs[index] = value;
        setFlagInputs(newInputs);

        localStorage.setItem("ctf_flags", JSON.stringify(newInputs));
        validateFlags(newInputs);

        const allCorrect =
            newInputs.filter(f => f && CORRECT_FLAGS.includes(f.trim()))
                .length === CORRECT_FLAGS.length;
        setShowSuccess(allCorrect);
    };

    const correctCount = flagStatus.filter(s => s === true).length;
    const progress = (correctCount / CORRECT_FLAGS.length) * 100;

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
            {stars.map(star => (
                <TwinklingStar key={star.id} {...star} />
            ))}

            <ShootingStar delay={0} duration={9} />
            <ShootingStar delay={5} duration={11} />
            <ShootingStar delay={8} duration={10} />

            <FloatingPlanet
                src="/schedule/pink_planet.svg"
                top="5%"
                left="-5%"
                size="28vw"
                delay={0}
                duration={7}
            />

            <FloatingPlanet
                src="/schedule/orange_planet.svg"
                top="12%"
                right="-8%"
                size="24vw"
                delay={0.5}
                duration={6}
            />

            <Box
                component={motion.img}
                src="/challenge/backgrounds/desktop/debris.svg"
                animate={{
                    y: [0, -12, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "35%", md: "40%" },
                    left: { xs: "-5%", md: "-3%" },
                    width: {
                        xs: "25vw",
                        sm: "20vw",
                        md: "16vw"
                    },
                    maxWidth: "none",
                    zIndex: 6,
                    pointerEvents: "none",
                    opacity: 0.6
                }}
            />

            <Box
                component={motion.img}
                src="/challenge/backgrounds/desktop/ufos.svg"
                animate={{
                    y: [0, 18, 0],
                    x: [-5, 8, -5]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                sx={{
                    position: "absolute",
                    bottom: { xs: "15%", md: "20%" },
                    right: { xs: "-10%", md: "-8%" },
                    width: {
                        xs: "28vw",
                        sm: "22vw",
                        md: "18vw"
                    },
                    maxWidth: "none",
                    zIndex: 7,
                    pointerEvents: "none",
                    opacity: 0.7
                }}
            />

            <Box
                component={motion.img}
                src="/landing/about/mobile/planets.png"
                animate={{
                    y: [0, 12, 0],
                    rotate: [0, -4, 0]
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                sx={{
                    position: "absolute",
                    top: { xs: "55%", md: "60%" },
                    left: { xs: "-12%", md: "-10%" },
                    width: {
                        xs: "38vw",
                        sm: "30vw",
                        md: "26vw"
                    },
                    maxWidth: "none",
                    zIndex: 5,
                    pointerEvents: "none",
                    opacity: 0.5
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "30%",
                    width: {
                        xs: "75vw",
                        md: "550px"
                    },
                    height: {
                        xs: "75vw",
                        md: "550px"
                    },
                    background:
                        "radial-gradient(circle, rgba(163, 21, 214, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "10%",
                    right: "15%",
                    width: {
                        xs: "65vw",
                        md: "480px"
                    },
                    height: {
                        xs: "65vw",
                        md: "480px"
                    },
                    background:
                        "radial-gradient(circle, rgba(253, 171, 96, 0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: "15%",
                    right: "25%",
                    width: "250px",
                    height: "250px",
                    background:
                        "radial-gradient(circle, rgba(253, 171, 96, 0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    zIndex: 2,
                    pointerEvents: "none"
                }}
            />

            <Box sx={{ height: "80px", position: "relative", zIndex: 10 }} />

            <Container
                maxWidth="md"
                sx={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 6
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ width: "100%" }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontSize: { xs: "40px", md: "58px" },
                                fontWeight: 700,
                                background:
                                    "linear-gradient(90deg, #A315D6 0%, #FDAB60 50%, #A315D6 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                mb: 2,
                                textAlign: "center",
                                filter: "drop-shadow(0 0 25px rgba(163, 21, 214, 0.4))"
                            }}
                        >
                            SUBMIT YOUR FLAGS
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontSize: { xs: "16px", md: "18px" },
                                color: "rgba(255, 255, 255, 0.85)",
                                textAlign: "center",
                                mb: 4,
                                maxWidth: "600px",
                                mx: "auto"
                            }}
                        >
                            Enter the flags you've discovered. Your progress
                            will be automatically saved. Good luck!
                        </Typography>
                    </motion.div>

                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Alert
                                severity="success"
                                sx={{
                                    mb: 4,
                                    background:
                                        "linear-gradient(90deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1))",
                                    border: "1px solid #4CAF50",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontFamily: "Montserrat"
                                }}
                            >
                                Congratulations! You've found all the flags!
                            </Alert>
                        </motion.div>
                    )}

                    <motion.div
                        variants={itemVariants}
                        style={{ width: "100%" }}
                    >
                        <Box className={styles.progressBar}>
                            <Box
                                className={styles.progressFill}
                                sx={{ width: `${progress}%` }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontSize: { xs: "14px", md: "16px" },
                                color: "rgba(255, 255, 255, 0.8)",
                                mt: 1,
                                textAlign: "right"
                            }}
                        >
                            Progress: {correctCount} / {CORRECT_FLAGS.length}{" "}
                            flags
                        </Typography>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{ width: "100%" }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "1fr 1fr"
                                },
                                gap: 3,
                                mt: 4,
                                mb: 6
                            }}
                        >
                            {flagInputs.map((flag, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Box
                                        className={styles.flagCard}
                                        sx={{
                                            background:
                                                flagStatus[index] === true
                                                    ? "rgba(76, 175, 80, 0.15)"
                                                    : flagStatus[index] ===
                                                        false
                                                      ? "rgba(244, 67, 54, 0.1)"
                                                      : "rgba(255, 255, 255, 0.08)",
                                            border:
                                                flagStatus[index] === true
                                                    ? "2px solid #4CAF50"
                                                    : flagStatus[index] ===
                                                        false
                                                      ? "2px solid #F44336"
                                                      : "1px solid rgba(255, 255, 255, 0.15)"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color:
                                                    flagStatus[index] === true
                                                        ? "#4CAF50"
                                                        : flagStatus[index] ===
                                                            false
                                                          ? "#F44336"
                                                          : "rgba(255, 255, 255, 0.7)",
                                                mb: 1.5
                                            }}
                                        >
                                            FLAG {index + 1}
                                            {flagStatus[index] === true && " ✓"}
                                            {flagStatus[index] === false &&
                                                " ✗"}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            value={flag}
                                            onChange={e =>
                                                handleFlagChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter flag..."
                                            sx={{
                                                fontFamily: "Montserrat",
                                                "& .MuiOutlinedInput-root": {
                                                    fontFamily: "Montserrat",
                                                    color: "white",
                                                    backgroundColor:
                                                        "rgba(0, 0, 0, 0.3)",
                                                    borderRadius: "8px",
                                                    "& fieldset": {
                                                        borderColor:
                                                            flagStatus[
                                                                index
                                                            ] === true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ] === false
                                                                  ? "#F44336"
                                                                  : "rgba(255, 255, 255, 0.3)"
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor:
                                                            flagStatus[
                                                                index
                                                            ] === true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ] === false
                                                                  ? "#F44336"
                                                                  : "rgba(163, 21, 214, 0.5)"
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor:
                                                            flagStatus[
                                                                index
                                                            ] === true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ] === false
                                                                  ? "#F44336"
                                                                  : "#A315D6"
                                                    }
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "white",
                                                    fontFamily: "Montserrat"
                                                }
                                            }}
                                        />
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
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
                            <Link
                                prefetch={false}
                                href="/ctf"
                                style={{ textDecoration: "none" }}
                            >
                                <Box
                                    sx={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        border: "2px solid rgba(255, 255, 255, 0.3)",
                                        borderRadius: "50px",
                                        px: 4,
                                        py: 1.5,
                                        fontFamily: "Montserrat",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        color: "white",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                        "&:hover": {
                                            background:
                                                "rgba(255, 255, 255, 0.2)",
                                            borderColor:
                                                "rgba(255, 255, 255, 0.5)",
                                            transform: "translateY(-2px)"
                                        }
                                    }}
                                >
                                    ← Back to CTF
                                </Box>
                            </Link>
                        </Box>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
}
