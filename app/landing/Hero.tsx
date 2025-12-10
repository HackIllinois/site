"use client";

import { GradientButton } from "@/components/GradientButton/GradientButton";
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { START_END_DATES } from "./constants";
import styles from "./Hero.module.scss";
import { motion, Variants } from "framer-motion";
import { ShootingStars } from "@/components/ShootingStars/ShootingStars";

// Create a motion-enabled version of the Next.js Image component
const MotionImage = motion(Image);

const Hero = () => {
    const { offsetY, ref } = useParallaxScrollY();

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

            {/* Shooting Stars */}
            <ShootingStars size={500} />

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

                {/* 3rd Item: Sponsor */}
                <motion.div variants={itemVariants}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mb: 3
                        }}
                    >
                        <Typography
                            component="p"
                            sx={{
                                fontSize: { xs: "12px", md: "18px" },
                                fontFamily: "Tsukimi Rounded",
                                fontWeight: 500,
                                color: "white"
                            }}
                        >
                            POWERED BY
                        </Typography>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className={styles.titleSponsor}
                            width="auto"
                            height="26px"
                            src="/sponsor_icons/fulcrum.png"
                            alt="Fulcrum"
                        />
                    </Box>
                </motion.div>

                {/* 4th Item: CTA Button */}
                <motion.div variants={itemVariants}>
                    <GradientButton
                        text="REGISTER NOW"
                        link="/register/general"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
