"use client";

import { Box, Link, Typography } from "@mui/material";
import styles from "./JoinUsSponsors.module.scss";
import Image from "next/image";
import { tsukimi } from "@/theme/fonts";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { GradientButtonInstagram } from "@/components/GradientButton/GradientButtonInstagram";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

const alienAssets = [
    "/landing/sponsors/aliens/alien1.svg",
    "/landing/sponsors/aliens/alien2.svg",
    "/landing/sponsors/aliens/alien3.svg",
    "/landing/sponsors/aliens/alien4.svg",
    "/landing/sponsors/aliens/alien5.svg",
    "/landing/sponsors/aliens/alien6.svg"
];

// Create a motion component for Next.js Image to allow animation props
const MotionImage = motion(Image);

const JoinUsSponsors = () => {
    const ufoHoverVariants: Variants = {
        float: {
            y: ["-20px", "20px"], // Move up 10px, then down 10px
            rotate: ["-1deg", "1deg"], // Slight wobble rotation
            transition: {
                duration: 4, // Slow duration for a gentle effect
                repeat: Infinity, // Loop forever
                repeatType: "mirror" as const, // Go back and forth smoothly
                ease: "easeInOut"
            }
        }
    };

    const backgroundPulseVariants: Variants = {
        pulse: {
            filter: ["brightness(0.5)", "brightness(0.8)", "brightness(0.5)"], // Gentle pulsating glow
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // 1. Variants for the Content Containers (stagger)
    const contentContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child
                delayChildren: 0.3 // Initial wait time
            }
        }
    };

    // 2. Variants for the individual text/box items (fade up)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className={styles.joinUsSection}>
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

            <div className={styles.ufoContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={styles.ufoImage}
                    variants={ufoHoverVariants}
                    animate="float"
                />

                <motion.img
                    src="/landing/sponsors/desktop/ufo.svg"
                    alt="UFO"
                    className={clsx(styles.ufoImage, styles.mobile)}
                    variants={ufoHoverVariants}
                    animate="float"
                />

                {/* Join Us Content */}
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
                            <Box id="newsletter">
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

                {/* Sponsor Section Content - Now Animated */}
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
