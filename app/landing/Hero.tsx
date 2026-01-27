"use client";

import { GradientButton } from "@/components/GradientButton/GradientButton";
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { Typography, Box, CircularProgress } from "@mui/material";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { registrationAlive } from "@/util/api";
import { START_END_DATES } from "./constants";
import styles from "./Hero.module.scss";

// Create a motion-enabled version of the Next.js Image component
const MotionImage = motion(Image);

const Hero = () => {
    const { offsetY, ref } = useParallaxScrollY();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<
        boolean | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const isAlive = await registrationAlive();
                setIsRegistrationOpen(isAlive);
                setIsLoading(false);
            } catch (err) {
                console.error("Error checking registration status:", err);
                setError(true);
                setIsLoading(false);
            }
        };

        checkRegistration();
    }, []);

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.05}px)`
    };
    const parallaxStyle2 = {
        transform: `translateY(${offsetY * 0.1}px)`
    };
    const parallaxStyleMobile = {
        transform: `translateY(${offsetY * 0.05}px)`
    };
    const parallaxStyle2Mobile = {
        transform: `translateY(${offsetY * 0.1}px)`
    };

    // 1. Container Variant: Controls the timing of the children
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Wait 0.3s, then start animating children with a 0.2s gap between each
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    // 2. Item Variant: The actual animation for each element (Fade In + Slide Up)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // Smooth ease-out
            }
        }
    };

    const itemVariants2: Variants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // Smooth ease-out
            }
        }
    };

    return (
        <section ref={ref} className={styles.heroSection}>
            {/* Background Elements */}
            <div className={styles.heroBackgrounds}>
                <Image
                    src="/landing/hero/desktop/fight.svg"
                    alt="Stars Background"
                    fill
                    className={styles.starsBackground}
                    priority
                    style={parallaxStyle}
                />
                <Image
                    src="/landing/hero/desktop/stars.svg"
                    alt="Tiny Stars Background"
                    fill
                    className={styles.tinyStarsBackground}
                    priority
                    style={parallaxStyle2}
                />
                <Image
                    src="/landing/hero/mobile/fight.svg"
                    alt="Fight Background"
                    fill
                    className={clsx(styles.starsBackground, styles.mobile)}
                    priority
                    style={parallaxStyleMobile}
                />
                <Image
                    src="/landing/hero/mobile/stars.svg"
                    alt="Stars Background"
                    fill
                    className={clsx(styles.tinyStarsBackground, styles.mobile)}
                    priority
                    style={parallaxStyle2Mobile}
                />
            </div>

            {/* 3. Apply the container variants to the main content wrapper */}
            <motion.div
                className={styles.heroSectionContent}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1st Item: Logo */}
                <MotionImage
                    src="/landing/hero/desktop/hackastra.svg"
                    alt="Hackastra"
                    width={850}
                    height={267}
                    className={styles.hackastraLogo}
                    priority
                    variants={itemVariants2}
                />
                <MotionImage
                    src="/landing/hero/mobile/hackastra.svg"
                    alt="Hackastra"
                    width={850}
                    height={267}
                    className={clsx(styles.hackastraLogo, styles.mobile)}
                    priority
                    variants={itemVariants2}
                />

                {/* 2nd Item: Dates */}
                <motion.div variants={itemVariants}>
                    <Typography
                        component="p"
                        sx={{
                            fontSize: { xs: "20px", md: "28px" },
                            fontFamily: "Tsukimi Rounded",
                            color: "white",

                            // Gradient text for strong tags
                            "& strong": {
                                background:
                                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                fontFamily: "Tsukimi Rounded",
                                fontWeight: 700,
                                filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.7))"
                            }
                        }}
                    >
                        <strong>{START_END_DATES}</strong>
                    </Typography>
                </motion.div>

                {/* 4th Item: CTA Button */}
                <motion.div variants={itemVariants}>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 2
                            }}
                        >
                            <CircularProgress
                                sx={{ color: "#A315D6" }}
                                size={40}
                            />
                        </Box>
                    ) : error ? (
                        <Box sx={{ textAlign: "center" }}>
                            <GradientButton
                                text="REGISTRATION INFO"
                                link="/register/general"
                            />
                            <Typography
                                sx={{
                                    fontSize: { xs: "14px", md: "16px" },
                                    fontFamily: "Montserrat",
                                    color: "white",
                                    mt: 1,
                                    opacity: 0.9
                                }}
                            >
                                Unable to check registration status
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center" }}>
                            {!isRegistrationOpen && (
                                <Typography
                                    sx={{
                                        fontSize: { xs: "14px", md: "16px" },
                                        fontFamily: "Montserrat",
                                        color: "white",
                                        my: 1,
                                        opacity: 0.9
                                    }}
                                >
                                    Registration is now closed.
                                </Typography>
                            )}
                            <GradientButton
                                text={
                                    isRegistrationOpen
                                        ? "REGISTER NOW"
                                        : "MORE INFO"
                                }
                                link={
                                    isRegistrationOpen
                                        ? "/register/general"
                                        : "/registration-closed"
                                }
                            />
                        </Box>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
