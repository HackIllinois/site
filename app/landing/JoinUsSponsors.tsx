"use client";

import { Box, Link, Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";
import { tsukimi } from "@/theme/fonts";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { GradientButtonInstagram } from "@/components/GradientButton/GradientButtonInstagram";
import clsx from "clsx";
import { motion, useAnimation, Variants, useInView } from "framer-motion"; // Added useInView
import { useParallaxScrollY } from "@/hooks/use-parallax-scrollY";
import { useEffect, useRef } from "react"; // Added hooks

const alienAssets = [
    "/landing/sponsors/aliens/alien1.svg",
    "/landing/sponsors/aliens/alien2.svg",
    "/landing/sponsors/aliens/alien3.svg",
    "/landing/sponsors/aliens/alien4.svg",
    "/landing/sponsors/aliens/alien5.svg",
    "/landing/sponsors/aliens/alien6.svg"
];

const MotionImage = motion(Image);

const JoinUsSponsors = () => {
    const ufoControls = useAnimation();
    const { offsetY, ref } = useParallaxScrollY();

    // 1. Create a Ref for the container holding the UFO
    const containerRef = useRef(null);

    // 2. Track when that container enters the viewport
    // amount: 0.3 means "trigger when 30% of the container is visible on screen"
    const isContainerInView = useInView(containerRef, {
        once: true,
        amount: 0.3
    });

    const ufoVariants: Variants = {
        hidden: {
            x: "50vw",
            y: "-50vh",
            scale: 0.5,
            opacity: 0,
            rotate: 15
        },
        enter: {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                duration: 5,
                bounce: 0.4
            }
        },
        float: {
            y: ["-20px", "20px"],
            rotate: ["-1deg", "1deg"],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
            }
        }
    };

    // 3. Trigger the animation via useEffect when the container comes into view
    useEffect(() => {
        const handleUfoEntrance = async () => {
            if (isContainerInView) {
                await ufoControls.start("enter");
                ufoControls.start("float");
            }
        };
        handleUfoEntrance();
    }, [isContainerInView, ufoControls]);

    const backgroundPulseVariants: Variants = {
        pulse: {
            filter: ["brightness(0.5)", "brightness(0.8)", "brightness(0.5)"],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const contentContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.1}px)`
    };

    return (
        <div className={styles.joinUsSection} ref={ref}>
            <MotionImage
                src="/landing/sponsors/background.png"
                alt="Sponsors Background"
                fill
                className={styles.background}
                priority
                variants={backgroundPulseVariants}
                animate="pulse"
            />

            <Image
                src="/landing/sponsors/foreground.svg"
                alt="Sponsors Foreground"
                fill
                className={styles.foreground}
                priority
            />
            <Image
                src="/landing/sponsors/foreground-rocks.svg"
                alt="Sponsors Foreground Rocks"
                fill
                className={styles.foreground}
                style={parallaxStyle}
                priority
            />

            {/* 4. Attach the containerRef here */}
            <div className={styles.ufoContainer} ref={containerRef}>
                {}
                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={styles.ufoImage}
                    variants={ufoVariants}
                    initial="hidden"
                    animate={ufoControls}
                    // Removed onViewportEnter from here
                />

                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={clsx(styles.ufoImage, styles.mobile)}
                    variants={ufoVariants}
                    initial="hidden"
                    animate={ufoControls}
                    // Removed onViewportEnter from here
                />

                <motion.div
                    className={styles.joinUsContentContainer}
                    variants={contentContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: "Tsukimi Rounded",
                                fontWeight: 600,
                                color: "#3F2B75",
                                textAlign: "center"
                            }}
                        >
                            JOIN US
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                fontFamily: "Montserrat",
                                color: "#3F2B75",
                                textAlign: "center",
                                maxWidth: "700px",
                                margin: "20px auto",
                                fontSize: {
                                    xs: "14px",
                                    md: "20px"
                                }
                            }}
                        >
                            Follow us on{" "}
                            <b>
                                Instagram (
                                <Link
                                    href="https://www.instagram.com/hackillinois"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline={"always"}
                                    color="inherit"
                                >
                                    @HackIllinois
                                </Link>
                                )
                            </b>{" "}
                            or <b>subscribe to our newsletter</b> to be notified
                            of our event updates! There will be regular content
                            and posts.
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                gap: "30px",
                                zIndex: 95
                            }}
                        >
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "block"
                                    }
                                }}
                            >
                                <GradientButtonInstagram />
                            </Box>
                            <Box>
                                <Typography
                                    variant="body2"
                                    component="p"
                                    sx={{
                                        fontFamily: "Tsukimi Rounded",
                                        fontSize: {
                                            xs: "14px",
                                            md: "20px"
                                        },
                                        color: "#3F2B75",
                                        fontWeight: 600,
                                        mb: 1
                                    }}
                                >
                                    NEWSLETTER SIGN UP
                                </Typography>
                                <NewsletterSubscription />
                            </Box>
                        </Box>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.sponsorSectionContentContainer}
                    variants={contentContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h2"
                            sx={{
                                color: "white",
                                textAlign: "center",
                                fontFamily: tsukimi.style.fontFamily,
                                fontWeight: 700,
                                mt: {
                                    xs: "20px",
                                    md: 0
                                }
                            }}
                        >
                            SPONSORS
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                color: "#ccc",
                                textAlign: "center",
                                fontFamily: "Montserrat"
                            }}
                        >
                            To be announced soon!
                        </Typography>
                    </motion.div>
                </motion.div>

                <div className={styles.aliensContainer}>
                    {alienAssets.map((src, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={index}
                            src={src}
                            alt={`Alien ${index + 1}`}
                            className={`${styles.alienImage} ${styles[`alien${index}`]}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinUsSponsors;
