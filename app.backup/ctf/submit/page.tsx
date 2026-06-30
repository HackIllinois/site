"use client";

import {
    Box,
    Container,
    Typography,
    TextField,
    Alert,
    Button,
    CircularProgress
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import styles from "./submit.module.scss";

const API_URL = "https://adonix.hackillinois.org";

const FLAG_POINTS = [
    { range: "1-3", points: 2, color: "#4CAF50" },
    { range: "4-6", points: 6, color: "#2196F3" },
    { range: "7-8", points: 10, color: "#FF9800" },
    { range: "9", points: 16, color: "#E91E63" }
];

const getFlagPoints = (index: number): number => {
    if (index < 3) return 2;
    if (index < 6) return 6;
    if (index < 8) return 10;
    return 16;
};

const getFlagColor = (index: number): string => {
    if (index < 3) return "#4CAF50";
    if (index < 6) return "#2196F3";
    if (index < 8) return "#FF9800";
    return "#E91E63";
};

interface FlagStatusType {
    correct: boolean | null;
    claimed: boolean;
    loading: boolean;
}

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
    size: string | { xs?: string; sm?: string; md?: string; lg?: string };
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
            width: typeof size === "string" ? size : undefined,
            maxWidth: "none",
            zIndex: 5,
            pointerEvents: "none",
            objectFit: "contain",
            opacity: { xs: 0.4, sm: 0.6, md: 0.8, lg: 1 },
            filter: {
                xs: "brightness(0.5)",
                sm: "brightness(0.7)",
                md: "brightness(0.8)",
                lg: "none"
            },
            ...(typeof size !== "string" && { width: size })
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
    const [flagInputs, setFlagInputs] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]);
    const [flagStatus, setFlagStatus] = useState<FlagStatusType[]>(
        Array(9)
            .fill(null)
            .map(() => ({ correct: null, claimed: false, loading: false }))
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );
    const debounceRefs = useRef<(NodeJS.Timeout | null)[]>(Array(9).fill(null));
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
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/token/`, {
                    mode: "cors",
                    credentials: "include"
                });
                setIsAuthenticated(response.ok);
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkAuth();

        const savedFlags = localStorage.getItem("ctf_flags");
        if (savedFlags) {
            const parsedFlags = JSON.parse(savedFlags);
            const allFlags = Array(9)
                .fill("")
                .map((_, i) => parsedFlags[i] || "");
            setFlagInputs(allFlags);
        }

        const savedStatus = localStorage.getItem("ctf_status");
        if (savedStatus) {
            try {
                const parsedStatus = JSON.parse(savedStatus);
                const allStatus = Array(9)
                    .fill(null)
                    .map(
                        (_, i) =>
                            parsedStatus[i] || {
                                correct: null,
                                claimed: false,
                                loading: false
                            }
                    );
                setFlagStatus(allStatus);
            } catch {
                /* ignore */
            }
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

    const submitFlag = useCallback(async (index: number, answer: string) => {
        const flagId = `flag${index + 1}`;

        setFlagStatus(prev => {
            const newStatus = [...prev];
            newStatus[index] = { ...newStatus[index], loading: true };
            return newStatus;
        });

        try {
            const response = await fetch(`${API_URL}/ctf/submit/${flagId}/`, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer: answer.trim() })
            });

            const data = await response.json();

            if (response.ok) {
                return { correct: true, claimed: false };
            }
            if (data.error === "AlreadyClaimed") {
                return { correct: true, claimed: true };
            }
            return { correct: false, claimed: false };
        } catch {
            return { correct: false, claimed: false };
        }
    }, []);

    const handleFlagChange = (index: number, value: string) => {
        const newInputs = [...flagInputs];
        newInputs[index] = value;
        setFlagInputs(newInputs);
        localStorage.setItem("ctf_flags", JSON.stringify(newInputs));

        if (debounceRefs.current[index]) {
            clearTimeout(debounceRefs.current[index]!);
        }

        if (!value.trim()) return;

        debounceRefs.current[index] = setTimeout(async () => {
            const result = await submitFlag(index, value);
            setFlagStatus(prev => {
                const newStatus = [...prev];
                newStatus[index] = {
                    correct: result.correct,
                    claimed: result.claimed,
                    loading: false
                };
                localStorage.setItem("ctf_status", JSON.stringify(newStatus));
                return newStatus;
            });
        }, 800);
    };

    const correctCount = flagStatus.filter(s => s.correct === true).length;
    const progress = (correctCount / 9) * 100;

    useEffect(() => {
        setShowSuccess(correctCount === 9);
    }, [correctCount]);

    if (isAuthenticated === null) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom, #020316, #16133e)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CircularProgress sx={{ color: "#A315D6" }} />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return (
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    background: "linear-gradient(to bottom, #020316, #16133e)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Tsukimi Rounded",
                        fontSize: { xs: "24px", md: "32px" },
                        color: "white",
                        textAlign: "center"
                    }}
                >
                    Please log in to submit flags
                </Typography>
                <Button
                    onClick={() => {
                        window.location.href = `${API_URL}/auth/login/github/?redirect=${window.location.origin}/ctf/submit`;
                    }}
                    sx={{
                        background: "linear-gradient(90deg, #A315D6, #FDAB60)",
                        borderRadius: "50px",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        textTransform: "none",
                        px: 4,
                        py: 1.5,
                        fontSize: "16px",
                        color: "white",
                        "&:hover": {
                            boxShadow: "0 0 20px rgba(163, 21, 214, 0.6)"
                        }
                    }}
                >
                    Log in with GitHub
                </Button>
            </Box>
        );
    }

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
                size={{ xs: "24vw", sm: "20vw", md: "18vw", lg: "20vw" }}
                delay={0}
                duration={7}
            />

            <FloatingPlanet
                src="/schedule/orange_planet.svg"
                top="12%"
                right="-8%"
                size={{ xs: "38vw", md: "24vw" }}
                delay={0.5}
                duration={6}
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
                    opacity: { xs: 0.3, sm: 0.5, md: 0.6, lg: 0.7 },
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
                    opacity: { xs: 0.2, sm: 0.35, md: 0.4, lg: 0.5 },
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
                                fontSize: {
                                    xs: "28px",
                                    sm: "36px",
                                    md: "48px",
                                    lg: "56px"
                                },
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
                                mb: 2,
                                maxWidth: "600px",
                                mx: "auto"
                            }}
                        >
                            Enter the flags you&apos;ve discovered. Your
                            progress will be automatically saved. Good luck!
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                background: "rgba(255, 255, 255, 0.06)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                borderRadius: "16px",
                                p: { xs: 2.5, md: 3 },
                                maxWidth: "550px",
                                mx: "auto",
                                mb: 3
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: { xs: "16px", md: "18px" },
                                    fontWeight: 600,
                                    color: "#FDAB60",
                                    mb: 1.5,
                                    textAlign: "center"
                                }}
                            >
                                Flag Format
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "monospace",
                                    fontSize: { xs: "14px", md: "16px" },
                                    color: "#A315D6",
                                    textAlign: "center",
                                    mb: 1.5,
                                    fontWeight: 600
                                }}
                            >
                                hackctf{"{flag#-flagcontent}"}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: { xs: "13px", md: "14px" },
                                    color: "rgba(255, 255, 255, 0.7)",
                                    textAlign: "center"
                                }}
                            >
                                Submit flags in the exact format. You can submit
                                in any order!
                            </Typography>
                        </Box>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                background: "rgba(255, 255, 255, 0.06)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                borderRadius: "16px",
                                p: { xs: 2.5, md: 3 },
                                maxWidth: "550px",
                                mx: "auto",
                                mb: 4
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: { xs: "16px", md: "18px" },
                                    fontWeight: 600,
                                    color: "#FDAB60",
                                    mb: 2,
                                    textAlign: "center"
                                }}
                            >
                                Point Distribution
                            </Typography>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr 1fr",
                                        sm: "repeat(4, 1fr)"
                                    },
                                    gap: 2
                                }}
                            >
                                {FLAG_POINTS.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            background: "rgba(0, 0, 0, 0.3)",
                                            borderRadius: "12px",
                                            p: 2,
                                            textAlign: "center",
                                            border: `1px solid ${item.color}40`,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: item.color,
                                                boxShadow: `0 0 20px ${item.color}30`
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "12px",
                                                color: "rgba(255, 255, 255, 0.6)",
                                                mb: 0.5
                                            }}
                                        >
                                            Flag
                                            {item.range.includes("-")
                                                ? "s"
                                                : ""}{" "}
                                            {item.range}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: "Tsukimi Rounded",
                                                fontSize: "22px",
                                                fontWeight: 700,
                                                color: item.color
                                            }}
                                        >
                                            {item.points}pts
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
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
                                Congratulations! You&apos;ve found all the
                                flags!
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
                            Progress: {correctCount} / {9} flags
                        </Typography>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        style={{ width: "100%" }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontSize: { xs: "20px", md: "24px" },
                                fontWeight: 700,
                                color: "#4CAF50",
                                mb: 2,
                                mt: 4
                            }}
                        >
                            Level 1
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                    lg: "1fr 1fr 1fr"
                                },
                                gap: 3,
                                mb: 4
                            }}
                        >
                            {flagInputs.slice(0, 3).map((flag, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Box
                                        className={styles.flagCard}
                                        sx={{
                                            background:
                                                flagStatus[index].correct ===
                                                true
                                                    ? "rgba(76, 175, 80, 0.15)"
                                                    : flagStatus[index]
                                                            .correct === false
                                                      ? "rgba(244, 67, 54, 0.1)"
                                                      : "rgba(255, 255, 255, 0.08)",
                                            border:
                                                flagStatus[index].correct ===
                                                true
                                                    ? "2px solid #4CAF50"
                                                    : flagStatus[index]
                                                            .correct === false
                                                      ? "2px solid #F44336"
                                                      : "1px solid rgba(255, 255, 255, 0.15)"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 1.5
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    color:
                                                        flagStatus[index]
                                                            .correct === true
                                                            ? "#4CAF50"
                                                            : flagStatus[index]
                                                                    .correct ===
                                                                false
                                                              ? "#F44336"
                                                              : "rgba(255, 255, 255, 0.7)"
                                                }}
                                            >
                                                FLAG {index + 1}
                                                {flagStatus[index].correct ===
                                                    true && " (correct)"}
                                                {flagStatus[index].correct ===
                                                    false && " (incorrect)"}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "Tsukimi Rounded",
                                                    fontSize: "14px",
                                                    fontWeight: 700,
                                                    color: getFlagColor(index),
                                                    opacity: 0.9
                                                }}
                                            >
                                                {getFlagPoints(index)}pts
                                            </Typography>
                                        </Box>
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
                                                            flagStatus[index]
                                                                .correct ===
                                                            true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    false
                                                                  ? "#F44336"
                                                                  : "rgba(255, 255, 255, 0.3)"
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor:
                                                            flagStatus[index]
                                                                .correct ===
                                                            true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    false
                                                                  ? "#F44336"
                                                                  : "rgba(163, 21, 214, 0.5)"
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor:
                                                            flagStatus[index]
                                                                .correct ===
                                                            true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    false
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

                        <Typography
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontSize: { xs: "20px", md: "24px" },
                                fontWeight: 700,
                                color: "#2196F3",
                                mb: 2
                            }}
                        >
                            Level 2
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                    lg: "1fr 1fr 1fr"
                                },
                                gap: 3,
                                mb: 4
                            }}
                        >
                            {flagInputs.slice(3, 6).map((flag, idx) => {
                                const index = idx + 3;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Box
                                            className={styles.flagCard}
                                            sx={{
                                                background:
                                                    flagStatus[index]
                                                        .correct === true
                                                        ? "rgba(76, 175, 80, 0.15)"
                                                        : flagStatus[index]
                                                                .correct ===
                                                            false
                                                          ? "rgba(244, 67, 54, 0.1)"
                                                          : "rgba(255, 255, 255, 0.08)",
                                                border:
                                                    flagStatus[index]
                                                        .correct === true
                                                        ? "2px solid #4CAF50"
                                                        : flagStatus[index]
                                                                .correct ===
                                                            false
                                                          ? "2px solid #F44336"
                                                          : "1px solid rgba(255, 255, 255, 0.15)"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    mb: 1.5
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color:
                                                            flagStatus[index]
                                                                .correct ===
                                                            true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    false
                                                                  ? "#F44336"
                                                                  : "rgba(255, 255, 255, 0.7)"
                                                    }}
                                                >
                                                    FLAG {index + 1}
                                                    {flagStatus[index]
                                                        .correct === true &&
                                                        " (correct)"}
                                                    {flagStatus[index]
                                                        .correct === false &&
                                                        " (incorrect)"}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            "Tsukimi Rounded",
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: getFlagColor(
                                                            index
                                                        ),
                                                        opacity: 0.9
                                                    }}
                                                >
                                                    {getFlagPoints(index)}pts
                                                </Typography>
                                            </Box>
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
                                                    "& .MuiOutlinedInput-root":
                                                        {
                                                            fontFamily:
                                                                "Montserrat",
                                                            color: "white",
                                                            backgroundColor:
                                                                "rgba(0, 0, 0, 0.3)",
                                                            borderRadius: "8px",
                                                            "& fieldset": {
                                                                borderColor:
                                                                    flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    true
                                                                        ? "#4CAF50"
                                                                        : flagStatus[
                                                                                index
                                                                            ]
                                                                                .correct ===
                                                                            false
                                                                          ? "#F44336"
                                                                          : "rgba(255, 255, 255, 0.3)"
                                                            },
                                                            "&:hover fieldset":
                                                                {
                                                                    borderColor:
                                                                        flagStatus[
                                                                            index
                                                                        ]
                                                                            .correct ===
                                                                        true
                                                                            ? "#4CAF50"
                                                                            : flagStatus[
                                                                                    index
                                                                                ]
                                                                                    .correct ===
                                                                                false
                                                                              ? "#F44336"
                                                                              : "rgba(163, 21, 214, 0.5)"
                                                                },
                                                            "&.Mui-focused fieldset":
                                                                {
                                                                    borderColor:
                                                                        flagStatus[
                                                                            index
                                                                        ]
                                                                            .correct ===
                                                                        true
                                                                            ? "#4CAF50"
                                                                            : flagStatus[
                                                                                    index
                                                                                ]
                                                                                    .correct ===
                                                                                false
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
                                );
                            })}
                        </Box>

                        <Typography
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontSize: { xs: "20px", md: "24px" },
                                fontWeight: 700,
                                color: "#FF9800",
                                mb: 2
                            }}
                        >
                            Level 3
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                    lg: "1fr 1fr 1fr"
                                },
                                gap: 3,
                                mb: 6
                            }}
                        >
                            {flagInputs.slice(6, 9).map((flag, idx) => {
                                const index = idx + 6;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Box
                                            className={styles.flagCard}
                                            sx={{
                                                background:
                                                    flagStatus[index]
                                                        .correct === true
                                                        ? "rgba(76, 175, 80, 0.15)"
                                                        : flagStatus[index]
                                                                .correct ===
                                                            false
                                                          ? "rgba(244, 67, 54, 0.1)"
                                                          : "rgba(255, 255, 255, 0.08)",
                                                border:
                                                    flagStatus[index]
                                                        .correct === true
                                                        ? "2px solid #4CAF50"
                                                        : flagStatus[index]
                                                                .correct ===
                                                            false
                                                          ? "2px solid #F44336"
                                                          : "1px solid rgba(255, 255, 255, 0.15)"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "center",
                                                    mb: 1.5
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            "Montserrat",
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color:
                                                            flagStatus[index]
                                                                .correct ===
                                                            true
                                                                ? "#4CAF50"
                                                                : flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    false
                                                                  ? "#F44336"
                                                                  : "rgba(255, 255, 255, 0.7)"
                                                    }}
                                                >
                                                    FLAG {index + 1}
                                                    {flagStatus[index]
                                                        .correct === true &&
                                                        " (correct)"}
                                                    {flagStatus[index]
                                                        .correct === false &&
                                                        " (incorrect)"}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            "Tsukimi Rounded",
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: getFlagColor(
                                                            index
                                                        ),
                                                        opacity: 0.9
                                                    }}
                                                >
                                                    {getFlagPoints(index)}pts
                                                </Typography>
                                            </Box>
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
                                                    "& .MuiOutlinedInput-root":
                                                        {
                                                            fontFamily:
                                                                "Montserrat",
                                                            color: "white",
                                                            backgroundColor:
                                                                "rgba(0, 0, 0, 0.3)",
                                                            borderRadius: "8px",
                                                            "& fieldset": {
                                                                borderColor:
                                                                    flagStatus[
                                                                        index
                                                                    ]
                                                                        .correct ===
                                                                    true
                                                                        ? "#4CAF50"
                                                                        : flagStatus[
                                                                                index
                                                                            ]
                                                                                .correct ===
                                                                            false
                                                                          ? "#F44336"
                                                                          : "rgba(255, 255, 255, 0.3)"
                                                            },
                                                            "&:hover fieldset":
                                                                {
                                                                    borderColor:
                                                                        flagStatus[
                                                                            index
                                                                        ]
                                                                            .correct ===
                                                                        true
                                                                            ? "#4CAF50"
                                                                            : flagStatus[
                                                                                    index
                                                                                ]
                                                                                    .correct ===
                                                                                false
                                                                              ? "#F44336"
                                                                              : "rgba(163, 21, 214, 0.5)"
                                                                },
                                                            "&.Mui-focused fieldset":
                                                                {
                                                                    borderColor:
                                                                        flagStatus[
                                                                            index
                                                                        ]
                                                                            .correct ===
                                                                        true
                                                                            ? "#4CAF50"
                                                                            : flagStatus[
                                                                                    index
                                                                                ]
                                                                                    .correct ===
                                                                                false
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
                                );
                            })}
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
